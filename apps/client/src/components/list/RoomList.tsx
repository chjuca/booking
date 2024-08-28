import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Grid,
  Spinner,
  Center
} from '@chakra-ui/react';

import { getData } from '../../services/apiService';
import CustomCarousel from '../utils/CustomCarousel';

export interface Room {
    id: number;
    roomNumber: string;
    roomType: string;
    pricePerNight: number;
    isAvailable: boolean;
    images: string[];
}

const RoomCard = ({ room }: {room: Room}) => {

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">

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
  );
};

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getData('/api/room');
        if (!rooms) {
          throw new Error('Error fetching rooms');
        }
        setRooms(rooms);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Center>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} p={4}>
      {rooms.map((room: Room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </Grid>
  );
};

export default RoomList;
