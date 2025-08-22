import { Box, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';

type HTTPResponseProps = {
  response: Response;
};

const HTTPResponse = ({ response }: HTTPResponseProps) => {
  const headers: [string, string][] = useMemo(() => {
    return Array.from(response.headers.entries());
  }, [response]);

  return (
    <Paper variant="elevation" elevation={1} sx={{ padding: 1 }}>
      <Box>
        <Typography color={response.ok ? 'green' : 'red'}>
          {response.status} {response.statusText}
        </Typography>
      </Box>
      <Paper variant="outlined">
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
      </Paper>
    </Paper>
  );
};

export default HTTPResponse;
