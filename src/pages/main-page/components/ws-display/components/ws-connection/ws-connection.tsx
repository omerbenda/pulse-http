import { Box, Button, FormControl, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MessageBox from './components/message-box';
import { useForm } from 'react-hook-form';

type WSConnectionProps = {
  connection: WebSocket;
};

const WSConnection = ({ connection }: WSConnectionProps) => {
  const [messages, setMessages] = useState<WSMessage[]>([]);

  const { register, handleSubmit } = useForm<SendMessageFormInputs>();

  const submitMessage = (data: SendMessageFormInputs) => {
    connection.send(data.content);
    setMessages((curr) => [...curr, { content: data.content, outgoing: true }]);
  };

  const onMessage = (e: MessageEvent<any>) => {
    setMessages((curr) => [...curr, { content: e.data, outgoing: false }]);
  };

  useEffect(() => {
    setMessages([]);
    connection.addEventListener('message', onMessage);

    return () => {
      connection.removeEventListener('message', onMessage);
    };
  }, [connection]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
      }}
    >
      <Box flexGrow={1} overflow="auto">
        {messages.map((msg, index) => (
          <MessageBox message={msg} key={index} />
        ))}
      </Box>
      <FormControl
        onSubmit={handleSubmit(submitMessage)}
        component="form"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Box flexGrow={1}>
          <TextField variant="outlined" fullWidth {...register('content')} />
        </Box>
        <Button type="submit" variant="contained">
          Send
        </Button>
      </FormControl>
    </Paper>
  );
};

export default WSConnection;
