import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
    
        const newUser = this.userRepository.create({
          ...user,
          password: hashedPassword,
        });
        return this.userRepository.save(newUser);
    
    }

    getUsers() {
        return this.userRepository.find()
    }

    getUserById(id: number) {
        return this.userRepository.findOne({
            where: {id}
        })
    }

    getUserByUserName(userName: string) {
        return this.userRepository.findOne({
            where: {userName}
        })
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id})
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({id}, user)
    }
}

