import {
  FormControl,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HTTPRequestInputs, HTTPRequestMethod } from './types';

const HTTPRequestForm = () => {
  const { register, handleSubmit } = useForm<HTTPRequestInputs>();

  const onSubmit: SubmitHandler<HTTPRequestInputs> = async (data) => {
    const response = await fetch(data.url, {
      method: data.method,
      headers: data.headers,
      body: data.body,
    });
    console.log(response);
  };

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} component="form" fullWidth>
      <Box display="flex">
        <Select
          defaultValue={HTTPRequestMethod.GET}
          sx={{ borderStartEndRadius: 0, borderEndEndRadius: 0 }}
          {...register('method', { required: true })}
        >
          {Object.keys(HTTPRequestMethod).map((method) => (
            <MenuItem key={method} value={method}>
              {HTTPRequestMethod[method as keyof typeof HTTPRequestMethod]}
            </MenuItem>
          ))}
        </Select>
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
          {...register('url', { required: true })}
        />
      </Box>
      <Button type="submit" variant="contained">
        Send
      </Button>
    </FormControl>
  );
};

export default HTTPRequestForm;
