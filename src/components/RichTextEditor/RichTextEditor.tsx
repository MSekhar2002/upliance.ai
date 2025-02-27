import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  IconButton,
  Tooltip,
  Select,
  Button
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { Divider } from '@chakra-ui/react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaLink,
  FaUndo,
  FaRedo,
  FaHeading,
  FaSave,
} from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

const AnimatedBox = animated(Box);

interface EditorCommand {
  command: string;
  value?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [content, setContent] = useState<string>(value || '');
  const [isEmpty, setIsEmpty] = useState<boolean>(!content);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '+1234567890',
      address: '123 Main St',
      createdAt: new Date().toISOString()
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      phone: '+0987654321',
      address: '456 Elm St',
      createdAt: new Date().toISOString()
    }
  ]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const toast = useToast();
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });
  
  // Handle changes from the editable div
  const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = (e.target as HTMLDivElement).innerHTML;
    setContent(newContent);
    setIsEmpty(newContent === '');
    onChange(newContent);
  };
  
  // Sync our local content with the parent component's value
  useEffect(() => {
    setContent(value);
    setIsEmpty(!value);
    
    // Update the editable div's content when the value prop changes
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);
  
  // Load saved content from localStorage on initial mount
  useEffect(() => {
    const savedContent = localStorage.getItem('richTextContent');
    if (savedContent && !value) {  // Only use localStorage if no value is provided
      setContent(savedContent);
      setIsEmpty(savedContent === '');
      onChange(savedContent);
    }
  }, []);
  
  // Set user profile content when a user is selected
  useEffect(() => {
    if (currentUser) {
      const userContent = `
        <h1>User Profile</h1>
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Phone:</strong> ${currentUser.phone}</p>
        <p><strong>Address:</strong> ${currentUser.address}</p>
        <p><strong>ID:</strong> ${currentUser.id}</p>
        <p><strong>Created:</strong> ${new Date(currentUser.createdAt).toLocaleString()}</p>
      `;
      setContent(userContent);
      setIsEmpty(false);
      onChange(userContent);
    }
  }, [currentUser, onChange]);
  
  const executeCommand = (command: EditorCommand) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    document.execCommand(command.command, false, command.value);
    
    setContent(editorRef.current.innerHTML);
    setIsEmpty(editorRef.current.innerHTML === '');
    onChange(editorRef.current.innerHTML);
  };
  
  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    const selectedUser = users.find(user => user.id === userId);
    
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };
  
  const saveContent = () => {
    localStorage.setItem('richTextContent', content);
    
    toast({
      title: 'Content Saved',
      description: 'Your editor content has been saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <AnimatedBox style={fadeIn} maxW="4xl" mx="auto" mt={8}>
      <Box className="glass" p={10} sx={{borderRadius:"10px", maxWidth:"100%"}} boxShadow="2xl">
        <VStack spacing={5} align="stretch">
          <HStack justify="space-between">
            <Heading as="h2" className="gradient-text">
              Rich Text Editor
            </Heading>
            
            <Select
              placeholder="Load User Profile"
              onChange={handleUserSelect}
              maxW="200px"
              bg="whiteAlpha.50"
              borderColor="whiteAlpha.300"
              _hover={{ borderColor: 'whiteAlpha.400' }}
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </HStack>
          
          <Text color="gray.400">
            Format text and visualize user data
          </Text>
          
          {/* Editor Toolbar */}
          <HStack 
            p={2} 
            bg="blackAlpha.300" 
            borderRadius="md" 
            overflowX="auto" 
            spacing={1}
            className="glass"
          >
            <Tooltip label="Bold">
              <IconButton
                aria-label="Bold"
                icon={<FaBold style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'bold' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Italic">
              <IconButton
                aria-label="Italic"
                icon={<FaItalic style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'italic' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Underline">
              <IconButton
                aria-label="Underline"
                icon={<FaUnderline style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'underline' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Divider orientation="vertical" h="24px" />
            
            <Tooltip label="Heading">
              <IconButton
                aria-label="Heading"
                icon={<FaHeading style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'formatBlock', value: '<h2>' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Bulleted List">
              <IconButton
                aria-label="Bulleted List"
                icon={<FaListUl style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'insertUnorderedList' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Numbered List">
              <IconButton
                aria-label="Numbered List"
                icon={<FaListOl style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'insertOrderedList' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Quote">
              <IconButton
                aria-label="Quote"
                icon={<FaQuoteRight style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'formatBlock', value: '<blockquote>' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Link">
              <IconButton
                aria-label="Link"
                icon={<FaLink style={{padding:"1px"}}/>}
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) executeCommand({ command: 'createLink', value: url });
                }}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Divider orientation="vertical" h="24px" />
            
            <Tooltip label="Undo">
              <IconButton
                aria-label="Undo"
                icon={<FaUndo style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'undo' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Tooltip label="Redo">
              <IconButton
                aria-label="Redo"
                icon={<FaRedo style={{padding:"1px"}}/>}
                onClick={() => executeCommand({ command: 'redo' })}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="sm"
              />
            </Tooltip>
            
            <Box flexGrow={1} />
            
            <Button
              leftIcon={<FaSave style={{padding:"1px"}}/>}
              onClick={saveContent}
              size="sm"
              variant="glass"
              px={4}
            >
              Save
            </Button>
          </HStack>
          
          {/* Editor Content Area */}
          <Box position="relative">
            <Box
              contentEditable
              ref={editorRef}
              onInput={handleEditorChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onClick={() => {
                if (editorRef.current) {
                  editorRef.current.focus();
                }
              }}
              minH="300px"
              p={4}
              borderRadius="md"
              bg="whiteAlpha.50"
              overflowY="auto"
              sx={{
                '&:focus': {
                  outline: 'none',
                  boxShadow: '0 0 0 2px var(--chakra-colors-brand-300)',
                },
                '& h1': { fontSize: '2xl', fontWeight: 'bold', my: 2 },
                '& h2': { fontSize: 'xl', fontWeight: 'bold', my: 2 },
                '& p': { my: 1 },
                '& ul, & ol': { pl: 6, my: 2 },
                '& blockquote': { 
                  borderLeftWidth: '3px', 
                  borderLeftColor: 'brand.300', 
                  pl: 3, 
                  my: 2, 
                  fontStyle: 'italic' 
                },
              }}
            />
            
            {isEmpty && !isFocused && (
              <Text
                position="absolute"
                top="4"
                left="4"
                color="gray.500"
                pointerEvents="none"
              >
                Start typing here...
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </AnimatedBox>
  );
};

export default RichTextEditor;