import { Box, Button, ButtonProps, Typography, useTheme } from '@mui/material';
import { InterfaceInputs } from '../../../types';
import WebsocketIcon from '../../../../../assets/icons/websocket.svg?react';
import { MdHttp } from 'react-icons/md';
import { InterfaceType } from '../../../../../common/types/api-interface-types';

type HistoryRecordButtonProps = {
  record: InterfaceInputs;
} & ButtonProps;

const HistoryRecordButton = ({
  record,
  ...buttonProps
}: HistoryRecordButtonProps) => {
  const theme = useTheme();

  return (
    <Button {...buttonProps}>
      <Box display="flex" width="100%" whiteSpace="nowrap">
        <Box display="flex" alignItems="center" px={1} height={24}>
          {record.interfaceType === InterfaceType.HTTP ? (
            <MdHttp size={32} />
          ) : (
            record.interfaceType === InterfaceType.WS && (
              <WebsocketIcon
                fill={theme.palette.primary.main}
                width={24}
                height={24}
              />
            )
          )}
        </Box>
        {record.interfaceType === InterfaceType.HTTP && (
          <Typography pr={1}>{record.method}</Typography>
        )}
        <Typography overflow="hidden" textOverflow="ellipsis">
          {record.url}
        </Typography>
      </Box>
    </Button>
  );
};

export default HistoryRecordButton;
