// src/pages/UserFormPage.tsx
import React from 'react';
import { Container, useToast } from '@chakra-ui/react';
import UserForm from '../components/Form/UserForm';
import Card from '../components/UI/Card';

const UserFormPage: React.FC = () => {
  const toast = useToast();

  const handleSuccess = () => {
    toast({
      title: 'User data saved',
      description: 'Your profile information has been successfully saved.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Container maxW="container.md" py={68}>
      <h1  style={{textAlign: 'center', marginBottom: '20px'}}>
        User Profile
      </h1>
      <Card 
        variant="glass"
        title="User Information" 
        subtitle="Manage your personal details"
        animate
      >
        <UserForm onSuccess={handleSuccess} />
      </Card>
    </Container>
  );
};

export default UserFormPage;