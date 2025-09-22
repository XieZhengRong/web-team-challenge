'use client';

import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UserInfo } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';

interface UserProfileProps {
  user: UserInfo;
  onUpdate: (userInfo: UserInfo) => void;
  onLogout: () => void;
}

export function UserProfile({ user, onUpdate, onLogout }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box 
        bg="white" 
        p={4} 
        borderRadius="md" 
        shadow="sm" 
        border="1px" 
        borderColor="gray.200"
      >
        <VStack align="start" spacing={3}>
          <Text fontSize="lg" fontWeight="semibold">
            用户信息
          </Text>
          
          <HStack>
            <Text fontWeight="medium">用户名:</Text>
            <Badge colorScheme="blue" variant="subtle">
              {user.username}
            </Badge>
          </HStack>
          
          <HStack>
            <Text fontWeight="medium">职位:</Text>
            <Badge colorScheme="green" variant="subtle">
              {user.jobTitle}
            </Badge>
          </HStack>
          
          <HStack spacing={2} pt={2}>
            <Button size="sm" colorScheme="blue" onClick={() => setIsOpen(true)}>
              编辑信息
            </Button>
            <Button size="sm" variant="outline" onClick={onLogout}>
              退出登录
            </Button>
          </HStack>
        </VStack>
      </Box>

      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={onUpdate}
        initialData={user}
        title="编辑用户信息"
      />
    </>
  );
}
