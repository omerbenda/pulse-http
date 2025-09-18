import { Control, useFieldArray } from 'react-hook-form';
import { WSInputs } from '../../../types';
import { Paper, TextField } from '@mui/material';

type ProtocolControlProps = {
  control: Control<WSInputs>;
};

const ProtocolControl = ({ control }: ProtocolControlProps) => {
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'protocols',
  });

  const createHeader = (name: string) => {
    append({ name });
  };

  const changeProtocolName = (index: number, name: string) => {
    update(index, { name });
  };

  return (
    <Paper variant="outlined" sx={{ padding: 2 }}>
      {fields.map((protocol, index) => (
        <TextField
          placeholder="Protocol"
          variant="outlined"
          fullWidth
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !protocol.name) {
              e.preventDefault();
              remove(index);
            }
          }}
          {...control.register(`protocols.${index}.name`, {
            onChange: (e) => changeProtocolName(index, e.target.value),
          })}
        />
      ))}
      <TextField
        placeholder="Protocol"
        variant="outlined"
        onChange={(e) => createHeader(e.target.value)}
        value=""
        fullWidth
        autoFocus
        disabled={fields.length !== 0 && fields[fields.length - 1].name === ''}
      />
    </Paper>
  );
};

export default ProtocolControl;
