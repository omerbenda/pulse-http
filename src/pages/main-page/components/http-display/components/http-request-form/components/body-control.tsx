import { Control } from 'react-hook-form';
import { HTTPInputs } from '../types';
import { TextField } from '@mui/material';

type BodyControlProps = {
  control: Control<HTTPInputs, any, HTTPInputs>;
};

const BodyControl = ({ control }: BodyControlProps) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      multiline
      rows={4}
      placeholder="Request body"
      {...control.register('body')}
    />
  );
};

export default BodyControl;
