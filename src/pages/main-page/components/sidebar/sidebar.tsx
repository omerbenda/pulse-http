import { Box } from '@mui/material';
import { RequestRecord } from '../../types';
import RequestRecordButton from './component/request-record-button';

type SidebarProps = {
  requestHistory: RequestRecord[];
  onRequestSelected: (item: RequestRecord) => void;
};

const Sidebar = ({ requestHistory, onRequestSelected }: SidebarProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      overflow="auto"
      width="100%"
      height="100%"
    >
      {requestHistory
        .slice()
        .reverse()
        .map((record, index) => {
          return (
            <RequestRecordButton
              record={record}
              onClick={() => onRequestSelected(record)}
              key={index}
              fullWidth
            />
          );
        })}
    </Box>
  );
};

export default Sidebar;
