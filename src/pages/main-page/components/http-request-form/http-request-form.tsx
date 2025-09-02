import { useImperativeHandle, useState } from 'react';
import { fetch } from '@tauri-apps/plugin-http';
import { FormControl, Button, Box, Paper, Tab, Tabs } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HttpRequestFormTabs, HTTPRequestInputs } from './types';
import HeadersControl from './components/headers-control';
import BodyControl from './components/body-control';
import UrlControl from './components/url-control';
import { RequestHistoryItem } from '../../types';

type HTTPRequestFormProps = {
  setHistoryReqItemRef: React.Ref<
    (requestHistoryItem: RequestHistoryItem) => void
  >;
  onResponse: (response: Response) => void;
};

const HTTPRequestForm = ({
  setHistoryReqItemRef,
  onResponse,
}: HTTPRequestFormProps) => {
  const [activeTab, setActiveTab] = useState<HttpRequestFormTabs>(
    HttpRequestFormTabs.HEADERS
  );

  const { control, setValue, handleSubmit } = useForm<HTTPRequestInputs>();

  const onSubmit: SubmitHandler<HTTPRequestInputs> = async (data) => {
    const reqHeaders = new Headers();

    data.headers.forEach(({ name, value }) => {
      if (name && value) {
        reqHeaders.append(name, value);
      }
    });

    const response = await fetch(data.url, {
      method: data.method,
      headers: reqHeaders,
      body: data.body ? data.body : undefined,
    });

    onResponse(response);
  };

  const handleRequestHistoryItem = (item: RequestHistoryItem) => {
    setValue('url', item.url);
    setValue('method', item.method);
    setValue('headers', item.headers);

    if (item.body) {
      setValue('body', item.body);
    }
  };

  useImperativeHandle(setHistoryReqItemRef, () => handleRequestHistoryItem, [
    handleRequestHistoryItem,
  ]);

  return (
    <FormControl
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      fullWidth
      sx={{ height: '100%' }}
    >
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
        <UrlControl control={control} />
        <Box display="flex" flexDirection="column" overflow="hidden">
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Headers" value={HttpRequestFormTabs.HEADERS} />
            <Tab label="Body" value={HttpRequestFormTabs.BODY} />
          </Tabs>
          <Box overflow="auto">
            {activeTab === HttpRequestFormTabs.HEADERS ? (
              <HeadersControl control={control} />
            ) : activeTab === HttpRequestFormTabs.BODY ? (
              <BodyControl control={control} />
            ) : null}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>
      </Paper>
    </FormControl>
  );
};

export default HTTPRequestForm;
