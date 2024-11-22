'use client';

import { Playlist, VideoCategory } from '@/types';
import { getCategoryName } from '@/utils';
import { Box, Typography } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import React from 'react';

interface Props {
  playlists: Playlist[];
  categories: VideoCategory[];
  slideClick: (playlistId: string, videoId: string) => void;
}

const VerticalSlider = React.memo(
  ({ playlists, categories, slideClick }: Props) => {
    const [emblaRef] = useEmblaCarousel({ axis: 'y' });

    return (
      <Box component={'section'}>
        <Box
          ref={emblaRef}
          sx={{
            overflow: 'hidden',
            width: '100%',
            display: {
              sx: 'block',
              sm: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              touchAction: 'pan-x pinch-zoom',
              gap: '16px',
              height: '60vh',
            }}
          >
            {playlists.map((playlist) => {
              if (!playlist.videos || playlist.videos.length === 0) return null;

              const firstVideo = playlist.videos[0];

              const imgUrl =
                firstVideo.snippet.thumbnails.maxres?.url ||
                firstVideo.snippet.thumbnails.standard?.url ||
                firstVideo.snippet.thumbnails.high?.url ||
                firstVideo.snippet.thumbnails.medium?.url ||
                firstVideo.snippet.thumbnails.default?.url ||
                'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';
              return (
                <Box
                  key={playlist.id}
                  sx={{
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '12px',
                      boxSizing: 'border-box',
                      width: '100%',
                      aspectRatio: '16/9',
                      marginBottom: '8px',
                      border: '1px solid',
                      borderColor: 'gray.300',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: '12px',
                      }}
                    >
                      <Image
                        src={imgUrl}
                        alt={firstVideo.snippet.title}
                        fill
                        quality={85}
                        priority
                        loading="eager"
                        sizes="100%"
                        onClick={() => slideClick(playlist.id, firstVideo.id)}
                        style={{
                          borderRadius: '12px',
                          objectPosition: 'center',
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="mainTextSemibold"
                    color="gray.900"
                    textTransform={'capitalize'}
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '17px',
                      },
                    }}
                  >
                    {playlist.title.toLowerCase()}
                  </Typography>
                  <Typography
                    variant="mainText"
                    color="gray.700"
                    component="p"
                    sx={{
                      fontSize: {
                        xs: '13px',
                        sm: '17px',
                      },
                    }}
                  >
                    {categories &&
                      getCategoryName(categories, firstVideo.category)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  },
);

VerticalSlider.displayName = 'VerticalSlider';

export default VerticalSlider;
