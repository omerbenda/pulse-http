import { useRef, useState } from 'react';
import HTTPRequestForm from './components/http-request-form/http-request-form';
import HTTPResponse from './components/http-response/http-response';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Box, Paper } from '@mui/material';
import { GoGrabber } from 'react-icons/go';
import Sidebar from './components/sidebar/sidebar';
import { RequestHistoryItem } from './types';
import { HTTPRequestMethod } from './components/http-request-form/types';

const MainPage = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const [history, setHistory] = useState<RequestHistoryItem[]>([
    {
      url: 'placeholder',
      method: HTTPRequestMethod.GET,
      headers: [{ name: 'test', value: 'wow' }],
    },
  ]);

  const setHistoryReqItemRef =
    useRef<(requestHistoryItem: RequestHistoryItem) => void>(null);

  const onResponse = (response: Response) => {
    setResponse(response);
  };

  const onHistoryRequestSelected = (item: RequestHistoryItem) => {
    setHistoryReqItemRef.current?.(item);
  };

  return (
    <Box width="100%" height="100%">
      <PanelGroup direction="horizontal" style={{ width: '100%' }}>
        <Panel defaultSize={25}>
          <Paper variant="elevation" elevation={1} sx={{ height: '100%' }}>
            <Sidebar
              history={history}
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
                  onResponse={onResponse}
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
