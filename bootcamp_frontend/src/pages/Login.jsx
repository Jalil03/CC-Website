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
  InputGroup,
  InputRightElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import Logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');



  const handleForgotPassword = async () => {
  if (!forgotEmail) return;

  try {
    await API.post('/students/forgot-password', { email: forgotEmail });
    alert('Reset link sent! Check your email.');
    setShowForgot(false);
    setForgotEmail('');
  } catch (err) {
    console.error('Forgot Password Error:', err);
    alert('Failed to send reset link.');
  }
};

  const handleLogin = async () => {
    try {
      const res = await API.post('/students/login', { email, password });
      const { token, student: user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      user.isAdmin ? navigate('/admin') : navigate('/home');
    } catch (err) {
        console.error('Login Error:', err);
        setError(err.response?.data?.msg || 'Login failed');
      }
      
  };

  const boxWidth = useBreakpointValue({ base: '90%', sm: '400px' });

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-br, #1a1a2e, #302b63, #24243e)"
      px={4}
    >
      <Box
        w={boxWidth}
        bg="gray.900"
        p={8}
        boxShadow="2xl"
        borderRadius="2xl"
        textAlign="center"
        border="1px solid #4c4c6d"
      >
        <VStack spacing={4}>
          <Image src={Logo} alt="Logo" boxSize="70px" />
          <Heading size="lg" color="purple.300">
            Welcome Back
          </Heading>
        </VStack>

        {error && (
          <Alert
            status="error"
            mt={6}
            borderRadius="md"
            justifyContent="center"
            bg="red.500"
            color="white"
          >
            <Text fontWeight="medium">{error}</Text>
          </Alert>
        )}

        <VStack spacing={5} mt={8}>
          <FormControl isRequired>
            <FormLabel color="gray.300">Email</FormLabel>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.800"
              color="white"
              _placeholder={{ color: 'gray.500' }}
              focusBorderColor="purple.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.300">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.800"
                color="white"
                _placeholder={{ color: 'gray.500' }}
                focusBorderColor="purple.400"
              />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  size="sm"
                  color="gray.300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
              Forgot password? Contact the admin to reset it from the database.
            </Text>
          </FormControl>

          <Button
            bgGradient="linear(to-r, purple.500, violet.600)"
            color="black"
            width="100%"
            _hover={{ bgGradient: 'linear(to-r, purple.600, violet.700)' }}
            onClick={handleLogin}
          >
            Log In
          </Button>

          <Text fontSize="sm" color="gray.400">
            Don't have an account?{' '}
            <Button
              variant="link"
              color="purple.300"
              onClick={() => navigate('/register')}
              fontWeight="bold"
            >
              Sign Up
            </Button>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
