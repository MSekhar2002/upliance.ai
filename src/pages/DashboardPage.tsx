import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Card from '../components/UI/Card';
import { useCounter } from '../hooks/useCounter';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';

// Icons (import your preferred icon library)
import { 
  FiUser, 
  FiTrendingUp, 
  FiActivity, 
  FiPieChart 
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
  max-width: 700px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(Card)`
  padding: 24px;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin: 8px 0;
  color: #fff;
`;

const StatLabel = styled.div`
  color: #a3aed0;
  font-size: 0.9rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 350px;
  }
`;

const ChartTitle = styled.h3`
  margin: 0 0 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 24px;
`;

const DashboardPage: React.FC = () => {
  const { count } = useCounter();
  const [users, setUsers] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = 'React App - Dashboard';
    
    // Load users from local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Sample data for charts
  const counterHistory = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 8 },
    { name: 'Fri', count: 12 },
    { name: 'Sat', count: 15 },
    { name: 'Sun', count: count || 10 }
  ];

  const userActivity = [
    { name: 'Jan', users: 12 },
    { name: 'Feb', users: 19 },
    { name: 'Mar', users: 15 },
    { name: 'Apr', users: 27 },
    { name: 'May', users: 34 },
    { name: 'Jun', users: 30 },
    { name: 'Jul', users: users.length || 42 }
  ];

  const userLocations = [
    { name: 'North America', value: 45 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 15 },
    { name: 'Other', value: 10 }
  ];

  const platformData = [
    { name: 'Desktop', users: 58 },
    { name: 'Mobile', users: 28 },
    { name: 'Tablet', users: 14 }
  ];

  const COLORS = ['#4318FF', '#6AD2FF', '#EFF4FB', '#9979E6'];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Dashboard
        </PageTitle>
        <PageDescription>
          View analytics and statistics about users, counter activity, and more.
        </PageDescription>
      </PageHeader>

      <Stats>
        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          variant="glass"
        >
          <IconBox style={{ color: '#4318FF', background: 'rgba(67, 24, 255, 0.1)' }}>
            <FiUser />
          </IconBox>
          <StatLabel>Total Users</StatLabel>
          <StatValue>{users.length || 42}</StatValue>
        </StatCard>

        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          variant="glass"
        >
          <IconBox style={{ color: '#05CD99', background: 'rgba(5, 205, 153, 0.1)' }}>
            <FiActivity />
          </IconBox>
          <StatLabel>Current Count</StatLabel>
          <StatValue>{count || 10}</StatValue>
        </StatCard>

        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          variant="glass"
        >
          <IconBox style={{ color: '#FFB547', background: 'rgba(255, 181, 71, 0.1)' }}>
            <FiTrendingUp />
          </IconBox>
          <StatLabel>Active Sessions</StatLabel>
          <StatValue>24</StatValue>
        </StatCard>

        <StatCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          variant="glass"
        >
          <IconBox style={{ color: '#FF5858', background: 'rgba(255, 88, 88, 0.1)' }}>
            <FiPieChart />
          </IconBox>
          <StatLabel>Data Points</StatLabel>
          <StatValue>1,247</StatValue>
        </StatCard>
      </Stats>

      <ChartGrid>
        <ChartCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          variant="elevated"
          title="Counter Activity"
          subtitle="Last 7 days"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={counterHistory}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a3aed0" />
                <YAxis stroke="#a3aed0" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 25, 35, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#4318FF" 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          variant="elevated"
          title="User Growth"
          subtitle="Monthly trends"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a3aed0" />
                <YAxis stroke="#a3aed0" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 25, 35, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                  }} 
                />
                <Bar dataKey="users" fill="#6AD2FF" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          variant="elevated"
          title="User Location"
          subtitle="Geographic distribution"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userLocations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userLocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 25, 35, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          variant="elevated"
          title="Platform Usage"
          subtitle="Device breakdown"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a3aed0" />
                <YAxis stroke="#a3aed0" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 25, 35, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#9979E6" 
                  strokeWidth={3}
                  dot={{ 
                    fill: '#9979E6', 
                    strokeWidth: 2, 
                    r: 6, 
                    strokeDasharray: '' 
                  }}
                  activeDot={{ 
                    fill: '#9979E6', 
                    stroke: 'white', 
                    strokeWidth: 2, 
                    r: 8 
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>
      </ChartGrid>
    </PageContainer>
  );
};

export default DashboardPage;