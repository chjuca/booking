import { Box, Flex, Input, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface DateSelectorProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckOutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckInDate = e.target.value;
    if (newCheckInDate < todayDate) {
      setError('Check-In date cannot be earlier than today.');
      e.target.value = todayDate; // Correct the value to today's date
      return;
    }
    if (!validateDates(newCheckInDate, checkOutDate)) {
      setError('Check-Out date must be later than Check-In date.');
      setIsModalOpen(true);
      e.target.value = newCheckInDate; // Set the corrected value
      return;
    }
    setError(null);
    onCheckInChange(e);
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOutDate = e.target.value;
    if (newCheckOutDate < todayDate) {
      setError('Check-Out date cannot be earlier than today.');
      e.target.value = todayDate; // Correct the value to today's date
      return;
    }
    if (!validateDates(checkInDate, newCheckOutDate)) {
      setError('Check-Out date must be later than Check-In date.');
      setIsModalOpen(true);
      e.target.value = newCheckOutDate; // Set the corrected value
      return;
    }
    setError(null);
    onCheckOutChange(e);
  };

  const validateDates = (checkInDate: string, checkOutDate: string): boolean => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return checkIn < checkOut;
  };

  return (
    <Flex direction="column" mt="4">
      <Flex direction="row" gap="4">
        <Box flex="1">
          <Text fontWeight="medium" color="gray.600">Check-In Date</Text>
          <Input
            type="date"
            value={checkInDate}
            min={todayDate} // Prevent selecting past dates
            onChange={handleCheckInChange}
            mt="1"
          />
        </Box>

        <Box flex="1">
          <Text fontWeight="medium" color="gray.600">Check-Out Date</Text>
          <Input
            type="date"
            value={checkOutDate}
            min={todayDate} // Prevent selecting past dates
            onChange={handleCheckOutChange}
            mt="1"
          />
        </Box>
      </Flex>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="red.500">
              {error}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default DateSelector;
