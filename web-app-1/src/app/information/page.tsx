'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Input,
  Badge,
  Image,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { GET_CHARACTERS } from '@/graphql/queries';
import { CharactersResponse, GetCharactersVariables, Character } from '@/types/graphql';
import { CharacterModal } from '@/components/CharacterModal';

export default function InformationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // 从 URL 参数读取页码
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  const { loading, error, data } = useQuery<CharactersResponse, GetCharactersVariables>(
    GET_CHARACTERS,
    {
      variables: { 
        page, 
        filter: searchName ? { name: searchName } : undefined 
      },
      errorPolicy: 'all',
    }
  );

  const handleSearch = () => {
    setPage(1);
    updateURL(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL(newPage);
  };

  const updateURL = (newPage: number) => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    router.push(`/information?${params.toString()}`);
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsOpen(true);
  };

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

  if (loading && !data) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>加载角色信息中...</Text>
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
            角色信息表
          </Heading>
          <Text color="gray.600">
            详细的角色信息列表，点击行查看更多详情
          </Text>
        </Box>

        {/* 搜索栏 */}
        <HStack spacing={4}>
          <Input
            placeholder="搜索角色名称..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            maxW="400px"
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            搜索
          </Button>
        </HStack>

        {/* 角色表格 */}
        <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f7fafc' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>头像</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>姓名</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>状态</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>物种</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>性别</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>来源</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>当前位置</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>剧集数量</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr
                  key={character.id}
                  style={{
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleCharacterClick(character)}
                >
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    <Image
                      src={character.image}
                      alt={character.name}
                      w="50px"
                      h="50px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontWeight: 'medium' }}>{character.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    <Badge colorScheme={getStatusColor(character.status)}>
                      {getStatusText(character.status)}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{character.species}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    {character.gender === 'Male' ? '男性' :
                     character.gender === 'Female' ? '女性' :
                     character.gender === 'Genderless' ? '无性别' : '未知'}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{character.origin.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{character.location.name}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{character.episode.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>

        {/* 分页控件 */}
        {info && (
          <HStack justify="center" spacing={4}>
            <Button
              isDisabled={!info.prev}
              onClick={() => handlePageChange(page - 1)}
            >
              上一页
            </Button>
            
            <Text>
              第 {page} 页，共 {info.pages} 页 (总计 {info.count} 个角色)
            </Text>
            
            <Button
              isDisabled={!info.next}
              onClick={() => handlePageChange(page + 1)}
            >
              下一页
            </Button>
          </HStack>
        )}

        {/* 角色详情模态框 */}
        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </VStack>
    </Container>
  );
}
