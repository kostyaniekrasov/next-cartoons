'use client';

import { Playlist, VideoData } from '@/types/VideoData';
import convertYouTubeDuration from '@/utils/convertYotubeDuration';
import getFirstParagraph from '@/utils/getFirstSentece';
import seriesTitle from '@/utils/seriesTitle';
import {
  Box,
  Divider,
  List,
  ListItem,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

interface Props {
  playlist?: Playlist;
  ChangeVideo: (video: VideoData) => void;
  currentId?: string;
}

const ListWithCustomScroll = React.memo(
  ({ playlist, ChangeVideo, currentId }: Props) => {
    return playlist ? (
      <List
        sx={{
          height: {
            '2xl': '584px',
            '3xl': '692px',
          },
          width: {
            '2xl': '424px',
            '3xl': '438px',
          },
          boxSizing: 'border-box',
          border: '1px solid',
          borderColor: 'gray.200',
          borderRadius: '20px',
          padding: '4px',
          backgroundColor: 'gray.100',
        }}
      >
        <PerfectScrollbar
          options={{
            suppressScrollX: true,
            wheelPropagation: false,
            swipeEasing: true,
            wheelSpeed: 0.5,
          }}
          style={{
            maxHeight: '100%',
            height: '100%',
          }}
        >
          {playlist?.videos.map((video, index) => (
            <React.Fragment key={video.id}>
              <ListItem
                sx={{
                  padding: '16px',
                  borderRadius: '20px',
                  display: 'flex',
                  gap: '16px',
                  cursor: 'pointer',
                  // maxHeight: '95px',
                  backgroundColor:
                    currentId === video.id ? 'gray.200' : 'inherit',

                  '&:hover': {
                    transition: 'all 0.3s ease-out',
                    backgroundColor: 'gray.200',
                  },
                  '&:hover .MuiTypography-root:not(.no-hover-effect)': {
                    color: 'accentPink.main',
                  },
                }}
                onClick={() => ChangeVideo(video)}
              >
                <Box width={'35px'} height={'35px'}>
                  <Typography
                    variant="h1"
                    color={currentId === video.id ? 'accentPink' : 'gray.900'}
                    width={'35px'}
                    lineHeight={'32px'}
                    textAlign={'center'}
                  >
                    {index + 1}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="mainTextBold"
                      component={'p'}
                      color={currentId === video.id ? 'accentPink' : 'gray.900'}
                    >
                      {seriesTitle(video.snippet.title, playlist.title)}
                    </Typography>
                    <Typography
                      component={'p'}
                      variant="mainTextBold"
                      color={currentId === video.id ? 'accentPink' : 'gray.900'}
                    >
                      {convertYouTubeDuration(video.contentDetails.duration)} хв
                    </Typography>
                  </Box>
                  <PerfectScrollbar
                    options={{
                      suppressScrollX: true,
                      wheelPropagation: false,
                      swipeEasing: true,
                      wheelSpeed: 0.1,
                    }}
                    style={{
                      maxHeight: '72px',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      variant="secondaryText"
                      className="no-hover-effect"
                    >
                      {getFirstParagraph(
                        video.snippet.description,
                        playlist.title,
                      )}
                    </Typography>
                  </PerfectScrollbar>
                </Box>
              </ListItem>
              {index !== playlist.videos.length - 1 && (
                <Divider
                  sx={{
                    backgroundColor: 'gray.200',
                    height: '1px',
                    margin: '10px 0',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </PerfectScrollbar>
      </List>
    ) : (
      <EpisodeSkeleton />
    );
  },
);

const EpisodeSkeleton = () => {
  return (
    <Box
      width={'425px'}
      height={'584px'}
      sx={{
        width: '425px',
        height: '584px',
        borderColor: 'gray.200',
        borderRadius: '20px',
        padding: '4px',
        backgroundColor: 'gray.100',
        overflow: 'hidden',
      }}
    >
      {Array.from(new Array(6)).map((_, index) => (
        <ListItem
          key={index + 'a'}
          sx={{
            padding: '16px',
            borderRadius: '20px',
            display: 'flex',
            gap: '16px',
            cursor: 'pointer',
            backgroundColor: 'gray.100',
            width: '425px',
          }}
        >
          <Skeleton
            variant="text"
            width={35}
            height={32}
            sx={{ lineHeight: '32px', textAlign: 'center' }}
          />

          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '8px',
              }}
            >
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width={50} height={24} />
            </Box>

            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton
              variant="text"
              width="80%"
              height={20}
              sx={{ marginTop: '4px' }}
            />
          </Box>
        </ListItem>
      ))}
    </Box>
  );
};

ListWithCustomScroll.displayName = 'ListWithCustomScroll';
export default ListWithCustomScroll;
