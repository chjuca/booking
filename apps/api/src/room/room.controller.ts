import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('room')
export class RoomController {

    constructor(private  roomService: RoomService){ }

    @Get()
    getRoomsAvailable(
        @Query('checkInDate') checkInDateStr: string,
        @Query('checkOutDate') checkOutDateStr: string
    ): Promise<Room[]> {
        const checkInDate = new Date(checkInDateStr);
        const checkOutDate = new Date(checkOutDateStr);
        return this.roomService.getRoomsAvailable(checkInDate, checkOutDate)
    }

    @Get(':id')
    getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
        return this.roomService.getRoomById(id)
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createRoom(@Body() newRoom: CreateRoomDto, @UploadedFiles() files: Express.Multer.File[],): Promise<Room>  {
        const fileLinks = await this.roomService.storeFiles(files);
        return this.roomService.createRoom(newRoom, fileLinks)
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
