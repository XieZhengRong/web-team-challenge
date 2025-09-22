'use client';

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Divider,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import { Character } from '@/types/graphql';

interface CharacterModalProps {
  character: Character;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive': return 'green';
      case 'Dead': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Alive': return '存活';
      case 'Dead': return '死亡';
      default: return '未知';
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'Male': return '男性';
      case 'Female': return '女性';
      case 'Genderless': return '无性别';
      default: return '未知';
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => e.open ? undefined : onClose()}>
      <DialogContent maxW="4xl" maxH="90vh" overflowY="auto">
        <DialogHeader>
          <Heading size="lg">{character.name}</Heading>
          <DialogCloseTrigger />
        </DialogHeader>
        
        <DialogBody>
          <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
            {/* 左侧：角色图片和基本信息 */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Image
                  src={character.image}
                  alt={character.name}
                  borderRadius="lg"
                  w="full"
                  maxW="300px"
                />
                
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  shadow="sm"
                >
                  <VStack spacing={3} align="stretch">
                    <Box>
                      <Text fontSize="sm" color="gray.600">状态</Text>
                      <Badge colorScheme={getStatusColor(character.status)} size="lg">
                        {getStatusText(character.status)}
                      </Badge>
                    </Box>

                    <Box>
                      <Text fontSize="sm" color="gray.600">物种</Text>
                      <Text fontWeight="medium">{character.species}</Text>
                    </Box>

                    {character.type && (
                      <Box>
                        <Text fontSize="sm" color="gray.600">类型</Text>
                        <Text fontWeight="medium">{character.type}</Text>
                      </Box>
                    )}

                    <Box>
                      <Text fontSize="sm" color="gray.600">性别</Text>
                      <Text fontWeight="medium">{getGenderText(character.gender)}</Text>
                    </Box>

                    <Box>
                      <Text fontSize="sm" color="gray.600">创建时间</Text>
                      <Text fontSize="sm">
                        {new Date(character.created).toLocaleDateString('zh-CN')}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>

            {/* 右侧：详细信息 */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                {/* 来源信息 */}
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  shadow="sm"
                >
                  <VStack spacing={3} align="stretch">
                    <Heading size="md">来源</Heading>
                    <Box>
                      <Text fontWeight="medium">{character.origin.name}</Text>
                      {character.origin.dimension && (
                        <Text fontSize="sm" color="gray.600">
                          维度: {character.origin.dimension}
                        </Text>
                      )}
                    </Box>
                  </VStack>
                </Box>

                {/* 当前位置 */}
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  shadow="sm"
                >
                  <VStack spacing={3} align="stretch">
                    <Heading size="md">当前位置</Heading>
                    <Box>
                      <Text fontWeight="medium">{character.location.name}</Text>
                      {character.location.dimension && (
                        <Text fontSize="sm" color="gray.600">
                          维度: {character.location.dimension}
                        </Text>
                      )}
                    </Box>
                  </VStack>
                </Box>

                {/* 出现剧集 */}
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  shadow="sm"
                >
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md">出现剧集</Heading>
                      <Badge colorScheme="blue">
                        共 {character.episode.length} 集
                      </Badge>
                    </HStack>

                    <Box maxH="300px" overflowY="auto">
                      <VStack spacing={2} align="stretch">
                        {character.episode.slice(0, 10).map((episode) => (
                          <Box
                            key={episode.id}
                            p={3}
                            bg="gray.50"
                            borderRadius="md"
                            borderLeft="4px solid"
                            borderLeftColor="blue.500"
                          >
                            <Text fontWeight="medium" fontSize="sm">
                              {episode.episode} - {episode.name}
                            </Text>
                          </Box>
                        ))}

                        {character.episode.length > 10 && (
                          <Text fontSize="sm" color="gray.600" textAlign="center">
                            还有 {character.episode.length - 10} 集未显示...
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
