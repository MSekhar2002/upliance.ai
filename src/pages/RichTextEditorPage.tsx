import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';
import Button from '../components/UI/Button';
import { Heading } from '@chakra-ui/react'; // Import Heading from Chakra UI

// Icons (import your preferred icon library)
import { 
  FiSave, 
  FiRefreshCw, 
  FiUsers 
} from 'react-icons/fi';

const PageContainer = styled.div`
  padding: 100px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 90px 16px 40px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  color: #a3aed0;
  font-size: 1.1rem;
  max-width: 800px;
`;

const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 32px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const UserList = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

const UserCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const UserEmail = styled.p`
  color: #a3aed0;
  margin-top: 4px;
  font-size: 14px;
`;

const UserPhone = styled.p`
  color: #a3aed0;
    margin-top: 4px;
  font-size: 14px;
`;

const UserActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const RichTextEditorPage: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [users, setUsers] = useState<Array<{ id: number; name: string; email: string; phone: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch users (mock data for now)
  useEffect(() => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+0987654321' },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '+1122334455' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    alert('Content saved!');
    console.log('Saved Content:', content);
  };

  const handleRefresh = () => {
    setContent('');
    alert('Editor refreshed!');
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Rich Text Editor
        </PageTitle>
        <PageDescription>
          Create and manage rich text content with ease. Use the editor below to compose your content and save it for future use.
        </PageDescription>
      </PageHeader>

      <EditorGrid>
        <RichTextEditor value={content} onChange={setContent} />
      </EditorGrid>

      <ActionButtonsContainer>
        <Button
          onClick={handleSave}
          icon={<FiSave />}
          variant="primary"
        >
          Save Content
        </Button>
        <Button
          onClick={handleRefresh}
          icon={<FiRefreshCw />}
          variant="secondary"
        >
          Refresh Editor
        </Button>
      </ActionButtonsContainer>

      <div>
        <Heading size="md" mb={4} color="gray.300">
          <FiUsers /> User List
        </Heading>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <UserList>
            {users.map((user) => (
              <UserCard key={user.id}>
                <h3>{user.name}</h3>
                <UserEmail>{user.email}</UserEmail>
                <UserPhone>{user.phone}</UserPhone>
                <UserActions>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    Send Message
                  </Button>
                </UserActions>
              </UserCard>
            ))}
          </UserList>
        )}
      </div>
    </PageContainer>
  );
};

export default RichTextEditorPage;