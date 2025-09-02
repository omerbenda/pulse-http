import { Box, Typography } from '@mui/material';

type BodyControlProps = {
  body: string;
};

const BodyControl = ({ body }: BodyControlProps) => {
  return (
    <Box overflow="auto">
      <Typography>{body}</Typography>
    </Box>
  );
};

export default BodyControl;
