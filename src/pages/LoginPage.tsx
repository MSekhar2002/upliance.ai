import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

// Icons (import your preferred icon library)
import { FiUser, FiLock, FiMail, FiGithub, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #111427 0%, #1A1F37 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  
  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoSubtext = styled.p`
  color: #a3aed0;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 30px;
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  flex: 1;
  background: transparent;
  border: none;
  padding: 15px 0;
  color: ${props => (props.active ? '#fff' : '#a3aed0')};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => (props.active ? 'linear-gradient(135deg, #4318FF 0%, #868CFF 100%)' : 'transparent')};
    border-radius: 2px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  border-radius: 15px;
  background: rgba(17, 20, 39, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4318FF;
    box-shadow: 0 0 0 3px rgba(67, 24, 255, 0.1);
  }
  
  &::placeholder {
    color: #a3aed0;
    opacity: 0.6;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a3aed0;
  font-size: 18px;
`;

const PasswordVisibilityToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #a3aed0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #fff;
  }
`;

const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #a3aed0;
  cursor: pointer;
`;

const ForgotPasswordLink = styled.a`
  color: #4318FF;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #a3aed0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::before {
    margin-right: 16px;
  }
  
  &::after {
    margin-left: 16px;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(17, 20, 39, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(17, 20, 39, 0.8);
  }
`;

const SignupPrompt = styled.p`
  text-align: center;
  margin-top: 24px;
  color: #a3aed0;
  
  a {
    color: #4318FF;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #FF5858;
  background: rgba(255, 88, 88, 0.1);
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  margin-bottom: 15px;
  border-left: 3px solid #FF5858;
`;

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    }
    
    document.title = activeTab === 'login' ? 'React App - Login' : 'React App - Sign Up';
  }, [user, navigate, activeTab]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (activeTab === 'signup' && !name) {
      setError('Please enter your name');
      return;
    }
    
    try {
      setLoading(true);
      
      if (activeTab === 'login') {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(name, email, password);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      // Mock Google login
      setLoading(true);
      await login('demo@example.com', 'demo123');
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to login with Google');
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <LoginCard
        variant="elevated"
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <LogoSection>
          <Logo>ReactApp</Logo>
          <LogoSubtext>
            {activeTab === 'login' 
              ? 'Sign in to access your account' 
              : 'Create an account to get started'}
          </LogoSubtext>
        </LogoSection>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </Tab>
          <Tab 
            active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </Tab>
        </TabsContainer>
        
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </ErrorMessage>
        )}
        
        <Form onSubmit={handleSubmit}>
          {activeTab === 'signup' && (
            <InputGroup>
              <InputIcon>
                <FiUser />
              </InputIcon>
              <Input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          )}
          
          <InputGroup>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordVisibilityToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordVisibilityToggle>
          </InputGroup>
          
          {activeTab === 'login' && (
            <RememberForgotRow>
              <CheckboxLabel>
                <input type="checkbox" />
                Remember me
              </CheckboxLabel>
              <ForgotPasswordLink href="#">Forgot Password?</ForgotPasswordLink>
            </RememberForgotRow>
          )}
          
          <Button 
            type="submit" 
            fullWidth 
            disabled={loading}
          >
            {loading 
              ? 'Loading...' 
              : activeTab === 'login' 
                ? 'Sign In' 
                : 'Create Account'
            }
          </Button>
        </Form>
        
        <OrDivider>or continue with</OrDivider>
        
        <SocialButtonsContainer>
          <SocialButton onClick={handleGoogleLogin}>
            <FcGoogle />
            Google
          </SocialButton>
          <SocialButton onClick={handleGoogleLogin}>
            <FiGithub />
            GitHub
          </SocialButton>
        </SocialButtonsContainer>
        
        <SignupPrompt>
          {activeTab === 'login' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(activeTab === 'login' ? 'signup' : 'login');
            }}
          >
            {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
          </a>
        </SignupPrompt>
      </LoginCard>
    </PageContainer>
  );
};

export default LoginPage;