import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Box, Paper } from '@mui/material';
import { GoGrabber } from 'react-icons/go';
import Sidebar from './components/sidebar/sidebar';
import { checkRecordsEqual } from './utils';
import { savedRecordsStore } from '../../common/stores';
import { useForm, UseFormReturn } from 'react-hook-form';
import HTTPDisplay from './components/http-display/http-display';
import { InterfaceInputs } from './types';
import { HTTPInputs } from './components/http-display/types';
import WSDisplay from './components/ws-display/ws-display';
import { WSInputs } from './components/ws-display/types';
import useInterfaceStore from '../../common/state-stores/interface-store';
import { InterfaceType } from '../../common/types/api-interface-types';
import { useShallow } from 'zustand/shallow';

const MainPage = () => {
  const [recordHistory, setRecordHistory] = useState<InterfaceInputs[]>([]);
  const [savedRecords, setSavedRecords] = useState<InterfaceInputs[]>([]);

  const { interfaceType, setInterfaceType } = useInterfaceStore(
    useShallow((state) => ({
      interfaceType: state.interfaceType,
      setInterfaceType: state.setInterfaceType,
    }))
  );

  const interfaceForm = useForm<InterfaceInputs>({
    shouldUnregister: true,
  });

  const onRecord = (record: InterfaceInputs) => {
    setRecordHistory((curr) => {
      if (curr.length > 0) {
        const last = curr[curr.length - 1];

        if (checkRecordsEqual(record, last)) {
          return curr;
        }
      }

      return [...curr, record];
    });
  };

  const onSaveRecord = async (record: InterfaceInputs) => {
    const newSavedRecords = [...savedRecords, record];
    setSavedRecords(newSavedRecords);
    await savedRecordsStore.set('data', newSavedRecords);
  };

  const onRecordSelected = (record: InterfaceInputs) => {
    setInterfaceType(record.interfaceType);

    switch (record.interfaceType) {
      case InterfaceType.HTTP: {
        interfaceForm.setValue('url', record.url);
        interfaceForm.setValue('method', record.method);
        interfaceForm.setValue('headers', record.headers);

        if (record.body) {
          interfaceForm.setValue('body', record.body);
        }

        break;
      }
      case InterfaceType.WS: {
        interfaceForm.setValue('url', record.url);

        break;
      }
    }
  };

  const deleteSavedRecord = async (recordIndex: number) => {
    const newSavedRecords = savedRecords.filter(
      (_currRecord, index) => recordIndex !== index
    );
    setSavedRecords(newSavedRecords);
    await savedRecordsStore.set('data', newSavedRecords);
  };

  useEffect(() => {
    interfaceForm.setValue('interfaceType', interfaceType);
  }, [interfaceType]);

  useEffect(() => {
    savedRecordsStore
      .get<InterfaceInputs[]>('data')
      .then((records) => setSavedRecords(records || []));
  }, []);

  return (
    <Box width="100%" height="100%">
      <PanelGroup direction="horizontal" style={{ width: '100%' }}>
        <Panel defaultSize={25}>
          <Paper variant="elevation" elevation={1} sx={{ height: '100%' }}>
            <Sidebar
              recordHistory={recordHistory}
              savedRecords={savedRecords}
              onRecordSelected={onRecordSelected}
              onDeleteSavedRecord={deleteSavedRecord}
            />
          </Paper>
        </Panel>
        <PanelResizeHandle>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bgcolor="lightgray"
            width="16px"
            height="100%"
          >
            <GoGrabber size={16} />
          </Box>
        </PanelResizeHandle>
        <Panel>
          {interfaceType === InterfaceType.HTTP ? (
            <HTTPDisplay
              interfaceForm={
                interfaceForm as UseFormReturn<HTTPInputs, any, HTTPInputs>
              }
              onRecord={onRecord}
              onSaveRecord={onSaveRecord}
            />
          ) : (
            interfaceType === InterfaceType.WS && (
              <WSDisplay
                interfaceForm={
                  interfaceForm as UseFormReturn<WSInputs, any, WSInputs>
                }
                onRecord={onRecord}
                onSaveRecord={onSaveRecord}
              />
            )
          )}
        </Panel>
      </PanelGroup>
    </Box>
  );
};

export default MainPage;
