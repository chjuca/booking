import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { User } from 'src/users/user.entity';
import { Room } from 'src/room/room.entity';
import { RoomService } from 'src/room/room.service';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, User, Room])],
    controllers: [BookingController],
    providers: [BookingService, UsersService, RoomService ],
    exports: [BookingService]
})
export class BookingModule {}
