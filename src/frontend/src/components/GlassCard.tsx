import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-3xl border border-blue-glow/30 bg-white/5 p-8 backdrop-blur-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
