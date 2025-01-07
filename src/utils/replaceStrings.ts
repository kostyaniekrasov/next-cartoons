const replaceStrings = (inStr: string, playlistTitle: string) => {
  const replaceStringsArray = [
    '- Мультик для дітей',
    '- Мультик для малюків',
    'Мультик для малюків',
    '– Дитячі Пісні –',
    'збірка',
    `– З Любов'ю до Дітей`,
    '- Україна',
    'Мультик Для Дітей',
  ];

  const removeSenteceWithStr = [
    'Підпишись',
    'https',
    '- Розвиваючі Мультики ',
    '- Розвиваючі Мультики Українською Мовою ',
    '- Веселі Дитячі',
    '- Pозвиваючі Mультики Для Дітей',
  ];

  let newStr = inStr;

  replaceStringsArray.forEach((str) => {
    const regex = new RegExp(str, 'gi');
    newStr = newStr.replace(regex, '').trim();
  });

  removeSenteceWithStr.forEach((str) => {
    const regex = new RegExp(`${str}.*`, 'gi');
    newStr = newStr.replace(regex, '').trim();
  });

  const sentences = newStr.split(/(?<=[.!?])\s+/);

  newStr = sentences.join(' ');

  newStr = newStr.replace(new RegExp(playlistTitle, 'gi'), '').trim();

  if (!newStr.length) {
    newStr = playlistTitle;
  }

  return newStr;
};

export default replaceStrings;
