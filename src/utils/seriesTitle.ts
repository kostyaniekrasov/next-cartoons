import replaceStrings from './replaceStrings';

const seriesTitle = (title: string, playlistTitle: string) => {
  let newTitle = replaceStrings(title, playlistTitle);

  newTitle = newTitle
    .replace(/\./g, '')
    .replace(/\|.*/, '')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return newTitle;
};

export default seriesTitle;
