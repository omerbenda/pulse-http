import { useState } from 'react';
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
  const [headers, setHeaders] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<HTTPRequestInputs>();

  const onSubmit: SubmitHandler<HTTPRequestInputs> = async (data) => {
    console.log('data', data);
    const response = await fetch(data.url, {
      method: data.method,
      headers: data.headers,
      body: data.body,
    });
    console.log(response);
  };

  const createHeader = (name: string) => {
    setHeaders((curr) => [...curr, name]);
  };

  const changeHeader = (index: number, value: string) => {
    setHeaders((curr) =>
      curr.map((headerValue, headerIndex) =>
        headerIndex === index ? value : headerValue
      )
    );

    reset({ headers: {} }, { keepDirtyValues: false });
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
      <Box>
        {Object.values(headers).map((header, index) => (
          <Box display="flex" key={index}>
            <TextField
              placeholder="Header"
              variant="outlined"
              fullWidth
              onChange={(e) => changeHeader(index, e.target.value)}
              value={header}
              autoFocus
            />
            <TextField
              placeholder="Value"
              variant="outlined"
              fullWidth
              {...register(`headers.${header}`)}
            />
          </Box>
        ))}
        <Box display="flex">
          <TextField
            placeholder="Header"
            fullWidth
            onChange={(e) => createHeader(e.target.value)}
            value=""
            disabled={headers[headers.length - 1] === ''}
          />
          <TextField placeholder="Value" fullWidth disabled />
        </Box>
      </Box>
      <Button type="submit" variant="contained">
        Send
      </Button>
    </FormControl>
  );
};

export default HTTPRequestForm;
