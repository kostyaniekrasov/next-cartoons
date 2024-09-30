export const extractVideoId = (url: string, category: string) => {
  const regex = /v=([^&]+)/;
  const match = regex.exec(url);

  return {
    videoId: match ? match[1] : null,
    category: category,
  };
};
