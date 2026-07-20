'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { translations, TranslationSchema } from '@/data/translations'
import { Play, Image as ImageIcon, FileText, X } from 'lucide-react'

interface MediaClientProps {
  language: "EN" | "DE"
  mediaItems: any[]
}

export default function MediaClient({ language, mediaItems }: MediaClientProps) {
  const ui = translations[language].mediaPage
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle')
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null)

  // Get unique categories from the items
  const categories = ['Alle', ...Array.from(new Set(mediaItems.map(m => m.category)))]

  // Filter items
  const filteredItems = selectedCategory === 'Alle'
    ? mediaItems
    : mediaItems.filter(m => m.category === selectedCategory)

  // Extract YouTube ID if it's a Youtube URL
  const getYoutubeId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  // Determine the display thumbnail
  const getThumbnail = (item: any) => {
    if (item.thumbnail_url) return item.thumbnail_url
    if (item.type === 'image' && item.file_url) return item.file_url
    if (item.type === 'video' && item.external_url) {
      const ytId = getYoutubeId(item.external_url)
      if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
    }
    return null // Will show an icon fallback
  }

  const handleMediaClick = (item: any) => {
    if (item.type === 'document' && (item.file_url || item.external_url)) {
      // Documents open in a new tab
      window.open(item.file_url || item.external_url, '_blank')
    } else {
      // Videos and images open in the lightbox
      setSelectedMedia(item)
    }
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {cat === 'Alle' ? ui.tabs.all : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const thumb = getThumbnail(item)

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => handleMediaClick(item)}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={thumb} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-slate-300">
                      {item.type === 'video' ? <Play className="w-12 h-12" /> : item.type === 'image' ? <ImageIcon className="w-12 h-12" /> : <FileText className="w-12 h-12" />}
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-brand-navy/20 transition-colors duration-300" />
                  
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-brand-navy ml-1" />
                      </div>
                    </div>
                  )}
                  {item.type === 'image' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm scale-75 group-hover:scale-100 transition-transform duration-300">
                        <ImageIcon className="w-5 h-5 text-brand-navy" />
                      </div>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-navy shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand-turquoise transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No media found.
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/95 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-2xl relative"
            >
              {selectedMedia.type === 'video' ? (
                <div className="relative aspect-video w-full bg-black">
                  {selectedMedia.external_url && getYoutubeId(selectedMedia.external_url) ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYoutubeId(selectedMedia.external_url)}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0"
                    />
                  ) : selectedMedia.file_url ? (
                    <video 
                      src={selectedMedia.file_url} 
                      controls 
                      autoPlay 
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">Video could not be loaded</div>
                  )}
                </div>
              ) : selectedMedia.type === 'image' ? (
                <div className="relative w-full max-h-[85vh] bg-black flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMedia.file_url || selectedMedia.external_url}
                    alt={selectedMedia.title}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </div>
              ) : null}

              {/* Media Title Bar in Modal */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                <h3 className="text-xl font-bold text-white mb-1">{selectedMedia.title}</h3>
                {selectedMedia.description && (
                  <p className="text-sm text-white/80">{selectedMedia.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
