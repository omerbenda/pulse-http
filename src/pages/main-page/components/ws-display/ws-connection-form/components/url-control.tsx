import { Control } from 'react-hook-form';
import { WSInputs } from '../../types';
import { Box, TextField } from '@mui/material';

type UrlControlProps = {
  control: Control<WSInputs>;
};

const UrlControl = ({ control }: UrlControlProps) => {
  return (
    <Box display="flex" width="100%">
      <TextField
        variant="outlined"
        placeholder="URL"
        fullWidth
        {...control.register('url', { required: true })}
      />
    </Box>
  );
};

export default UrlControl;
