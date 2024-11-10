import getVideoAndPlaylistData from '../api/getVideoAndPlaylistData';
import getYouTubeData from '../api/getYoutubeData';
import savePlaylistsToDB from './savePlaylistToDB';
import sortPlaylistsByTitle from './sortPlaylistsByTitle';

const processPlaylists = async (
  updateStatus: (message: string) => void,
  updateProgress: (percentage: number) => void,
) => {
  const mainProgressFraction = 0.7;
  const totalSteps = 3;
  let currentStep = 0;

  const incrementProgress = () => {
    currentStep += 1;
    const mainProgress = Math.floor(
      (currentStep / totalSteps) * mainProgressFraction * 100,
    );
    updateProgress(mainProgress);
  };

  try {
    updateStatus(
      'Отримання даних про відео та плейлисти з масивів бази даних...',
    );
    const { videosUrls, playlistsUrls } = await getVideoAndPlaylistData();
    incrementProgress();

    updateStatus('Отримання даних з YouTube Data API...');
    const { videos } = await getYouTubeData(videosUrls, playlistsUrls);
    incrementProgress();

    updateStatus('Сортування плейлистів...');
    const sortedPlaylists = sortPlaylistsByTitle(videos);
    incrementProgress();

    updateStatus('Збереження плейлистів у базу даних...');
    await savePlaylistsToDB(
      sortedPlaylists,
      updateStatus,
      (playlistProgress) => {
        const totalProgress = Math.floor(
          mainProgressFraction * 100 + playlistProgress * 0.3,
        );
        updateProgress(totalProgress);
      },
    );

    updateStatus('Процес завершено успішно!');
  } catch (error) {
    updateStatus(`Помилка обробки плейлистів: ${error}`);
  }
};

export default processPlaylists;
