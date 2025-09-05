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
      <Box display="flex" width="100%" whiteSpace="nowrap">
        <Typography px={2}>{record.method}</Typography>
        <Typography overflow="hidden" textOverflow="ellipsis">
          {record.url}
        </Typography>
      </Box>
    </Button>
  );
};

export default HistoryRecordButton;
