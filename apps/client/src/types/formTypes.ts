export interface UserFormState {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
}


export interface RoomFormState {
    roomNumber: string;
    roomType: string;
    pricePerNight: string;
    description: string;
    name: string;
    images: FileList | null;
  }
  
