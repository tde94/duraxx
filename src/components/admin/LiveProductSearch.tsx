'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { searchProducts } from '@/app/admin/products/searchAction'

export default function LiveProductSearch({ categoryId }: { categoryId?: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }
      setIsLoading(true)
      try {
        const data = await searchProducts(query, categoryId)
        setResults(data)
        setIsOpen(true)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query, categoryId])

  return (
    <div ref={wrapperRef} className="relative flex-grow sm:flex-grow-0 z-50">
      <form method="GET" action="/admin/products" onSubmit={(e) => {
          if (!query.trim()) e.preventDefault()
        }}>
        {categoryId && <input type="hidden" name="category" value={categoryId} />}
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          placeholder="Search by name or article..."
          className="h-9 w-full sm:w-64 rounded-md border border-gray-300 pl-9 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-2.5 top-2.5">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          </div>
        )}
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full sm:w-80 rounded-md border border-gray-200 bg-white shadow-xl overflow-hidden">
          <ul className="max-h-80 overflow-y-auto py-1">
            {results.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    const url = new URL(window.location.href)
                    url.searchParams.set('q', query)
                    url.searchParams.set('edit', product.id)
                    router.push(url.pathname + url.search)
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="h-10 w-10 shrink-0 rounded border border-gray-100 bg-white p-0.5">
                    {product.image_url ? (
                      <img src={product.image_url} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <div className="h-full w-full bg-gray-100 rounded" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="truncate text-xs text-gray-500">{product.article_number || 'No article no'}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
