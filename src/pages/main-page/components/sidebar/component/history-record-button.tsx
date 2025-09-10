import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { InterfaceInputs, InterfaceType } from '../../../types';

type HistoryRecordButtonProps = {
  record: InterfaceInputs;
} & ButtonProps;

const HistoryRecordButton = ({
  record,
  ...buttonProps
}: HistoryRecordButtonProps) => {
  return (
    <Button {...buttonProps}>
      <Box display="flex" width="100%" whiteSpace="nowrap">
        <Typography px={1}>{record.interfaceType}</Typography>
        {record.interfaceType === InterfaceType.HTTP && (
          <Typography pr={2}>{record.method}</Typography>
        )}
        <Typography overflow="hidden" textOverflow="ellipsis">
          {record.url}
        </Typography>
      </Box>
    </Button>
  );
};

export default HistoryRecordButton;
