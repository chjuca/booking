import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';

@Controller('room')
export class RoomController {

    constructor(private  roomService: RoomService){ }

    @Get()
    getRoomsAvailable(): Promise<Room[]> {
        return this.roomService.getRoomsAvailable()
    }

    @Get(':id')
    getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
        return this.roomService.getRoomById(id)
    }

    @Post()
    createUser(@Body() newRoom: CreateRoomDto): Promise<Room>  {
        return this.roomService.createRoom(newRoom)
    }


    @Delete()
    deleteRoom(@Param('id', ParseIntPipe) id: number)  {
        return this.roomService.deleteRoom(id)
    }

    @Patch(':id')
    updateRoomById(@Param('id', ParseIntPipe) id: number, @Body() updateRoom: UpdateRoomDto) {
        return this.roomService.updateRoom(id, updateRoom)
    }
}
