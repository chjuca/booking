import { Booking } from 'src/booking/booking.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roomNumber: string;

  @Column()
  roomType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerNight: number;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];
}