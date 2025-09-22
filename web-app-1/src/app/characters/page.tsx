'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Input,
  Select,
  Grid,
  Card,
  Image,
  Badge,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { GET_CHARACTERS } from '@/graphql/queries';
import { CharactersResponse, GetCharactersVariables, FilterCharacter } from '@/types/graphql';

export default function CharactersPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterCharacter>({});
  const [searchName, setSearchName] = useState('');

  const { loading, error, data } = useQuery<CharactersResponse, GetCharactersVariables>(
    GET_CHARACTERS,
    {
      variables: { page, filter },
      errorPolicy: 'all',
    }
  );

  const handleSearch = () => {
    setFilter({ ...filter, name: searchName });
    setPage(1);
  };

  const handleFilterChange = (key: keyof FilterCharacter, value: string) => {
    const newFilter = { ...filter };
    if (value === '') {
      delete newFilter[key];
    } else {
      newFilter[key] = value;
    }
    setFilter(newFilter);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading && !data) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>加载角色数据中...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Text color="red.500" fontSize="lg">
            加载失败: {error.message}
          </Text>
          <Button onClick={() => window.location.reload()}>重试</Button>
        </VStack>
      </Center>
    );
  }

  const characters = data?.characters.results || [];
  const info = data?.characters.info;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>
            Rick and Morty 角色
          </Heading>
          <Text color="gray.600">
            浏览所有 Rick and Morty 宇宙中的角色
          </Text>
        </Box>

        {/* 搜索和过滤器 */}
        <Box p={6} bg="gray.50" borderRadius="lg">
          <VStack spacing={4}>
            <HStack w="full" spacing={4}>
              <Input
                placeholder="搜索角色名称..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button colorScheme="blue" onClick={handleSearch}>
                搜索
              </Button>
            </HStack>

            <HStack w="full" spacing={4}>
              <Select
                placeholder="状态"
                value={filter.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="Alive">存活</option>
                <option value="Dead">死亡</option>
                <option value="unknown">未知</option>
              </Select>

              <Select
                placeholder="性别"
                value={filter.gender || ''}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="Male">男性</option>
                <option value="Female">女性</option>
                <option value="Genderless">无性别</option>
                <option value="unknown">未知</option>
              </Select>

              <Input
                placeholder="物种"
                value={filter.species || ''}
                onChange={(e) => handleFilterChange('species', e.target.value)}
              />
            </HStack>
          </VStack>
        </Box>

        {/* 角色网格 */}
        {loading ? (
          <Center py={8}>
            <Spinner size="lg" color="blue.500" />
          </Center>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            {characters.map((character) => (
              <Card key={character.id} p={4} cursor="pointer" _hover={{ shadow: 'lg' }}>
                <VStack spacing={4}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    borderRadius="lg"
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />
                  
                  <VStack spacing={2} align="center">
                    <Heading size="md" textAlign="center">
                      {character.name}
                    </Heading>
                    
                    <HStack spacing={2}>
                      <Badge
                        colorScheme={
                          character.status === 'Alive' ? 'green' :
                          character.status === 'Dead' ? 'red' : 'gray'
                        }
                      >
                        {character.status === 'Alive' ? '存活' :
                         character.status === 'Dead' ? '死亡' : '未知'}
                      </Badge>
                      
                      <Badge colorScheme="blue">
                        {character.species}
                      </Badge>
                    </HStack>

                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      来源: {character.origin.name}
                    </Text>
                    
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      位置: {character.location.name}
                    </Text>
                  </VStack>
                </VStack>
              </Card>
            ))}
          </Grid>
        )}

        {/* 分页 */}
        {info && (
          <HStack justify="center" spacing={4}>
            <Button
              isDisabled={!info.prev}
              onClick={() => handlePageChange(page - 1)}
            >
              上一页
            </Button>
            
            <Text>
              第 {page} 页，共 {info.pages} 页
            </Text>
            
            <Button
              isDisabled={!info.next}
              onClick={() => handlePageChange(page + 1)}
            >
              下一页
            </Button>
          </HStack>
        )}
      </VStack>
    </Container>
  );
}
