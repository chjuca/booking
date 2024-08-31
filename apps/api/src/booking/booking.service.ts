import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/createBooking.dto';
import { User } from 'src/users/user.entity';
import { Room } from 'src/room/room.entity';
import { UpdateBookingDto } from './dto/updateBooking.dto';

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Room) private roomRepository: Repository<Room>
    ) {}

    async createBooking(bookingDto: CreateBookingDto) {
        const { userId, roomId, ...rest } = bookingDto;
    
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
    
        const room = await this.roomRepository.findOneBy({ id: roomId });
        if (!room) {
            throw new Error('Room not found');
        }
    
        const newBooking = this.bookingRepository.create({
            ...rest,
            user: user,
            room: room,
        });
    
        return this.bookingRepository.save(newBooking);
    }

    getBookingByUser(idUser: number) {
        return this.bookingRepository.find({
            where: { user: {id: idUser}},
            relations: ['room'],
        })
    }

    getBookingById(id: number) {
        return this.bookingRepository.findOne({
            where: {id}
        })
    }

    deleteBooking(id: number) {
        return this.bookingRepository.delete({id})
    }

    async updateBooking(id: number, updateBookingDto: UpdateBookingDto) {
        const { userId, roomId, ...rest } = updateBookingDto;
    
        const updatedFields: any = { ...rest };
    
        if (userId) {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            updatedFields.user = user;
        }
    
        if (roomId) {
            const room = await this.roomRepository.findOneBy({ id: roomId });
            if (!room) {
                throw new Error('Room not found');
            }
            updatedFields.room = room;
        }
    
        return this.bookingRepository.update({ id }, updatedFields);
    }
}
