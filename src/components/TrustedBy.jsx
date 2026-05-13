import { useRef } from 'react';

import celonisImg  from '../assets/images/Celonis.png';
import palantirImg from '../assets/images/Palantir.png';
import oracleImg   from '../assets/images/Oracle.png';
import appleImg from '../assets/images/Apple.jpg';

const logos = [
  { id: 'apple',    label: 'Apple',    src: appleImg },
  { id: 'celonis',  label: 'Celonis',  src: celonisImg  },
  { id: 'palantir', label: 'Palantir', src: palantirImg },
  { id: 'oracle',   label: 'Oracle',   src: oracleImg   },
];

function LogoStrip() {
  return (
    <>
      {logos.map(({ id, label, src }) => (
        <div
          key={id}
          className="flex items-center justify-center px-12 md:px-16 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <img
            src={src}
            alt={label}
            className="h-10 w-auto object-contain"
            draggable={false}
          />
        </div>
      ))}
    </>
  );
}

export default function TrustedBy() {
  const trackRef = useRef(null);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  return (
    <section className="bg-black border-t border-b border-white/[0.06] py-10 overflow-hidden">
      <p className="text-center text-white/25 text-[10px] tracking-[0.35em] uppercase mb-8">
        Trusted by leading technology companies
      </p>

      <div className="relative" onMouseEnter={pause} onMouseLeave={resume}>
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex items-center"
          style={{ animation: 'marquee 24s linear infinite', width: 'max-content' }}
        >
          <LogoStrip />
          <LogoStrip />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
