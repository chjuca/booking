import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userId', response.data.userId);
      navigate('/');
    } catch (error: any) {
      setError('Invalid credentials. Please try again.');
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb={4} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl id="password" mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}

        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;