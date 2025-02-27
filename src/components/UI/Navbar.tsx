import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

// Icons (import your preferred icon library)
import { 
  FiHome, 
  FiUser, 
  FiEdit, 
  FiPieChart, 
  FiMenu, 
  FiX, 
  FiLogOut 
} from 'react-icons/fi';

interface NavItemProps {
  active?: boolean;
}

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(17, 20, 39, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#a3aed0')};
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${({ active }) =>
    active &&
    `
    background: rgba(67, 24, 255, 0.1);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 18px;
      right: 18px;
      height: 3px;
      background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
      border-radius: 6px;
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #a3aed0;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 20, 39, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  z-index: 99;
`;

const MobileNavLink = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 18px;
  color: ${({ active }) => (active ? '#fff' : '#a3aed0')};
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${({ active }) =>
    active &&
    `
    background: rgba(67, 24, 255, 0.1);
  `}
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(67, 24, 255, 0.3);
`;

const UserInfo = styled.div`
  display: none;
  
  @media (min-width: 992px) {
    display: block;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  color: #fff;
  font-size: 14px;
`;

const UserRole = styled.div`
  color: #a3aed0;
  font-size: 12px;
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '/form', icon: <FiUser />, label: 'User Form' },
    { path: '/editor', icon: <FiEdit />, label: 'Text Editor' },
    { path: '/dashboard', icon: <FiPieChart />, label: 'Dashboard' },
  ];

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return names[0][0];
  };

  return (
    <NavbarContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        boxShadow: scrolled
          ? '0 10px 30px rgba(0, 0, 0, 0.25)'
          : '0 4px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Logo>
        ReactApp
      </Logo>

      <NavItems>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </NavItems>

      <UserSection>
        {user ? (
          <>
            <UserInfo>
              <UserName>{user.name || 'User'}</UserName>
              <UserRole>Developer</UserRole>
            </UserInfo>
            <UserAvatar>{getUserInitials()}</UserAvatar>
            <Button
              variant="ghost"
              size="sm"
              icon={<FiLogOut />}
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign In
          </Button>
        )}
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </UserSection>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              active={location.pathname === item.path}
              onClick={closeMobileMenu}
            >
              {item.icon}
              {item.label}
            </MobileNavLink>
          ))}
          {user && (
            <MobileNavLink
              to="/login"
              onClick={() => {
                logout();
                closeMobileMenu();
              }}
              active={false}
            >
              <FiLogOut />
              Logout
            </MobileNavLink>
          )}
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;