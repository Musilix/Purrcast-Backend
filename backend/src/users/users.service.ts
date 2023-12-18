import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    try {
      const res = this.prisma.user.create({ data: createUserDto });
      return res;
    } catch (e) {
      return new Error('Error creating a User');
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates the user with a name of ${updateUserDto.name}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
