import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async add(user: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneById(id);
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return await this.userRepository.findOneById(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
