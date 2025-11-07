import { Select, MenuItem } from '@mui/material';
import { MdHttp } from 'react-icons/md';
import WebsocketIcon from '../../../../assets/icons/websocket.svg?react';
import { InterfaceType } from '../../../../common/types/api-interface-types';
import useInterfaceStore from '../../../../common/state-stores/interface-store';
import { useShallow } from 'zustand/shallow';

type InterfaceTypeSelectProps = {
  cleanupForm: () => void;
};

const InterfaceTypeSelect = ({ cleanupForm }: InterfaceTypeSelectProps) => {
  const { interfaceType, setInterfaceType } = useInterfaceStore(
    useShallow((state) => ({
      interfaceType: state.interfaceType,
      setInterfaceType: state.setInterfaceType,
    }))
  );

  const changeInterface = (newType: InterfaceType) => {
    cleanupForm();
    setInterfaceType(newType);
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
