// ClientOnlyWrapper.tsx
'use client';

import { initWhyDidYouRender } from '@/utils/initWhyDidYouRender';
import React, { useEffect } from 'react';

// ClientOnlyWrapper.tsx

const ClientOnlyWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initWhyDidYouRender();
    }
  }, []);

  return <>{children}</>;
};

export default ClientOnlyWrapper;
