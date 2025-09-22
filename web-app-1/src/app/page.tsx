'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useAuth } from '@/hooks/useAuth';
import { UserProfile } from '@/components/UserProfile';
import Link from 'next/link';

export default function Home() {
  const { user, updateUser, logout } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
        <Container maxW="container.xl" py={4}>
          <Flex align="center">
            <Heading size="lg" color="blue.600">
              Rick and Morty 角色浏览器
            </Heading>
            <Spacer />
            {user && (
              <UserProfile
                user={user}
                onUpdate={updateUser}
                onLogout={logout}
              />
            )}
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              欢迎, {user?.username}! 👋
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              探索 Rick and Morty 宇宙中的所有角色
            </Text>
          </Box>

          <HStack spacing={4}>
            <Link href="/characters">
              <Button colorScheme="blue" size="lg">
                浏览角色
              </Button>
            </Link>
            <Link href="/information">
              <Button variant="outline" size="lg">
                信息页面
              </Button>
            </Link>
          </HStack>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="md"
            maxW="md"
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.600">
              这是一个使用 NextJS、TypeScript、ChakraUI 和 Apollo Client 构建的应用程序。
              数据来源于 Rick and Morty GraphQL API。
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        bg="gray.800"
        color="white"
        py={4}
        mt="auto"
      >
        <Container maxW="container.xl">
          <Flex align="center" justify="center">
            <Text fontSize="sm">
              Web Team Challenge v3.5 © 2024
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
