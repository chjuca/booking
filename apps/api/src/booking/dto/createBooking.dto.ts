import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsDate()
    bookingDate: Date;

    @IsOptional()
    @IsNumber()
    depositAmount: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}