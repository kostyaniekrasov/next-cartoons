import { NextRequest, NextResponse } from 'next/server';

const KEY = process.env.YOUTUBE_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');
  const category = searchParams.get('category');

  if (!videoId || !category) {
    return NextResponse.json(
      { error: 'Video ID and category are required' },
      { status: 400 }
    );
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const videoDataWithCategory = {
      ...data.items[0],
      category: category,
    };

    return NextResponse.json(videoDataWithCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch video info, ${error}` },
      { status: 500 }
    );
  }
}
