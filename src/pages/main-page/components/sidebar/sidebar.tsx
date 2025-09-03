import { Box } from '@mui/material';
import { RequestRecord } from '../../types';

type SidebarProps = {
  requestHistory: RequestRecord[];
  onRequestSelected: (item: RequestRecord) => void;
};

const Sidebar = ({ requestHistory, onRequestSelected }: SidebarProps) => {
  return (
    <Box width="100%" height="100%">
      {requestHistory.map((record, index) => {
        return (
          <Box
            onClick={() => onRequestSelected(record)}
            padding={1}
            borderBottom="1px solid lightgray"
            key={index}
          >
            {record.method} {record.url}
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
