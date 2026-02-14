import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function PrimaryButton({
  children,
  className,
  variant = 'primary',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full px-8 py-4 font-semibold transition-all duration-300',
        variant === 'primary' &&
          'bg-blue-glow text-white shadow-glow hover:scale-105 hover:shadow-glow-lg',
        variant === 'secondary' &&
          'border-2 border-white/30 bg-white/10 text-white hover:bg-white/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
