import { Select, MenuItem } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { InterfaceInputs, InterfaceType } from '../../types';
import { MdHttp } from 'react-icons/md';
import WebsocketIcon from '../../../../assets/icons/websocket.svg?react';

type InterfaceTypeControlProps<T extends InterfaceInputs> = {
  control: Control<T>;
};

const InterfaceTypeControl = <T extends InterfaceInputs>({
  control,
}: InterfaceTypeControlProps<T>) => {
  return (
    <Controller
      name="interfaceType"
      control={control as unknown as Control<InterfaceInputs>}
      render={({ field }) => (
        <Select
          required
          sx={{
            width: 56,
            height: 56,
            '.MuiSvgIcon-root': { display: 'none' },
            '.MuiSelect-select': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: '0 !important',
            },
          }}
          {...field}
        >
          <MenuItem
            value={InterfaceType.HTTP}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MdHttp size={32} />
          </MenuItem>
          <MenuItem
            value={InterfaceType.WS}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <WebsocketIcon width={24} height={24} />
          </MenuItem>
        </Select>
      )}
    />
  );
};

export default InterfaceTypeControl;
