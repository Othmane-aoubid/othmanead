'use client';

import { useEffect } from 'react';
import { initAppInsights } from '@/lib/application-insights';

export default function ApplicationInsightsInitializer() {
  useEffect(() => {
    initAppInsights();
  }, []);

  return null;
}
