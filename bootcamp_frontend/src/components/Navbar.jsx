import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Button,
  useColorModeValue,
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

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored && stored !== 'undefined' ? JSON.parse(stored) : {};
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return {};
    }
  });
  
  const navItemColor = useColorModeValue('gray.100', 'gray.300');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box
      px={6}
      py={3}
      position="sticky"
      top="0"
      zIndex="999"
      w="full"
      bg="rgba(26, 32, 44, 0.6)"
      backdropFilter="blur(12px)"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      borderBottom="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="2xl"
      mx="auto"
      maxW="1400px"
      mt={4}
      border="1px solid rgba(255,255,255,0.08)"
    >
      <Flex alignItems="center" justify="space-between">
        {/* Left - Logo */}
        <HStack spacing={3}>
          <Image src={Logo} alt="Logo" boxSize="40px" borderRadius="full" />
          <Text fontWeight="bold" fontSize="lg" color="white">
            Code Crafters
          </Text>
        </HStack>

        {/* Center nav (desktop) */}
        <HStack spacing={20} display={{ base: 'none', md: 'flex' }}>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/home')}>
            Home
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/weeks')}>
            Weeks
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/tests')}>
            Tests
          </Button>
          <Button variant="ghost" color={navItemColor} _hover={{ color: 'purple.400' }} onClick={() => navigate('/announcements')}>
            Announcements
          </Button>
          <Button
              variant="ghost"
              size="sm"
              color="gray.100"
              _hover={{ color: 'purple.400' }}
              onClick={() => navigate('/submit')}
            >
              Submit Project
            </Button>

        </HStack>

        {/* Right - Avatar + Hamburger (mobile) */}
        <HStack spacing={2}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              display={{ base: 'flex', md: 'none' }}
              variant="ghost"
              colorScheme="whiteAlpha"
            />
            <MenuList bg="gray.800" borderColor="gray.600">
              <MenuItem bg="gray.800" color="white" onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem bg="gray.800" color="white" onClick={() => navigate('/weeks')}>Weeks</MenuItem>
              <MenuItem bg="gray.800" color="white" onClick={() => navigate('/tests')}>Tests</MenuItem>
              <MenuItem bg="gray.800" color="white" onClick={() => navigate('/announcements')}>Announcements</MenuItem>
              <MenuItem bg="gray.800" color="white" onClick={() => navigate('/submit')}>Submit Project</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton>
            <Avatar size="sm" name={user?.name || 'Student'} />
            </MenuButton>
            <MenuList bg="gray.800" borderColor="gray.600">
              <MenuItem bg="gray.800" color="gray.200" onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem bg="gray.800" color="red.400" onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
