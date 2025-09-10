import { Box, Button, Typography } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { InterfaceInputs, InterfaceType } from '../../../types';

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
        <Typography px={1}>{record.interfaceType}</Typography>
        {record.interfaceType === InterfaceType.HTTP && (
          <Typography pr={2}>{record.method}</Typography>
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
