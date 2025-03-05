import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Forms Clone
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/create"
            color="inherit"
            startIcon={<AddIcon />}
          >
            Create Form
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
