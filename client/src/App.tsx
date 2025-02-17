import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TaskPage } from './pages/TaskPage';
import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router';
import { RegisterPage } from './pages/RegisterPage';
import { Toaster } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient()

function App() {
  return (
    <>
        <QueryClientProvider client={queryClient}>
        <BrowserRouter> 
        <Routes>
          <Route path="/" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='bottom-center' richColors/>
    </QueryClientProvider>  
    </>
  );
}

export default App;
