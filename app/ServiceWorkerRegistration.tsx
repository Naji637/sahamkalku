'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
        console.error('Service worker registration failed:', error);
      });
    }
  }, []);

  return null;
}
