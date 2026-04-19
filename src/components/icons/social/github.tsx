import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function GithubIcon({ size = 24, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c2.6-.4 5.5-2 5.5-7-.1-1.5-.5-2.9-1.3-4 .1-.4.5-1.1.3-2-.4.1-1.2.3-2.3 1-1-.3-2.2-.4-3.5-.4-1.3 0-2.5.1-3.5.4-1.1-.7-1.9-.9-2.3-1-.2.9.2 1.6.3 2-.8 1.1-1.2 2.5-1.1 4 0 5 2.9 6.6 5.5 7-.5.4-.9 1.1-1 2-.9.3-1.8.2-2.6-.3-.3-.5-.9-1.1-1.5-1-.6 0-.1.4.1.6.6.3 1.1 1.3 1.5 1.8.3.5 1 1.4 2.7 1.4.2 0 .5 0 .8-.1v2.8" />
    </svg>
  );
}
