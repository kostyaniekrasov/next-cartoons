import { Box, Skeleton } from '@mui/material';

const VerticalSliderSkeleton = () => {
  return (
    <Box
      component={'section'}
      sx={{
        display: {
          xs: 'block',
          sm: 'none',
        },
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
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
          {[...Array(2)].map((_, index) => (
            <Box
              key={index + 's'}
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
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{
                    borderRadius: '12px',
                  }}
                />
              </Box>
              <Skeleton
                variant="text"
                width="60%"
                height={24}
                sx={{
                  marginTop: '8px',
                }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{
                  marginTop: '4px',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default VerticalSliderSkeleton;
