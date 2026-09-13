import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'
import Toast from '../components/Toast'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [toast, setToast] = useState(null)

  const handleMoveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
    setToast({ message: `${product.name} moved to bag`, type: 'success' })
  }

  if (wishlist.length === 0) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <Heart size={56} className="text-elvara-ivory/10 mx-auto mb-8" strokeWidth={1} />
          <h1 className="font-serif text-3xl text-elvara-ivory mb-3">Your Wishlist</h1>
          <p className="font-sans text-elvara-ivory/40 text-sm mb-10 leading-relaxed">
            Save pieces you love and they'll appear here.
          </p>
          <Link to="/shop" className="elvara-btn-primary">
            Explore Collection
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24">
      {toast && (
        <Toast key={toast.message} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="elvara-container">
        <div className="border-b border-elvara-gold/15 pb-8 mb-12">
          <p className="elvara-subheading mb-3">Saved Pieces</p>
          <div className="flex items-end justify-between">
            <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory">Wishlist</h1>
            <p className="font-sans text-elvara-ivory/30 text-sm">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-elvara-charcoal mb-4">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove btn */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-elvara-black/80 backdrop-blur-sm text-elvara-ivory/60 hover:text-red-400 w-8 h-8 flex items-center justify-center transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Info */}
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-elvara-ivory text-lg hover:text-elvara-gold transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-elvara-ivory/40 text-xs tracking-wider mt-0.5 mb-3">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-sans text-elvara-ivory text-base">
                      ${product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] uppercase text-elvara-gold hover:text-elvara-gold-light transition-colors"
                    >
                      <ShoppingBag size={13} /> Add to Bag
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
