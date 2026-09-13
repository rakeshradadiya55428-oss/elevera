import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Plus, Minus, Heart, Truck, Shield, RefreshCw, ArrowLeft } from 'lucide-react'
import { products } from '../data/products'
import Button from '../components/Button'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import Toast from '../components/Toast'
import ProductCard from '../components/ProductCard'

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()

  if (!product) {
    return (
      <div className="pt-36 pb-24 px-6 text-center">
        <h1 className="font-serif text-3xl text-elvara-ivory mb-6">Product Not Found</h1>
        <Link to="/shop" className="elvara-btn-secondary inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Return to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setToast({ message: `${product.name} added to bag`, type: 'success' })
  }

  const handleWishlist = () => {
    const added = toggleWishlist(product)
    setToast({
      message: added ? `${product.name} saved` : 'Removed from wishlist',
      type: added ? 'success' : 'info',
    })
  }

  const related = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4)

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating))

  return (
    <div className="pt-28 pb-24">
      {toast && (
        <Toast key={toast.message} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="elvara-container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 font-sans text-xs tracking-wider text-elvara-ivory/30">
          <Link to="/shop" className="hover:text-elvara-gold transition-colors flex items-center gap-1.5">
            <ArrowLeft size={12} /> Shop
          </Link>
          <span>/</span>
          <Link
            to={`/shop?collection=${product.collection}`}
            className="hover:text-elvara-gold transition-colors uppercase"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-elvara-ivory/60">{product.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-24">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-square overflow-hidden bg-elvara-charcoal mb-3">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
              {product.availability === 'Limited Edition' && (
                <div className="absolute top-4 left-4 bg-elvara-gold text-elvara-black font-sans text-[9px] tracking-[0.3em] px-3 py-1.5">
                  LIMITED EDITION
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden border transition-all duration-200 ${
                      selectedImage === i
                        ? 'border-elvara-gold'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover bg-elvara-charcoal" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            {/* Category & name */}
            <div>
              <p className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-3">
                {product.category}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory leading-tight mb-3">
                {product.name}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {stars.map((filled, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={filled ? 'text-elvara-gold fill-elvara-gold' : 'text-elvara-ivory/20'}
                    />
                  ))}
                </div>
                <span className="font-sans text-elvara-ivory/40 text-xs">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 border-t border-elvara-gold/10 pt-6">
              <p className="font-serif text-3xl text-elvara-ivory">${product.price.toLocaleString()}</p>
              <p className="font-sans text-elvara-gold text-xs tracking-wider">{product.availability}</p>
            </div>

            {/* Description */}
            <p className="font-sans text-elvara-ivory/65 text-sm leading-loose">
              {product.description}
            </p>

            {/* Specs */}
            <div className="space-y-3 border-t border-elvara-gold/10 pt-5">
              <div className="flex justify-between text-sm">
                <span className="font-sans text-elvara-ivory/40">Material</span>
                <span className="font-sans text-elvara-ivory/80 text-right max-w-[60%]">
                  {product.material}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-sans text-elvara-ivory/40">Availability</span>
                <span className={`font-sans text-sm ${
                  product.availability === 'In Stock' ? 'text-emerald-400' : 'text-elvara-gold'
                }`}>
                  {product.availability}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-5">
              <span className="font-sans text-elvara-ivory/40 text-xs tracking-wider uppercase">Qty</span>
              <div className="flex items-center border border-elvara-gold/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-elvara-ivory hover:text-elvara-gold transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2.5 font-sans text-elvara-ivory text-sm min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-elvara-ivory hover:text-elvara-gold transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-elvara-ivory text-elvara-black font-sans text-xs tracking-[0.25em] uppercase py-4 hover:bg-elvara-gold hover:text-white transition-all duration-300"
              >
                Add to Bag
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWishlist}
                className={`w-14 flex items-center justify-center border transition-all duration-300 ${
                  isInWishlist(product.id)
                    ? 'border-elvara-gold text-elvara-gold bg-elvara-gold/10'
                    : 'border-elvara-ivory/20 text-elvara-ivory/60 hover:border-elvara-gold hover:text-elvara-gold'
                }`}
              >
                <Heart
                  size={18}
                  fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                />
              </motion.button>
            </div>

            {/* Service info */}
            <div className="grid grid-cols-3 gap-4 border-t border-elvara-gold/10 pt-6">
              {[
                { icon: <Truck size={16} />, title: 'Free Shipping', desc: 'Orders over $500' },
                { icon: <Shield size={16} />, title: '2-Year Warranty', desc: 'Full coverage' },
                { icon: <RefreshCw size={16} />, title: '30-Day Returns', desc: 'Hassle-free' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <span className="text-elvara-gold/70 flex justify-center mb-2">{item.icon}</span>
                  <p className="font-sans text-elvara-ivory text-[10px] tracking-wider">{item.title}</p>
                  <p className="font-sans text-elvara-ivory/40 text-[10px] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Craftsmanship section */}
        <div className="border-t border-elvara-gold/15 pt-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-5">The Making</p>
              <h2 className="font-serif text-3xl text-elvara-ivory mb-6">Uncompromising Craft</h2>
              <p className="font-sans text-elvara-ivory/60 text-sm leading-loose mb-4">
                Every ÉLVARA piece represents hundreds of hours of meticulous craftsmanship. Our artisans combine traditional techniques with modern precision to create objects of enduring beauty.
              </p>
              <p className="font-sans text-elvara-ivory/60 text-sm leading-loose">
                From the initial design sketches to the final quality inspection, each step is performed with unwavering attention to detail.
              </p>
            </div>
            <div className="aspect-video overflow-hidden bg-elvara-charcoal">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=900&q=80"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t border-elvara-gold/15 pt-20">
            <p className="elvara-subheading mb-4">You May Also Like</p>
            <h2 className="font-serif text-3xl text-elvara-ivory mb-10">From the Same Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
