import { useEffect, useState } from 'react';
import { Box, FormControl } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { GoGrabber } from 'react-icons/go';
import { InterfaceInputs, InterfaceType } from '../../types';
import { WSInputs } from './types';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import WSConnectForm from './components/ws-connect-form/ws-connection-form';
import WSConnection from './components/ws-connection';

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
  const [connection, setConnection] = useState<WebSocket | null>(null);

  const { handleSubmit } = interfaceForm;

  const onSubmit: SubmitHandler<WSInputs> = async (data) => {
    onRecord({ interfaceType: InterfaceType.WS, url: data.url });
    setConnection(new WebSocket(data.url));
  };

  useEffect(() => {
    if (connection) {
      return () => {
        connection.close();
      };
    }
  }, [connection]);

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
            <WSConnectForm
              interfaceForm={interfaceForm}
              onSaveRecord={onSaveRecord}
            />
          </FormControl>
        </Box>
      </Panel>
      {connection && (
        <>
          <PanelResizeHandle>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="lightgray"
              width="100%"
              height="16px"
            >
              <GoGrabber size={16} style={{ rotate: '90deg' }} />
            </Box>
          </PanelResizeHandle>
          <Panel>
            <Box height="100%">
              <WSConnection connection={connection} />
            </Box>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default WSDisplay;
