import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types/Post';
import { User } from '@/types/User';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { Skeleton } from '../../ui/skeleton';

// TODO - super bloated in here at the moment. Shift this around to be more modular
interface PostPreviewCardProps {
  author?: User;
  post?: Post;
  skeleton?: boolean;
}

interface PostProps {
  author: User;
  postedAt: Date;
  content: string;
  location: { city: string; state: string };
}

function RealCard({ author, postedAt, content, location }: PostProps) {
  const [postImageLoaded, setPostImageLoaded] = useState<boolean>(false);

  return (
    <>
      <CardContent className="p-5">
        <div className="relative w-full max-w-1/2 min-w-1/2 aspect-square object-cover overflow-hidden rounded-md flex justify-center align-middle items-center text-center text-xs sm:text-lg break-all bg-secondary">
          {content.includes('png') ? (
            <>
              {!postImageLoaded && (
                <Loader2
                  color="hsl(var(--primary))"
                  className={`${
                    postImageLoaded ? 'opacity-0' : 'opacity-1'
                  } animate-spin z-10 absolute transition-all ease-in-out duration-500 `}
                />
              )}

              <img
                src={content}
                alt={`A preview card for a post made by ${
                  author?.username ?? 'Anonymous Purrcaster'
                }`}
                className={`${
                  postImageLoaded ? 'opacity-1' : 'opacity-0'
                } size-full p-2 object-cover rounded-lg transition-all ease-in-out duration-500`}
                loading="lazy"
                onLoad={() => {
                  setPostImageLoaded(true);
                }}
              />
            </>
          ) : (
            content
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col flex-auto  pb-5">
        <CardTitle>
          Posted by {author?.username ?? 'Anonymous Purrcaster'}
        </CardTitle>
        <CardDescription>{`${location.city}, ${location.state}`}</CardDescription>
        <CardDescription>
          {postedAt
            ? `${new Date(postedAt).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
              })}, ${new Date(postedAt).toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
              })}`
            : 'posted outside the bounds of time and space'}
        </CardDescription>
      </CardFooter>
    </>
  );
}

function SkeletonPreviewCard() {
  return (
    <div className="flex flex-col justify-around space-y-3 w-full h-full p-5">
      <Skeleton className="w-full rounded-xl aspect-square" />
      <div className="space-y-2 w-full flex flex-col justify-center">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function PostPreviewCard({
  author = {} as User,
  post = {} as Post,
  skeleton = false,
}: PostPreviewCardProps) {
  return (
    <Link href={post.id ? `/post/${post.id}` : ``} className="w-full h-full">
      <a className="w-full h-full flex justify-center align-middle">
        <Card className="hover:bg-muted cursor-pointer transition-colors w-full h-full text-center place-items-center place-content-center">
          {!skeleton && post ? (
            <RealCard
              author={author}
              postedAt={post.createdAt}
              content={post.contentId}
              location={{
                city: post?.id_city?.city,
                state: post?.id_state?.state_code,
              }}
            />
          ) : (
            <SkeletonPreviewCard />
          )}
        </Card>
      </a>
    </Link>
  );
}
