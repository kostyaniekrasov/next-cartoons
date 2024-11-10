function convertYouTubeDuration(duration: string): string {
  const match = RegExp(/PT(\d+H)?(\d+M)?(\d+S)?/).exec(duration);

  if (!match) {
    return '0:00';
  }

  const hours = match[1] ? parseInt(match[1].replace('H', ''), 10) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', ''), 10) : 0;

  const formattedMinutes =
    hours > 0 ? String(hours * 60 + minutes) : String(minutes);

  return `${formattedMinutes}`;
}

export default convertYouTubeDuration;
