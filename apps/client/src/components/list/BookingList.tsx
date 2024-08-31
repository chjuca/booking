import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  Grid,
  Spinner,
  Center,
  VStack
} from '@chakra-ui/react';

import { getData } from '../../services/apiService';
import { Room } from './RoomList';
import CustomCarousel from '../utils/CustomCarousel';

export interface Booking {
  id: number
  checkInDate: string
  checkOutDate: string
  depositAmount: number
  status: string
  createdAt: string
  room: Room
}

const BookingCard = ({ booking }: { booking: Booking }) => {

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" p="4" boxShadow="md">
      <VStack align="start" spacing={4}>
        <Flex justify="space-between" width="100%">
          <Badge colorScheme={booking.status === 'confirmed' ? 'green' : 'red'}>
            {booking.status}
          </Badge>
        </Flex>

        <Text fontWeight="semibold" color="gray.500">
          Check-in Date: {formatDate(booking.checkInDate)}
        </Text>
        <Text fontWeight="semibold" color="gray.500">
          Check-out Date: {formatDate(booking.checkOutDate)}
        </Text>
        <Text fontWeight="semibold" color="gray.500">
          Created At: {formatDate(booking.createdAt)}
        </Text>

        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
          <CustomCarousel images={booking.room.images} />
          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold" fontSize="xl">
                Room {booking.room.roomNumber}
              </Text>
              <Text color="gray.500">
                {booking.room.roomType}
              </Text>
            </Flex>
          </Box>
        </Box>

        <Box borderTopWidth="1px" borderColor="white.200" width="100%" pt="4" mt="4">
          <Text fontSize="xl" fontWeight="bold" color="white.800">
            Deposit Amount: ${booking.depositAmount}
          </Text>
        </Box>

      </VStack>
    </Box>
  );
};

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getData('/api/booking');
        if (!bookings) {
          throw new Error('Error fetching bookings');
        }
        setBookings(bookings);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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
      {bookings.map((booking: Booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </Grid>
  );
};

export default BookingList;
