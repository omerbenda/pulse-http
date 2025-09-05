import { Box, Button, Typography } from '@mui/material';
import { RequestRecord } from '../../../types';
import { FaTrash } from 'react-icons/fa';

type SavedRecordButtonProps = {
  record: RequestRecord;
  onRecordSelected: () => void;
  onDeleteRecord: () => void;
};

const SavedRecordBox = ({
  record,
  onRecordSelected,
  onDeleteRecord,
}: SavedRecordButtonProps) => {
  return (
    <Box display="flex" width="100%">
      <Button
        variant="text"
        onClick={onRecordSelected}
        sx={{ display: 'flex', justifyContent: 'start', flexGrow: 1 }}
      >
        <Typography px={2}>{record.method}</Typography>
        <Typography>{record.url}</Typography>
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
