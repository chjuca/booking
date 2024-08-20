import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { v4 as uuidv4 } from 'uuid';
import { bucketName, storage } from 'src/storageConfig';

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Room) private roomRepository: Repository<Room>){}

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
      const bucket = storage.bucket(bucketName);
    
      try {
        const uploadPromises = files.map((file) => {
          const fileName = `${uuidv4()}-${file.originalname}`;
          const fileUpload = bucket.file(fileName);
    
          return new Promise<string>((resolve, reject) => {
            const stream = fileUpload.createWriteStream({
              metadata: {
                contentType: file.mimetype,
              },
              resumable: false,
            });
    
            stream.on('error', (err) => {
              console.error('Upload error:', err);
              reject(new Error('Failed to upload file.'));
            });
    
            stream.on('finish', async () => {
              try {
                await fileUpload.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
                resolve(publicUrl);
              } catch (err) {
                reject(err);
              }
            });
    
            stream.end(file.buffer);
          });
        });
    
        return await Promise.all(uploadPromises);
      } catch (e) {
        console.error('Error in storeFiles function:', e);
        return [];
      }
    }
}
