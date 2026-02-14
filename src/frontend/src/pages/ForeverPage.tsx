import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';

export default function ForeverPage() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'valentine-app'
  );

  // Extra dense hearts at the bottom
  const bottomHearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${4 + Math.random() * 3}s`,
  }));

  return (
    <PageTransition>
      <div className="relative space-y-8">
        {/* Main glowing heart with enhanced animation */}
        <div className="flex justify-center">
          <div className="animate-pulse-glow-intense">
            <img
              src="/assets/generated/blue-heart-glow.dim_512x512.png"
              alt="Forever Heart"
              className="h-64 w-64 drop-shadow-glow-xl md:h-80 md:w-80"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
            Forever & Always
          </h1>
          <p className="mb-8 text-2xl italic text-blue-100 md:text-3xl">
            I love you more than words could ever say
          </p>
        </div>

        <GlassCard className="text-center">
          <div className="prose prose-invert mx-auto max-w-none">
            <p className="text-lg leading-relaxed text-blue-50 md:text-xl">
              Thank you for being my Valentine, today and every day. You make my world brighter,
              my heart fuller, and my life infinitely better. Here's to all the memories we've made
              and all the adventures yet to come.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-blue-50 md:text-xl">
              I promise to love you, cherish you, and make you smile for as long as we both shall live.
            </p>
            <div className="mt-8 text-3xl">💙✨💙</div>
          </div>
        </GlassCard>

        {/* Footer */}
        <div className="pt-8 text-center text-sm text-blue-200/70">
          <p>
            © {currentYear} · Built with 💙 using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>

        {/* Dense bottom hearts layer */}
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-64 overflow-hidden">
          {bottomHearts.map((heart) => (
            <div
              key={`bottom-${heart.id}`}
              className="absolute animate-float text-3xl opacity-40"
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
        </div>
      </div>
    </PageTransition>
  );
}
