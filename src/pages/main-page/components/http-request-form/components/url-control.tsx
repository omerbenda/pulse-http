import { Control, Controller } from 'react-hook-form';
import { HTTPRequestInputs, HTTPRequestMethod } from '../types';
import { Box, Select, MenuItem, TextField } from '@mui/material';

type UrlControlProps = {
  control: Control<HTTPRequestInputs, any, HTTPRequestInputs>;
};

const UrlControl = ({ control }: UrlControlProps) => {
  return (
    <Box display="flex">
      <Controller
        name="method"
        control={control}
        defaultValue={HTTPRequestMethod.GET}
        render={({ field }) => (
          <Select
            sx={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
            required
            {...field}
          >
            {Object.keys(HTTPRequestMethod).map((method) => (
              <MenuItem key={method} value={method}>
                {HTTPRequestMethod[method as keyof typeof HTTPRequestMethod]}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <TextField
        variant="outlined"
        placeholder="URL"
        fullWidth
        slotProps={{
          input: {
            sx: {
              borderColor: 'red',
              borderStartStartRadius: 0,
              borderEndStartRadius: 0,
            },
          },
        }}
        {...control.register('url', { required: true })}
      />
    </Box>
  );
};

export default UrlControl;
