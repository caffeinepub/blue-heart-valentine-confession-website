import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import PageTransition from '../components/PageTransition';

export default function ProposalPage() {
  const navigate = useNavigate();
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ top: '50%', left: '50%' });
  const [clickCount, setClickCount] = useState(0);

  const handleYesClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setYesScale(1 + newCount * 0.15);
    
    if (newCount >= 3) {
      navigate({ to: '/yay' });
    }
  };

  const handleNoHover = () => {
    const newTop = Math.random() * 70 + 10;
    const newLeft = Math.random() * 70 + 10;
    setNoPosition({ top: `${newTop}%`, left: `${newLeft}%` });
  };

  return (
    <PageTransition>
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Main card */}
        <GlassCard className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Will you be my Valentine?
          </h1>
          <p className="mb-8 text-lg text-blue-100 md:text-xl">
            I have something special for you...
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton
              onClick={handleYesClick}
              style={{ transform: `scale(${yesScale})` }}
              className="transition-transform duration-300"
            >
              Yes! 💙
            </PrimaryButton>

            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              onTouchStart={handleNoHover}
              className="fixed rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white/20"
              style={{
                top: noPosition.top,
                left: noPosition.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              No
            </button>
          </div>

          {clickCount > 0 && clickCount < 3 && (
            <p className="mt-6 animate-bounce text-sm text-blue-200">
              Keep clicking Yes! 💕
            </p>
          )}
        </GlassCard>
      </div>
    </PageTransition>
  );
}
