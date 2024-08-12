import { Booking } from 'src/booking/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];
}