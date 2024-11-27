'use client';

import {
  BookmarkIcon,
  CloseIcon,
  LogoDesktopIcon,
  LogoMobileIcon,
  MenuDuoIcon,
  SearchIcon,
  SearchInputIcon,
} from '@/assets/icons';
import {
  CustomSearchField,
  CustomToggleButton,
  CustomTooltip,
  MenuBlock,
  MobileMenu,
  SignInButton,
  SignInModal,
  SignUpModal,
} from '@/components';
import useAuthStore from '@/store/useAuthStore';
import { VideoCategory } from '@/types';
import { getCurrentFilter } from '@/utils';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Drawer,
  Fab,
  Fade,
  Grow,
  Icon,
  IconButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ResetPasswordModal } from '../Auth/ResetPasswordModal';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import { CookieConsent } from '../UI/CookieConsent';

interface Props {
  categories: VideoCategory[] | undefined;
}

const Header = ({ categories }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const [selectedFilter, setSelectedFilter] = useState(
    getCurrentFilter(pathname),
  );
  const [value, setValue] = useState(query ?? '');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  const modalSignIn = searchParams.get('signin');
  const modalSignUp = searchParams.get('signup');
  const modalResetPassword = searchParams.get('reset-password');
  const modalSettings = searchParams.get('settings');

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openSignInModal = useCallback(() => {
    router.push(`${pathname}?signin=true`);
  }, [router, pathname]);

  const handleOpenMobileMenu = useCallback(() => {
    setIsOpenMobileMenu((prevState) => !prevState);
  }, []);

  const handleFilterChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setSelectedFilter(newFilter);
        router.push(`/${newFilter}`);
      }
    },
    [router],
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setValue(val);

    setIsEmpty(!val.trim());
  };

  const handleClearSearch = useCallback(() => {
    setValue('');
    setIsEmpty(true);
  }, []);

  const handleClickSearch = useCallback(() => {
    router.push(`/search?query=${value.trim()}`);
  }, [router, value]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        router.push(`/search?query=${value}`);
      }
    },
    [router, value],
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSelectedFilter(getCurrentFilter(pathname));
  }, [pathname]);

  const memoizedAvatar = useMemo(
    () => (
      <Avatar
        alt="Avatar"
        src={user?.avatar ? user.avatar.url : ''}
        sx={{
          width: '48px',
          height: '48px',
          backgroundColor: 'gray.100',
        }}
      />
    ),
    [user?.avatar],
  );

  return (
    <Fade in={isInitialized}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          boxShadow: 'none',
        }}
      >
        <CookieConsent />
        <Container
          maxWidth="2xl"
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            paddingBottom: 2,
            paddingTop: {
              xs: '8px',
              lg: '32px',
            },
            marginBottom: '16px',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => router.push('/')}
              sx={{
                padding: 0,
              }}
            >
              <Icon
                sx={{
                  width: '100%',
                  height: '100%',

                  display: {
                    xs: 'none',
                    lg: 'block',
                  },
                }}
              >
                <LogoDesktopIcon />
              </Icon>

              <Icon
                sx={{
                  width: '100%',
                  height: '100%',
                  display: {
                    xs: 'block',
                    lg: 'none',
                  },
                }}
              >
                <LogoMobileIcon />
              </Icon>
            </IconButton>
            {(!!user?.showSearch || !user) && (
              <CustomSearchField
                id="search-bar"
                sx={{
                  position: 'relative',
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                  width: {
                    sm: '332px',
                    xl: '432px',
                    '3xl': '592px',
                  },
                }}
                type="text"
                value={value}
                placeholder="Пошук"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <Collapse
                        in={isEmpty}
                        timeout={200}
                        orientation="horizontal"
                      >
                        <Box
                          component="div"
                          sx={{
                            marginRight: 2,
                            color: 'gray.600',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <SearchInputIcon width={17} height={17} />
                        </Box>
                      </Collapse>
                    ),
                    endAdornment: (
                      <Grow in={!isEmpty} timeout={200}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <IconButton
                            onClick={handleClearSearch}
                            sx={{
                              color: 'gray.900',
                            }}
                          >
                            <CloseIcon width={24} height={24} />
                          </IconButton>
                          <Button
                            sx={{
                              backgroundColor: 'accentPink.main',
                              height: '48px',
                              width: '72px',
                              color: 'white',
                              borderRadius: '9999px',
                              transition: 'transform 300ms',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                            onClick={handleClickSearch}
                          >
                            <SearchIcon width={24} height={24} />
                          </Button>
                        </Box>
                      </Grow>
                    ),
                  },
                }}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
              />
            )}

            {user ? (
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                  gap: 3,
                }}
              >
                <CustomTooltip
                  title="Збережені"
                  placement="bottom"
                  enterDelay={500}
                  leaveDelay={200}
                >
                  <IconButton
                    onClick={() => router.push('/saved')}
                    sx={{
                      border: '1px solid',
                      borderColor: 'gray.200',
                      color: 'accentPink.main',
                      height: 56,
                      width: 56,
                    }}
                  >
                    <BookmarkIcon width={24} height={24} />
                  </IconButton>
                </CustomTooltip>

                <CustomTooltip
                  title="Меню"
                  placement="bottom"
                  enterDelay={500}
                  leaveDelay={200}
                >
                  <IconButton
                    onClick={handleClick}
                    id="menu-button"
                    aria-controls={open ? 'menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{
                      border: '1px solid',
                      borderColor: 'gray.200',
                      height: 56,
                      padding: '4px 4px 4px 16px',
                      borderRadius: '999px',
                      color: 'accentPink.main',
                      gap: 1,
                    }}
                  >
                    <MenuDuoIcon />
                    {memoizedAvatar}
                  </IconButton>
                </CustomTooltip>

                <MenuBlock
                  user={user}
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={handleClose}
                />
                <ProfileSettings
                  open={
                    modalSettings === 'profile' || modalSettings === 'settings'
                  }
                />
              </Box>
            ) : (
              <SignInButton
                onClick={openSignInModal}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                }}
              >
                <Typography variant="mainTextMedium" color="accentPink">
                  Увійти
                </Typography>
              </SignInButton>
            )}
            <SignInModal open={modalSignIn === 'true'} />
            <SignUpModal open={modalSignUp === 'true'} />
            <ResetPasswordModal open={modalResetPassword === 'true'} />
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'none',
                },
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <IconButton
                sx={{
                  color: 'gray.900',
                  padding: 0,
                }}
              >
                <SearchIcon width={24} height={24} />
              </IconButton>
              <IconButton
                onClick={handleOpenMobileMenu}
                sx={{
                  color: 'gray.900',
                  padding: 0,
                }}
              >
                <MenuDuoIcon width={24} height={24} />
              </IconButton>
              <Drawer
                anchor="right"
                open={isOpenMobileMenu}
                onClose={handleOpenMobileMenu}
                sx={{
                  '& .MuiDrawer-paper': {
                    width: '100%',
                    height: '100%',
                    bgcolor: 'background.default',
                  },
                }}
              >
                <MobileMenu
                  onClose={handleOpenMobileMenu}
                  openSignIn={openSignInModal}
                  user={user}
                />
              </Drawer>
            </Box>
          </Box>

          <ToggleButtonGroup
            value={selectedFilter}
            exclusive
            onChange={handleFilterChange}
            aria-label="filter"
            sx={{
              mr: {
                xs: '-16px',
                sm: 0,
              },
            }}
          >
            <Box
              ref={emblaRef}
              sx={{
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: {
                    xs: '4px',
                    sm: '8px',
                  },
                }}
              >
                {categories?.map((category) => (
                  <CustomToggleButton
                    value={category.name}
                    key={category.name.toUpperCase()}
                    sx={{ flex: '0 0 auto', width: 'auto' }}
                  >
                    <Typography
                      variant="mainText"
                      sx={{
                        width: 'max-content',
                        fontSize: {
                          xs: '12px',
                          sm: '17px',
                        },
                      }}
                    >
                      {category.title}
                    </Typography>
                  </CustomToggleButton>
                ))}
              </Box>
            </Box>
          </ToggleButtonGroup>
        </Container>
        <Zoom in={showButton}>
          <Fab
            onClick={handleScrollToTop}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
              backgroundColor: 'accentPink.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'accentPink.dark',
              },
            }}
            aria-label="Scroll back to top"
          >
            <KeyboardArrowUpIcon
              sx={{
                color: 'white',
              }}
            />
          </Fab>
        </Zoom>
      </AppBar>
    </Fade>
  );
};

export default React.memo(Header);
