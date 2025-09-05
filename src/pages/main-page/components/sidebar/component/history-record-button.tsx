import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { RequestRecord } from '../../../types';

type HistoryRecordButtonProps = {
  record: RequestRecord;
} & ButtonProps;

const HistoryRecordButton = ({
  record,
  ...buttonProps
}: HistoryRecordButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Box display="flex" width="100%">
        <Typography px={2}>{record.method}</Typography>
        <Typography>{record.url}</Typography>
      </Box>
    </Button>
  );
};

export default HistoryRecordButton;
