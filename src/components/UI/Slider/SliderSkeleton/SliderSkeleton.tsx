import { Box, Skeleton } from '@mui/material';

const SliderSkeleton = () => {
    return (
        <Box>
            <Box
                sx={{
                    width: {
                        '2xl': '318px',
                        '3xl': '438px',
                    },
                    height: {
                        '2xl': '226px',
                    },
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{
                        borderRadius: '12px',
                        marginBottom: '8px',
                    }}
                />
            </Box>
            <Skeleton variant="text" width=" 20%" height={30} />
            <Skeleton variant="text" width="10%" height={24} />
        </Box>
    );
};

export default SliderSkeleton;
