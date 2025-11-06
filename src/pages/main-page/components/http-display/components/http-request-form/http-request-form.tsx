import { useState } from 'react';
import { Button, Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { HttpRequestFormTab } from './types';
import HeadersControl from './components/headers-control';
import BodyControl from './components/body-control';
import UrlControl from './components/url-control';
import { HiArchiveBoxArrowDown } from 'react-icons/hi2';
import InterfaceTypeSelect from '../../../interface-type-select/interface-type-select';
import { HTTPInputs } from '../../types';

type HTTPRequestFormProps = {
  interfaceForm: UseFormReturn<HTTPInputs>;
  onSaveRecord: (record: HTTPInputs) => void;
};

const HTTPRequestForm = ({
  interfaceForm,
  onSaveRecord,
}: HTTPRequestFormProps) => {
  const [activeTab, setActiveTab] = useState<HttpRequestFormTab>(
    HttpRequestFormTab.HEADERS
  );

  const { control, getValues } = interfaceForm;

  const saveRequest = () => {
    const data = getValues();
    onSaveRecord(data);
  };

  return (
    <Paper
      variant="elevation"
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        height: '100%',
        gap: 2,
        padding: 2,
        overflow: 'hidden',
      }}
    >
      <Box display="flex" gap={1}>
        <InterfaceTypeSelect />
        <Box flexGrow={1}>
          <UrlControl control={control} />
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} flexDirection="column" overflow="hidden">
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Headers" value={HttpRequestFormTab.HEADERS} />
          <Tab label="Body" value={HttpRequestFormTab.BODY} />
        </Tabs>
        <Box overflow="auto" flexGrow={1}>
          {activeTab === HttpRequestFormTab.HEADERS ? (
            <HeadersControl control={control} />
          ) : activeTab === HttpRequestFormTab.BODY ? (
            <BodyControl control={control} />
          ) : null}
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={saveRequest} variant="contained" sx={{ minWidth: 0 }}>
          <HiArchiveBoxArrowDown size={20} />
        </Button>
        <Button type="submit" variant="contained">
          <Typography>Send</Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default HTTPRequestForm;
