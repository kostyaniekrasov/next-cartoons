'use client';

import { Avatar, Button, IconButton, ToggleButtonGroup } from '@mui/material';

import BookMark from '../../../public/icons/Interface/Bookmark.svg';
import ClearIcon from '../../../public/icons/Interface/Close.svg';
import SearchIcon from '../../../public/icons/Interface/Search.svg';
import MenuIcon from '../../../public/icons/Menu/Menu_Duo_LG.svg';

import useAuthStore from '@/store/useAuthStore';
import colors from '@/utils/customColors';
import classNames from 'classnames';
import { debounce, throttle } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AuthForm from '../AuthModal/AuthModal';
import { CustomSearch } from '../CustomSearchField/CustomSearchField';
import { CustomToggleButton } from '../CustomToggleButton/CustomToggleButton';
import { CustomTooltip } from '../CustomTooltip/CustomTooltip';
import { SignInButton } from '../SignInButton/SignInButton';
import './Header.scss';

const Header = () => {
  const [selectedFilter, setSelectedFilter] = useState('cartoon');
  const [modalSignInIsOpen, setModalSignInIsOpen] = useState(false);

  const { isAuthenticated } = useAuthStore();

  const handleModal = () => {
    setModalSignInIsOpen((prevState) => !prevState);
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setSelectedFilter(newFilter);
    }
  };
  const [value, setValue] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [throttledText, setThrottledText] = useState('');

  const debounceOnChange = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedText(value);
      }, 500),
    []
  );

  const handleThrottledChange = useMemo(
    () =>
      throttle((value: string) => {
        setThrottledText(value);
      }, 500),
    []
  );

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      debounceOnChange(event.target.value);
      handleThrottledChange(event.target.value);
    },
    [debounceOnChange, handleThrottledChange]
  );

  const handleClearSearch = () => {
    setValue('');
    debounceOnChange('');
    handleThrottledChange('');
  };

  const isEmpty = !value.trim();

  console.log(debouncedText, throttledText);

  return (
    <header className="header container flex flex-col gap-4 border-b-[1px] border-solid border-gray-200 pb-4 pt-8">
      <div className="header__top flex justify-between">
        <div className="logo h2 text-accentPink">ToonJoy</div>
        <div className="search">
          <CustomSearch
            id="search-bar"
            className="w-[432px] "
            type="text"
            value={value}
            placeholder="Пошук"
            variant="outlined"
            autoComplete="off"
            slotProps={{
              input: {
                startAdornment: (
                  <CSSTransition
                    in={isEmpty}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div className="mr-2">
                      <SearchIcon
                        className="text-gray-600"
                        width={16}
                        height={16}
                      />
                    </div>
                  </CSSTransition>
                ),
                endAdornment: (
                  <CSSTransition
                    in={!isEmpty}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div className="flex items-center gap-2">
                      <IconButton onClick={handleClearSearch}>
                        <ClearIcon
                          className="text-gray-600"
                          width={14}
                          height={14}
                        />
                      </IconButton>
                      <Button
                        className={classNames(
                          'bg-accentPink h-12 w-[72px] rounded-full transition-transform duration-300 hover:scale-105'
                        )}
                      >
                        <SearchIcon
                          className="text-white"
                          width={24}
                          height={24}
                        />
                      </Button>
                    </div>
                  </CSSTransition>
                ),
              },
            }}
            onChange={handleSearch}
          />
        </div>
        {isAuthenticated ? (
          <div className="flex gap-6">
            <CustomTooltip
              title="Збережені"
              placement="bottom"
              enterDelay={500}
              leaveDelay={200}
            >
              <IconButton
                sx={{
                  border: `1px solid ${colors.gray[200]}`,
                  height: 56,
                  width: 56,
                }}
              >
                <BookMark
                  className="text-accentPink 
                w-6 h-6 
                "
                />
              </IconButton>
            </CustomTooltip>
            <CustomTooltip
              title="Меню"
              placement="bottom"
              enterDelay={500}
              leaveDelay={200}
            >
              <IconButton
                sx={{
                  border: `1px solid ${colors.gray[200]}`,
                  height: 56,
                  padding: '4px 4px 4px 16px',
                  borderRadius: '999px',
                }}
              >
                <MenuIcon className="text-accentPink mr-2" />
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                  }}
                />
              </IconButton>
            </CustomTooltip>
          </div>
        ) : (
          <>
            <SignInButton onClick={handleModal}>Sign In</SignInButton>
            <AuthForm open={modalSignInIsOpen} close={handleModal} />
          </>
        )}
      </div>
      <div className="header__bottom">
        <ToggleButtonGroup
          value={selectedFilter}
          className="gap-2"
          exclusive
          onChange={handleFilterChange}
          aria-label="filter"
        >
          <CustomToggleButton value="all">Всі</CustomToggleButton>
          <CustomToggleButton value="cartoon">Мультики</CustomToggleButton>
          <CustomToggleButton value="learning">Навчання</CustomToggleButton>
          <CustomToggleButton value="music">Музика</CustomToggleButton>
        </ToggleButtonGroup>
      </div>
    </header>
  );
};

export default Header;
