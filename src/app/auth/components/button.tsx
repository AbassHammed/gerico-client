'use client';

import { useState } from 'react';

import { Button } from '@/components/shared/button';
import { ArrowRight, Loader2 } from 'lucide-react';

interface CustomButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function AuthButton({ loading = false, children }: CustomButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="submit"
      className={`
        relative overflow-hidden transition-all duration-300 ease-in-out w-full h-12 px-4 text-white font-medium bg-brand-400 hover:bg-brand-500
        ${isHovered && !loading ? 'rounded-none' : 'rounded-md'}
        ${loading ? 'cursor-not-allowed opacity-75' : ''}
      `}
      onMouseEnter={() => !loading && setIsHovered(true)}
      onMouseLeave={() => !loading && setIsHovered(false)}
      disabled={loading}>
      <div className="flex items-center justify-center space-x-2">
        {!loading && (
          <ArrowRight
            className={`
            transition-all duration-300 ease-in-out
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
            `}
            size={16}
          />
        )}
        {loading && <Loader2 className="animate-spin" size={16} />}
        <span>{children}</span>
      </div>
    </Button>
  );
}
