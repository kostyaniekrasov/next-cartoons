const extractIds = {
  extractVideoId: (url: string) => {
    const regex = /v=([^&]+)/;
    const match = regex.exec(url);

    if (!match) {
      throw new Error('Video ID не знайдено');
    }

    return match[1];
  },
  extractPlaylistId: (url: string) => {
    const regex = /list=([^&]+)/;
    const match = regex.exec(url);

    if (!match) {
      alert('Дане посилання не є плейлистом, можливо це відео?');

      throw new Error('Playlist ID не знайдено');
    }

    return match[1];
  },
};

export default extractIds;
