import { BookmarkIcon } from '@/assets/icons';
import YouTubePlayer from '@/components/UI/Video/YoutubePlayer/YoutubePlayer';
import { User } from '@/types';
import { VideoData } from '@/types/VideoData';
import seriesTitle from '@/utils/seriesTitle';
import {
  Box,
  CircularProgress,
  Divider,
  Icon,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  playlistTitle?: string;
  currentVideo?: VideoData;
  onVideoEnd: () => void;
  saveVideo: () => Promise<void>;
  isSaved: boolean;
  playlistId: string;
  user: User | null;
  goToSignIn: () => void;
  isLoading: boolean;
}

const VideoBlock = React.memo(
  ({
    playlistTitle,
    currentVideo,
    onVideoEnd,
    saveVideo,
    isSaved,
    playlistId,
    user,
    goToSignIn,
    isLoading,
  }: Props) => {
    const getRecommendedAge = (age: number) => {
      if (age <= 3) return '0+';
      if (age <= 5) return '3+';
      if (age <= 8) return '5+';
      return '0+';
    };

    const getRecommendedAgeBackgroundColor = (age: number) => {
      if (age <= 3) return 'rgba(62, 255, 45, 0.57)';
      if (age <= 5) return 'rgba(255, 216, 45, 0.2)';
      if (age <= 8) return 'rgba(255, 45, 85, 0.2)';
      return 'rgba(255, 45, 85, 0.2)';
    };
    const getRecommendedAgeTextColor = (age: number) => {
      if (age <= 3) return 'success';
      if (age <= 5) return 'warning';
      if (age <= 8) return 'accentPink';
      return 'accentPink';
    };

    return (
      <Box
        sx={{
          width: {
            '2xl': 1002,
            '3xl': '100%',
          },
        }}
      >
        {currentVideo ? (
          <Box
            sx={{
              position: 'relative',
              paddingTop: '56.25%',
              borderRadius: {
                sm: '24px',
              },
              mx: { xs: '-16px', sm: 0 },
              overflow: 'hidden',

              marginBottom: {
                xs: '16px',
                sm: '24px',
              },
            }}
          >
            <YouTubePlayer
              videoId={currentVideo.id}
              onEnded={onVideoEnd}
              playlistId={playlistId}
            />
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              height: {
                xs: '193px',
                sm: '563.57px',
              },
              marginBottom: {
                xs: '16px',
                sm: '24px',
              },
            }}
          />
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: {
              xs: '18px',
              sm: 0,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {currentVideo && playlistTitle ? (
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '17px',
                    sm: '32px',
                  },
                }}
              >
                {seriesTitle(currentVideo.snippet.title, playlistTitle)}
              </Typography>
            ) : (
              <Skeleton
                variant="text"
                sx={{
                  width: {
                    xs: '150px',
                    sm: '500px',
                  },
                }}
                height={'70px'}
              />
            )}
            {/* 0+ Title */}
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {currentVideo ? (
                <Box
                  sx={{
                    backgroundColor: getRecommendedAgeBackgroundColor(
                      currentVideo.recommendedAge,
                    ),
                    width: {
                      xs: '26px',
                      sm: '39px',
                    },
                    height: {
                      xs: '17px',
                      sm: '28px',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                  }}
                >
                  <Typography
                    color={getRecommendedAgeTextColor(
                      currentVideo.recommendedAge,
                    )}
                    sx={{
                      fontSize: {
                        xs: '13px',
                        sm: '16px',
                      },
                    }}
                  >
                    {getRecommendedAge(currentVideo.recommendedAge)}
                  </Typography>
                </Box>
              ) : (
                <Skeleton variant="text" width={100} />
              )}

              <Typography
                variant="mainTextMedium"
                color="gray.700"
                sx={{
                  fontSize: {
                    xs: '13px',
                    sm: '17px',
                  },
                }}
              >
                {playlistTitle}
              </Typography>
            </Box>
          </Box>
          {currentVideo ? (
            <IconButton
              onClick={user ? saveVideo : goToSignIn}
              disabled={isSaved}
              sx={{
                color: 'accentPink.main',
                border: '1px solid',
                padding: {
                  xs: '8px',
                  sm: '16px',
                },
                borderColor: 'gray.200',
              }}
            >
              <Icon
                sx={{
                  width: {
                    xs: '16px',
                    sm: '24px',
                  },

                  height: {
                    xs: '16px',
                    sm: '24px',
                  },
                  color: 'accentPink',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isLoading && (
                  <CircularProgress
                    color="secondary"
                    sx={{
                      position: 'absolute',
                    }}
                  />
                )}
                <BookmarkIcon width={'100%'} height={'100%'} />
              </Icon>
            </IconButton>
          ) : (
            <Skeleton
              variant="circular"
              sx={{
                width: {
                  xs: '32px',
                  sm: '42px',
                },
                height: {
                  xs: '32px',
                  sm: '42px',
                },
              }}
            />
          )}
        </Box>

        <Divider
          sx={{
            backgroundColor: 'gray.200',
            mx: '-16px',
            display: {
              xs: 'block',
              sm: 'none',
            },
          }}
        />
      </Box>
    );
  },
);

VideoBlock.displayName = 'VideoBlock';

export default VideoBlock;
