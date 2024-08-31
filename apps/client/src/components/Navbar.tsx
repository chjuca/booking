import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleMyBookings = () => {
    navigate('/bookings');
  };

  return (
    <Box bg="teal.500" color="white" p={4}>
      <Flex align="center" justify="space-between">
        <Heading size="lg">Booking</Heading>
        <Flex>
          <Button colorScheme="teal" variant="outline" mr={4} onClick={handleMyBookings}>
              My reservations
          </Button>
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
