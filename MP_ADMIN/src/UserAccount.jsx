import { useEffect, useRef } from 'react'

const accounts = [
  { name: 'Arjun Constructions', contact: 'arjun@mpd.com • +91 98765 44112', leadId: 'LD-1021', payment: 'Completed', role: 'Manager', status: 'Active' },
  { name: 'BlueStone Infra', contact: 'bluestone@mpd.com • +91 98765 99211', leadId: 'LD-1088', payment: 'Pending', role: 'Partner', status: 'Review' },
  { name: 'Northline Build', contact: 'northline@mpd.com • +91 98765 33318', leadId: 'LD-1140', payment: 'Completed', role: 'Partner', status: 'Active' },
]

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3ZM2.5 20v-1c0-2.6 2.5-4.5 5.5-4.5s5.5 1.9 5.5 4.5v1h-11Zm11 0v-1c0-.68-.13-1.3-.37-1.87.79-.42 1.8-.63 2.87-.63 3 0 5.5 1.9 5.5 4.5v1h-8Z" fill="currentColor" />
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

function UserAccount() {
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const controlsRef = useRef(null)
  const tableRef = useRef(null)
  const glowRefs = useRef([])
  const rowRefs = useRef([])
  const beamRef = useRef(null)

  useEffect(() => {
    if (!window.gsap) {
      return
    }

    const gsap = window.gsap
    const cleanups = []

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(headerRef.current, { y: -22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.15')
      .fromTo('.ua-title-char', { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.26 }, '-=0.4')
      .fromTo('.ua-control', { x: 24, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.07, duration: 0.35 }, '-=0.32')
      .fromTo(tableRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .fromTo('.ua-row', { y: 20, opacity: 0, rotateX: -10 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 0.45 }, '-=0.25')

    cleanups.push(() => intro.kill())

    glowRefs.current.filter(Boolean).forEach((node, index) => {
      const anim = gsap.to(node, {
        x: index % 2 ? -24 : 28,
        y: index % 2 ? 18 : -18,
        scale: index % 2 ? 1.2 : 0.9,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      cleanups.push(() => anim.kill())
    })

    if (beamRef.current) {
      const sweep = gsap.fromTo(
        beamRef.current,
        { xPercent: -65, opacity: 0.12 },
        { xPercent: 65, opacity: 0.26, duration: 5.4, repeat: -1, yoyo: true, ease: 'none' },
      )
      cleanups.push(() => sweep.kill())
    }

    rowRefs.current.filter(Boolean).forEach((row) => {
      const onMove = (event) => {
        const rect = row.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        gsap.to(row, {
          rotateY: x * 8,
          rotateX: -y * 6,
          y: -4,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      const onLeave = () => {
        gsap.to(row, { rotateY: 0, rotateX: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      }

      row.addEventListener('mousemove', onMove)
      row.addEventListener('mouseleave', onLeave)
      cleanups.push(() => row.removeEventListener('mousemove', onMove))
      cleanups.push(() => row.removeEventListener('mouseleave', onLeave))
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#f4f7ff] text-[#1f365d] [perspective:1300px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_31px,rgba(47,63,169,0.05)_32px),linear-gradient(90deg,transparent_31px,rgba(47,63,169,0.05)_32px)] bg-[size:32px_32px]" />
        <div ref={(n) => (glowRefs.current[0] = n)} className="absolute -left-16 top-8 h-64 w-64 rounded-full bg-[#2f3fa9]/20 blur-3xl" />
        <div ref={(n) => (glowRefs.current[1] = n)} className="absolute right-0 top-20 h-72 w-72 rounded-full bg-[#7f5de6]/16 blur-3xl" />
        <div ref={beamRef} className="absolute left-0 top-12 h-40 w-[38rem] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#2f3fa9]/28 to-transparent blur-2xl" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-7xl px-3 py-8 lg:px-6">
        <div ref={headerRef} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-xl shadow-[#2f3fa9]/10 backdrop-blur-xl">
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-[#1f2f45]">
            <span className="text-[#2f3fa9]"><IconUsers /></span>
            {'Users Accounts'.split('').map((ch, idx) => (
              <span key={`${ch}-${idx}`} className="ua-title-char inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <div ref={controlsRef} className="flex flex-wrap items-center gap-3">
            <button type="button" className="ua-control rounded-lg border border-[#6d64f8]/70 bg-white px-6 py-2.5 text-2xl font-semibold text-[#6d64f8]">
              Total : 0
            </button>
            <button type="button" className="ua-control flex items-center gap-1 rounded-lg border border-[#6d64f8]/70 bg-white px-6 py-2.5 text-2xl font-semibold text-[#6d64f8]">
              Add User <IconChevron />
            </button>
            <button type="button" className="ua-control flex items-center gap-1 rounded-lg border border-[#6d64f8]/70 bg-white px-6 py-2.5 text-2xl font-semibold text-[#6d64f8]">
              Exports <IconChevron />
            </button>
            <button type="button" className="ua-control rounded-lg border border-[#8ea1c4] bg-white p-2.5 text-[#6d64f8]">
              <IconFilter />
            </button>
          </div>
        </div>

        <div ref={tableRef} className="mt-6 overflow-hidden rounded-2xl border border-[#6d64f8]/20 bg-white/70 shadow-2xl shadow-[#2f3fa9]/12 backdrop-blur-xl">
          <div className="grid grid-cols-[2fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr] bg-[linear-gradient(90deg,#646ff6_0%,#7b65e5_45%,#9b5fd4_100%)] text-xl font-bold tracking-wide text-white">
            <div className="px-6 py-5">Name/Email/Phone</div>
            <div className="px-6 py-5">Sell.Do Lead ID</div>
            <div className="px-6 py-5">Payment</div>
            <div className="px-6 py-5">Role</div>
            <div className="px-6 py-5">Status</div>
            <div className="px-6 py-5">Actions</div>
          </div>

          <div className="divide-y divide-[#dbe4f7] bg-white/90">
            {accounts.map((row, index) => (
              <div
                key={row.leadId}
                ref={(node) => {
                  rowRefs.current[index] = node
                }}
                className="ua-row grid grid-cols-[2fr_1.4fr_1fr_0.8fr_0.8fr_0.8fr] px-2 py-2 [transform-style:preserve-3d]"
              >
                <div className="px-4 py-3">
                  <p className="text-lg font-semibold text-[#213a64]">{row.name}</p>
                  <p className="text-sm text-[#6e83a6]">{row.contact}</p>
                </div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">{row.leadId}</div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">{row.payment}</div>
                <div className="px-4 py-3 text-base font-semibold text-[#344f7f]">{row.role}</div>
                <div className="px-4 py-3">
                  <span className="rounded-full bg-[#e6f8ef] px-3 py-1 text-sm font-bold text-[#1b8f59]">{row.status}</span>
                </div>
                <div className="px-4 py-3">
                  <button type="button" className="rounded-md border border-[#c8d7f0] px-3 py-1 text-sm font-semibold text-[#3e5f95]">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserAccount
