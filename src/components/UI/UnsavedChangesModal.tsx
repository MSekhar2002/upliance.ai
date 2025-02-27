import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="glassBg" borderColor="whiteAlpha.200" borderWidth="1px">
        <ModalHeader>Unsaved Changes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            You have unsaved changes that will be lost if you reset the form. 
            Are you sure you want to continue?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button variant="glass" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Reset Form
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UnsavedChangesModal;