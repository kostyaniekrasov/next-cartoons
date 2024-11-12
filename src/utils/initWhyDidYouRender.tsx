// src/utils/initWhyDidYouRender.ts
import React from 'react';

export function initWhyDidYouRender() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('init whyDidYouRender');
    import('@welldone-software/why-did-you-render').then((whyDidYouRender) => {
      whyDidYouRender.default(React, {
        trackAllPureComponents: false,
      });
    });
  }
}
