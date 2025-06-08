// TypewriterText.tsx
import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
}

export default function TypewriterText({ text, speed = 28, className = '' }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    let cancelled = false;
    function typeNext() {
      if (cancelled) return;
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i < text.length) {
        setTimeout(typeNext, speed);
      }
    }
    typeNext();
    return () => { cancelled = true; };
  }, [text, speed]);

  return <span className={`typewriter-text ${className}`}>{displayed}</span>;
}
