import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'

// Replace this with your actual Client ID from the Google Cloud Console
// For production, it is best to use: import.meta.env.VITE_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = "608470752767-dd27d30n64h8sl2to5rmn198cdajqk2e.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);