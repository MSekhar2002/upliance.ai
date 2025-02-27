import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Divider, 
  InputGroup, 
  InputRightElement, 
  IconButton 
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import { useAuth } from '../../context/AuthContext';

const AnimatedBox = animated(Box);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, googleSignIn } = useAuth();
  const toast = useToast();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Animation properties
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      const success = await googleSignIn();
      
      if (success) {
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({
        title: 'Google Sign In Error',
        description: 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  
  return (
    <AnimatedBox style={fadeIn} maxW="md" mx="auto" mt={10}>
      <Box className="glass" p={8} borderRadius="xl" boxShadow="2xl">
        <VStack spacing={6}>
          <Heading className="gradient-text">Welcome Back</Heading>
          <Text color="gray.300">Sign in to continue to the dashboard</Text>
          
          <Button
            leftIcon={<FaGoogle />}
            onClick={handleGoogleSignIn}
            isLoading={loading}
            w="full"
            h="50px"
            variant="glass"
            className="transition-all"
          >
            Sign in with Google
          </Button>
          
          <HStack w="full">
            <Divider />
            <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">or sign in with email</Text>
            <Divider />
          </HStack>
          
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <VStack spacing={4} align="flex-start" w="full">
              <FormControl isRequired>
                <FormLabel color="gray.300">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="whiteAlpha.50"
                  borderColor="whiteAlpha.200"
                  _hover={{ borderColor: 'whiteAlpha.300' }}
                  _focus={{ borderColor: 'brand.300', boxShadow: '0 0 0 1px var(--chakra-colors-brand-300)' }}
                  size="lg"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel color="gray.300">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="whiteAlpha.50"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ borderColor: 'brand.300', boxShadow: '0 0 0 1px var(--chakra-colors-brand-300)' }}
                    size="lg"
                  />
                  <InputRightElement h="full">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      colorScheme="whiteAlpha"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Button
                type="submit"
                variant="gradient"
                w="full"
                h="50px"
                isLoading={loading}
                className="transition-all"
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </AnimatedBox>
  );
};

export default Login;