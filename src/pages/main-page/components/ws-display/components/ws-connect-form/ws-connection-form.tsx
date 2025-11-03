import { Box, Button, Paper, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { WSInputs } from '../../types';
import UrlControl from './components/url-control';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';
import InterfaceTypeSelect from '../../../interface-type-select/interface-type-select';
import ProtocolControl from './components/protocol-control';

type WSConnectionFormProps = {
  interfaceForm: UseFormReturn<WSInputs>;
  onSaveRecord: (record: WSInputs) => void;
};

const WSConnectForm = ({
  interfaceForm,
  onSaveRecord,
}: WSConnectionFormProps) => {
  const { control, getValues } = interfaceForm;

  const saveData = () => {
    const data = getValues();
    onSaveRecord(data);
  };

  return (
    <Paper
      variant="elevation"
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        height: '100%',
        gap: 2,
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Box display="flex" gap={1}>
        <InterfaceTypeSelect />
        <Box flexGrow={1}>
          <UrlControl control={control} />
        </Box>
      </Box>
      <Box flexGrow={1} overflow="auto">
        <ProtocolControl control={control} />
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={saveData} variant="contained" sx={{ minWidth: 0 }}>
          <HiArchiveBoxArrowDown size={20} />
        </Button>
        <Button type="submit" variant="contained">
          <Typography>Connect</Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default WSConnectForm;
