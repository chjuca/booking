import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Grid,
  Spinner,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import { getData } from '../../services/apiService';
import CustomCarousel from '../utils/CustomCarousel';
import CreateBookingForm from '../form/CreateBookingForm';
import DateSelector from '../utils/DateSelector';

export interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    pricePerNight: number;
    isAvailable: boolean;
    images: string[];
}

const RoomCard = ({ room }: {room: Room}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Box borderWidth="1px" borderRadius="lg" onClick={onOpen} cursor="pointer" overflow="hidden" width="100%">

      <CustomCarousel images={room.images}/>

      <Box p="6">
        <Badge borderRadius="full" px="2" colorScheme={room.isAvailable ? 'green' : 'red'}>
          {room.isAvailable ? 'Available' : 'Not Available'}
        </Badge>

        <Flex mt="1" justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="xl">
            Room {room.roomNumber}
          </Text>
          <Text color="gray.500">
            {room.roomType}
          </Text>
        </Flex>

        <Text mt="2" fontWeight="semibold" color="gray.700">
          ${room.pricePerNight} per night
        </Text>
      </Box>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Room {room.roomNumber}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateBookingForm room={room} />
          </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCheckInDate(e.target.value);
  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCheckOutDate(e.target.value);

  useEffect(() => {
    const fetchRooms = async () => {
      if (checkInDate && checkOutDate) {
        try {
          const url = `/api/room?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
          const rooms = await getData(url);
          if (!rooms) {
            throw new Error('Error fetching rooms');
          }
          setRooms(rooms);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRooms();
  }, [checkInDate, checkOutDate]);

  return (
    <>
    <DateSelector
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      onCheckInChange={(e) => setCheckInDate(e.target.value)}
      onCheckOutChange={(e) => setCheckOutDate(e.target.value)}
    />
    
    {loading && (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )}
    
    {error && (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Center>
    )}
    
    {!loading && !error && (
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} p={4}>
        {rooms.map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Grid>
    )}
  </>
  );
};

export default RoomList;
