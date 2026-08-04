"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export type SearchItem = {
  title: string
  subtitle: string
  url: string
}

export function ZoohubSearch({ searchIndex }: { searchIndex: SearchItem[] }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filteredResults = searchIndex
    .filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full px-2 mt-2 mb-2" ref={wrapperRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
            <path fill="currentColor" d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Zoohub..."
          className="w-full bg-slate-100 dark:bg-slate-800/80 border border-transparent rounded-lg py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-500"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query.length > 0 && (
        <div className="absolute z-50 w-[calc(100%-16px)] left-2 mt-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden max-h-[320px] overflow-y-auto">
            {filteredResults.length === 0 ? (
              <div className="p-6 text-sm text-center text-slate-500">
                No results found for "{query}"
              </div>
            ) : (
              <ul className="py-1">
                {filteredResults.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors flex flex-col"
                      onClick={() => {
                        setIsOpen(false)
                        setQuery("")
                        router.push(item.url)
                      }}
                    >
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {item.title}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.subtitle}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
