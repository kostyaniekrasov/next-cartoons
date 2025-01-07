'use client';

import { Playlist, VideoData } from '@/types/VideoData';
import getFirstParagraph from '@/utils/getFirstSentece';
import seriesTitle from '@/utils/seriesTitle';
import { Box, List, ListItem, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
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
          borderRadius: '12px',
          padding: 0,
          height: {
            '2xl': '645px',
            '3xl': '692px',
          },
          width: {
            '2xl': '318px',
            '3xl': '638px',
          },
          boxSizing: 'border-box',
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
            borderRadius: '12px',
          }}
        >
          {playlist?.videos.map((video, index) => {
            const imgUrl =
              video.snippet.thumbnails.maxres?.url ||
              video.snippet.thumbnails.standard?.url ||
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.medium?.url ||
              video.snippet.thumbnails.default?.url ||
              'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=';

            return (
              <React.Fragment key={video.id}>
                <ListItem
                  sx={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    mb: '16px',
                    // backgroundColor:
                    //   currentId === video.id ? 'gray.200' : 'inherit',
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
                  <Box
                    sx={{
                      width: {
                        '2xl': '318px',
                        '3xl': '638px',
                      },
                      height: {
                        '2xl': '164px',
                        '3xl': '328px',
                      },
                      borderRadius: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <Image
                      src={imgUrl}
                      alt={video.snippet.title}
                      width={318}
                      height={164}
                      style={{
                        borderRadius: '12px',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="secondaryTextSemibold"
                    color={currentId === video.id ? 'accentPink' : 'gray.700'}
                    width={'100%'}
                    mb={'4px'}
                    sx={{
                      textTransform: 'uppercase',
                      fontSize: {
                        xl: 10,
                        '3xl': 12,
                      },
                    }}
                  >
                    {`серія ${index + 1}`}
                  </Typography>

                  <Typography
                    variant="footnote"
                    color="gray.90"
                    sx={{
                      fontSize: {
                        xl: 13,
                        '3xl': 15,
                      },
                    }}
                    fontWeight={700}
                    width={'100%'}
                    mb={'2px'}
                  >
                    {seriesTitle(video.snippet.title, playlist.title)}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <PerfectScrollbar
                      options={{
                        suppressScrollX: true,
                        wheelPropagation: false,
                        swipeEasing: true,
                        wheelSpeed: 0.1,
                      }}
                      style={{
                        maxHeight: '32px',
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        variant="secondaryText"
                        fontSize={10}
                        sx={{
                          fontSize: {
                            xl: 10,
                            '3xl': 12,
                          },
                        }}
                        className="no-hover-effect"
                        component={'p'}
                        color="gray.700"
                      >
                        {getFirstParagraph(
                          video.snippet.description,
                          playlist.title,
                        )}
                      </Typography>
                    </PerfectScrollbar>
                  </Box>
                </ListItem>
              </React.Fragment>
            );
          })}
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
