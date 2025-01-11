'use client';

import {
  BookmarkIcon,
  BurgerIcon,
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
import { useModalStore } from '@/store';
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
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
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
  const isVideoPage = pathname.includes('/video-page');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modals, openModal } = useModalStore();

  const [selectedFilter, setSelectedFilter] = useState(
    getCurrentFilter(pathname),
  );
  const [value, setValue] = useState(query ?? '');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [emblaRef] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 1,
    align: 'start',
    containScroll: 'trimSnaps',
  });

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

  const handleOpenMobileMenu = useCallback(() => {
    setIsOpenMobileMenu((prevState) => !prevState);
  }, []);

  const handleFilterChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setSelectedFilter(newFilter);
      }
    },
    [],
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

  useEffect(() => {
    const isUrlLoginOpen = searchParams.get('sign-in') === 'true';
    const isUrlSignUpOpen = searchParams.get('sign-up') === 'true';
    const isUrlResetPasswordOpen =
      searchParams.get('reset-password') === 'true';
    const isUrlSettingsOpen = searchParams.get('settings') === 'true';

    if (isUrlLoginOpen) {
      openModal('sign-in');
    }

    if (isUrlSignUpOpen) {
      openModal('sign-up');
    }

    if (isUrlResetPasswordOpen) {
      openModal('reset-password');
    }

    if (isUrlSettingsOpen) {
      openModal('settings');
    }
  }, [searchParams, openModal]);

  const memoizedAvatar = useMemo(
    () => (
      <Avatar
        alt="Avatar"
        src={user?.avatar ? user.avatar.url : '/default-avatar.png'}
        sx={{
          width: '48px',
          height: '48px',
          backgroundColor: 'gray.100',
        }}
      />
    ),
    [user?.avatar],
  );

  const handleOpenModal = (modal: keyof typeof modals) => {
    router.push(`?${modal}=true`);
    openModal(modal);
  };

  return (
    <Fade in={isInitialized}>
      <AppBar
        position="static"
        color="inherit"
        sx={{
          boxShadow: 'none',
          marginBottom: '16px',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
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
            paddingBottom: 2,
            paddingTop: {
              xs: '16px',
              lg: '32px',
            },
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: {
                xs: '37px',
                xl: 'auto',
              },
              gap: {
                xs: '20px',
                sm: 0,
              },
            }}
          >
            <IconButton
              onClick={() => router.push('/')}
              disableRipple
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
                    lg: 'flex',
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
                          <Link
                            href={`/search?query=${value.trim()}`}
                            passHref
                            style={{ textDecoration: 'none' }}
                          >
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
                            >
                              <SearchIcon width={24} height={24} />
                            </Button>
                          </Link>
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
                <CustomTooltip title="Збережені" placement="bottom">
                  <Link href={'/saved'} passHref>
                    <IconButton
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
                  </Link>
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
                  openModal={handleOpenModal}
                />
              </Box>
            ) : (
              <SignInButton
                onClick={() => handleOpenModal('sign-in')}
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

            <Box
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'none',
                },
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {(!!user?.showSearch || !user) && (
                <AnimatePresence mode="wait">
                  {showSearch ? (
                    <motion.div
                      key="searchInput"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                      }}
                    >
                      <CustomSearchField
                        id="search-bar"
                        sx={{
                          width: '100%',
                        }}
                        fullWidth
                        type="text"
                        value={value}
                        placeholder="Пошук"
                        variant="outlined"
                        autoFocus={showSearch}
                        onBlur={() => setShowSearch(false)}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="searchButton"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          display: {
                            xs: 'flex',
                            sm: 'none',
                          },
                          alignItems: 'center',
                          alignSelf: 'flex-end',
                          gap: '20px',
                          height: '37px',
                        }}
                      >
                        <IconButton
                          onClick={() => setShowSearch(true)}
                          sx={{
                            color: 'gray.900',
                            padding: 0,
                          }}
                        >
                          <SearchIcon width={24} height={24} />
                        </IconButton>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Box>

            <Box
              sx={{
                display: {
                  xl: 'none',
                },
              }}
            >
              <IconButton
                onClick={handleOpenMobileMenu}
                sx={{
                  boxSizing: 'border-box',
                  color: 'gray.900',
                  border: '1px solid',
                  borderColor: 'gray.200',
                  borderRadius: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                  width: '32px',
                  height: '32px',
                }}
              >
                <Icon
                  sx={{
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    color: 'gray.900',
                  }}
                >
                  <BurgerIcon />
                </Icon>
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
                  user={user}
                  openModal={handleOpenModal}
                />
              </Drawer>
            </Box>
          </Box>

          {!isVideoPage && (
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
                    <Link
                      href={`/${category.name}`}
                      key={category.name.toUpperCase()}
                      passHref
                      prefetch={true}
                    >
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
                    </Link>
                  ))}
                </Box>
              </Box>
            </ToggleButtonGroup>
          )}
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

        <SignInModal openModal={handleOpenModal} />
        <SignUpModal openModal={handleOpenModal} />
        <ResetPasswordModal openModal={handleOpenModal} />
        <ProfileSettings />
      </AppBar>
    </Fade>
  );
};

export default React.memo(Header);
