import { useContext } from 'react';
import NextLink from 'next/link';

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { UIContext } from '../../context/ui';

export const Navbar = (): JSX.Element => {
  const { isOpenSidebar } = useContext(UIContext);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge='start' onClick={isOpenSidebar}>
          <MenuOutlinedIcon />
        </IconButton>

        <Link href="/" component={NextLink} underline="none" color="white">
          <Typography variant='h6'>OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
