import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import FormsList from './components/FormsList';
import FormBuilder from './components/FormBuilder';
import FormView from './components/FormView';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<FormsList />} />
          <Route path="/create" element={<FormBuilder />} />
          <Route path="/form/:id" element={<FormView />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
