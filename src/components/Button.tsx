import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  as?: 'button' | 'a' | 'link';
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  as = 'button',
  href,
  to,
  target,
  rel,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const variantStyles = {
    primary: 'bg-[#00304f] text-white hover:bg-[#00304f]/90 focus:ring-[#00304f]',
    secondary: 'bg-[#69932f] text-white hover:bg-[#69932f]/90 focus:ring-[#69932f]',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#00304f]',
    text: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-[#00304f]'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  if (as === 'a' && href) {
    return (
      <a 
        href={href} 
        className={buttonClasses}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }
  
  if (as === 'link' && to) {
    return (
      <Link 
        to={to} 
        className={buttonClasses}
      >
        {content}
      </Link>
    );
  }
  
  return (
    <button 
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
}
