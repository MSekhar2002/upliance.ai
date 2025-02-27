import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/UI/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import UserFormPage from './pages/UserFormPage';
import RichTextEditorPage from './pages/RichTextEditorPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <Box bg="gray.900" minH="100vh" color="gray.100">
            <Navbar />
            <Box as="main" p={4} maxW="1200px" mx="auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/form" element={
                  <PrivateRoute>
                    <UserFormPage />
                  </PrivateRoute>
                } />
                <Route path="/editor" element={
                  <PrivateRoute>
                    <RichTextEditorPage />
                  </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } />
              </Routes>
            </Box>
          </Box>
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;