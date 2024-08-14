import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea, VStack } from '@chakra-ui/react';
import { RoomFormState } from '../../types/formTypes';

const CreateRoomForm: React.FC = () => {
  
  const [formState, setFormState] = useState<RoomFormState>({
    roomNumber: '',
    roomType: '',
    pricePerNight: '',
    description: '',
    name: '',
    images: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const input = e.target as HTMLInputElement;
      const files = input.files;
      setFormState((prevState) => ({
        ...prevState,
        [name]: files,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const isError = (field: keyof RoomFormState) => formState[field] === '' || (field === 'images' && !formState[field]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={isError('name')}>
        <FormLabel>Name:</FormLabel>
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
        {isError('name') && <FormErrorMessage>Name is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('description')}>
        <FormLabel>Description:</FormLabel>
        <Textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />
        {isError('description') && <FormErrorMessage>Description is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('roomNumber')}>
        <FormLabel>Room Number:</FormLabel>
        <Input
          type="text"
          name="roomNumber"
          value={formState.roomNumber}
          onChange={handleInputChange}
        />
        {isError('roomNumber') && <FormErrorMessage>Room Number is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('roomType')}>
        <FormLabel>Room Type:</FormLabel>
        <Input
          type="text"
          name="roomType"
          value={formState.roomType}
          onChange={handleInputChange}
        />
        {isError('roomType') && <FormErrorMessage>Room Type is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('pricePerNight')}>
        <FormLabel>Price Per Night:</FormLabel>
        <Input
          type="text"
          name="pricePerNight"
          value={formState.pricePerNight}
          onChange={handleInputChange}
        />
        {isError('pricePerNight') && <FormErrorMessage>Price Per Night is required.</FormErrorMessage>}
      </FormControl>

      <FormControl mt={4} isInvalid={isError('images')}>
        <FormLabel>Images:</FormLabel>
        <VStack align="start">
          <Button
            as="label"
            htmlFor="file-input"
            variant="outline"
            colorScheme="teal"
            cursor="pointer"
            _hover={{ bg: 'teal.50' }}
          >
            Choose Files
          </Button>
          <Input
            id="file-input"
            type="file"
            name="images"
            accept="image/*"
            multiple
            display="none"
            onChange={handleInputChange}
          />
          {isError('images') && <FormErrorMessage>At least one image is required.</FormErrorMessage>}
        </VStack>
      </FormControl>

      <Button mt={4} colorScheme="teal" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default CreateRoomForm;
