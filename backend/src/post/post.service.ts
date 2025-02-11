import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Predictions, WeeklyPredictions } from '@prisma/client';
import axios from 'axios';
import { UploadApiResponse } from 'cloudinary';
import FormData from 'form-data';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { __post_page_offset__ } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharpHelper } from 'src/sharp/sharp.service';
import checkForCat from 'src/utils/CheckForCat';
import uploadToCloudinary from 'src/utils/UploadToCloudinary';
import { PredictionService } from './../prediction/prediction.service';

interface forecastOptions {
  state: number;
  city: number;
  timezoneOffset: number;
  scope?: 'daily' | 'weekly';
}

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly configService: ConfigService,
    private readonly predictionService: PredictionService,
  ) {}

  async upload(
    image: any,
    userId: string | null,
    userState: number,
    userCity: number,
    timezoneOffset: number,
  ) {
    // ------------------------------------------------------------------------------------
    // --- Sharp Image Reformatting -------------------------------------------------------
    // ------------------------------------------------------------------------------------
    // Use Sharp to resize image to 500x500 px and convert it to PNG format
    let reformattedImg = new SharpHelper(image.mimetype, image.buffer);
    // Somewhat nasty way to do method chaining... since these are async functions, we can't just chain them together as normal sadly
    reformattedImg = await (
      await reformattedImg.resizeImage(500)
    ).toFormat('png');

    // Get buffer and mimetype of Sharp converted image
    const reformattedImgDetails = reformattedImg.getImgDetails();

    // ------------------------------------------------------------------------------------
    // --- Imagga Image Tagging -----------------------------------------------------------
    // ------------------------------------------------------------------------------------
    // Create a FormData object to send to Imagga API
    const fd = new FormData();
    fd.append(
      'image_base64',
      Buffer.from(reformattedImgDetails.buffer).toString('base64'),
    );
    fd.append('threshold', '49'); // This is the threshold for the confidence level of the tags we want to get back

    // Get an idea if there is a cat in the image... or if the image is a drawing. We must ensure the image is of a valid format...
    const tags = await axios
      .post('https://api.imagga.com/v2/tags', fd, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${this.configService.get(
              'IMAGGA_API_KEY',
            )}:${this.configService.get('IMAGGA_API_SECRET')}`,
          ).toString('base64')}`,
        },
      })
      .then((response) => {
        return response.data.result.tags;
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'There was an issue deciphering what was in the image. Please try again later.',
        );
      });

    // I made some random utility functions (probably not with the best practices in mind) to clear up some of the bloat
    checkForCat(tags);

    // ------------------------------------------------------------------------------------
    // --- Upload Image to Cloudinary -----------------------------------------------------
    // ------------------------------------------------------------------------------------
    const res: UploadApiResponse = await uploadToCloudinary(
      this.cloudinary,
      reformattedImgDetails,
    );

    // ------------------------------------------------------------------------------------
    // --- Create New Post ----------------------------------------------------------------
    // ------------------------------------------------------------------------------------
    // Find User account associated with the user metadata sent with the POST request
    // It could be possible that there is no user data; in that case, we set the user as null
    const user = userId
      ? await this.prisma.user.findFirst({
          where: { uuid: userId },
        })
      : null;

    // Leave the foreign key connector column (authorId) as null if there is no user associated with the post
    const newPost = await this.prisma.post
      .create({
        data: {
          contentId: res.secure_url,
          authorId: user ? user.id : null,
          published: true,
          isCatOnHead: null,
          postState: userState,
          postCity: userCity,
          timeZoneOffset: timezoneOffset,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'There was an issue uploading your image. It could either be due to your location or account. Try clearing your cache/cookies and logging out and back in',
        );
      });

    // ------------------------------------------------------------------------------------
    // --- Generate isOnHead prediction for image------------------------------------------
    // ------------------------------------------------------------------------------------
    // After post has been created, make a call to the predictions svc to start generating a prediction for the post.
    // TODO - is this a blocking operation for other people who are trying to make posts? I'm not fully sure...
    this.predictionService.generatePrediction(res.secure_url, newPost.id);

    // return resource url (cloudinary img url) and the posts id from the DB
    return { resource: res.secure_url, postId: newPost.id };
  }

  async getImage(postId: string) {
    try {
      const res = await this.cloudinary.getUpload(postId);
      return res;
    } catch (e) {
      throw new NotFoundException(
        `Unable to retrieve the image with an ID of ${postId}`,
      );
    }
  }

  async findAll(page: number, userId?: string) {
    // TODO - make this a constant?
    const pageOffset = __post_page_offset__;

    const findAllFilters = userId
      ? { published: true, isDeleted: false, author: { uuid: userId } }
      : { published: true, isDeleted: false };

    try {
      const res = await this.prisma.post.findMany({
        where: findAllFilters,
        select: {
          published: true,
          contentId: true,
          createdAt: true,
          updatedAt: true,
          id: true,
          upvotes: true,
          isCatOnHead: true,
          author: {
            select: {
              bio: true,
              name: true,
              username: true,
            },
          },
          id_state: {
            select: {
              state_code: true,
              state_name: true,
            },
          },
          id_city: {
            select: {
              city: true,
            },
          },
        },
        skip: (page - 1) * pageOffset,
        take: pageOffset,
      });

      return {
        posts: [...res],
        nextPage: res.length >= pageOffset ? page + 1 : undefined,
        currPage: page,
        prevPage: page > 1 ? page - 1 : undefined,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An error occured while trying to grab posts. Maybe go smoke a toke and come have a go at it again a little later?',
      );
    }
  }

  async findAllNearby(page: number, userState: number, userCity: number) {
    // TODO - make this a constant?
    const pageOffset = __post_page_offset__;

    try {
      const res = await this.prisma.post.findMany({
        where: {
          postState: userState,
          postCity: userCity,
          published: true,
          isDeleted: false,
        },
        select: {
          published: true,
          contentId: true,
          createdAt: true,
          updatedAt: true,
          id: true,
          upvotes: true,
          author: {
            select: {
              bio: true,
              name: true,
              username: true,
            },
          },
          id_state: {
            select: {
              state_code: true,
              state_name: true,
            },
          },
          id_city: {
            select: {
              city: true,
            },
          },
        },
        skip: (page - 1) * pageOffset,
        take: pageOffset,
      });

      return {
        posts: [...res],
        nextPage: res.length >= pageOffset ? page + 1 : undefined,
        currPage: page,
        prevPage: page > 1 ? page - 1 : undefined,
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An error occured while trying to grab posts near you. We think there could be an issue your location services. Please try again later.',
      );
    }
  }

  // TODO - add ability to retrieve all posts you've upvoted
  async findAllUpvotes(userId: string) {
    console.log(userId);
    return [];
  }

  // TODO - add ability to retrieve all posts that are pending classification for isCatOnHead
  async findAllPending() {
    return [];
  }

  async findOne(id: number) {
    try {
      const res = await this.prisma.post.findUnique({
        where: {
          id: id,
          published: true,
        },
        select: {
          published: true,
          contentId: true,
          createdAt: true,
          updatedAt: true,
          id: true,
          upvotes: true,
          isCatOnHead: true,
          author: {
            select: {
              bio: true,
              name: true,
              username: true,
            },
          },
          id_state: {
            select: {
              state_code: true,
              state_name: true,
            },
          },
          id_city: {
            select: {
              city: true,
            },
          },
        },
      });

      return res;
    } catch (e) {
      return new InternalServerErrorException(
        'An error occurred while trying to get the post. That post may have been deleted or never existed. Please have a go at it a little later',
      );
    }
  }

  async upvote(id: number, userId: string) {
    const user = await this.prisma.user
      .findFirstOrThrow({
        where: {
          uuid: userId,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Somehow, your user information is invalid. This is most probably an issue on our side.',
        );
      });

    const didUserAlreadyVote = await this.prisma.upvotes.findFirst({
      where: {
        postId: id as number,
        userId: user.id as number,
      },
    });

    if (didUserAlreadyVote) {
      throw new InternalServerErrorException(
        "You've already upvoted this post.",
      );
    }

    await this.prisma.upvotes.create({
      data: {
        postId: id,
        userId: user.id,
      },
    });

    return await this.prisma.upvotes.findMany({
      where: {
        postId: id,
      },
    });
  }

  // TODO - add try-catch?
  async getForecast({
    state,
    city,
    timezoneOffset,
    scope = 'daily',
  }: forecastOptions) {
    console.log(
      `Someone wants the forecast for ${state}, ${city}! They have a timezone offset of ${timezoneOffset}!`,
    );

    // The date is in UTC, so we will subtract the given time zone offset from it to decide what day we're
    // working for in the given users time zone.
    const currDate = new Date(new Date().toUTCString());
    const adjustedCurrDate = new Date(
      currDate.getTime() - timezoneOffset * 60000,
    );
    const foreCastDateString = `${adjustedCurrDate.getUTCFullYear()}/${
      adjustedCurrDate.getUTCMonth() + 1
    }/${adjustedCurrDate.getUTCDate()}`;

    let forecast: Predictions | WeeklyPredictions | null = null;

    if (scope === 'daily') {
      forecast = await this.prisma.predictions.findFirst({
        where: {
          us_state: state,
          us_city: city,
          date: new Date(foreCastDateString),
        },
      });
    } else if (scope === 'weekly') {
      forecast = await this.prisma.weeklyPredictions.findFirst({
        where: {
          us_state: state,
          us_city: city,
          weekPivot: new Date(foreCastDateString),
        },
      });
    }

    // No forecast found for the given location, so we return -1
    if (!forecast || !forecast.prediction) {
      return -1;
    }

    return forecast.prediction;
  }

  async findClosestCity(lat: number, long: number) {
    try {
      // Call function to get nearby entities, given the location
      // TODO - change implementation to do real thing.
      const res = await this.prisma
        .$queryRaw`SELECT * FROM get_closest_city(${lat}, ${long})`;

      return res;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An error occured while trying to figure out where you are. We think there could be an issue with the location you provided. Please try again later.',
      );
    }
  }
}
