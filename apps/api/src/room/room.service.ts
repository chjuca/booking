import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RoomService {

    private readonly s3: S3;

    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>){
        this.s3 = new S3({
            endpoint: 'https://<account-id>.r2.cloudflarestorage.com',
            accessKeyId: '<your-access-key>',
            secretAccessKey: '<your-secret-key>',
            region: 'auto',
            signatureVersion: 'v4',
          });
    }

    createRoom(room: CreateRoomDto, fileLinks: string[] ) {
        const dataRoom = {
            ...room,
            images: fileLinks,
          };
        const newRoom = this.roomRepository.create(dataRoom)
        return this.roomRepository.save(newRoom)
    }

    getRoomsAvailable() {
        return this.roomRepository.find({
            where: {
                isAvailable: true
            }
        })
    }

    getRoomById(id: number) {
        return this.roomRepository.findOne({
            where: {id}
        })
    }

    deleteRoom(id: number) {
        return this.roomRepository.delete({id})
    }

    updateRoom(id: number, room: UpdateRoomDto) {
        return this.roomRepository.update({id}, room)
    }


    async storeFiles(files: Express.Multer.File[]): Promise<string[]> {
        const fileLinks: string[] = [];
    
        for (const file of files) {
          const params = {
            Bucket: '<your-bucket-name>',
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
          };
    
          const uploadResult = await this.s3.upload(params).promise();
          fileLinks.push(uploadResult.Location);
        }
    
        return fileLinks;
    }

}
