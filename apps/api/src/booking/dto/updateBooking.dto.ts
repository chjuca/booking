import { IsNumber, IsDate, IsString, IsOptional } from 'class-validator';

export class UpdateBookingDto {
    @IsOptional()
    @IsDate()
    bookingDate?: Date;

    @IsOptional()
    @IsNumber()
    depositAmount?: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    @IsNumber()
    roomId?: number;
}