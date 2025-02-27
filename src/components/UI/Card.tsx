import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  animate?: boolean;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardContainer = styled(motion.div)<CardProps>`
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  ${({ variant }) => {
    switch (variant) {
      case 'glass':
        return `
          background: rgba(23, 25, 35, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        `;
      case 'elevated':
        return `
          background: linear-gradient(120deg, #1A1F37 0%, #111427 100%);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        `;
      default:
        return `
          background: #111427;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        `;
    }
  }}
  
  ${({ animate }) => animate && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    }
  `}
  
  ${({ onClick }) => onClick && 'cursor: pointer;'}
`;

const CardHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const CardSubtitle = styled.p`
  margin: 4px 0 0;
  color: #a3aed0;
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(67, 24, 255, 0.1);
  color: #4318FF;
`;

const CardContent = styled.div<{ padding?: string }>`
  flex: 1;
  
  ${({ padding }) => {
    switch (padding) {
      case 'none':
        return 'padding: 0;';
      case 'sm':
        return 'padding: 12px;';
      case 'lg':
        return 'padding: 28px;';
      default:
        return 'padding: 20px;';
    }
  }}
`;

const CardFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  fullWidth = false,
  onClick,
  animate = false,
  title,
  subtitle,
  icon,
  footer,
  ...props
}) => {
  return (
    <CardContainer
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      animate={animate}
      whileHover={animate ? { y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {(title || subtitle || icon) && (
        <CardHeader>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {(title || subtitle) && (
            <HeaderContent>
              {title && <CardTitle>{title}</CardTitle>}
              {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
            </HeaderContent>
          )}
        </CardHeader>
      )}
      <CardContent padding={padding}>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;