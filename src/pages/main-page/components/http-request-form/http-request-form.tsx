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
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { HTTPRequestInputs, HTTPRequestMethod } from './types';

const HTTPRequestForm = () => {
  const { control, register, handleSubmit } = useForm<HTTPRequestInputs>();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const onSubmit: SubmitHandler<HTTPRequestInputs> = async (data) => {
    console.log('data', data);

    const reqHeaders = new Headers();

    data.headers.forEach(({ name, value }) => {
      if (name && value) {
        reqHeaders.append(name, value);
      }
    });

    console.log('headers', Object.fromEntries(reqHeaders.entries()));

    const response = await fetch(data.url, {
      method: data.method,
      headers: reqHeaders,
      body: data.body,
    });
    console.log(response);
  };

  const createHeader = (name: string) => {
    append({ name, value: '' });
  };

  const changeHeaderName = (index: number, name: string) => {
    update(index, { name, value: fields[index]?.value || '' });
  };

  const deleteHeader = (index: number) => {
    remove(index);
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
          {fields.map(({ name }, index) => (
            <Box display="flex" key={index}>
              <TextField
                placeholder="Header"
                variant="outlined"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !name) {
                    e.preventDefault();
                    deleteHeader(index);
                  }
                }}
                value={name}
                autoFocus
                {...register(`headers.${index}.name`, {
                  onChange: (e) => changeHeaderName(index, e.target.value),
                })}
              />
              <TextField
                placeholder="Value"
                variant="outlined"
                fullWidth
                {...register(`headers.${index}.value`, { required: true })}
              />
            </Box>
          ))}
          <Box display="flex">
            <TextField
              placeholder="Header"
              fullWidth
              onChange={(e) => createHeader(e.target.value)}
              value=""
              disabled={
                fields.length !== 0 && fields[fields.length - 1].name === ''
              }
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
