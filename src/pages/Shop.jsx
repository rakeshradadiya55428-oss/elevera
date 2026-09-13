import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { products, collections } from '../data/products'
import ProductCard from '../components/ProductCard'

const PRICE_RANGES = [
  { value: 'all',         label: 'All Prices' },
  { value: '0-1000',      label: 'Under $1,000' },
  { value: '1000-5000',   label: '$1,000 – $5,000' },
  { value: '5000-10000',  label: '$5,000 – $10,000' },
  { value: '10000-99999', label: '$10,000+' },
]

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'New Arrivals' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
]

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const collectionFilter = searchParams.get('collection') || ''
  const categoryFilter = searchParams.get('category') || ''
  const searchQuery = searchParams.get('q') || ''

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (collectionFilter) list = list.filter((p) => p.collection === collectionFilter)
    if (categoryFilter)   list = list.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase())
    if (searchQuery)      list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      list = list.filter((p) => p.price >= min && p.price <= max)
    }

    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price);               break
      case 'price-desc': list.sort((a, b) => b.price - a.price);               break
      case 'newest':     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      case 'rating':     list.sort((a, b) => b.rating - a.rating);             break
      case 'featured':
      default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return list
  }, [collectionFilter, categoryFilter, searchQuery, priceRange, sortBy])

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const clearAll = () => {
    setSearchParams(new URLSearchParams())
    setPriceRange('all')
    setSortBy('featured')
  }

  const pageTitle = collectionFilter
    ? collections.find((c) => c.id === collectionFilter)?.name || 'Collection'
    : categoryFilter
    ? categoryFilter
    : searchQuery
    ? `"${searchQuery}"`
    : 'All Products'

  const activeFilters =
    [collectionFilter, priceRange !== 'all' ? priceRange : ''].filter(Boolean).length

  return (
    <div className="pt-28 pb-24 min-h-screen">
      {/* Header */}
      <div className="elvara-container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-elvara-gold/15 pb-8"
        >
          <p className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-3">
            {collectionFilter ? 'Collection' : 'Shop'}
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory capitalize">
              {pageTitle}
            </h1>
            <p className="font-sans text-elvara-ivory/30 text-sm">
              {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>

        {/* Filter / Sort bar */}
        <div className="flex items-center justify-between pt-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border px-4 py-2.5 transition-colors ${
                filterOpen || activeFilters > 0
                  ? 'border-elvara-gold text-elvara-gold'
                  : 'border-elvara-ivory/20 text-elvara-ivory/60 hover:border-elvara-ivory/50'
              }`}
            >
              <SlidersHorizontal size={13} />
              Filter
              {activeFilters > 0 && (
                <span className="bg-elvara-gold text-elvara-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center ml-1">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Active filter pills */}
            {collectionFilter && (
              <button
                onClick={() => setParam('collection', '')}
                className="flex items-center gap-1.5 bg-elvara-gold/10 border border-elvara-gold/30 text-elvara-gold font-sans text-[10px] tracking-wider px-3 py-2"
              >
                {collections.find((c) => c.id === collectionFilter)?.name}
                <X size={10} />
              </button>
            )}
            {priceRange !== 'all' && (
              <button
                onClick={() => setPriceRange('all')}
                className="flex items-center gap-1.5 bg-elvara-gold/10 border border-elvara-gold/30 text-elvara-gold font-sans text-[10px] tracking-wider px-3 py-2"
              >
                {PRICE_RANGES.find((r) => r.value === priceRange)?.label}
                <X size={10} />
              </button>
            )}
            {(collectionFilter || priceRange !== 'all') && (
              <button
                onClick={clearAll}
                className="font-sans text-[10px] tracking-wider text-elvara-ivory/40 hover:text-elvara-ivory transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-elvara-ivory/60 hover:text-elvara-ivory transition-colors"
            >
              {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <ChevronDown size={13} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-9 bg-elvara-charcoal border border-elvara-gold/20 py-2 min-w-[200px] z-20"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-5 py-3 font-sans text-xs tracking-wider transition-colors ${
                        sortBy === opt.value
                          ? 'text-elvara-gold bg-elvara-gold/5'
                          : 'text-elvara-ivory/60 hover:text-elvara-ivory hover:bg-elvara-dark'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Expanded filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 pb-2 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-elvara-gold/10 mt-4">
                {/* Collections */}
                <div>
                  <h4 className="font-sans text-elvara-gold text-[9px] tracking-[0.4em] uppercase mb-4">Collections</h4>
                  <ul className="space-y-2.5">
                    <li>
                      <button
                        onClick={() => setParam('collection', '')}
                        className={`font-sans text-sm transition-colors ${
                          !collectionFilter ? 'text-elvara-gold' : 'text-elvara-ivory/50 hover:text-elvara-ivory'
                        }`}
                      >
                        All
                      </button>
                    </li>
                    {collections.map((col) => (
                      <li key={col.id}>
                        <button
                          onClick={() => setParam('collection', col.id)}
                          className={`font-sans text-sm transition-colors ${
                            collectionFilter === col.id ? 'text-elvara-gold' : 'text-elvara-ivory/50 hover:text-elvara-ivory'
                          }`}
                        >
                          {col.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div>
                  <h4 className="font-sans text-elvara-gold text-[9px] tracking-[0.4em] uppercase mb-4">Price Range</h4>
                  <ul className="space-y-2.5">
                    {PRICE_RANGES.map((range) => (
                      <li key={range.value}>
                        <button
                          onClick={() => setPriceRange(range.value)}
                          className={`font-sans text-sm transition-colors ${
                            priceRange === range.value ? 'text-elvara-gold' : 'text-elvara-ivory/50 hover:text-elvara-ivory'
                          }`}
                        >
                          {range.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product grid */}
      <div className="elvara-container">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-28"
          >
            <p className="font-serif text-3xl text-elvara-ivory/30 mb-4">No pieces found</p>
            <p className="font-sans text-elvara-ivory/30 text-sm mb-8">Try adjusting your filters</p>
            <button onClick={clearAll} className="elvara-btn-secondary">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Collection banner */}
      {!collectionFilter && (
        <div className="elvara-container mt-24">
          <div className="bg-elvara-charcoal border border-elvara-gold/15 p-10 md:p-16 text-center">
            <p className="elvara-subheading mb-4">Bespoke</p>
            <h3 className="font-serif text-3xl md:text-4xl text-elvara-ivory mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="font-sans text-elvara-ivory/50 text-sm mb-8 max-w-md mx-auto">
              Visit the Atelier to commission a piece crafted entirely to your specification.
            </p>
            <Link to="/atelier" className="elvara-btn-primary">
              Visit Atelier
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop
