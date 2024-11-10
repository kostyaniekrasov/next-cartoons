const getCurrentFilter = (pathname: string) => {
  return pathname.replace('/', '');
};

export default getCurrentFilter;
