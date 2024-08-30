import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button, useDisclosure } from '@chakra-ui/react';
import { postData } from '../../services/apiService';
import CustomModal from './modal/customModal';
import { Room } from '../list/RoomList';

interface BookingFormState {
  checkInDate: string;
  checkOutDate: string;
  depositAmount?: number;
  userId: number;
  roomId: number;
}

interface CreateBookingFormProps {
  room: Room;
}

const CreateBookingForm: React.FC<CreateBookingFormProps> = ({room} ) => {
  const [formState, setFormState] = useState<BookingFormState>({
    checkInDate: '',
    checkOutDate: '',
    depositAmount: 0,
    userId: 0,
    roomId: room.id,
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

  useEffect(() => {
    if (formState.checkInDate && formState.checkOutDate) {
      const checkInDate = new Date(formState.checkInDate);
      const checkOutDate = new Date(formState.checkOutDate);
      const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);

      if (differenceInDays > 0) {
        const calculatedDepositAmount = differenceInDays * room.pricePerNight;
        setFormState((prevState) => ({
          ...prevState,
          depositAmount: calculatedDepositAmount,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          depositAmount: undefined,
        }));
      }
    }
  }, [formState.checkInDate, formState.checkOutDate, room.pricePerNight]);

  const isError = (field: keyof BookingFormState) => formState[field] === '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postData('/api/booking', formState);
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
      <Box p={5} as="form" onSubmit={handleSubmit}>
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
            readOnly
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