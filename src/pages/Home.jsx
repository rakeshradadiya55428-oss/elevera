import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { collections, products } from '../data/products'
import ProductCard from '../components/ProductCard'

/* ─── Fade-in helper ─── */
const FadeIn = ({ children, delay = 0, y = 20, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/* ─── Hero ─── */
const Hero = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-elvara-black/55" />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.45em' }}
          transition={{ duration: 1.4, delay: 0.1 }}
          className="font-sans text-elvara-gold text-[10px] tracking-[0.45em] uppercase mb-8"
        >
          Maison de Luxe · Est. 2018
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(4rem,12vw,9rem)] text-elvara-ivory leading-none tracking-[0.08em] mb-6"
        >
          ÉLVARA
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="w-16 h-px bg-elvara-gold mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-serif text-elvara-ivory/80 text-lg md:text-xl italic max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Luxury, Reimagined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/shop" className="elvara-btn-primary">
            Discover Collection
          </Link>
          <Link to="/atelier" className="elvara-btn-secondary">
            Explore Atelier
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-elvara-gold/60 to-transparent"
        />
        <p className="font-sans text-elvara-ivory/30 text-[9px] tracking-[0.4em] uppercase">Scroll</p>
      </motion.div>
    </section>
  )
}

/* ─── Marquee ─── */
const Marquee = () => {
  const words = ['Craftsmanship', 'Exclusivity', 'Timeless Design', 'ÉLVARA', 'Precision', 'Heritage', 'Bespoke']
  const repeated = [...words, ...words, ...words]

  return (
    <div className="bg-elvara-charcoal border-y border-elvara-gold/15 py-5 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-0"
      >
        {repeated.map((word, i) => (
          <span key={i} className="font-sans text-[10px] tracking-[0.45em] uppercase text-elvara-ivory/30 mx-8">
            {word}
            <span className="ml-8 text-elvara-gold/50">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Collections grid ─── */
const CollectionsSection = () => (
  <section className="elvara-section elvara-container">
    <FadeIn className="text-center mb-16">
      <p className="elvara-subheading mb-4">Collections</p>
      <h2 className="font-serif text-4xl md:text-5xl text-elvara-ivory">Curated Excellence</h2>
      <div className="gold-line mt-5" />
    </FadeIn>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {collections.map((col, i) => (
        <FadeIn key={col.id} delay={i * 0.1}>
          <Link
            to={`/shop?collection=${col.id}`}
            className="group relative aspect-[3/4] overflow-hidden block"
          >
            <img
              src={col.image}
              alt={col.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-elvara-black via-elvara-black/30 to-transparent" />
            <div className="absolute inset-0 bg-elvara-gold/0 group-hover:bg-elvara-gold/5 transition-all duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-sans text-elvara-gold/70 text-[9px] tracking-[0.4em] uppercase mb-2">
                Collection
              </p>
              <h3 className="font-serif text-elvara-ivory text-2xl tracking-wide mb-2">{col.name}</h3>
              <p className="font-sans text-elvara-ivory/50 text-xs mb-4 leading-relaxed">{col.description}</p>
              <span className="font-sans text-elvara-gold text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  </section>
)

/* ─── Featured editorial ─── */
const FeaturedEditorial = () => {
  const featured = products.find((p) => p.id === 4) // MONARCH

  if (!featured) return null

  return (
    <section className="elvara-section bg-elvara-charcoal">
      <div className="elvara-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn y={30}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={featured.images[0]}
                  alt={featured.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame — hidden on small screens to avoid overflow */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border border-elvara-gold/20 pointer-events-none" />
              <div className="hidden sm:block absolute -top-4 -left-4 w-16 h-16 border border-elvara-gold/10 pointer-events-none" />
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.2} y={30}>
            <div className="space-y-7">
              <div>
                <p className="elvara-subheading mb-4">Featured Piece</p>
                <h2 className="font-serif text-4xl md:text-5xl text-elvara-ivory leading-tight mb-2">
                  {featured.name}
                </h2>
                <p className="font-sans text-elvara-gold/60 text-xs tracking-wider">
                  {featured.category} · {featured.availability}
                </p>
              </div>

              <div className="w-8 h-px bg-elvara-gold/40" />

              <p className="font-sans text-elvara-ivory/70 text-sm leading-loose">
                {featured.description}
              </p>

              <div className="space-y-3 border-t border-elvara-gold/15 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/40">Material</span>
                  <span className="font-sans text-elvara-ivory/80">{featured.material}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-elvara-ivory/40 text-sm">Price</span>
                  <span className="font-serif text-elvara-ivory text-2xl">
                    ${featured.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Link to={`/product/${featured.id}`} className="elvara-btn-primary">
                  View Details
                </Link>
                <Link to="/shop?collection=timepieces" className="elvara-btn-secondary">
                  All Timepieces
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── New arrivals ─── */
const NewArrivals = () => {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <section className="elvara-section elvara-container">
      <FadeIn className="flex items-end justify-between mb-14">
        <div>
          <p className="elvara-subheading mb-3">Just Arrived</p>
          <h2 className="font-serif text-4xl md:text-5xl text-elvara-ivory">New Arrivals</h2>
        </div>
        <Link
          to="/shop?sort=newest"
          className="font-sans text-elvara-gold text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 hover:gap-3 transition-all"
        >
          View All <ArrowRight size={12} />
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProducts.map((product, i) => (
          <FadeIn key={product.id} delay={i * 0.1}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ─── Atelier CTA ─── */
const AtelierCTA = () => (
  <section className="relative overflow-hidden py-28">
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1600&q=80"
        alt="Atelier"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-elvara-black/70" />
    </div>

    <FadeIn className="relative z-10 text-center px-6 max-w-2xl mx-auto">
      <p className="elvara-subheading mb-5">Bespoke Service</p>
      <h2 className="font-serif text-4xl md:text-6xl text-elvara-ivory mb-6 leading-tight">
        ÉLVARA<br />
        <em className="font-serif font-light italic">Atelier</em>
      </h2>
      <p className="font-sans text-elvara-ivory/70 text-sm leading-loose mb-10 max-w-lg mx-auto">
        Design your own signature piece. Select materials, finishes, and hardware to create
        something entirely your own — crafted by our master artisans.
      </p>
      <Link to="/atelier" className="elvara-btn-gold">
        Begin Your Creation
      </Link>
    </FadeIn>
  </section>
)

/* ─── Private Drop Teaser ─── */
const PrivateDropTeaser = () => (
  <section className="elvara-section bg-elvara-charcoal">
    <div className="elvara-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeIn y={30}>
          <div className="aspect-video overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=80"
              alt="Private Drop"
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.2} y={30}>
          <div>
            <p className="elvara-subheading mb-5">Exclusive Access</p>
            <h2 className="font-serif text-4xl md:text-5xl text-elvara-ivory mb-6 leading-tight">
              The Private Drop
            </h2>
            <p className="font-sans text-elvara-ivory/60 text-sm leading-loose mb-8">
              A limited collection created in numbers so small, most will never own one.
              Reserved for those who arrive early. Once it's gone, it's gone.
            </p>
            <Link to="/private-drop" className="elvara-btn-secondary inline-flex items-center gap-3">
              Access the Drop <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
)

/* ─── Stats strip ─── */
const Stats = () => {
  const data = [
    { value: '6+', label: 'Years of Craftsmanship' },
    { value: '40+', label: 'Master Artisans' },
    { value: '12', label: 'Iconic Collections' },
    { value: '∞', label: 'Hours of Detail' },
  ]

  return (
    <div className="border-y border-elvara-gold/15 py-14 elvara-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {data.map((item, i) => (
          <FadeIn key={i} delay={i * 0.08} className="text-center">
            <p className="font-serif text-elvara-gold text-4xl md:text-5xl mb-2">{item.value}</p>
            <p className="font-sans text-elvara-ivory/40 text-xs tracking-[0.2em] uppercase">
              {item.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

/* ─── Main export ─── */
const Home = () => (
  <div>
    <Hero />
    <Marquee />
    <CollectionsSection />
    <FeaturedEditorial />
    <NewArrivals />
    <Stats />
    <AtelierCTA />
    <PrivateDropTeaser />
  </div>
)

export default Home
