import { useEffect, useRef } from 'react';

const stats = [
  { value: '1000+', label: 'GTM Placements Delivered' },
  { value: 'US & EU', label: 'Active Markets' },
  { value: 'Sales Leaders', label: 'Executive & IC Hiring' },
  { value: 'Stage-Based', label: 'GTM Talent Matching' },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export default function About() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal(0.1);

  return (
    <section id="about" className="bg-[#0A0A0A] py-28 md:py-36">
    
    </section>
  );
}
