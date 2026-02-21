import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import Dashbord from './Dashbord.jsx'
import UserAccount from './UserAccount.jsx'

function RootApp() {
  const [isSignedIn, setIsSignedIn] = useState(() => localStorage.getItem('mp_admin_signed_in') === 'true')
  const [activePage, setActivePage] = useState('dashboard')

  const handleSignIn = () => {
    localStorage.setItem('mp_admin_signed_in', 'true')
    setIsSignedIn(true)
    setActivePage('dashboard')
  }

  const handleSignOut = () => {
    localStorage.removeItem('mp_admin_signed_in')
    setIsSignedIn(false)
    setActivePage('dashboard')
  }

  if (!isSignedIn) {
    return <Login onSignIn={handleSignIn} />
  }

  if (activePage === 'user-account') {
    return <UserAccount />
  }

  return <Dashbord onSignOut={handleSignOut} onOpenUserAccount={() => setActivePage('user-account')} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
