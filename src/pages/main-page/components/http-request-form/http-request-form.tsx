import { useState } from 'react';
import {
  FormControl,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Paper,
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

  const changeHeaderName = (index: number, value: string) => {
    setHeaders((curr) =>
      curr.map((headerValue, headerIndex) =>
        headerIndex === index ? value : headerValue
      )
    );

    reset({ headers: {} }, { keepDirtyValues: false });
  };

  const deleteHeader = (index: number) => {
    setHeaders((curr) => curr.filter((_, i) => i !== index));

    reset({ headers: {} }, { keepDirtyValues: false });
  };

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} component="form" fullWidth>
      <Paper
        variant="elevation"
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
          padding: 2,
        }}
      >
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
        <Paper variant="outlined" elevation={1} sx={{ padding: 2 }}>
          {Object.values(headers).map((header, index) => (
            <Box display="flex" key={index}>
              <TextField
                placeholder="Header"
                variant="outlined"
                fullWidth
                onChange={(e) => changeHeaderName(index, e.target.value)}
                onKeyDown={(e) => {
                  e.key === 'Backspace' && !header && deleteHeader(index);
                }}
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
        </Paper>
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </Paper>
    </FormControl>
  );
};

export default HTTPRequestForm;
