import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Checkbox,
  Spinner,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const ManageStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // ✅ Fetch all students (admin only)
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/students', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error loading students',
        description: err.response?.data?.error || 'Internal server error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Handle form input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Add a new student and optionally promote them
  const handleAddStudent = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      return toast({
        title: 'Please fill in all fields',
        status: 'warning',
        duration: 2500,
        isClosable: true,
      });
    }

    try {
      const res = await API.post('/students/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const newStudentId = res.data._id;
      if (!newStudentId) throw new Error('Student ID not returned.');

      // ✅ Promote to admin if checkbox checked
      if (formData.isAdmin) {
        const token = localStorage.getItem('token');
        await API.patch(`/students/${newStudentId}/promote`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      toast({
        title: 'Student added successfully 🎉',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({ name: '', email: '', password: '', isAdmin: false });
      fetchStudents();
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      toast({
        title: 'Error adding student',
        description: err.response?.data?.error || 'Internal server error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // ✅ While loading students
  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" color="purple.400" />
        <Text mt={3} color="gray.300">
          Loading students...
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="700px" mx="auto" mt={10} p={6} bg="gray.800" rounded="md" color="white">
      {/* Back Button */}
      <Box mb={4} cursor="pointer" onClick={() => navigate('/admin')}>
        <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
          Back to Overview
        </Button>
      </Box>

      {/* Add Student Form */}
      <Heading size="md" mb={4}>
        👨‍🎓 Add New Student
      </Heading>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            bg="gray.700"
            _hover={{ borderColor: 'purple.400' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            bg="gray.700"
            _hover={{ borderColor: 'purple.400' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            bg="gray.700"
            _hover={{ borderColor: 'purple.400' }}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <Checkbox
            isChecked={formData.isAdmin}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isAdmin: e.target.checked }))
            }
          >
            Make Admin?
          </Checkbox>
        </FormControl>

        <Button
          onClick={handleAddStudent}
          colorScheme="purple"
          width="full"
          size="lg"
          mt={2}
          _hover={{ transform: 'scale(1.02)' }}
        >
          Add Student
        </Button>
      </VStack>

      {/* Student List */}
      <Box mt={10}>
        <Heading size="sm" mb={3}>
          📋 All Students
        </Heading>

        {students.length === 0 ? (
          <Text color="gray.400">No students found.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {students.map((student) => (
              <Box
                key={student._id}
                bg="gray.700"
                p={4}
                rounded="md"
                cursor="pointer"
                onClick={() => navigate(`/admin/students/${student._id}`)} // ✅ Go to details
                _hover={{ bg: 'purple.700', transform: 'scale(1.03)', transition: '0.2s' }}
              >
                <Text fontWeight="bold" mb={1}>
                  {student.name}
                </Text>
                <Text fontSize="sm" mb={1}>
                  {student.email}
                </Text>
                <Text fontSize="xs" color={student.isAdmin ? 'yellow.400' : 'gray.400'}>
                  {student.isAdmin ? 'Admin' : 'Student'}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default ManageStudents;
