import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { products } from '../data/products'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Collections', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?sort=newest' },
    { name: 'Private Drop', path: '/private-drop' },
    { name: 'Atelier', path: '/atelier' },
    { name: 'About', path: '/about' },
  ]

  const isActive = (path) => {
    const base = path.split('?')[0]
    return location.pathname === base
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-elvara-black/95 backdrop-blur-md border-b border-elvara-gold/20 py-4'
            : 'bg-gradient-to-b from-elvara-black/70 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl text-elvara-ivory tracking-[0.15em] hover:text-elvara-gold transition-colors duration-300"
          >
            ÉLVARA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-elvara-gold'
                    : 'text-elvara-ivory/80 hover:text-elvara-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 md:gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-elvara-ivory/80 hover:text-elvara-gold transition-colors"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <Link
              to="/wishlist"
              className="text-elvara-ivory/80 hover:text-elvara-gold transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-elvara-gold text-elvara-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="text-elvara-ivory/80 hover:text-elvara-gold transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-elvara-gold text-elvara-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="text-elvara-ivory/80 hover:text-elvara-gold transition-colors hidden md:block"
              aria-label="Account"
            >
              <User size={19} />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-elvara-ivory/80 hover:text-elvara-gold transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-0 left-0 right-0 z-30 bg-elvara-black/97 backdrop-blur-xl border-b border-elvara-gold/20 pt-20"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-sans text-sm tracking-[0.25em] uppercase transition-colors ${
                    isActive(link.path) ? 'text-elvara-gold' : 'text-elvara-ivory/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-sm tracking-[0.25em] uppercase text-elvara-ivory/80"
              >
                Account
              </Link>
              <div className="border-t border-elvara-gold/20 pt-5 flex gap-6">
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm text-elvara-ivory/60 tracking-wider"
                >
                  Bag ({cartCount})
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-sm text-elvara-ivory/60 tracking-wider"
                >
                  Wishlist ({wishlist.length})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allProducts={products}
      />
    </>
  )
}

const SearchOverlay = ({ isOpen, onClose, allProducts }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    if (!isOpen) setQuery('')
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const filteredProducts = query.trim().length > 0
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const handleProductClick = (id) => {
    onClose()
    navigate(`/product/${id}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-elvara-black/97 backdrop-blur-xl z-50 flex items-start justify-center pt-28 px-6"
        >
          <div className="w-full max-w-3xl">
            {/* Search input */}
            <div className="flex items-center gap-4 border-b border-elvara-gold/40 pb-4 mb-8">
              <Search size={22} className="text-elvara-gold flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, products..."
                className="flex-1 bg-transparent text-elvara-ivory text-xl font-serif focus:outline-none placeholder:text-elvara-ivory/25"
              />
              <button
                onClick={onClose}
                className="text-elvara-ivory/60 hover:text-elvara-gold transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Results */}
            {query.trim() && filteredProducts.length > 0 ? (
              <div>
                <p className="font-sans text-elvara-ivory/40 text-xs tracking-[0.3em] mb-5">
                  {filteredProducts.length} RESULT{filteredProducts.length !== 1 ? 'S' : ''}
                </p>
                <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-5 p-4 hover:bg-elvara-charcoal/60 transition-colors group text-left"
                    >
                      <div className="w-16 h-16 bg-elvara-charcoal overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-elvara-ivory text-lg group-hover:text-elvara-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="font-sans text-elvara-ivory/50 text-sm">{product.category}</p>
                      </div>
                      <p className="font-sans text-elvara-gold text-sm">
                        ${product.price.toLocaleString()}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : query.trim() ? (
              <div className="text-center py-16">
                <p className="font-serif text-2xl text-elvara-ivory/40 mb-2">No results</p>
                <p className="font-sans text-elvara-ivory/30 text-sm">Try a different search term</p>
              </div>
            ) : (
              <div>
                <p className="font-sans text-elvara-ivory/40 text-xs tracking-[0.3em] mb-5">
                  SUGGESTED
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Timepieces', 'Leather Goods', 'Atelier', 'Essentials', 'New Arrivals'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-5 py-2 border border-elvara-gold/25 text-elvara-ivory/70 hover:border-elvara-gold hover:text-elvara-gold transition-all font-sans text-sm tracking-wider"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Navbar
