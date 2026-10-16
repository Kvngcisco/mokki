import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Share2, Heart, Send, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { SOCIALS } from '../config'
import { ASSETS } from '../assets'
import toast from 'react-hot-toast'

const MEMES = [
  { id: 1, src: ASSETS.logoFull, caption: 'MOKKI to the moon! 🚀',        category: 'bullish'   },
  { id: 2, src: ASSETS.mascot,   caption: 'Community is everything 🤝',    category: 'community' },
  { id: 3, src: ASSETS.logoFull, caption: '0 / 0 tax — why pay more? 💰', category: 'bullish'   },
  { id: 4, src: ASSETS.mascot,   caption: 'DAO governance loading… 🏛️',   category: 'dao'       },
  { id: 5, src: ASSETS.logoFull, caption: 'HODL strong 💎🤲',              category: 'bullish'   },
  { id: 6, src: ASSETS.mascot,   caption: 'Welcome to the herd! 🐂',       category: 'community' },
]

const CATEGORIES = ['all', 'bullish', 'community', 'dao']

type Meme = typeof MEMES[0]

export default function MemeGallery() {
  const [filter, setFilter]       = useState('all')
  const [likes, setLikes]         = useState<Record<number, number>>({})
  const [liked, setLiked]         = useState<Record<number, boolean>>({})
  const [lightbox, setLightbox]   = useState<Meme | null>(null)
  const lightboxRef               = useRef<HTMLDivElement>(null)

  const filtered = filter === 'all' ? MEMES : MEMES.filter(m => m.category === filter)

  /* keyboard nav in lightbox */
  useEffect(() => {
    if (!lightbox) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightbox(null); return }
      const idx = filtered.findIndex(m => m.id === lightbox.id)
      if (e.key === 'ArrowRight') setLightbox(filtered[(idx + 1) % filtered.length])
      if (e.key === 'ArrowLeft')  setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length])
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [lightbox, filtered])

  const handleLike = (id: number) => {
    if (liked[id]) return
    setLikes(l => ({ ...l, [id]: (l[id] ?? 0) + 1 }))
    setLiked(l => ({ ...l, [id]: true }))
    toast.success('Liked! 🐂', { duration: 1500 })
  }

  const handleShare = (meme: Meme) => {
    if (navigator.share) {
      navigator.share({ title: 'MOKKI DAO Meme', text: meme.caption, url: window.location.href })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied!', { icon: '🔗' })
    }
  }

  const navigate = (dir: 1 | -1) => {
    if (!lightbox) return
    const idx = filtered.findIndex(m => m.id === lightbox.id)
    setLightbox(filtered[(idx + dir + filtered.length) % filtered.length])
  }

  return (
    <section id="memes" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-flex">The Culture</span>
          <h2 className="section-title">Meme Gallery</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            The internet's favourite bull has spoken. Browse, like and share.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border capitalize transition-all duration-200
                ${filter === cat
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'border-dark-border text-cream/50 hover:border-gold/40 hover:text-cream'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((meme, i) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="break-inside-avoid glass-card overflow-hidden group"
            >
              {/* Image */}
              <div
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setLightbox(meme)}
              >
                <img
                  src={meme.src}
                  alt={meme.caption}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Caption + actions */}
              <div className="p-3">
                <p className="text-xs text-cream/70 mb-2 leading-snug">{meme.caption}</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(meme.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${liked[meme.id] ? 'text-pink' : 'text-cream/40 hover:text-pink'}`}
                    aria-label="Like"
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked[meme.id] ? 'fill-current' : ''}`} />
                    {(likes[meme.id] ?? 0) > 0 && <span>{likes[meme.id]}</span>}
                  </button>
                  <button
                    onClick={() => handleShare(meme)}
                    className="text-cream/40 hover:text-gold transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={meme.src}
                    download
                    className="text-cream/40 hover:text-gold transition-colors"
                    aria-label="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-cream/50 text-sm mb-3">Got a great meme? Share it with the community!</p>
          <a
            href={SOCIALS.telegram ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Send className="w-4 h-4" />
            Submit your meme on Telegram
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/95 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Meme lightbox"
          >
            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-card/80 flex items-center justify-center hover:bg-gold/20 transition-colors z-10"
              onClick={e => { e.stopPropagation(); navigate(-1) }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-cream" />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-card/80 flex items-center justify-center hover:bg-gold/20 transition-colors z-10"
              onClick={e => { e.stopPropagation(); navigate(1) }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-cream" />
            </button>

            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-lg w-full glass-card overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-dark-bg/80 border border-dark-border flex items-center justify-center hover:border-gold/40 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-cream" />
              </button>

              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full object-contain max-h-[65vh]"
              />

              <div className="p-4">
                <p className="text-sm text-cream/70 mb-3">{lightbox.caption}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLike(lightbox.id)}
                    className={`btn-outline text-xs px-3 py-2 flex items-center gap-1.5 ${liked[lightbox.id] ? '!border-pink/40 !text-pink' : ''}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked[lightbox.id] ? 'fill-current' : ''}`} />
                    Like {(likes[lightbox.id] ?? 0) > 0 && `(${likes[lightbox.id]})`}
                  </button>
                  <button
                    onClick={() => handleShare(lightbox)}
                    className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                  <a
                    href={lightbox.src}
                    download
                    className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
