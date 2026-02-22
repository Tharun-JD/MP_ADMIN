import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import Dashbord from './Dashbord.jsx'
import UserAccount from './UserAccount.jsx'
import Moreoption from './Moreoption.jsx'

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

  if (activePage === 'channel-partners') {
    return <Moreoption onBackToDashboard={() => setActivePage('dashboard')} />
  }

  return (
    <Dashbord
      onSignOut={handleSignOut}
      onOpenUserAccount={() => setActivePage('user-account')}
      onOpenChannelPartners={() => setActivePage('channel-partners')}
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
