import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>){}

    createRoom(room: CreateRoomDto) {
        const newRoom = this.roomRepository.create(room)
        return this.roomRepository.save(newRoom)
    }

    getRoomsAvailable() {
        return this.roomRepository.find({
            where: {
                isAvailable: true
            }
        })
    }

    getRoomById(id: number) {
        return this.roomRepository.findOne({
            where: {id}
        })
    }

    deleteRoom(id: number) {
        return this.roomRepository.delete({id})
    }

    updateRoom(id: number, room: UpdateRoomDto) {
        return this.roomRepository.update({id}, room)
    }

}
