import { useEffect, useRef } from 'react';

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

const navItems = ['Home', 'Studio', 'About', 'Journal', 'Reach Us'];

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const fadeDuration = 0.5;

    const setVideoOpacity = (opacity: number) => {
      video.style.opacity = `${Math.max(0, Math.min(1, opacity))}`;
    };

    const monitorPlayback = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < fadeDuration) {
          setVideoOpacity(currentTime / fadeDuration);
        } else if (duration - currentTime < fadeDuration) {
          setVideoOpacity((duration - currentTime) / fadeDuration);
        } else {
          setVideoOpacity(1);
        }
      }

      frameRef.current = requestAnimationFrame(monitorPlayback);
    };

    const restartVideo = () => {
      setVideoOpacity(0);

      timeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };

    video.addEventListener('ended', restartVideo);
    setVideoOpacity(0);
    void video.play();
    frameRef.current = requestAnimationFrame(monitorPlayback);

    return () => {
      video.removeEventListener('ended', restartVideo);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute z-0 overflow-hidden" style={{ inset: 'auto 0 0 0', top: '300px' }}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover transition-opacity duration-100"
        src={videoUrl}
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-black">
      <VideoBackground />

      <nav className="relative z-10 px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a className="font-display text-3xl tracking-tight text-[#000000]" href="#" aria-label="Aethera home">
            Aethera<sup className="ml-0.5 align-super text-xs">®</sup>
          </a>

          <div className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item}
                className={`text-sm transition-colors hover:text-[#000000] ${
                  item === 'Home' ? 'text-[#000000]' : 'text-[#6F6F6F]'
                }`}
                href="#"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-[#FFFFFF] transition-transform duration-300 hover:scale-[1.03]">
            Begin Journey
          </button>
        </div>
      </nav>

      <section
        className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col items-center justify-center px-6 pb-40 text-center"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <h1 className="animate-fade-rise max-w-7xl font-display text-5xl font-normal tracking-[-2.46px] text-[#000000] sm:text-7xl md:text-8xl" style={{ lineHeight: 0.95 }}>
          Beyond <em className="font-display italic text-[#6F6F6F]">silence,</em> we build{' '}
          <em className="font-display italic text-[#6F6F6F]">the eternal.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft
          digital havens for deep work and pure flows.
        </p>

        <button className="animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform duration-300 hover:scale-[1.03]">
          Begin Journey
        </button>
      </section>
    </main>
  );
}

export default App;
