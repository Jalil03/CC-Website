import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import API from '../services/api'; // your backend helper

const ContactForm = () => {
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const toast = useToast();

  const handleSendEmail = async () => {
    if (!senderEmail || !message) {
      toast({
        title: 'Missing fields.',
        description: 'Please fill in all fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSending(true);
      const res = await API.post('/contact', { senderEmail, message });

      toast({
        title: 'Email sent.',
        description: res.data?.msg || 'We’ll get back to you shortly.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setSenderEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error sending message.',
        description: err.response?.data?.msg || 'Try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      bg="gray.800"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.700"
      w="full"
      maxW="500px"
      mx="auto"
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel color="gray.300">Your Email</FormLabel>
          <Input
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="you@example.com"
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color="gray.300">Message</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            bg="gray.700"
            color="white"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>

        <Button
          colorScheme="purple"
          w="full"
          onClick={handleSendEmail}
          isLoading={sending}
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  );
};

export default ContactForm;
