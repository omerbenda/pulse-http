import { Select, MenuItem } from '@mui/material';
import { MdHttp } from 'react-icons/md';
import WebsocketIcon from '../../../../assets/icons/websocket.svg?react';
import { InterfaceType } from '../../../../common/types/api-interface-types';
import { UseFormReturn } from 'react-hook-form';
import { InterfaceInputs } from '../../types';

type InterfaceTypeSelectProps = {
  interfaceForm: UseFormReturn<InterfaceInputs>;
};

const InterfaceTypeSelect = ({ interfaceForm }: InterfaceTypeSelectProps) => {
  const interfaceType = interfaceForm.watch('interfaceType');

  const changeInterface = (newType: InterfaceType) => {
    interfaceForm.reset({}, { keepDefaultValues: false });
    interfaceForm.setValue('interfaceType', newType);
  };

  return (
    <Select
      name="interfaceType"
      value={interfaceType}
      onChange={(e) => changeInterface(e.target.value)}
      required
      sx={{
        width: 56,
        height: 56,
        '.MuiSvgIcon-root': { display: 'none' },
        '.MuiSelect-select': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100% !important',
          p: '0 !important',
        },
      }}
    >
      <MenuItem
        value={InterfaceType.HTTP}
        sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}
      >
        <MdHttp size={32} />
      </MenuItem>
      <MenuItem
        value={InterfaceType.WS}
        sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}
      >
        <WebsocketIcon width={24} height={24} />
      </MenuItem>
    </Select>
  );
};

export default InterfaceTypeSelect;
