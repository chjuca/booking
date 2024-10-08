import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private  userService: UsersService){ }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id)
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto): Promise<User>  {
        try{
            return this.userService.createUser(newUser)
        } catch (e){
            return null
        }
    }


    @Delete()
    deleteUser(@Param('id', ParseIntPipe) id: number)  {
        return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUser: UpdateUserDto) {
        return this.userService.updateUser(id, updateUser)
    }

}
