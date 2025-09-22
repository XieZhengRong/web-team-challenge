'use client';

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  Button,
  Input,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UserInfo } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userInfo: UserInfo) => void;
  initialData?: UserInfo;
  title?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title = "请输入您的信息"
}: AuthModalProps) {
  const [username, setUsername] = useState(initialData?.username || '');
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
  const [errors, setErrors] = useState<{ username?: string; jobTitle?: string }>({});

  const validateForm = () => {
    const newErrors: { username?: string; jobTitle?: string } = {};

    if (!username.trim()) {
      newErrors.username = '用户名不能为空';
    }

    if (!jobTitle.trim()) {
      newErrors.jobTitle = '职位不能为空';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ username: username.trim(), jobTitle: jobTitle.trim() });
      onClose();
    }
  };

  const handleClose = () => {
    setUsername(initialData?.username || '');
    setJobTitle(initialData?.jobTitle || '');
    setErrors({});
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => e.open ? undefined : handleClose()}>
      <DialogContent>
        <DialogHeader>{title}</DialogHeader>
        {initialData && <DialogCloseTrigger />}
        <DialogBody pb={6}>
          <VStack spacing={4}>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              请提供您的用户名和职位信息以继续使用本应用
            </Text>

            <Box>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入您的用户名"
                borderColor={errors.username ? 'red.500' : 'gray.200'}
                _focus={{
                  borderColor: errors.username ? 'red.500' : 'blue.500',
                  boxShadow: errors.username ? '0 0 0 1px red.500' : '0 0 0 1px blue.500'
                }}
              />
              {errors.username && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.username}
                </Text>
              )}
            </Box>

            <Box>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="请输入您的职位"
                borderColor={errors.jobTitle ? 'red.500' : 'gray.200'}
                _focus={{
                  borderColor: errors.jobTitle ? 'red.500' : 'blue.500',
                  boxShadow: errors.jobTitle ? '0 0 0 1px red.500' : '0 0 0 1px blue.500'
                }}
              />
              {errors.jobTitle && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.jobTitle}
                </Text>
              )}
            </Box>

            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              width="full"
              mt={4}
            >
              {initialData ? '更新信息' : '提交'}
            </Button>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
