import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Request} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('booking')
export class BookingController {
    constructor(private  bookingService: BookingService){ }

    @UseGuards(JwtAuthGuard)
    @Get()
    getBookings(@Request() req): Promise<Booking[]> {
        const userId = req.user?.userId || 0;
        return this.bookingService.getBookingByUser(userId)
    }

    @Post()
    createBooking(@Body() newBooking: CreateBookingDto): Promise<Booking>  {
        try{
            return this.bookingService.createBooking(newBooking)
        } catch (e){
            return null
        }
    }

    @Delete()
    deleteBooking(@Param('id', ParseIntPipe) id: number)  {
        return this.bookingService.deleteBooking(id)
    }

    @Patch(':id')
    updateBookingById(@Param('id', ParseIntPipe) id: number, @Body() updateBooking: UpdateBookingDto) {
        return this.bookingService.updateBooking(id, updateBooking)
    }

}
