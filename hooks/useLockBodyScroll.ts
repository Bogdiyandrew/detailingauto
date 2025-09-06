// hooks/useLockBodyScroll.ts
'use client';

import { useEffect } from 'react';

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      // Add class to body to disable scroll
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function to re-enable scroll when component unmounts or isLocked becomes false
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isLocked]); // Re-run effect when isLocked changes
};