import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Alert,
  Text,
  Flex,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

import API from '../services/api';
import Logo from '../assets/logo.png';

// Smooth animated gradient background
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const boxWidth = useBreakpointValue({ base: '90%', md: '420px' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    try {
      const res = await API.post('/students/signup', formData);
      console.log('✅ Signup success:', res.data);
  
      // Don't store anything if backend doesn't return token/user
      navigate('/login'); // or wherever you want
    } catch (err) {
      console.error('Signup error:', err?.response);
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };
  

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      px={4}
      bgGradient="linear(to-br, gray.900, gray.800)"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        w: '100%',
        h: '100%',
        zIndex: 0,
        bgGradient:
          'linear(45deg, #6B46C1, #7F00FF, #1A202C, #553C9A)',
        backgroundSize: '600% 600%',
        animation: `${gradientShift} 30s ease infinite`,
        opacity: 0.05,
      }}
    >
      <Box
        zIndex={1}
        w={boxWidth}
        bg="rgba(33, 33, 45, 0.9)"
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="xl"
        p={6}
        pb={8}
        textAlign="center"
        border="1px solid"
        borderColor="whiteAlpha.100"
      >
        <VStack spacing={1}>
          <Image src={Logo} alt="Logo" boxSize="80px" />
          <Heading
            size="lg"
            bgGradient="linear(to-r, violet.400, purple.500)"
            bgClip="text"
          >
            Create an Account
          </Heading>
        </VStack>

        {error && (
          <Alert
            status="error"
            mt={5}
            borderRadius="md"
            justifyContent="center"
            fontSize="sm"
          >
            <Text>{error}</Text>
          </Alert>
        )}

        <VStack spacing={4} mt={6}>
          <FormControl isRequired>
            <FormLabel color="gray.200">Name</FormLabel>
            <Input
              name="name"
              placeholder="JL"
              value={formData.name}
              onChange={handleChange}
              bg="gray.800"
              color="white"
              borderColor="gray.700"
              _focus={{ borderColor: 'purple.500' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.200">Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
              bg="gray.800"
              color="white"
              borderColor="gray.700"
              _focus={{ borderColor: 'purple.500' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="gray.200">GitHub Username</FormLabel>
            <Input
              name="github"
              placeholder="yourusername"
              value={formData.github}
              onChange={handleChange}
              bg="gray.800"
              color="white"
              borderColor="gray.700"
              _focus={{ borderColor: 'purple.500' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.200">Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              bg="gray.800"
              color="white"
              borderColor="gray.700"
              _focus={{ borderColor: 'purple.500' }}
            />
          </FormControl>

          <Button
  bgGradient="linear(to-r, purple.600, violet.700)"
  color="back"
  fontWeight="bold"
  width="100%"
  onClick={handleRegister}
  transition="all 0.3s ease"
  _hover={{
    bgGradient: 'linear(to-r, violet.50, gray.600)', // Different enough for a visual effect
    transform: 'scale(1.02)',
    boxShadow: 'xxl',
  }}
>
  Sign Up
</Button>


          <Text fontSize="sm" color="gray.400">
            Already have an account?{' '}
            <Button
              variant="link"
              colorScheme="purple"
              onClick={() => navigate('/login')}
              fontWeight="bold"
            >
              Log In
            </Button>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
