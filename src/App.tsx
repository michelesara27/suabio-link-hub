import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/AppLayout';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Links from '@/pages/Links';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Editor from '@/pages/Editor';
import PublicBio from '@/pages/PublicBio';
import NotFound from '@/pages/NotFound';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:username" element={<PublicBio />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/links" element={
              <ProtectedRoute>
                <AppLayout>
                  <Links />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AppLayout>
                  <Analytics />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/editor" element={
              <ProtectedRoute>
                <AppLayout>
                  <Editor />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
