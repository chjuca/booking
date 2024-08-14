import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  error: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, message, error }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{error ? 'Error' : 'Success'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={error ? 'red' : 'green'} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
