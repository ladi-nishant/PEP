import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfessionProvider } from './context/ConfessionContext.jsx';
const clientId = "44533571687-smlmh8g8qgkneeq189mv0pki020trniq.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <ConfessionProvider>
                <App />
            </ConfessionProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
