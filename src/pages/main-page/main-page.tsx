import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import HTTPRequestForm from './components/http-request-form/http-request-form';

const MainPage = () => {
  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <HTTPRequestForm />
      </Box>
    </Container>
  );
};

export default MainPage;
