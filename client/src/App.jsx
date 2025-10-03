import './App.css'
import AppRoutes from './AppRoutes.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { SocketProvider } from './contexts/SocketAuth.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <SocketProvider>
              <Router>
                <AppRoutes />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="colored"
                />
              </Router>
            </SocketProvider>
          </AuthProvider>
      </GoogleOAuthProvider>
    </>
  )
}

export default App;
