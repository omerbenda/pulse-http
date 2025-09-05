import { Box, Tab, Tabs } from '@mui/material';
import { RequestRecord } from '../../types';
import HistoryRecordButton from './component/history-record-button';
import { SidebarTab } from './types';
import { useState } from 'react';
import SavedRecordBox from './component/saved-record-button';

type SidebarProps = {
  recordHistory: RequestRecord[];
  savedRecords: RequestRecord[];
  onRecordSelected: (item: RequestRecord) => void;
  onDeleteSavedRecord: (recordIndex: number) => void;
};

const Sidebar = ({
  recordHistory,
  savedRecords,
  onRecordSelected,
  onDeleteSavedRecord,
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
        variant="fullWidth"
        onChange={(_, newValue) => setActiveTab(newValue)}
      >
        <Tab label="History" value={SidebarTab.HISTORY} />
        <Tab label="Saved" value={SidebarTab.SAVED} />
      </Tabs>
      {activeTab === SidebarTab.HISTORY ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          overflow="auto"
          width="100%"
          height="100%"
        >
          {[...recordHistory].reverse().map((record, index) => (
            <HistoryRecordButton
              record={record}
              onClick={() => onRecordSelected(record)}
              key={index}
              fullWidth
            />
          ))}
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          overflow="auto"
          width="100%"
          height="100%"
        >
          {[...savedRecords].reverse().map((record, index, array) => (
            <SavedRecordBox
              record={record}
              onRecordSelected={() => onRecordSelected(record)}
              onDeleteRecord={() =>
                onDeleteSavedRecord(array.length - 1 - index)
              }
              key={index}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
