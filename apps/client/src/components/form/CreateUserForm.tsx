import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button, useDisclosure } from '@chakra-ui/react';
import { UserFormState } from '../../types/formTypes';
import { postData } from '../../services/apiService';
import CustomModal from './modal/customModal';

const CreateUserForm: React.FC = () => {
  
  const [formState, setFormState] = useState<UserFormState>({
    userName: '',
    firstName: '',
    lastName: '',
    password: ''
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

  const isError = (field: keyof UserFormState) => formState[field] === '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postData('/api/users', formState);
      setModalMessage('Form submitted successfully!');
      setError(false);
    } catch (error) {
      setModalMessage('Failed to submit form. Please try again.');
      setError(true);
    } finally {
      onOpen();
    }
  };

  return (
    <>
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={isError('userName')}>
        <FormLabel>Username:</FormLabel>
        <Input
          type="text"
          name="userName"
          value={formState.userName}
          onChange={handleInputChange}
        />
        {isError('userName') && <FormErrorMessage>Username is required.</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={isError('firstName')}>
        <FormLabel>First name:</FormLabel>
        <Input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
        {isError('firstName') && <FormErrorMessage>First name is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('lastName')}>
        <FormLabel>Last name:</FormLabel>
        <Input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
        {isError('lastName') && <FormErrorMessage>Last name is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('password')}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        {isError('password') && <FormErrorMessage>Password is required.</FormErrorMessage>}
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

export default CreateUserForm;
