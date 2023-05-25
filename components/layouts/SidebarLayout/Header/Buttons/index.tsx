import React from 'react';
import { Box } from '@mui/material';

import HeaderSearch from './Search';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
    </Box>
  );
}

export default HeaderButtons;
