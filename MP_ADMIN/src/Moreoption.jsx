import { useState } from 'react'

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

function Moreoption({ onBackToDashboard }) {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const exportOptions = ['All Export', 'Active Filter Export']

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#1f2f45]">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-4">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="rounded-md border border-[#8a86ff] bg-white px-4 py-2 text-sm font-semibold text-[#6b66ff]"
          >
            Back
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-2xl font-semibold text-[#1f2f45] lg:text-3xl">
            <span className="text-[#1f2f45]"><IconUsers /></span>
            Channel Partners
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="rounded-md border border-[#8a86ff] bg-white px-5 py-2 text-xl font-medium text-[#6b66ff] lg:text-2xl">
              Total : 186
            </button>
            <button type="button" className="rounded-md border border-[#8a86ff] bg-white px-6 py-2 text-xl font-medium text-[#6b66ff] lg:text-2xl">
              Add New
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-md border border-[#8a86ff] bg-white px-6 py-2 text-xl font-medium text-[#6b66ff] lg:text-2xl"
              >
                Export <IconChevron />
              </button>
              {isExportOpen && (
                <div className="absolute right-0 top-[calc(100%+0.4rem)] z-20 w-56 rounded-lg border border-[#d9d9ff] bg-white p-2 shadow-lg">
                  {exportOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setIsExportOpen(false)}
                      className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-[#334155] hover:bg-[#f3f2ff]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="rounded-md border border-[#8a86ff] bg-white p-2.5 text-[#6b66ff]">
              <IconFilter />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-sm border border-[#877ef4]/30 bg-white">
          <div className="grid min-w-[980px] grid-cols-[1.6fr_1.3fr_1.1fr_0.8fr_1.4fr_0.8fr] bg-[linear-gradient(90deg,#6878f5_0%,#a265dc_100%)] text-white">
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">Name</div>
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">Details</div>
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">RERA Registration Number</div>
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">Status</div>
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">Associated User</div>
            <div className="px-9 py-4 text-lg font-semibold lg:text-2xl">Actions</div>
          </div>
          <div className="px-9 py-8 text-lg text-[#6b7280]">No data available.</div>
        </div>
      </section>
    </main>
  )
}

export default Moreoption
