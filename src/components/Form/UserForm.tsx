import React, { useState, useEffect } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Text,
  Flex,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, UserData } from '../../store/userSlice';
import { RootState } from '../../store/store';
import useUnsavedChanges from '../../hooks/useUnsavedChanges';
import UnsavedChangesModal from '../UI/UnsavedChangesModal';
import Button from '../UI/Button';

interface UserFormProps {
  onSuccess?: () => void;
}

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const UserForm: React.FC<UserFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    getValues,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
    },
  });

  // Initialize the unsaved changes hook
  const { hasUnsavedChanges, setHasUnsavedChanges } = useUnsavedChanges(isDirty);

  // Reset form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('email', currentUser.email);
      setValue('phone', currentUser.phone);
      setValue('address', currentUser.address);
      setHasUnsavedChanges(false);
    }
  }, [currentUser, setValue, setHasUnsavedChanges]);

  // Show warning if user tries to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Update the unsaved changes state when form state changes
  useEffect(() => {
    setHasUnsavedChanges(isDirty);
  }, [isDirty, setHasUnsavedChanges]);

  const onSubmit = (data: FormInputs) => {
    if (currentUser) {
      dispatch(
        updateUser({
          ...currentUser,
          ...data,
        })
      );
    } else {
      dispatch(addUser(data));
    }
    
    setHasUnsavedChanges(false);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    if (hasUnsavedChanges) {
      onOpen();
    } else {
      reset();
    }
  };

  const confirmReset = () => {
    reset();
    setHasUnsavedChanges(false);
    onClose();
  };

  return (
    <>
      <UnsavedChangesModal 
        isOpen={isOpen} 
        onClose={onClose} 
        onConfirm={confirmReset} 
      />
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={18} align="stretch">
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="lg">
              {currentUser ? 'Edit Profile' : 'Create Profile'}
            </Text>
            {currentUser && (
              <Text fontSize="sm" color="gray.400">
                ID: {currentUser.id}
              </Text>
            )}
          </Flex>

          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              p={4}
              placeholder="John Doe"
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              _hover={{ borderColor: 'brand.300' }}
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              p={4}
              placeholder="john.doe@example.com"
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              _hover={{ borderColor: 'brand.300' }}
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone} isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9+\-\s()]{7,15}$/,
                  message: 'Invalid phone number',
                },
              })}
              p={4}
              placeholder="+1 (555) 123-4567"
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              _hover={{ borderColor: 'brand.300' }}
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.address} isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 5, message: 'Address must be at least 5 characters' },
              })}
              p={4}
              placeholder="123 Main St, City, Country"
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.300"
              _hover={{ borderColor: 'brand.300' }}
              _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
            />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>

          <HStack spacing={4} justify="flex-end" pt={4}>
            <Button
              variant="danger"
              onClick={handleReset}
              isDisabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              loadingText="Saving"
              isDisabled={!isDirty}
            >
              {currentUser ? 'Update Profile' : 'Save Profile'}
            </Button>
          </HStack>

          {hasUnsavedChanges && (
            <Box mt={2} p={2} bg="yellow.800" borderRadius="md">
              <Text fontSize="sm" color="yellow.100">
                You have unsaved changes. Please save or reset the form.
              </Text>
            </Box>
          )}
        </VStack>
      </form>
    </>
  );
};

export default UserForm;