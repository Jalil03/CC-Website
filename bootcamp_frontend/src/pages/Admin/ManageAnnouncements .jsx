import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaSave, FaTimes , FaBullhorn, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Heading,
  VStack,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Text,
  HStack,
  Icon,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import API from '../../services/api';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null); // 👈 currently editing announcement ID
  const navigate = useNavigate();
  const toast = useToast();

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      toast({
        title: 'Error fetching announcements',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAdd = async () => {
    if (!title.trim() || !message.trim()) return;

    try {
      await API.post('/announcements', { title, message });
      setTitle('');
      setMessage('');
      fetchAnnouncements();
      toast({ title: 'Announcement added', status: 'success', duration: 3000 });
    } catch (err) {
      toast({ title: 'Error adding announcement', status: 'error', duration: 3000 });
    }
  };

  const handleEdit = (announcement) => {
    setEditId(announcement._id);
    setTitle(announcement.title);
    setMessage(announcement.message);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    try {
      await API.put(`/announcements/${editId}`, { title, message });
      toast({ title: 'Announcement updated', status: 'success', duration: 3000 });
      setEditId(null);
      setTitle('');
      setMessage('');
      fetchAnnouncements();
    } catch (err) {
      toast({ title: 'Error updating announcement', status: 'error', duration: 3000 });
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle('');
    setMessage('');
  };

  return (
    <Box minH="100vh" bg="gray.900" color="white" px={6} py={4}>
      <Box mb={4} cursor="pointer" onClick={() => navigate('/admin')}>
        <Button variant="ghost" color="gray.400" leftIcon={<FaArrowLeft />}>
          Back to Overview
        </Button>
      </Box>

      <Heading size="lg" mb={6}>
          <HStack>
            <Icon as={FaBullhorn} color="purple.300" />
            <Text>Manage Announcements</Text>
          </HStack>
        </Heading>

      <VStack spacing={4} mb={10} align="stretch">
        <Input
          placeholder="Title"
          bg="gray.800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Message"
          bg="gray.800"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <HStack>
          {editId ? (
            <>
              <Button colorScheme="green" leftIcon={<FaSave />} onClick={handleUpdate}>
                Save Changes
              </Button>
              <Button colorScheme="red" leftIcon={<FaTimes />} onClick={cancelEdit}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleAdd}
              colorScheme="purple"
              bgGradient="linear(to-r, purple.500, violet.600)"
            >
              Add Announcement
            </Button>
          )}
        </HStack>
      </VStack>

      <Heading size="md" mb={4}>
          <HStack>
            <Icon as={FaFileAlt} />
            <Text>All Announcements</Text>
          </HStack>
        </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {announcements.map((a) => (
          <Box key={a._id} p={5} bg="gray.800" rounded="lg" shadow="md" position="relative">
            <HStack justify="space-between">
              <HStack>
                <Icon as={FaFileAlt} />
                <Text fontWeight="bold" fontSize="lg">{a.title}</Text>
              </HStack>

              <IconButton
                icon={<FaEdit />}
                size="sm"
                variant="ghost"
                color="purple.300"
                onClick={() => handleEdit(a)}
                aria-label="Edit"
              />
            </HStack>
            <Text mt={2}>{a.message}</Text>
            <Text mt={1} fontSize="sm" color="gray.500">
              {new Date(a.date).toLocaleString()}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ManageAnnouncements;
