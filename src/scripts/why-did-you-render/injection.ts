import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';

// eslint-disable-next-line no-console -- Показуємо інформацію, що `whyDidYouRender` було застосовано.
console.debug(
  'Applying whyDidYouRender to help locate unnecessary re-renders during development. See https://github.com/welldone-software/why-did-you-render',
);

whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackHooks: true,
  logOwnerReasons: true,
  collapseGroups: true,
  include: [/Header$/], // Включаємо всі компоненти для відстеження.

  // Це для тестування, видаліть, якщо не хочете реєструвати різні значення.
  logOnDifferentValues: true,
});
