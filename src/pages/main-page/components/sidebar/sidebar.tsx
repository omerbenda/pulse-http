import { Box, Divider, IconButton, Tab, Tabs, Typography } from '@mui/material';
import HistoryRecordButton from './component/history-record-button';
import { SidebarTab } from './types';
import { useState } from 'react';
import SavedRecordBox from './component/saved-record-button';
import { InterfaceInputs } from '../../types';
import useSettingsStore from '../../../../common/state-stores/settings-store';
import { useShallow } from 'zustand/shallow';
import { FaMoon, FaSun } from 'react-icons/fa';

type SidebarProps = {
  recordHistory: InterfaceInputs[];
  savedRecords: InterfaceInputs[];
  onRecordSelected: (item: InterfaceInputs) => void;
  onDeleteSavedRecord: (recordIndex: number) => void;
};

const Sidebar = ({
  recordHistory,
  savedRecords,
  onRecordSelected,
  onDeleteSavedRecord,
}: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<SidebarTab>(SidebarTab.HISTORY);

  const { displayTheme, setDisplayTheme } = useSettingsStore(
    useShallow((state) => ({
      displayTheme: state.displayTheme,
      setDisplayTheme: state.setDisplayTheme,
    }))
  );

  const changeDisplayTheme = async () => {
    const newTheme = displayTheme === 'light' ? 'dark' : 'light';
    await setDisplayTheme(newTheme);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      width="100%"
      height="100%"
    >
      <Box display="flex" width="100%">
        <Box display="flex" flexGrow={1} alignItems="center">
          <Typography>PulseHTTP</Typography>
        </Box>
        <IconButton onClick={changeDisplayTheme} size="small">
          {displayTheme === 'light' ? <FaSun color="orange" /> : <FaMoon />}
        </IconButton>
      </Box>
      <Divider />
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
