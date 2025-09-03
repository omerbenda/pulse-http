import { useImperativeHandle, useState } from 'react';
import { fetch } from '@tauri-apps/plugin-http';
import {
  FormControl,
  Button,
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HttpRequestFormTab, HTTPRequestInputs } from './types';
import HeadersControl from './components/headers-control';
import BodyControl from './components/body-control';
import UrlControl from './components/url-control';
import { RequestRecord } from '../../types';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';

type HTTPRequestFormProps = {
  setHistoryReqItemRef: React.Ref<(requestRecord: RequestRecord) => void>;
  onRequest: (request: RequestRecord) => void;
  onResponse: (response: Response) => void;
  onSaveRequest: (request: RequestRecord) => void;
};

const HTTPRequestForm = ({
  setHistoryReqItemRef,
  onRequest,
  onResponse,
  onSaveRequest,
}: HTTPRequestFormProps) => {
  const [activeTab, setActiveTab] = useState<HttpRequestFormTab>(
    HttpRequestFormTab.HEADERS
  );

  const { control, getValues, setValue, handleSubmit } =
    useForm<HTTPRequestInputs>();

  const onSubmit: SubmitHandler<HTTPRequestInputs> = async (data) => {
    const reqHeaders = new Headers();

    data.headers.forEach(({ name, value }) => {
      if (name && value) {
        reqHeaders.append(name, value);
      }
    });

    onRequest({
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

    onResponse(response);
  };

  const handleRequestHistoryItem = (record: RequestRecord) => {
    setValue('url', record.url);
    setValue('method', record.method);
    setValue('headers', record.headers);

    if (record.body) {
      setValue('body', record.body);
    }
  };

  const saveRequest = () => {
    const data = getValues();
    onSaveRequest({
      url: data.url,
      method: data.method,
      headers: data.headers,
      body: data.body,
    });
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
            <Tab label="Headers" value={HttpRequestFormTab.HEADERS} />
            <Tab label="Body" value={HttpRequestFormTab.BODY} />
          </Tabs>
          <Box overflow="auto">
            {activeTab === HttpRequestFormTab.HEADERS ? (
              <HeadersControl control={control} />
            ) : activeTab === HttpRequestFormTab.BODY ? (
              <BodyControl control={control} />
            ) : null}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button
            onClick={saveRequest}
            variant="contained"
            sx={{ minWidth: 0 }}
          >
            <HiArchiveBoxArrowDown size={20} />
          </Button>
          <Button type="submit" variant="contained">
            <Typography>Send</Typography>
          </Button>
        </Box>
      </Paper>
    </FormControl>
  );
};

export default HTTPRequestForm;
