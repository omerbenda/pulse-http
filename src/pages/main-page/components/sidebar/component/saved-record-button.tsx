import { Box, Button, Typography, useTheme } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { InterfaceInputs, InterfaceType } from '../../../types';
import { MdHttp } from 'react-icons/md';
import WebsocketIcon from '../../../../../assets/icons/websocket.svg?react';

type SavedRecordButtonBox = {
  record: InterfaceInputs;
  onRecordSelected: () => void;
  onDeleteRecord: () => void;
};

const SavedRecordBox = ({
  record,
  onRecordSelected,
  onDeleteRecord,
}: SavedRecordButtonBox) => {
  const theme = useTheme();

  return (
    <Box display="flex" width="100%" whiteSpace="nowrap">
      <Button
        variant="text"
        onClick={onRecordSelected}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexGrow: 1,
        }}
      >
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
      </Button>
      <Button
        size="small"
        variant="text"
        onClick={onDeleteRecord}
        sx={{ borderRadius: '9999px', minWidth: 0, width: 36, flexShrink: 0 }}
      >
        <FaTrash size={16} />
      </Button>
    </Box>
  );
};

export default SavedRecordBox;
