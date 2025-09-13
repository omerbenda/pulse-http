import { Box, Button, Paper, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { WSInputs } from '../../types';
import UrlControl from './components/url-control';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';
import { InterfaceType } from '../../../../types';
import InterfaceTypeControl from '../../../interface-type-control/interface-type-control';

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

    onSaveRecord({
      interfaceType: InterfaceType.WS,
      url: data.url,
    });
  };

  return (
    <Paper
      variant="elevation"
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 2,
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Box display="flex" gap={1}>
        <InterfaceTypeControl control={control} />
        <Box flexGrow={1}>
          <UrlControl control={control} />
        </Box>
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
