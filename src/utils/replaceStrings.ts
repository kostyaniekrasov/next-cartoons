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

  const removeSenteceWithStr = ['Підпишись', 'https'];

  let newStr = inStr;

  replaceStringsArray.forEach((str) => {
    const regex = new RegExp(str, 'gi');
    newStr = newStr.replace(regex, '').trim();
  });

  let sentences = newStr.split(/(?<=[.!?])\s+/);

  sentences = sentences.filter(
    (sentence) =>
      !removeSenteceWithStr.some((str) =>
        sentence.toLowerCase().includes(str.toLowerCase()),
      ),
  );

  newStr = sentences.join(' ');

  if (!newStr.length) {
    newStr = playlistTitle;
  }

  return newStr;
};

export default replaceStrings;
