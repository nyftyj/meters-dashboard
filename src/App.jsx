import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import LandingPage from "./components/LandingPage";
import MeterDetailPage from "./components/MeterDetailPage";
import NotFound from './components/NotFound';

function App() {

  return (
    <Container className="app">
        <Routes>
          <Route path='/meters' element={<LandingPage />} />
          <Route path='/meters/:id' element={<MeterDetailPage />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/' element={<Navigate to='/meters' />} />
          <Route path='*' element={<Navigate to='/not-found' replace />} />
        </Routes>
    </Container>
  );
}

export default App;
