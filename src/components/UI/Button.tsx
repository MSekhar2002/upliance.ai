import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: none;
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'lg':
        return `
          padding: 16px 24px;
          font-size: 18px;
        `;
      default:
        return `
          padding: 12px 20px;
          font-size: 16px;
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: rgba(80, 87, 122, 0.3);
          color: #a3aed0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          &:hover {
            background: rgba(90, 97, 132, 0.5);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(1px);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(135deg, #FF5858 0%, #CC2E5D 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(204, 46, 93, 0.3);
          &:hover {
            box-shadow: 0 6px 20px rgba(204, 46, 93, 0.5);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(1px);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: #a3aed0;
          &:hover {
            background: rgba(80, 87, 122, 0.1);
          }
          &:active {
            background: rgba(80, 87, 122, 0.2);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #4318FF 0%, #868CFF 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(67, 24, 255, 0.3);
          &:hover {
            box-shadow: 0 6px 20px rgba(67, 24, 255, 0.5);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(1px);
          }
        `;
    }
  }}
  
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
  
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
    pointer-events: none;
  }

  &:hover:before {
    left: 100%;
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={disabled ? undefined : onClick}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;