'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function TypewriterText({
  words,
  className = '',
  cursorClassName = '',
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenWords = 2000,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsWaiting(false);
      }, delayBetweenWords);
    } else if (isDeleting) {
      if (displayedText.length === 0) {
        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsDeleting(false);
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayedText.length === currentWord.length) {
        timeout = setTimeout(() => {
          setIsWaiting(true);
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, wordIndex, isDeleting, isWaiting, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`animate-pulse ${cursorClassName}`}>|</span>
    </span>
  );
}
