import React from 'react';
import { Box, InputBase, Stack, Typography } from '@mui/material';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
// import AddCategories from 'src/sections/Category/addCategories';
import Label from '../label';
import Scrollbar from '../scrollbar';

function CustomDialog({ openFlag, setonClose, placeHolder, component }) {
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      maxWidth='xl'
      open={openFlag}
      onClose={setonClose}
      transitionDuration={{
        enter: theme.transitions.duration.shortest,
        exit: 0,
      }}
      PaperProps={{
        sx: {
          mt: 3,
          overflow: 'unset',
        },
      }}
      sx={{
        [`& .${dialogClasses.container}`]: {
          alignItems: 'flex-start',
        },
        mt: 15,
      }}
    >
      <Box sx={{ p: 1, borderBottom: `solid 1px ${theme.palette.divider}` }}>
        <Stack padding={1} justifyContent="space-between" direction="row">
          <Typography sx={{ letterSpacing: 1, color: 'text.primary', fontWeight: 'bold' }}>
            {placeHolder}
          </Typography>
          <Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>
        </Stack>
      </Box>
      <Stack sx={{ p: 3, pt: 2, height: 'auto', width: 'auto' }}>{component}</Stack>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  openFlag: PropTypes.bool,
  setonClose: PropTypes.func,
  placeHolder: PropTypes.string,
  component: PropTypes.any,
};
export default CustomDialog;
