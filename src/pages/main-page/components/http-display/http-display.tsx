import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { HTTPInputs } from './components/http-request-form/types';
import { Box, FormControl } from '@mui/material';
import { GoGrabber } from 'react-icons/go';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import HTTPRequestForm from './components/http-request-form/http-request-form';
import HTTPResponse from './components/http-response/http-response';
import { useState } from 'react';
import { InterfaceInputs, InterfaceType } from '../../types';

type HTTPDisplayProps = {
  interfaceForm: UseFormReturn<HTTPInputs, any, HTTPInputs>;
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

    data.headers.forEach(({ name, value }) => {
      if (name && value) {
        reqHeaders.append(name, value);
      }
    });

    onRecord({
      interfaceType: InterfaceType.HTTP,
      url: data.url,
      method: data.method,
      headers: data.headers,
      body: data.body,
    });

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
          <FormControl
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            fullWidth
            sx={{ height: '100%' }}
          >
            <HTTPRequestForm
              interfaceForm={interfaceForm}
              onSaveRecord={onSaveRecord}
            />
          </FormControl>
        </Box>
      </Panel>
      {response && (
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
              <HTTPResponse response={response} />
            </Box>
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};

export default HTTPDisplay;
