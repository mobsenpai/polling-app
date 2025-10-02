import './App.css'
import AppRoutes from './AppRoutes.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import { SocketProvider } from './contexts/SocketAuth.jsx';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <NotificationProvider>
          <AuthProvider>
            <SocketProvider>
              <Router>
                <AppRoutes />
              </Router>
            </SocketProvider>
          </AuthProvider>
        </NotificationProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App;
