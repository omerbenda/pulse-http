import { Box, Paper } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { WSInputs } from '../types';
import InterfaceTypeControl from '../../http-display/components/interface-type-control/interface-type-control';
import UrlControl from './components/url-control';

type WSConnectionFormProps = {
  interfaceForm: UseFormReturn<WSInputs>;
  onSaveRecord: (record: WSInputs) => void;
};

const WSConnectionForm = ({
  interfaceForm,
  onSaveRecord,
}: WSConnectionFormProps) => {
  const { control } = interfaceForm;

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
      <Box display="flex">
        <InterfaceTypeControl control={control} />
        <Box flexGrow={1}>
          <UrlControl control={control} />
        </Box>
      </Box>
    </Paper>
  );
};

export default WSConnectionForm;
