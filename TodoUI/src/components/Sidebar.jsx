import React from 'react';
import { Drawer, Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Categories from './Categories';

function Sidebar({ open, handleDrawerClose, drawerWidth, onCategorySelect, selectedCategory, categories}) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
        <Typography variant="h6">Categories</Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Categories categories={categories} selectedCategory={selectedCategory} onCategorySelect={onCategorySelect} />
    </Drawer>
  );
}

export default Sidebar;