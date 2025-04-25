import { Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import NavBar from './components/NavBar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/dashboard" element={<FeedbackDashboard />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;