import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional } from 'class-validator';

export class CreateBookingDto {
    @IsNotEmpty()
    @IsDate()
    checkInDate: Date;

    @IsNotEmpty()
    @IsDate()
    checkOutDate: Date;

    @IsOptional()
    @IsNumber()
    depositAmount: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}