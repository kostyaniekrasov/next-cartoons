import { fetchAvatars } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const avatars = await fetchAvatars();
    return NextResponse.json(avatars);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch avatars', error },
      { status: 500 },
    );
  }
}
