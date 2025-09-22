'use client';

import { Box, Spinner, Center } from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setIsOpen(true);
    }
  }, [isLoading, user]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Box>
        <AuthModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={login}
          title="欢迎使用 Rick and Morty 角色浏览器"
        />
        <Center h="100vh" bg="gray.50">
          <Box textAlign="center" color="gray.500">
            请先登录以继续使用应用
          </Box>
        </Center>
      </Box>
    );
  }

  return <>{children}</>;
}
