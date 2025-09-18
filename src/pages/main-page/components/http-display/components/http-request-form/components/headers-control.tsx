import { Control, useFieldArray } from 'react-hook-form';
import { Paper, Box, TextField } from '@mui/material';
import { HTTPInputs } from '../../../types';

type HeadersControlProps = {
  control: Control<HTTPInputs>;
};

const HeadersControl = ({ control }: HeadersControlProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'headers',
  });

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
    <Paper variant="outlined" sx={{ padding: 2 }}>
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
            {...control.register(`headers.${index}.name`, {
              onChange: (e) => changeHeaderName(index, e.target.value),
            })}
          />
          <TextField
            placeholder="Value"
            variant="outlined"
            fullWidth
            {...control.register(`headers.${index}.value`, { required: true })}
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
  );
};

export default HeadersControl;
