const seriesTitle = (title: string, playlistTitle: string) => {
  return title
    .replaceAll(`${playlistTitle}`, '') // Видаляємо назву плейлиста
    .replace(/\./g, '') // Видаляємо всі крапки
    .replace(/\|.*/, '')
    .trim();
};

export default seriesTitle;
