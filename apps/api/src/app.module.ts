import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking/booking.controller';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { UsersController } from './users/users.controller';
import { BookingModule } from './booking/booking.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

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
    BookingModule,
    AuthModule
  ],
  controllers: [AppController, BookingController, RoomController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
