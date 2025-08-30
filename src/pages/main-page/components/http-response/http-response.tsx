import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { HttpResponseFormTabs } from './types';

type HTTPResponseProps = {
  response: Response;
};

const HTTPResponse = ({ response }: HTTPResponseProps) => {
  const [activeTab, setActiveTab] = useState<HttpResponseFormTabs>(
    HttpResponseFormTabs.HEADERS
  );
  const [body, setBody] = useState<string | null>(null);

  const headers: [string, string][] = useMemo(() => {
    return Array.from(response.headers.entries());
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
      sx={{ height: '100%', padding: 1 }}
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
      <Paper variant="outlined">
        {activeTab === HttpResponseFormTabs.HEADERS ? (
          <Box display="flex" flexDirection="column" padding={2} gap={1}>
            {headers.map(([key, value]) => (
              <Paper
                variant="outlined"
                key={key}
                sx={{ display: 'flex', gap: 2, padding: 1 }}
              >
                <Box sx={{ width: '30%' }}>
                  <Typography>{key}</Typography>
                </Box>
                <Box sx={{ width: '70%' }}>
                  <Typography>{value}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        ) : activeTab === HttpResponseFormTabs.BODY ? (
          <Box overflow="auto">
            <Typography>{body}</Typography>
          </Box>
        ) : null}
      </Paper>
    </Paper>
  );
};

export default HTTPResponse;
