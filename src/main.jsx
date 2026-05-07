import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import './App.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSUrl="https://unpkg.com/@clerk/clerk-js@5/dist/clerk.browser.js"
    >
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto 1rem' }}>
                <img src="/kato8-icon.png" alt="Kato.8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', margin: 0 }}>Legal Agent</h1>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>Kato.8 Studios — Authorized access only</p>
            </div>
            <SignIn routing="hash" appearance={{
              elements: {
                card: 'shadow-sm rounded-2xl',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
              }
            }} />
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  </StrictMode>,
)
