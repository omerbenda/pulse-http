import { useState } from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import HTTPRequestForm from './components/http-request-form/http-request-form';
import HTTPResponse from './components/http-response/http-response';

const MainPage = () => {
  const [response, setResponse] = useState<Response | null>(null);

  const onResponse = (response: Response) => {
    setResponse(response);
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <HTTPRequestForm onResponse={onResponse} />
      </Box>
      <Box height={10} />
      {response && <HTTPResponse response={response} />}
    </Container>
  );
};

export default MainPage;
