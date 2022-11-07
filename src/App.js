import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import Login from './components/Login'
import Register from './components/Register'
import Archivo from './pages/Archivo/Archivo'
import Formulario from './pages/Formulario/Formulario'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from "./components/ProtectedRoute"
import Home from './pages/Home/Home'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <AuthProvider>
          <Navbar />
            <Router >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/archivo" element={
                  <ProtectedRoute>
                    <Archivo />
                  </ProtectedRoute>
                } />
                <Route path="/formulario" element={
                  <ProtectedRoute>
                    <Formulario />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </Router>
          </AuthProvider>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App;
