import { Box, Typography } from '@mui/material';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

type MessageBoxProps = {
  message: WSMessage;
};

const MessageBox = ({ message }: MessageBoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderBottom={1}
      borderColor="gray"
      gap={1}
      p={1}
    >
      {message.outgoing ? (
        <FaLongArrowAltRight color="green" />
      ) : (
        <FaLongArrowAltLeft color="red" />
      )}
      <Typography>{message.content}</Typography>
    </Box>
  );
};

export default MessageBox;
