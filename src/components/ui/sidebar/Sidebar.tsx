import { useContext } from 'react';

import { Drawer, Box, Typography, Divider } from '@mui/material';

import { UIContext } from '../../../context/ui/UIContext';
import { SidebarItems } from './SidebarItems';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  const { sidebarOpen, isOpenSidebar } = useContext(UIContext);

  return (
    <Drawer anchor='left' open={sidebarOpen} onClose={isOpenSidebar}>
      <Box sx={{ width: 250, paddingTop: 1 }} textAlign='center'>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>

        {/* #1 Module */}
        <SidebarItems items={menuItems} />

        <Divider />

        {/* #2 Module */}
        <SidebarItems items={menuItems} />
      </Box>
    </Drawer>
  );
};
