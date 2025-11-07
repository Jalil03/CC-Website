// AdminNavbar.jsx
import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Button,
  useColorModeValue,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const AdminNavbar = () => {
  const bg = useColorModeValue('gray.900', 'gray.900');
  const navItemColor = useColorModeValue('gray.200', 'gray.300');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box
      bg={bg}
      px={6}
      py={3}
      boxShadow="lg"
      position="sticky"
      top="0"
      zIndex="999"
      borderRadius="2xl"
      mx={{ base: 2, md: 8 }}
      mt={4}
      style={{
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      <Flex alignItems="center">
        <HStack spacing={4}>
          <Image src={Logo} alt="Logo" boxSize="40px" />
          <Text fontSize="lg" fontWeight="bold" color="white">
            Code Crafters Admin
          </Text>
        </HStack>

        <Spacer />

        <HStack spacing={10} display={{ base: 'none', md: 'flex' }}>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin')}>
            Overview
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/students')}>
            Students
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/weeks')}>
            Weeks
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/submissions')}>
            Submissions
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/announcements')}>
            Announcements 
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/tests')}>
            Tests
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/admin/contact')}>
            Inbox
          </Button>
        </HStack>

        <Menu>
          <MenuButton ml={4}>
            <Avatar size="sm" name="Admin" />
          </MenuButton>
          <MenuList bg="gray.800" borderColor="gray.700">
            <MenuItem onClick={handleLogout} color="red.400">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;