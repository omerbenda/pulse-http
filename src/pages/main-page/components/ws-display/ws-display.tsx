import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { InterfaceInputs } from '../../types';
import { WSInputs } from './types';
import { Box, FormControl } from '@mui/material';
import { PanelGroup, Panel } from 'react-resizable-panels';

type WSDisplayProps = {
  interfaceForm: UseFormReturn<WSInputs, any, WSInputs>;
  onRecord: (record: InterfaceInputs) => void;
  onSaveRecord: (record: InterfaceInputs) => void;
};

const WSDisplay = ({
  interfaceForm,
  onRecord,
  onSaveRecord,
}: WSDisplayProps) => {
  const { handleSubmit } = interfaceForm;

  const onSubmit: SubmitHandler<WSInputs> = async (data) => {};

  return (
    <PanelGroup direction="vertical">
      <Panel>
        <Box height="100%">
          <FormControl
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            fullWidth
            sx={{ height: '100%' }}
          ></FormControl>
        </Box>
      </Panel>
    </PanelGroup>
  );
};

export default WSDisplay;
