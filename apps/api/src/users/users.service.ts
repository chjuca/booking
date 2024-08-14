import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    createUser(user: CreateUserDto) {
        try{
            const newUser = this.userRepository.create(user)
            return this.userRepository.save(newUser)
        } catch(error){
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    getUsers() {
        return this.userRepository.find()
    }

    getUserById(id: number) {
        return this.userRepository.findOne({
            where: {id}
        })
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id})
    }

    updateUser(id: number, user: UpdateUserDto) {
        return this.userRepository.update({id}, user)
    }
}

