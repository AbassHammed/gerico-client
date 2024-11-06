/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/shadcn/ui/button';
import { useResendCode } from '@/hooks/useResendCode';

export default function ResendPasswordButton() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { sendResetCode, loading } = useResendCode();

  useEffect(() => {
    const storedCountdown = parseInt(localStorage.getItem('resendCountdown') || '0');
    const remainingTime = storedCountdown - Math.floor(Date.now() / 1000);

    if (remainingTime > 0) {
      setIsDisabled(true);
      setCountdown(remainingTime);
      startCountdown();
    } else {
      localStorage.removeItem('resendCountdown');
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    timerRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsDisabled(false);
          localStorage.removeItem('resendCountdown');
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const handleResendClick = async () => {
    const cooldownDuration = 120; // 2 min
    const expirationTime = Math.floor(Date.now() / 1000) + cooldownDuration;

    setIsDisabled(true);
    localStorage.setItem('resendCountdown', expirationTime.toString());
    setCountdown(cooldownDuration);
    startCountdown();

    try {
      const sent = await sendResetCode();
      console.info(sent);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleResendClick}
      disabled={isDisabled || loading}
      className="text-xs font-light mt-2 p-2 h-6 bg-brand-400 hover:bg-brand-500 rounded">
      {isDisabled ? `Renvoi dans ${countdown}s` : 'Renvoi mail'}
    </Button>
  );
}
