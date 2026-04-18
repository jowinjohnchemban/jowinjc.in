'use client';

import { useEffect, useState } from 'react';
import styles from './TypewriterText.module.css';

interface TypewriterTextProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

// Shuffle algorithm for randomizing array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  const [shuffledWords] = useState(() => shuffleArray(words));

  // Random speed variation for more realistic typing
  const getRandomSpeed = (baseSpeed: number) => {
    return baseSpeed + Math.random() * 30 - 15; // ±15ms variation
  };

  useEffect(() => {
    if (shuffledWords.length === 0) return;

    const currentWord = shuffledWords[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsWaiting(false);
      }, delayBetweenWords);
    } else if (isDeleting) {
      if (displayedText.length === 0) {
        timeout = setTimeout(() => {
          // Pick random next word
          const randomIndex = Math.floor(Math.random() * shuffledWords.length);
          setWordIndex(randomIndex);
          setIsDeleting(false);
        }, 200);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, getRandomSpeed(deletingSpeed));
      }
    } else {
      if (displayedText.length === currentWord.length) {
        timeout = setTimeout(() => {
          setIsWaiting(true);
        }, 200);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, getRandomSpeed(typingSpeed));
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, wordIndex, isDeleting, isWaiting, shuffledWords, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${styles.cursor} ${cursorClassName}`} />
    </span>
  );
}
