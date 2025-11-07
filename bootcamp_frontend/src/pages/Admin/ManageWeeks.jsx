import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Textarea,
  Text,
  useToast,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FilePlusIcon } from 'lucide-react';
import API from '../../services/api';

const ManageWeeks = () => {
  const [weeks, setWeeks] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    weekNumber: '',
    title: '',
    githubTemplate: '',
    pdfUrl: '',
    objectives: '',
    lessons: '',
    exercises: '',
    miniProject: '',
  });

  const fetchWeeks = async () => {
    try {
      const res = await API.get('/weeks/all');
      setWeeks(res.data);
    } catch (error) {
      console.error('Fetch weeks error:', error);
    }
  };

  useEffect(() => {
    fetchWeeks();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddWeek = async () => {
    try {
      await API.post('/weeks', {
        weekNumber: parseInt(formData.weekNumber),
        title: formData.title,
        githubTemplate: formData.githubTemplate,
        pdfUrl: formData.pdfUrl,
        content: {
          objectives: formData.objectives.split(','),
          lessons: formData.lessons.split(','),
          exercises: formData.exercises.split(','),
          miniProject: formData.miniProject,
        },
      });

      toast({ title: 'Week added successfully!', status: 'success', duration: 3000, isClosable: true });

      setFormData({
        weekNumber: '',
        title: '',
        githubTemplate: '',
        pdfUrl: '',
        objectives: '',
        lessons: '',
        exercises: '',
        miniProject: '',
      });

      fetchWeeks();
    } catch (error) {
      toast({ title: 'Error adding week.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      return toast({ title: 'Please upload a valid PDF.', status: 'warning', duration: 3000 });
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await API.post('/upload', formData); // Make sure this route exists
      setFormData(prev => ({ ...prev, pdfUrl: res.data.url }));

      toast({ title: 'PDF uploaded!', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: 'Failed to upload PDF.', status: 'error', duration: 3000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt={10} p={6} bg="gray.800" rounded="md">
      <Box mb={4} cursor="pointer" onClick={() => navigate('/admin')}>
        <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
          Back to Overview
        </Button>
      </Box>

      <Flex align="center" mb={4}>
        <Icon as={FilePlusIcon} color="purple.300" boxSize={5} mr={2} />
        <Heading size="md">Add New Week</Heading>
      </Flex>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Week Number</FormLabel>
          <Input name="weekNumber" value={formData.weekNumber} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>GitHub Template</FormLabel>
          <Input name="githubTemplate" value={formData.githubTemplate} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Upload PDF</FormLabel>
          <Box
            border="2px dashed"
            borderColor="gray.600"
            p={4}
            rounded="md"
            textAlign="center"
            cursor="pointer"
            _hover={{ borderColor: 'purple.400' }}
          >
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              opacity={0}
              position="absolute"
              zIndex={-1}
              id="pdfUpload"
            />
            <label htmlFor="pdfUpload">
              <Text color="gray.400" cursor="pointer">
                {uploading ? 'Uploading...' : formData.pdfUrl ? 'PDF Uploaded ✅' : 'Click or drag to upload PDF'}
              </Text>
            </label>
          </Box>
        </FormControl>

        <FormControl>
          <FormLabel>Objectives (comma-separated)</FormLabel>
          <Input name="objectives" value={formData.objectives} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Lessons (comma-separated)</FormLabel>
          <Input name="lessons" value={formData.lessons} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Exercises (comma-separated)</FormLabel>
          <Input name="exercises" value={formData.exercises} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Mini Project</FormLabel>
          <Textarea name="miniProject" value={formData.miniProject} onChange={handleChange} />
        </FormControl>

        <Button onClick={handleAddWeek} colorScheme="purple" width="full" isLoading={uploading}>
          Add Week
        </Button>
      </VStack>

      <Box mt={10}>
        <Heading size="sm" color="purple.300" mb={2}>
          All Weeks
        </Heading>
        {weeks.map((week) => (
          <Box key={week._id} bg="gray.700" p={4} rounded="md" mt={2}>
            <Text fontWeight="bold">Week {week.weekNumber}: {week.title}</Text>
            <Text fontSize="sm">Objectives: {week.content?.objectives?.join(', ')}</Text>
            <Text fontSize="xs" color="blue.300">GitHub: {week.githubTemplate}</Text>
            {week.pdfUrl && (
              <Text fontSize="xs" color="green.300">
                PDF: <a href={week.pdfUrl} target="_blank" rel="noreferrer">{week.pdfUrl}</a>
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ManageWeeks;
