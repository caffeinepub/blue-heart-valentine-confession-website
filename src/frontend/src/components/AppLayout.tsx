import { ReactNode } from 'react';
import HeartsBackground from './HeartsBackground';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-navy">
      <HeartsBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
