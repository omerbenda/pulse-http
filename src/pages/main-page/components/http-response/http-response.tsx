import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { HttpResponseFormTabs } from './types';
import BodyControl from './components/body-control';
import HeadersControl from './components/headers-control';

type HTTPResponseProps = {
  response: Response;
};

const HTTPResponse = ({ response }: HTTPResponseProps) => {
  const [activeTab, setActiveTab] = useState<HttpResponseFormTabs>(
    HttpResponseFormTabs.HEADERS
  );
  const [body, setBody] = useState<string | null>(null);

  const headers: Record<string, string> = useMemo(() => {
    return Object.fromEntries(response.headers.entries());
  }, [response]);

  const parseResponseBody = async (response: Response): Promise<string> => {
    return await response.text();
  };

  useEffect(() => {
    setBody(null);
    parseResponseBody(response).then(setBody);
  }, [response]);

  return (
    <Paper
      variant="elevation"
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        padding: 2,
      }}
      style={{ boxSizing: 'border-box' }}
    >
      <Box>
        <Typography color={response.ok ? 'green' : 'red'}>
          {response.status} {response.statusText}
        </Typography>
      </Box>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
      >
        <Tab label="Headers" value={HttpResponseFormTabs.HEADERS} />
        <Tab
          label="Body"
          value={HttpResponseFormTabs.BODY}
          disabled={body === null}
        />
      </Tabs>
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {activeTab === HttpResponseFormTabs.HEADERS ? (
          <HeadersControl headers={headers} />
        ) : activeTab === HttpResponseFormTabs.BODY ? (
          <BodyControl body={body!} />
        ) : null}
      </Paper>
    </Paper>
  );
};

export default HTTPResponse;
