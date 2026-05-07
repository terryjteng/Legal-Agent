import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser, useClerk } from '@clerk/clerk-react'
import './App.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY')
}

function RoleGate({ children }) {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #475569', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  const role = user?.publicMetadata?.role

  if (!role) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto 1.5rem' }}>
            <img src="/kato8-icon.png" alt="Kato.8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Access Pending</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Your account hasn't been assigned a role yet. A Kato.8 admin will approve your access shortly.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="https://kato8studiosapp.xyz" style={{ background: 'transparent', border: '1px solid #1e293b', color: '#64748b', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontSize: '0.875rem', textDecoration: 'none' }}>← Central Command</a>
            <button onClick={() => signOut()} style={{ background: 'transparent', border: '1px solid #1e293b', color: '#64748b', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }

  if (role !== 'super_admin') {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '400px', textAlign: 'center', padding: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto 1.5rem' }}>
            <img src="/kato8-icon.png" alt="Kato.8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Access Restricted</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            The Legal Agent is restricted to studio leadership.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="https://kato8studiosapp.xyz" style={{ background: 'transparent', border: '1px solid #1e293b', color: '#64748b', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontSize: '0.875rem', textDecoration: 'none' }}>← Central Command</a>
            <button onClick={() => signOut()} style={{ background: 'transparent', border: '1px solid #1e293b', color: '#64748b', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSUrl="https://unpkg.com/@clerk/clerk-js@5/dist/clerk.browser.js"
    >
      <SignedIn>
        <RoleGate>
          <App />
        </RoleGate>
      </SignedIn>
      <SignedOut>
        <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ width: '100%', maxWidth: '360px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden', margin: '0 auto 1rem' }}>
                <img src="/kato8-icon.png" alt="Kato.8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f1f5f9', margin: 0 }}>Legal Agent</h1>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>Kato.8 Studios — Authorized access only</p>
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
