import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

console.debug(
  'Applying whyDidYouRender to help locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render',
);

whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  logOwnerReasons: true,
  collapseGroups: true,
  include: [/Header$/],

  logOnDifferentValues: true,
});
