import { useState } from 'react'

function Icon({ name, className = 'h-4 w-4' }) {
  const icons = {
    dashboard: (
      <path
        d="M3 13.5h8V3.5H3v10Zm10 7h8v-10h-8v10Zm0-17v5h8v-5h-8Zm-10 17h8v-5H3v5Z"
        fill="currentColor"
      />
    ),
    user: (
      <path
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-4.28 0-7.75 2.24-7.75 5v.75h15.5v-.75c0-2.76-3.47-5-7.75-5Z"
        fill="currentColor"
      />
    ),
    lead: (
      <path
        d="M12 2.5 2.5 7.25V12c0 5.24 4.05 9.98 9.5 10.75 5.45-.77 9.5-5.5 9.5-10.75V7.25L12 2.5Zm0 4.25a2.75 2.75 0 1 1-2.75 2.75A2.75 2.75 0 0 1 12 6.75ZM7.5 16.5a4.87 4.87 0 0 1 9 0h-9Z"
        fill="currentColor"
      />
    ),
    more: <path d="M5 12a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Zm7 0a1.75 1.75 0 1 0 0 .01V12Z" fill="currentColor" />,
    chevron: <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    docs: <path d="M7 2.5h8l4 4V21.5H7V2.5Zm8 2v3h3l-3-3Zm-5 7h6v2h-6v-2Zm0 4h6v2h-6v-2Z" fill="currentColor" />,
    reports: <path d="M5 3.5h14a1.5 1.5 0 0 1 1.5 1.5V19A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Zm2.5 12h2v-5h-2v5Zm3.5 0h2V8h-2v7Zm3.5 0h2v-3h-2v3Z" fill="currentColor" />,
    profile: <path d="M12 12a4.4 4.4 0 1 0-4.4-4.4A4.4 4.4 0 0 0 12 12Zm0 2.2c-4.13 0-7.5 2.18-7.5 4.88V21h15v-1.92c0-2.7-3.37-4.88-7.5-4.88Z" fill="currentColor" />,
    settings: <path d="m12 2.5 1.3 2.2 2.5.5.4 2.5 2 1.5-1 2.3 1 2.3-2 1.5-.4 2.5-2.5.5-1.3 2.2-2.3-1-2.3 1-1.3-2.2-2.5-.5-.4-2.5-2-1.5 1-2.3-1-2.3 2-1.5.4-2.5 2.5-.5L9.7 2.5h2.3Zm0 6.2A3.3 3.3 0 1 0 15.3 12 3.3 3.3 0 0 0 12 8.7Z" fill="currentColor" />,
    signout: <path d="M10 4.5h-4A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h4v-2H6.5v-11H10v-2Zm4.06 3.44-1.42 1.41L14.8 11.5H8v2h6.8l-2.16 2.15 1.42 1.41L18.6 12l-4.54-4.06Z" fill="currentColor" />,
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

const navItems = [
  { label: 'Dashbord', icon: 'dashboard' },
  { label: 'UserAccount', icon: 'user' },
  { label: 'Lead Activity', icon: 'lead' },
  {
    label: 'More',
    icon: 'more',
    options: [
      { label: 'Channel Partner Application', icon: 'docs' },
      { label: 'Emails', icon: 'reports' },
      { label: 'SMSs', icon: 'reports' },
    ],
  },
]

function Navbar({
  activePage,
  onBackToDashboard,
  onOpenUserAccount,
  onOpenLeadActive,
  onOpenChannelPartners,
  onSignOut,
  className = '',
}) {
  const [openMenu, setOpenMenu] = useState(null)
  const [openWelcome, setOpenWelcome] = useState(false)

  return (
    <header className={`${className} sticky top-0 z-[200] border-b border-[#2f3fa9]/10 bg-white/85 backdrop-blur overflow-visible`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-full w-[26rem] rotate-[4deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/18 to-transparent blur-xl" />
        <div className="absolute right-0 top-0 h-full w-[22rem] rotate-[-3deg] bg-gradient-to-r from-transparent via-[#1a79d1]/14 to-transparent blur-xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-4 lg:px-6">
        <div className="text-xl font-black tracking-tight text-[#2f3fa9]">MP Developers</div>

        <nav className="flex flex-wrap items-center gap-2 lg:gap-3">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                type="button"
                onClick={() => {
                  setOpenWelcome(false)
                  if (item.label === 'More') {
                    setOpenMenu((current) => (current === item.label ? null : item.label))
                    return
                  }
                  setOpenMenu(null)
                  if (item.label === 'Dashbord') onBackToDashboard?.()
                  if (item.label === 'UserAccount') onOpenUserAccount?.()
                  if (item.label === 'Lead Activity') onOpenLeadActive?.()
                }}
                className={`nav-btn flex items-center gap-1.5 rounded-lg border border-[#2f3fa9]/15 bg-white px-3 py-2 text-sm font-semibold transition hover:border-[#1a79d1]/50 hover:text-[#1a79d1] ${
                  (activePage === 'dashboard' && item.label === 'Dashbord') ||
                  (activePage === 'user-account' && item.label === 'UserAccount') ||
                  (activePage === 'lead-active' && item.label === 'Lead Activity') ||
                  (activePage === 'channel-partners' && item.label === 'More')
                    ? 'text-[#1a79d1]'
                    : 'text-[#1a3c6b]'
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
                {item.label === 'More' && <Icon name="chevron" className="h-3 w-3" />}
              </button>

              {item.label === 'More' && openMenu === item.label && (
                <div className="absolute left-0 top-12 z-[260] min-w-44 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
                  {item.options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => {
                        setOpenMenu(null)
                        if (option.label === 'Channel Partner Application') {
                          onOpenChannelPartners?.()
                        }
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]"
                    >
                      <Icon name={option.icon} className="h-4 w-4 text-[#1a79d1]" />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenMenu(null)
              setOpenWelcome((current) => !current)
            }}
            className="nav-btn flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#1a79d1] to-[#2f3fa9] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#2f3fa9]/20"
          >
            <Icon name="user" className="h-4 w-4" />
            Welcome
            <Icon name="chevron" className="h-3 w-3" />
          </button>

          {openWelcome && (
            <div className="absolute right-0 top-12 z-[260] min-w-48 rounded-xl border border-[#d5e3f7] bg-white p-2 shadow-xl">
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]">
                <Icon name="profile" className="h-4 w-4 text-[#1a79d1]" />
                My Profile
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#274873] hover:bg-[#eef5ff]">
                <Icon name="settings" className="h-4 w-4 text-[#1a79d1]" />
                Settings
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[#c43d2f] hover:bg-[#fff1ef]"
              >
                <Icon name="signout" className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
