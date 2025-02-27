import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { getCategories } from './api/todoService';

const drawerWidth = 240;

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch all categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Callback to handle category selection changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      {/* AppBar with hamburger icon to open drawer */}
      <AppBar
        position="fixed"
        sx={{
          width: openSidebar ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: openSidebar ? `${drawerWidth}px` : 0,
          transition: (theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Toolbar>
          {!openSidebar && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Todo App {selectedCategory ? `- ${selectedCategory.name}` : ''}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content area with Sidebar and Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          open={openSidebar}
          handleDrawerClose={handleDrawerClose}
          drawerWidth={drawerWidth}
          onCategorySelect={handleCategoryChange}
          selectedCategory={selectedCategory}
          categories={categories}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: (theme) =>
              theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ml: openSidebar ? `${drawerWidth}px` : 0,
          }}
        >
          <Toolbar />
          <Content categories={categories} selectedCategory={selectedCategory} />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 1,
          textAlign: 'center',
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography variant="body2">
          Made with <span role="img" aria-label="love">❤️</span> by Hanzala Jaffer
        </Typography>
      </Box>
    </Box>
  );
}

export default App;