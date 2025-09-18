import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MessageBox from './components/message-box';
import { useForm } from 'react-hook-form';

type WSConnectionProps = {
  connection: WebSocket;
};

const WSConnection = ({ connection }: WSConnectionProps) => {
  const [messages, setMessages] = useState<WSMessage[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<SendMessageFormInputs>();

  const submitMessage = (data: SendMessageFormInputs) => {
    connection.send(data.content);
    setMessages((curr) => [...curr, { content: data.content, outgoing: true }]);
  };

  const onMessage = (e: MessageEvent<any>) => {
    setMessages((curr) => [...curr, { content: e.data, outgoing: false }]);
  };

  useEffect(() => {
    setIsOpen(false);
    setMessages([]);

    const setOpen = () => setIsOpen(true);
    const setClosed = () => {
      setValue('content', '');
      setIsOpen(false);
    };

    connection.addEventListener('message', onMessage);
    connection.addEventListener('open', setOpen);
    connection.addEventListener('close', setClosed);

    return () => {
      connection.removeEventListener('message', onMessage);
      connection.removeEventListener('open', setOpen);
      connection.removeEventListener('close', setClosed);
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
      <Box
        onSubmit={handleSubmit(submitMessage)}
        component="form"
        position="relative"
        display="flex"
        flexDirection="row"
        width="100%"
      >
        <Box flexGrow={1}>
          <TextField variant="outlined" fullWidth {...register('content')} />
        </Box>
        <Button type="submit" variant="contained" disabled={!isOpen}>
          Send
        </Button>
        {!isOpen && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            bgcolor="rgb(0, 0, 0, 0.15)"
          >
            <Typography>Disconnected</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default WSConnection;
