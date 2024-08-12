import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { UsersService } from './users/users.service';
import { RoomService } from './room/room.service';
import { UsersController } from './users/users.controller';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../", "client/dist")
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'booking',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    RoomModule,
    BookingModule
  ],
  controllers: [AppController, BookingController, RoomController, UsersController],
  providers: [AppService],
})
export class AppModule {}
