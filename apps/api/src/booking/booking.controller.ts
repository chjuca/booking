import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';

@Controller('booking')
export class BookingController {
    constructor(private  bookingService: BookingService){ }

    @Get(':id')
    getBooking(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
        return this.bookingService.getBookingById(id)
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
