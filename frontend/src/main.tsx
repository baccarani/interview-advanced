import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StrictMode } from 'react'
import './index.css'
import { ThemeProvider } from './context/ThemeProvider.tsx'
import AuthProvider from './context/AuthProvider.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProfileProvider from './context/ProfileProvider.tsx'
import { InterviewProvider } from './context/InterviewFlowProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <InterviewProvider>
          <ProfileProvider>
            <ThemeProvider defaultTheme='light' storageKey='vite-ui-themPe'>
              <App />
            </ThemeProvider>
          </ProfileProvider>
        </InterviewProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
