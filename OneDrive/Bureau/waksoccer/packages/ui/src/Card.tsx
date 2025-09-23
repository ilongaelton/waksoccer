import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border rounded-xl p-4 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}