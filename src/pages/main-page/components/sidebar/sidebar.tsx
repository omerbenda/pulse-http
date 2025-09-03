import { Box, Tab, Tabs } from '@mui/material';
import { RequestRecord } from '../../types';
import RequestRecordButton from './component/request-record-button';
import { SidebarTab } from './types';
import { useState } from 'react';

type SidebarProps = {
  requestHistory: RequestRecord[];
  savedRequests: RequestRecord[];
  onRequestSelected: (item: RequestRecord) => void;
};

const Sidebar = ({
  requestHistory,
  savedRequests,
  onRequestSelected,
}: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>(SidebarTab.HISTORY);

  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      width="100%"
      height="100%"
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
      >
        <Tab label="History" value={SidebarTab.HISTORY} sx={{ width: '50%' }} />
        <Tab label="Saved" value={SidebarTab.SAVED} sx={{ width: '50%' }} />
      </Tabs>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        overflow="auto"
        width="100%"
        height="100%"
      >
        {[
          ...(activeTab === SidebarTab.HISTORY
            ? requestHistory
            : savedRequests),
        ]
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
    </Box>
  );
};

export default Sidebar;
