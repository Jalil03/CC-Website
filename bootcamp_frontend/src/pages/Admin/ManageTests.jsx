import React, { useEffect, useState } from 'react';
import { FaFlask } from 'react-icons/fa';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  useToast,
  Text,
  Select,
  Textarea,
  HStack,
  Icon
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const ManageTests = () => {
  const [tests, setTests] = useState([]);
  const [form, setForm] = useState({
    weekNumber: '',
    question: '',
    correctAnswer: '',
    questionType: 'short_answer',
    choices: ''
  });
  const navigate = useNavigate();
  const toast = useToast();

  const fetchTests = async () => {
    try {
      const res = await API.get('/tests');
      setTests(res.data);
    } catch (err) {
      toast({ title: 'Failed to fetch tests', status: 'error' });
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTest = async () => {
    try {
      const payload = {
        ...form,
        weekNumber: parseInt(form.weekNumber), // ⬅️ this is the key line
      };
  
      if (form.questionType === 'multiple_choice') {
        payload.choices = form.choices.split(',').map(c => c.trim());
      } else {
        delete payload.choices;
      }
  
      await API.post('/tests', payload);
      toast({ title: 'Test added!', status: 'success' });
  
      setForm({
        weekNumber: '',
        question: '',
        correctAnswer: '',
        questionType: 'short_answer',
        choices: ''
      });
  
      fetchTests();
    } catch (err) {
      toast({ title: 'Failed to add test', status: 'error' });
    }
  };
  
  // New function to delete a test by its ID
  const handleDeleteTest = async (testId) => {
    try {
      await API.delete(`/tests/${testId}`);
      toast({ title: 'Test deleted!', status: 'success' });
      // Refresh the tests list after deletion
      fetchTests();
    } catch (err) {
      toast({ title: 'Failed to delete test', status: 'error' });
    }
  };

  return (
    <Box minH="100vh" bg="gray.900" color="white" px={6} py={4}>
      <Box mb={4} onClick={() => navigate('/admin')}>
        <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
          Back to Overview
        </Button>
      </Box>

      <Heading size="lg" mb={6}>
  <HStack spacing={2}>
    <Icon as={FaFlask} boxSize={5} color="purple.300" />
    <Text>Manage Tests</Text>
  </HStack>
</Heading>


      <VStack spacing={4} mb={10}>
        <FormControl isRequired>
          <FormLabel>Week Number</FormLabel>
          <Input name="weekNumber" value={form.weekNumber} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Question</FormLabel>
          <Textarea name="question" value={form.question} onChange={handleChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Question Type</FormLabel>
          <Select name="questionType" value={form.questionType} onChange={handleChange}>
            <option value="short_answer">Short Answer</option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="code_html">HTML Code</option>
            <option value="code_js">JS Code</option>
            <option value="code_css">CSS Code</option>
          </Select>
        </FormControl>

        {form.questionType === 'multiple_choice' && (
          <FormControl>
            <FormLabel>Choices (comma-separated)</FormLabel>
            <Input name="choices" value={form.choices} onChange={handleChange} />
          </FormControl>
        )}

        <FormControl isRequired>
          <FormLabel>Correct Answer</FormLabel>
          <Input name="correctAnswer" value={form.correctAnswer} onChange={handleChange} />
        </FormControl>

        <Button colorScheme="purple" onClick={handleAddTest}>Add Test</Button>
      </VStack>

      <Heading size="md" mb={4}>📋 All Tests</Heading>
      <VStack spacing={3} align="stretch">
        {tests.map((test) => (
          <Box key={test._id} p={4} bg="gray.800" rounded="md">
            <HStack justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">Week {test.weekNumber}</Text>
                <Text>Q: {test.question}</Text>
                <Text>Type: {test.questionType}</Text>
                {test.choices?.length > 0 && (
                  <Text>Choices: {test.choices.join(', ')}</Text>
                )}
                <Text color="green.300">Answer: {test.correctAnswer}</Text>
              </Box>
              <Button 
                colorScheme="red" 
                onClick={() => handleDeleteTest(test._id)}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ManageTests;
