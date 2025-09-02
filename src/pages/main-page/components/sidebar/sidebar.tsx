import { Box } from '@mui/material';
import { RequestHistoryItem } from '../../types';

type SidebarProps = {
  history: RequestHistoryItem[];
  onRequestSelected: (item: RequestHistoryItem) => void;
};

const Sidebar = ({ history, onRequestSelected }: SidebarProps) => {
  return (
    <Box width="100%" height="100%">
      {history.map((historyItem, index) => {
        return (
          <Box
            onClick={() => onRequestSelected(historyItem)}
            padding={1}
            borderBottom="1px solid lightgray"
            key={index}
          >
            {historyItem.method} {historyItem.url}
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
