import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { InterfaceInputs, InterfaceType } from '../../types';
import { WSInputs } from './types';
import { Box, FormControl, Paper } from '@mui/material';
import { PanelGroup, Panel } from 'react-resizable-panels';
import WSConnectionForm from './ws-connection-form/ws-connection-form';

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

  const onSubmit: SubmitHandler<WSInputs> = async (data) => {
    onRecord({ interfaceType: InterfaceType.WS, url: data.url });
  };

  return (
    <PanelGroup direction="vertical">
      <Panel>
        <Box height="100%">
          <FormControl
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            fullWidth
            sx={{ height: '100%' }}
          >
            <Paper>
              <WSConnectionForm
                interfaceForm={interfaceForm}
                onSaveRecord={onSaveRecord}
              />
            </Paper>
          </FormControl>
        </Box>
      </Panel>
    </PanelGroup>
  );
};

export default WSDisplay;
