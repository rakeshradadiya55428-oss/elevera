import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import Toast from './Toast'

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false)
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  const wishlisted = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setToast({ message: `${product.name} added to bag`, type: 'success' })
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    const added = toggleWishlist(product)
    setToast({
      message: added ? `${product.name} saved to wishlist` : `Removed from wishlist`,
      type: added ? 'success' : 'info',
    })
  }

  return (
    <>
      <div
        className="group relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-elvara-charcoal">
          {/* Main image */}
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Hover image */}
          <AnimatePresence>
            {hovered && product.images[1] && (
              <motion.img
                key="hover"
                src={product.images[1]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-elvara-ivory text-elvara-black font-sans text-[9px] tracking-[0.25em] px-2.5 py-1">
                NEW
              </span>
            )}
            {product.availability === 'Limited Edition' && (
              <span className="bg-elvara-gold text-elvara-black font-sans text-[9px] tracking-[0.25em] px-2.5 py-1">
                LIMITED
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              wishlisted
                ? 'text-elvara-gold opacity-100'
                : 'text-elvara-ivory/60 opacity-0 group-hover:opacity-100'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart
              size={17}
              fill={wishlisted ? 'currentColor' : 'none'}
              className="drop-shadow-sm"
            />
          </button>

          {/* Add to bag overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-elvara-black/90 backdrop-blur-sm text-elvara-ivory font-sans text-[10px] tracking-[0.25em] uppercase py-3 hover:bg-elvara-gold hover:text-elvara-black transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={13} />
              Add to Bag
            </button>
          </motion.div>
        </Link>

        {/* Product info */}
        <div className="pt-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-serif text-elvara-ivory text-base leading-snug hover:text-elvara-gold transition-colors truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="font-sans text-elvara-ivory/40 text-[11px] tracking-wider mt-0.5">
                {product.category}
              </p>
            </div>
            <p className="font-sans text-elvara-ivory text-sm ml-3 flex-shrink-0">
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          key={toast.message + Date.now()}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default ProductCard
