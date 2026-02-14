export default function HeartsBackground() {
  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 4}s`,
  }));

  const fallingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 4}s`,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={`float-${heart.id}`}
          className="absolute animate-float text-2xl opacity-30"
          style={{
            left: heart.left,
            bottom: '-50px',
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          💙
        </div>
      ))}
      
      {/* Falling hearts */}
      {fallingHearts.map((heart) => (
        <div
          key={`fall-${heart.id}`}
          className="absolute animate-fall text-xl opacity-20"
          style={{
            left: heart.left,
            top: '-50px',
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          💙
        </div>
      ))}
    </div>
  );
}
