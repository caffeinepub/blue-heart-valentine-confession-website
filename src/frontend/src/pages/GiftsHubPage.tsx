import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import PageTransition from '../components/PageTransition';

export default function GiftsHubPage() {
  const navigate = useNavigate();

  const gifts = [
    {
      icon: '🧠',
      title: 'Love Quiz',
      description: 'How well do you know us?',
      path: '/gifts/quiz',
    },
    {
      icon: '💌',
      title: 'Love Letter',
      description: 'Words from my heart',
      path: '/gifts/letter',
    },
    {
      icon: '📸',
      title: 'Our Gallery',
      description: 'Moments we treasure',
      path: '/gifts/gallery',
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Your Gifts 💙
          </h1>
          <p className="text-lg text-blue-100 md:text-xl">
            Open each one to unlock a surprise...
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {gifts.map((gift) => (
            <GlassCard
              key={gift.path}
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:border-blue-glow/60 hover:shadow-glow"
              onClick={() => navigate({ to: gift.path })}
            >
              <div className="text-center">
                <div className="mb-4 text-5xl">{gift.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {gift.title}
                </h3>
                <p className="text-sm text-blue-100">{gift.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <PrimaryButton onClick={() => navigate({ to: '/forever' })}>
            Finally
          </PrimaryButton>
        </div>
      </div>
    </PageTransition>
  );
}
