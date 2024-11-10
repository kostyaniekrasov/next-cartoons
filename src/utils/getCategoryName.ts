import { VideoCategory } from '@/types';

const getCategoryName = (
  categories: VideoCategory[],
  videoCategory: string | undefined,
) => {
  if (!videoCategory || typeof videoCategory !== 'string') {
    return undefined;
  }

  const category = categories.find(
    (c) => c.name.toLowerCase() === videoCategory.toLowerCase(),
  );

  return category?.unit;
};

export default getCategoryName;
