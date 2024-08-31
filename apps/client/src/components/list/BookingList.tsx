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
  useDisclosure
} from '@chakra-ui/react';

import { getData } from '../../services/apiService';
import CustomCarousel from '../utils/CustomCarousel';
import CreateBookingForm from '../form/CreateBookingForm';
import { Room } from './RoomList';

export interface Booking {
  id: number
  checkInDate: Date
  checkOutDate: Date
  depositAmount: number
  status: string
  createdAt: Date
  room: Room
}

const BookingCard = ({ booking }: {booking: Booking}) => {

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">

        <Box p="6">
          <Text mt="2" fontWeight="semibold" color="gray.700">
            ${booking.depositAmount}
          </Text>
        </Box>
      </Box>
    </>
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
        console.log(bookings)
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
