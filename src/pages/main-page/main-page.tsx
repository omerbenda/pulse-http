import { useRef, useState } from 'react';
import HTTPRequestForm from './components/http-request-form/http-request-form';
import HTTPResponse from './components/http-response/http-response';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Box, Paper } from '@mui/material';
import { GoGrabber } from 'react-icons/go';
import Sidebar from './components/sidebar/sidebar';
import { RequestRecord } from './types';
import { checkRequestRecordsEqual } from './utils';

const MainPage = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const [requestHistory, setRequestHistory] = useState<RequestRecord[]>([]);
  const [savedRequests, setSavedRequests] = useState<RequestRecord[]>([]);

  const setHistoryReqItemRef =
    useRef<(requestHistoryItem: RequestRecord) => void>(null);

  const onRequest = (request: RequestRecord) => {
    setRequestHistory((curr) => {
      if (curr.length > 0) {
        const last = curr[curr.length - 1];

        if (checkRequestRecordsEqual(request, last)) {
          return curr;
        }
      }

      return [...curr, request];
    });
  };

  const onSaveRequest = (request: RequestRecord) => {
    setSavedRequests((curr) => [...curr, request]);
  };

  const onResponse = (response: Response) => {
    setResponse(response);
  };

  const onHistoryRequestSelected = (item: RequestRecord) => {
    setHistoryReqItemRef.current?.(item);
  };

  return (
    <Box width="100%" height="100%">
      <PanelGroup direction="horizontal" style={{ width: '100%' }}>
        <Panel defaultSize={25}>
          <Paper variant="elevation" elevation={1} sx={{ height: '100%' }}>
            <Sidebar
              requestHistory={requestHistory}
              savedRequests={savedRequests}
              onRequestSelected={onHistoryRequestSelected}
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
          <PanelGroup direction="vertical">
            <Panel>
              <Box height="100%">
                <HTTPRequestForm
                  setHistoryReqItemRef={setHistoryReqItemRef}
                  onRequest={onRequest}
                  onResponse={onResponse}
                  onSaveRequest={onSaveRequest}
                />
              </Box>
            </Panel>
            {response && (
              <>
                <PanelResizeHandle>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="lightgray"
                    width="100%"
                    height="16px"
                  >
                    <GoGrabber size={16} style={{ rotate: '90deg' }} />
                  </Box>
                </PanelResizeHandle>
                <Panel>
                  <Box height="100%">
                    <HTTPResponse response={response} />
                  </Box>
                </Panel>
              </>
            )}
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </Box>
  );
};

export default MainPage;
