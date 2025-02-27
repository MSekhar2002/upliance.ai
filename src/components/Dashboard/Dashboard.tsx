// src/components/Dashboard/Dashboard.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, Legend } from 'recharts';
import { useSpring, animated } from 'react-spring';
import { RootState } from '../../store/store';
import Counter from '../Counter/Counter';

// Animated components
const AnimatedBox = animated(Box);
const AnimatedGridItem = animated(GridItem);

// Chart colors
const COLORS = ['#4158D0', '#C850C0', '#FFCC70', '#3bd5d5', '#8884d8', '#82ca9d'];

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  
  // Animation properties
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });
  
  // For charts
  const mockUserGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 220 },
    { month: 'Apr', users: 300 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 520 },
    { month: 'Jul', users: 620 },
    { month: 'Aug', users: 740 },
  ];
  
  const mockActivityData = [
    { name: 'Active', value: 65 },
    { name: 'Inactive', value: 20 },
    { name: 'New', value: 15 },
  ];
  
  const mockEngagementData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];
  
  return (
    <AnimatedBox style={fadeIn} w="full" maxW="7xl" mx="auto" mt={6}>
      <VStack spacing={8} align="stretch">
        <Heading className="gradient-text" textAlign="center">Dashboard</Heading>
        
        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <AnimatedGridItem style={fadeIn}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Stat>
                <StatLabel color="gray.300">Total Users</StatLabel>
                <StatNumber fontSize="4xl" className="gradient-text">{users.length}</StatNumber>
                <StatHelpText>
                  <HStack spacing={1}>
                    <Badge colorScheme="green">+5%</Badge>
                    <Text color="gray.400">from last month</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </Box>
          </AnimatedGridItem>
          
          <AnimatedGridItem style={fadeIn}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Stat>
                <StatLabel color="gray.300">Active Sessions</StatLabel>
                <StatNumber fontSize="4xl" className="gradient-text">24</StatNumber>
                <StatHelpText>
                  <HStack spacing={1}>
                    <Badge colorScheme="green">+12%</Badge>
                    <Text color="gray.400">from yesterday</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </Box>
          </AnimatedGridItem>
          
          <AnimatedGridItem style={fadeIn}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Stat>
                <StatLabel color="gray.300">Retention Rate</StatLabel>
                <StatNumber fontSize="4xl" className="gradient-text">92%</StatNumber>
                <StatHelpText>
                  <HStack spacing={1}>
                    <Badge colorScheme="green">+3%</Badge>
                    <Text color="gray.400">from last quarter</Text>
                  </HStack>
                </StatHelpText>
              </Stat>
            </Box>
          </AnimatedGridItem>
        </SimpleGrid>
        
        {/* Counter */}
        <Counter />
        
        {/* Charts Section */}
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }} gap={6}></Grid>
                  {/* User Growth Chart */}
                  <GridItem>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Heading size="md" mb={4} color="gray.300">User Growth</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockUserGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="month" stroke="gray.300" />
                  <YAxis stroke="gray.300" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>

          {/* User Activity Pie Chart */}
          <GridItem>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Heading size="md" mb={4} color="gray.300">User Activity</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockActivityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {mockActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>

          {/* Engagement Bar Chart */}
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl" h="full">
              <Heading size="md" mb={4} color="gray.300">Engagement</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="gray.300" />
                  <YAxis stroke="gray.300" />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="uv" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pv" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>
        </Grid>

        {/* Additional Content */}
        <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={4} color="gray.300">Recent Activity</Heading>
          <VStack spacing={4} align="stretch">
            <Text color="gray.400">No recent activity to display.</Text>
          </VStack>
        </Box>
      </VStack>
    </AnimatedBox>
  );
};

export default Dashboard;