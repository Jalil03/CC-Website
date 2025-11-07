import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Avatar,
  Heading,
  Text,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { FaArrowLeft, FaCamera, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ name: '', email: '', avatar: '' });
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAdmin(user);
      setNewName(user.name || '');
      setAvatarPreview(user.avatar || '');
    }
  }, []);

  // 🖼️ Preview the uploaded image
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 💾 Save profile changes
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      // ✅ Update name & avatar first
      const updateRes = await API.patch(
        '/students/update-profile',
        { name: newName, avatar: avatarPreview },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update password if filled
      if (newPassword.trim() !== '') {
        await API.patch(
          '/students/reset-password',
          { email: admin.email, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const updated = updateRes.data.student;
      localStorage.setItem('user', JSON.stringify(updated));
      setAdmin(updated);

      toast({
        title: 'Profile updated successfully 🎉',
        status: 'success',
        duration: 3000,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Failed to update profile',
        description: err.response?.data?.error || 'Server error',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box minH="100vh" bg="gray.900" color="white" py={10} px={6}>
      <Button
        leftIcon={<FaArrowLeft />}
        variant="ghost"
        color="gray.400"
        mb={6}
        onClick={() => navigate('/admin')}
      >
        Back to Dashboard
      </Button>

      <Box
        as={motion.div}
        maxW="500px"
        mx="auto"
        p={8}
        bg="rgba(30, 30, 50, 0.7)"
        backdropFilter="blur(15px)"
        rounded="2xl"
        boxShadow="0 0 30px rgba(128,0,255,0.2)"
        textAlign="center"
        whileHover={{ scale: 1.02 }}
      >
        <Heading size="lg" color="purple.300" mb={4}>
          👑 Admin Profile
        </Heading>
        <Text color="gray.400" mb={6}>
          Manage your name, password and profile picture.
        </Text>

        {/* Avatar Upload */}
        <Box position="relative" display="inline-block">
          <Avatar
            size="2xl"
            src={avatarPreview || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
            name={admin.name}
            border="3px solid #9F7AEA"
            mb={4}
          />
          <IconButton
            as="label"
            htmlFor="avatar-upload"
            icon={<FaCamera />}
            colorScheme="purple"
            size="sm"
            position="absolute"
            bottom={2}
            right={2}
            rounded="full"
            cursor="pointer"
          />
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            display="none"
            onChange={handleAvatarChange}
          />
        </Box>

        <VStack spacing={4} mt={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              bg="gray.800"
              _hover={{ borderColor: 'purple.400' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email (read only)</FormLabel>
            <Input value={admin.email} isReadOnly bg="gray.800" />
          </FormControl>

          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              bg="gray.800"
              _hover={{ borderColor: 'purple.400' }}
            />
          </FormControl>

          <Button
            leftIcon={<FaSave />}
            colorScheme="purple"
            size="lg"
            w="full"
            mt={4}
            onClick={handleSave}
            _hover={{ transform: 'scale(1.02)' }}
          >
            Save Changes
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminProfile;
