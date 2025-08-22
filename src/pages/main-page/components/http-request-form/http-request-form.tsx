import { useState } from 'react';
import { FormControl, Button, Box, Paper, Tab, Tabs } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { HttpRequestFormTabs, HTTPRequestInputs } from './types';
import HeadersControl from './components/headers-control';
import BodyControl from './components/body-control';
import UrlControl from './components/url-control';

type HTTPRequestFormProps = {
  onResponse: (response: Response) => void;
};

const HTTPRequestForm = ({ onResponse }: HTTPRequestFormProps) => {
  const [activeTab, setActiveTab] = useState<HttpRequestFormTabs>(
    HttpRequestFormTabs.HEADERS
  );

  const { control, handleSubmit } = useForm<HTTPRequestInputs>();

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
      body: data.body,
    });

    onResponse(response);
  };

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} component="form" fullWidth>
      <Paper
        variant="elevation"
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
        }}
      >
        <UrlControl control={control} />
        <Box>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Headers" value={HttpRequestFormTabs.HEADERS} />
            <Tab label="Body" value={HttpRequestFormTabs.BODY} />
          </Tabs>
          {activeTab === HttpRequestFormTabs.HEADERS ? (
            <HeadersControl control={control} />
          ) : activeTab === HttpRequestFormTabs.BODY ? (
            <BodyControl control={control} />
          ) : null}
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
