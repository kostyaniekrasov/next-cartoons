function transliterate(text: string): string {
  const cyrillicToLatinMap: { [key: string]: string } = {
    А: 'A',
    а: 'a',
    Б: 'B',
    б: 'b',
    В: 'V',
    в: 'v',
    Г: 'G',
    г: 'g',
    Д: 'D',
    д: 'd',
    Е: 'E',
    е: 'e',
    Ж: 'Zh',
    ж: 'zh',
    З: 'Z',
    з: 'z',
    И: 'I',
    и: 'i',
    Й: 'Y',
    й: 'y',
    К: 'K',
    к: 'k',
    Л: 'L',
    л: 'l',
    М: 'M',
    м: 'm',
    Н: 'N',
    н: 'n',
    О: 'O',
    о: 'o',
    П: 'P',
    п: 'p',
    Р: 'R',
    р: 'r',
    С: 'S',
    с: 's',
    Т: 'T',
    т: 't',
    У: 'U',
    у: 'u',
    Ф: 'F',
    ф: 'f',
    Х: 'Kh',
    х: 'kh',
    Ц: 'Ts',
    ц: 'ts',
    Ч: 'Ch',
    ч: 'ch',
    Ш: 'Sh',
    ш: 'sh',
    Щ: 'Shch',
    щ: 'shch',
    Ю: 'Yu',
    ю: 'yu',
    Я: 'Ya',
    я: 'ya',
    Ь: '',
    ь: '',
    І: 'I',
    і: 'i',
    Є: 'Ye',
    є: 'ye',
    Ї: 'Yi',
    ї: 'yi',
    Ґ: 'G',
    ґ: 'g',
  };

  let result = text
    .split('')
    .map((char) => cyrillicToLatinMap[char] || char)
    .join('');

  result = result.replace(/ь/gi, '').replace(/\./g, '');

  return result;
}
function slugify(text: string): string {
  return transliterate(text).replace(/\s+/g, '-').toLowerCase();
}

export default slugify;
