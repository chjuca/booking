import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button, useDisclosure } from '@chakra-ui/react';
import { postData } from '../../services/apiService';
import CustomModal from './modal/customModal';

interface BookingFormState {
  checkInDate: string;
  checkOutDate: string;
  depositAmount?: number;
  userId: number;
  roomId: number;
}

const CreateBookingForm: React.FC = () => {
  const [formState, setFormState] = useState<BookingFormState>({
    checkInDate: '',
    checkOutDate: '',
    depositAmount: undefined,
    userId: 0,
    roomId: 0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isError = (field: keyof BookingFormState) => formState[field] === '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postData('/api/bookings', formState);
      setModalMessage('Booking submitted successfully!');
      setError(false);
    } catch (error) {
      setModalMessage('Failed to submit booking. Please try again.');
      setError(true);
    } finally {
      onOpen();
    }
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl isInvalid={isError('checkInDate')}>
          <FormLabel>Check-in Date:</FormLabel>
          <Input
            type="date"
            name="checkInDate"
            value={formState.checkInDate}
            onChange={handleInputChange}
          />
          {isError('checkInDate') && <FormErrorMessage>Check-in Date is required.</FormErrorMessage>}
        </FormControl>

        <FormControl mt={4} isInvalid={isError('checkOutDate')}>
          <FormLabel>Check-out Date:</FormLabel>
          <Input
            type="date"
            name="checkOutDate"
            value={formState.checkOutDate}
            onChange={handleInputChange}
          />
          {isError('checkOutDate') && <FormErrorMessage>Check-out Date is required.</FormErrorMessage>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Deposit Amount:</FormLabel>
          <Input
            type="number"
            name="depositAmount"
            value={formState.depositAmount?.toString() || ''}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mt={4} isInvalid={isError('userId')}>
          <FormLabel>User ID:</FormLabel>
          <Input
            type="number"
            name="userId"
            value={formState.userId.toString()}
            onChange={handleInputChange}
          />
          {isError('userId') && <FormErrorMessage>User ID is required.</FormErrorMessage>}
        </FormControl>

        <FormControl mt={4} isInvalid={isError('roomId')}>
          <FormLabel>Room ID:</FormLabel>
          <Input
            type="number"
            name="roomId"
            value={formState.roomId.toString()}
            onChange={handleInputChange}
          />
          {isError('roomId') && <FormErrorMessage>Room ID is required.</FormErrorMessage>}
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </Box>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        message={modalMessage}
        error={error}
      />
    </>
  );
};

export default CreateBookingForm;