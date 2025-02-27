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
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Legend,
} from 'recharts';
import { useSpring, animated } from 'react-spring';
import { RootState } from '../../store/store';
import Counter from '../Counter/Counter';

// Animated components
const AnimatedBox = animated(Box);
const AnimatedGridItem = animated(GridItem);

// Chart colors
const COLORS = ['#4158D0', '#C850C0', '#FFCC70', '#3bd5d5', '#8884d8', '#82ca9d'];

const Dashboard: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users || []);

  // Animation properties
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });

  // Mock Data
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
  ];

  return (
    <AnimatedBox style={fadeIn} w="full" maxW="7xl" mx="auto" mt={6}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Dashboard</Heading>

        {/* Stats Section */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <AnimatedGridItem style={fadeIn}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
              <Stat>
                <StatLabel color="gray.300">Total Users</StatLabel>
                <StatNumber fontSize="4xl">{users.length}</StatNumber>
              </Stat>
            </Box>
          </AnimatedGridItem>
        </SimpleGrid>

        {/* Counter */}
        <Counter />

        {/* Charts Section */}
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
          <GridItem>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
              <Heading size="md" mb={4}>User Growth</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockUserGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>

          <GridItem>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
              <Heading size="md" mb={4}>User Activity</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={mockActivityData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                    {mockActivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
              <Heading size="md" mb={4}>Engagement</Heading>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uv" fill="#8884d8" />
                  <Bar dataKey="pv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </GridItem>
        </Grid>

        {/* Additional Content */}
        <Box className="glass" p={6} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={4}>Recent Activity</Heading>
          <VStack spacing={4} align="stretch">
            <Text>No recent activity to display.</Text>
          </VStack>
        </Box>
      </VStack>
    </AnimatedBox>
  );
};

export default Dashboard;