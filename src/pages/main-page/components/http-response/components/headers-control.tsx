import { Box, Paper, Typography } from '@mui/material';

type HeadersControlProps = {
  headers: Record<string, string>;
};

const HeadersControl = ({ headers }: HeadersControlProps) => {
  return (
    <Box display="flex" flexDirection="column" padding={2} gap={1}>
      {Object.entries(headers).map(([key, value]) => (
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
  );
};

export default HeadersControl;
