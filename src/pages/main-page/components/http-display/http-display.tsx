import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';
import { PanelGroup, Panel } from 'react-resizable-panels';
import HTTPRequestForm from './components/http-request-form/http-request-form';
import HTTPResponse from './components/http-response/http-response';
import { useState } from 'react';
import { InterfaceInputs } from '../../types';
import { HTTPInputs } from './types';
import ThemedResizeHandle from '../../../../common/components/themed-resize-handle';

type HTTPDisplayProps = {
  interfaceForm: UseFormReturn<HTTPInputs>;
  onRecord: (record: InterfaceInputs) => void;
  onSaveRecord: (record: InterfaceInputs) => void;
};

const HTTPDisplay = ({
  interfaceForm,
  onRecord,
  onSaveRecord,
}: HTTPDisplayProps) => {
  const [response, setResponse] = useState<Response | null>(null);

  const { handleSubmit } = interfaceForm;

  const onSubmit: SubmitHandler<HTTPInputs> = async (data) => {
    const reqHeaders = new Headers();

    data.headers?.forEach(({ name, value }) => {
      if (name && value) {
        reqHeaders.append(name, value);
      }
    });

    onRecord(data);

    const response = await fetch(data.url, {
      method: data.method,
      headers: reqHeaders,
      body: data.body ? data.body : undefined,
    });

    setResponse(response);
  };

  return (
    <PanelGroup direction="vertical">
      <Panel>
        <Box height="100%">
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
          >
            <HTTPRequestForm
              interfaceForm={interfaceForm}
              onSaveRecord={onSaveRecord}
            />
          </Box>
        </Box>
      </Panel>
      {response && (
        <>
          <ThemedResizeHandle direction="horizontal" />
          <Panel>
            <Box height="100%">
              <HTTPResponse response={response} />
            </Box>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default HTTPDisplay;
