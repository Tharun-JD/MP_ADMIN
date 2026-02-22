import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar.jsx'

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M7.5 11A3.5 3.5 0 1 0 4 7.5 3.5 3.5 0 0 0 7.5 11Zm9 0A3.5 3.5 0 1 0 13 7.5a3.5 3.5 0 0 0 3.5 3.5ZM2 19.5C2 17 4.46 15 7.5 15S13 17 13 19.5V21H2v-1.5Zm9 1.5v-1.5c0-1.09-.34-2.1-.93-2.97.9-.34 1.9-.53 2.93-.53 3.04 0 5.5 2 5.5 4.5V21h-7.5Z" fill="currentColor" />
    </svg>
  )
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}

function Moreoption({ onBackToDashboard, onOpenUserAccount, onOpenLeadActive, onOpenChannelPartners, onSignOut }) {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isTitleOpen, setIsTitleOpen] = useState(false)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [filterValues, setFilterValues] = useState({
    nameEmailPhone: '',
    reraRegistrationNumber: '',
    status: 'Select',
  })
  const [formValues, setFormValues] = useState({
    title: 'Title',
    name: '',
    phone: '',
    email: '',
    alternateNumber: '',
    aadhaar: '',
    pan: '',
    occupation: '',
    rera: '',
    companyName: '',
    house: '',
    street: '',
    country: 'Select country',
    state: '-',
    city: '',
    zip: '',
  })
  const exportOptions = ['All Export', 'Active Filter Export']
  const statusOptions = ['Active', 'Inactive', 'Pending', 'Rejected']
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.', 'Brig.', 'Captain', 'Col', 'Dr.', 'Maharaj', 'Prof.']
  const actionOptions = ['Edit Channel Partner', 'Channel Partner Details', 'Document']
  const exportMenuRef = useRef(null)
  const filterPanelRef = useRef(null)
  const statusMenuRef = useRef(null)
  const titleMenuRef = useRef(null)
  const addFormRef = useRef(null)
  const actionMenuRef = useRef(null)
  const [isActionOpen, setIsActionOpen] = useState(false)

  useEffect(() => {
    const onPointerDown = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setIsExportOpen(false)
      }
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target)) {
        setIsStatusOpen(false)
      }
      if (titleMenuRef.current && !titleMenuRef.current.contains(event.target)) {
        setIsTitleOpen(false)
      }
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false)
        setIsStatusOpen(false)
      }
      if (addFormRef.current && !addFormRef.current.contains(event.target)) {
        setIsAddFormOpen(false)
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setIsActionOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    if (!window.gsap || !isFilterOpen || !filterPanelRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = filterPanelRef.current
    const fields = panel.querySelectorAll('.cp-filter-field')
    const actions = panel.querySelectorAll('.cp-filter-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cp-filter-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 16, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.3 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.2 }, '-=0.17')
      .fromTo(actions, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.2 }, '-=0.1')

    return () => tl.kill()
  }, [isFilterOpen])

  useEffect(() => {
    if (!window.gsap || !isAddFormOpen || !addFormRef.current) {
      return
    }

    const gsap = window.gsap
    const panel = addFormRef.current
    const fields = panel.querySelectorAll('.cp-add-field')
    const footerBtns = panel.querySelectorAll('.cp-add-action')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl
      .fromTo('.cp-add-overlay', { opacity: 0 }, { opacity: 1, duration: 0.2 })
      .fromTo(panel, { y: 18, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.3 }, '-=0.02')
      .fromTo(fields, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.025, duration: 0.17 }, '-=0.18')
      .fromTo(footerBtns, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.18 }, '-=0.1')

    return () => tl.kill()
  }, [isAddFormOpen])

  const setFilterField = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }))
  }

  const setFormField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const resetFilter = () => {
    setFilterValues({
      nameEmailPhone: '',
      reraRegistrationNumber: '',
      status: 'Select',
    })
    setIsStatusOpen(false)
    setIsFilterOpen(false)
  }

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#1f2f45]">
      <Navbar
        activePage="channel-partners"
        onBackToDashboard={onBackToDashboard}
        onOpenUserAccount={onOpenUserAccount}
        onOpenLeadActive={onOpenLeadActive}
        onOpenChannelPartners={onOpenChannelPartners}
        onSignOut={onSignOut}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-4">
          {/* <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-md border border-[#8a86ff] bg-white px-4 py-2 text-sm font-semibold text-[#6b66ff]"
          >
            Back
          </button> */}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-2xl font-semibold text-[#1f2f45] lg:text-3xl">
            <span className="text-[#1f2f45]"><IconUsers /></span>
            Channel Partners
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-md border border-[#8a86ff] bg-white px-5 py-2 text-base font-semibold text-[#6b66ff]">
              Total : 0
            </button>
            <button
              type="button"
              onClick={() => {
                setIsExportOpen(false)
                setIsFilterOpen(false)
                setIsAddFormOpen(true)
              }}
              className="rounded-md border border-[#8a86ff] bg-white px-6 py-2 text-base font-semibold text-[#6b66ff]"
            >
              Add New
            </button>
            <div ref={exportMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-md border border-[#8a86ff] bg-white px-5 py-2 text-base font-semibold text-[#6b66ff]"
              >
                Exports <IconChevron />
              </button>
              {isExportOpen && (
                <div className="absolute left-0 top-12 z-[70] w-64 rounded-xl border border-[#d4e3f8] bg-[#f8fbff] p-2 shadow-2xl shadow-[#1e78c8]/25">
                  {exportOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#2f3e57] transition hover:bg-[#e8f1ff] hover:text-[#124785]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setIsExportOpen(false)
                setIsFilterOpen(true)
              }}
              className="rounded-md border border-[#8a86ff] bg-white p-2.5 text-[#6b66ff]"
            >
              <IconFilter />
            </button>
          </div>
        </div>

        {isFilterOpen && (
          <div className="cp-filter-overlay fixed inset-0 z-[280] flex items-center justify-center bg-[#0f2244]/22 px-4 py-6 backdrop-blur-[2px]">
            <div ref={filterPanelRef} className="w-full max-w-4xl rounded-xl border border-[#c9d3e8] bg-[#f7f9fd] shadow-2xl shadow-[#1f365d]/15">
              <div className="flex items-center justify-between border-b border-[#d5dcfb] px-6 py-4">
                <h2 className="text-2xl font-semibold text-[#20385f]">Filter</h2>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
                <div className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Name/Email/Phone</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filterValues.nameEmailPhone}
                      onChange={(event) => setFilterField('nameEmailPhone', event.target.value)}
                      className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7a879a]">
                      <IconChevron />
                    </span>
                  </div>
                </div>

                <div className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">RERA Registration Number</label>
                  <input
                    type="text"
                    value={filterValues.reraRegistrationNumber}
                    onChange={(event) => setFilterField('reraRegistrationNumber', event.target.value)}
                    className="w-full rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-base text-[#1f2f45] outline-none transition focus:border-[#7f8cff] focus:ring-2 focus:ring-[#7f8cff]/20"
                  />
                </div>

                <div ref={statusMenuRef} className="cp-filter-field space-y-2">
                  <label className="text-sm font-semibold text-[#2f466c]">Status</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsStatusOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-md border border-[#b8c4e3] bg-white px-4 py-2.5 text-left text-base text-[#1f2f45] transition hover:border-[#9fb0cc]"
                    >
                      <span className={filterValues.status === 'Select' ? 'text-[#6c7890]' : ''}>{filterValues.status}</span>
                      <span className={`transition ${isStatusOpen ? 'rotate-180' : ''}`}>
                        <IconChevron />
                      </span>
                    </button>
                    {isStatusOpen && (
                      <div className="absolute left-0 top-[calc(100%+0.2rem)] z-[300] w-full rounded-md border border-[#c7d0df] bg-white shadow-lg">
                        {statusOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setFilterField('status', option)
                              setIsStatusOpen(false)
                            }}
                            className="block w-full px-4 py-2 text-left text-base text-[#1f2f45] hover:bg-[#e7edf5]"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#d5dcfb] px-6 py-4">
                <button
                  type="button"
                  onClick={resetFilter}
                  className="cp-filter-action rounded-lg border border-[#6f73ff] bg-white px-6 py-2 text-xl font-semibold text-[#6f73ff] transition hover:bg-[#eef0ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusOpen(false)
                    setIsFilterOpen(false)
                  }}
                  className="cp-filter-action rounded-lg bg-gradient-to-r from-[#6f73ff] to-[#6a6eea] px-7 py-2 text-xl font-semibold text-white transition hover:brightness-105"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {isAddFormOpen && (
          <div className="cp-add-overlay fixed inset-0 z-[320] flex items-center justify-center bg-[#071525]/55 px-4 py-6 backdrop-blur-[3px]">
            <div ref={addFormRef} className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-[#0f2c4d]/25 bg-[radial-gradient(circle_at_5%_0%,#ffffff_0%,#f6fbff_45%,#eef6ff_100%)] shadow-2xl shadow-[#031021]/35">
              <div className="sticky top-0 z-10 border-b border-[#7de4ff]/45 bg-[linear-gradient(115deg,#07307c_0%,#0f5ecf_32%,#00a7cf_66%,#4ee9c5_100%)] px-8 py-5 shadow-[0_10px_26px_rgba(7,48,124,0.28)]">
                <h2 className="text-2xl font-semibold tracking-wide text-white">Create Channel Partner</h2>
                <p className="mt-1 text-sm font-medium text-[#d8f8ff]">Capture partner profile and address details</p>
                <div className="pointer-events-none absolute left-6 top-2 h-7 w-7 rounded-full bg-[#7feaff]/40 blur-md" />
                <div className="pointer-events-none absolute right-10 bottom-2 h-8 w-8 rounded-full bg-[#53f2ca]/40 blur-md" />
              </div>

              <div className="px-6 py-6">
                <div className="grid gap-5 rounded-2xl border border-[#d2e6ff] bg-white/70 p-5 backdrop-blur md:grid-cols-2">
                  <div ref={titleMenuRef} className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Title</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsTitleOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-left text-sm text-[#153256] transition hover:border-[#a8c6e6]"
                      >
                        <span>{formValues.title || 'Title'}</span>
                        <span className={`text-[#6b84a5] transition ${isTitleOpen ? 'rotate-180' : ''}`}><IconChevron /></span>
                      </button>
                      {isTitleOpen && (
                        <div className="absolute left-0 top-[calc(100%+0.25rem)] z-[360] w-full rounded-lg border border-[#c7d0df] bg-white shadow-lg">
                          {titleOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setFormField('title', option)
                                setIsTitleOpen(false)
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-[#1f2f45] hover:bg-[#e7edf5]"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Name *</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formValues.name}
                      onChange={(event) => setFormField('name', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Phone *</label>
                    <input
                      type="text"
                      value={formValues.phone}
                      onChange={(event) => setFormField('phone', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Email *</label>
                    <input
                      type="email"
                      placeholder="eg. abc@gmail.com"
                      value={formValues.email}
                      onChange={(event) => setFormField('email', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Alternate Number</label>
                    <input
                      type="text"
                      value={formValues.alternateNumber}
                      onChange={(event) => setFormField('alternateNumber', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Aadhaar *</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.aadhaar}
                      onChange={(event) => setFormField('aadhaar', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">PAN Number *</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.pan}
                      onChange={(event) => setFormField('pan', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Occupation</label>
                    <input
                      type="text"
                      value={formValues.occupation}
                      onChange={(event) => setFormField('occupation', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">RERA Registration Number</label>
                    <input
                      type="text"
                      placeholder="Enter the RERA N0"
                      value={formValues.rera}
                      onChange={(event) => setFormField('rera', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">CP Company Name / CP Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formValues.companyName}
                      onChange={(event) => setFormField('companyName', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>

                <div className="relative mt-6 rounded-t-2xl bg-[linear-gradient(95deg,#0d3fa7_0%,#1168d3_35%,#00a8d0_70%,#3de4b8_100%)] px-6 py-3 shadow-[0_10px_22px_rgba(13,63,167,0.24)]">
                  <h3 className="text-xl font-semibold tracking-wide text-white">Address</h3>
                  <div className="pointer-events-none absolute left-5 top-2 h-6 w-6 rounded-full bg-[#89e8ff]/45 blur-md" />
                  <div className="pointer-events-none absolute right-8 top-2 h-6 w-6 rounded-full bg-[#79ffc9]/40 blur-md" />
                </div>

                <div className="grid gap-5 rounded-b-2xl border border-t-0 border-[#d2e6ff] bg-white/75 p-5 md:grid-cols-2">
                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">House/Flat/Company</label>
                    <input
                      type="text"
                      value={formValues.house}
                      onChange={(event) => setFormField('house', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Street</label>
                    <input
                      type="text"
                      value={formValues.street}
                      onChange={(event) => setFormField('street', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Country</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formValues.country}
                        onChange={(event) => setFormField('country', event.target.value)}
                        className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b84a5]"><IconChevron /></span>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">State / Region</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formValues.state}
                        onChange={(event) => setFormField('state', event.target.value)}
                        className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b84a5]"><IconChevron /></span>
                    </div>
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">City</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.city}
                      onChange={(event) => setFormField('city', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>

                  <div className="cp-add-field space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-[0.08em] text-[#1f4772]">Zip / Pin Code</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formValues.zip}
                      onChange={(event) => setFormField('zip', event.target.value)}
                      className="w-full rounded-xl border border-[#c5d6ee] bg-white px-4 py-3 text-sm text-[#153256] outline-none placeholder:text-[#6782a6] transition focus:border-[#1799c7] focus:ring-2 focus:ring-[#1799c7]/25"
                    />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#cfe5ff] bg-[#f4f9ff] px-6 py-4">
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="cp-add-action rounded-xl border border-[#0f69c9] bg-white px-6 py-2 text-sm font-semibold text-[#0f69c9] transition hover:bg-[#ecf5ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="cp-add-action rounded-xl bg-[linear-gradient(90deg,#0f69c9_0%,#1cb0c5_100%)] px-7 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 mt-6 overflow-visible rounded-sm border border-[#877ef4]/30 bg-white">
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] bg-[linear-gradient(90deg,#6878f5_0%,#a265dc_100%)] text-sm font-semibold tracking-wide text-white lg:text-base">
            <div className="px-5 py-4">Name</div>
            <div className="px-5 py-4">Details</div>
            <div className="px-5 py-4">RERA Registration Number</div>
            <div className="px-5 py-4">Status</div>
            <div className="px-5 py-4">Associated User</div>
            <div className="px-5 py-4">Actions</div>
          </div>
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] items-center border-t border-[#eef2ff] px-1 py-2">
            <div className="px-4 py-3 text-sm text-[#6b7280]">No data available.</div>
            <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
            <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
            <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
            <div className="px-4 py-3 text-sm text-[#6b7280]">-</div>
            <div ref={actionMenuRef} className="relative px-4 py-3">
              <button
                type="button"
                onClick={() => setIsActionOpen((prev) => !prev)}
                className="rounded-md border border-[#cfd9ff] bg-white px-3 py-1.5 text-lg font-bold leading-none text-[#6576c9] hover:bg-[#f4f7ff]"
              >
                ...
              </button>
              {isActionOpen && (
                <div className="absolute bottom-[calc(100%+0.25rem)] right-3 z-[240] w-56 rounded-lg border border-[#d6def5] bg-white p-1.5 shadow-xl">
                  {actionOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsActionOpen(false)}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#304769] hover:bg-[#eef3ff]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Moreoption
