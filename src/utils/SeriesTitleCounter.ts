const SeriesTitleCounter = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} серій`;
  }

  if (lastDigit === 1) {
    return `${count} серія`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} серії`;
  }

  return `${count} серій`;
};

export default SeriesTitleCounter;
