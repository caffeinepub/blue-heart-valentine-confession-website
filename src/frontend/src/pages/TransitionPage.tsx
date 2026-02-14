import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PageTransition from '../components/PageTransition';

export default function TransitionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: '/gifts' });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-5xl font-bold text-white md:text-6xl">
          Yay! 🥰
        </h1>
        <p className="text-xl text-blue-100 md:text-2xl">
          Taking you to your gifts...
        </p>
      </div>
    </PageTransition>
  );
}
