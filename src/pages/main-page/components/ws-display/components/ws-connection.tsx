import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

type WSConnectionProps = {
  connection: WebSocket;
};

const WSConnection = ({ connection }: WSConnectionProps) => {
  const [messages, setMessages] = useState<string[]>([]);

  const messageBoxRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (messageBoxRef.current) {
      connection.send(messageBoxRef.current.value);
    }
  };

  const onMessage = (e: MessageEvent<any>) => {
    console.log(e.data);
    setMessages((curr) => [...curr, e.data]);
  };

  useEffect(() => {
    setMessages([]);
    connection.addEventListener('message', onMessage);
  }, [connection]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Box flexGrow={1}>
        {messages.map((msg) => (
          <Typography>{msg}</Typography>
        ))}
      </Box>
      <Box display="flex">
        <Box flexGrow={1}>
          <TextField ref={messageBoxRef} variant="outlined" fullWidth />
        </Box>
        <Button onClick={sendMessage} variant="contained">
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default WSConnection;
