import { Room } from 'src/room/room.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  depositAmount: number;

  @Column({ default: 'confirmed' }) // checked_in - checked_out - cancelled - in_progress - completed
  status: string;

  @Column({type: 'timestamp', default: () => 'NOW()'})
  createdAt: Date;

  @ManyToOne(() => User, user => user.bookings)
  user: User;

  @ManyToOne(() => Room, room => room.bookings)
  room: Room;

}
