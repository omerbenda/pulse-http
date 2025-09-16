import { Select, MenuItem } from '@mui/material';
import { MdHttp } from 'react-icons/md';
import WebsocketIcon from '../../../../assets/icons/websocket.svg?react';
import { InterfaceType } from '../../../../common/types/api-interface-types';
import useInterfaceStore from '../../../../common/state-stores/interface-store';
import { useShallow } from 'zustand/shallow';

const InterfaceTypeSelect = () => {
  const { interfaceType, setInterfaceType } = useInterfaceStore(
    useShallow((state) => ({
      interfaceType: state.interfaceType,
      setInterfaceType: state.setInterfaceType,
    }))
  );

  return (
    <Select
      value={interfaceType}
      onChange={(e) => setInterfaceType(e.target.value)}
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
  );
};

export default InterfaceTypeSelect;
