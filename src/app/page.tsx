import { videoUrls } from '@/data/videoUrls';
import { extractVideoId } from '@/utils/extractVideoId';

export default function Home() {
  const videoIdsWithCategories = videoUrls
    .map((url) => extractVideoId(url.url, url.category))
    .filter(
      (data): data is { videoId: string; category: string } =>
        data.videoId !== null
    );

  console.log(videoIdsWithCategories);

  return (
    <div>
      <div className="video__block flex"></div>
    </div>
  );
}
