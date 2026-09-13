import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Clock, ShoppingBag, Lock } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../hooks/useCart'
import Toast from '../components/Toast'
import ProductCard from '../components/ProductCard'

// Fixed drop date — stable, never recalculated
const DROP_DATE = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

const pad = (n) => String(n).padStart(2, '0')

const CountdownUnit = ({ value, label }) => (
  <div className="text-center">
    <div className="bg-elvara-charcoal border border-elvara-gold/30 w-16 sm:w-20 md:w-28 py-3 md:py-6 flex items-center justify-center">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-serif text-2xl sm:text-3xl md:text-5xl text-elvara-ivory tabular-nums"
      >
        {pad(value)}
      </motion.span>
    </div>
    <p className="font-sans text-elvara-gold text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] uppercase mt-2">{label}</p>
  </div>
)

const PrivateDrop = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [toast, setToast] = useState(null)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const { addToCart } = useCart()

  const dropProducts = products.filter((p) => p.featured).slice(0, 4)

  // Stable interval — DROP_DATE never changes
  useEffect(() => {
    const calc = () => {
      const diff = DROP_DATE - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    setToast({ message: `${product.name} added to bag`, type: 'success' })
  }

  const handleJoin = (e) => {
    e.preventDefault()
    if (email) { setJoined(true); setToast({ message: 'You\'re on the list!', type: 'success' }) }
  }

  return (
    <div className="min-h-screen">
      {toast && (
        <Toast key={toast.message + Date.now()} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1920&q=80"
          alt="Private Drop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-elvara-black/70" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Lock size={12} className="text-elvara-gold" />
            <span className="font-sans text-elvara-gold text-[10px] tracking-[0.5em] uppercase">Exclusive Access</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl text-elvara-ivory mb-4 leading-none tracking-wide"
          >
            The Private<br />
            <em className="font-light italic">Drop</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-16 h-px bg-elvara-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-sans text-elvara-ivory/70 text-sm leading-loose max-w-lg mx-auto mb-10"
          >
            Created in numbers so small, most will never own one. Reserved for those who arrive early.
            Once it's gone — it's gone forever.
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-5"
          >
            <CountdownUnit value={timeLeft.days}    label="Days" />
            <span className="font-serif text-elvara-gold/50 text-xl sm:text-3xl mb-5">:</span>
            <CountdownUnit value={timeLeft.hours}   label="Hours" />
            <span className="font-serif text-elvara-gold/50 text-xl sm:text-3xl mb-5">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <span className="font-serif text-elvara-gold/50 text-xl sm:text-3xl mb-5">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="font-sans text-elvara-ivory/30 text-xs mt-6 flex items-center justify-center gap-2"
          >
            <Clock size={12} />
            Drop closes {DROP_DATE.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-3">Limited Collection</p>
            <h2 className="font-serif text-4xl text-elvara-ivory">Exclusive Pieces</h2>
          </div>
          <div className="flex items-center gap-2 bg-elvara-charcoal border border-elvara-gold/20 px-4 py-2">
            <ShoppingBag size={14} className="text-elvara-gold" />
            <span className="font-sans text-elvara-ivory/60 text-xs tracking-wider">Only 50 pieces per style</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dropProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Stock badge */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-elvara-charcoal mb-4 relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-elvara-gold text-elvara-black font-sans text-[9px] tracking-[0.3em] px-2.5 py-1">
                    LIMITED
                  </div>
                  <div className="absolute bottom-3 left-3 bg-elvara-black/85 backdrop-blur-sm text-elvara-ivory font-sans text-[10px] px-3 py-1.5">
                    {[8, 12, 5, 17][i]} remaining
                  </div>

                  {/* Add to bag overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-elvara-ivory text-elvara-black font-sans text-[10px] tracking-[0.25em] uppercase py-3 hover:bg-elvara-gold hover:text-white transition-all duration-300"
                    >
                      Add to Bag
                    </button>
                  </motion.div>
                </div>

                <h3 className="font-serif text-elvara-ivory text-xl mb-1">{product.name}</h3>
                <p className="font-sans text-elvara-ivory/40 text-xs tracking-wider mb-2">{product.category}</p>
                <p className="font-serif text-elvara-ivory text-lg">${product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section className="bg-elvara-charcoal border-y border-elvara-gold/15 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-4">Never Miss a Drop</p>
            <h3 className="font-serif text-3xl md:text-4xl text-elvara-ivory mb-4">Join the Waitlist</h3>
            <p className="font-sans text-elvara-ivory/50 text-sm mb-10 leading-relaxed">
              Get early access to future exclusive drops and private collection previews.
            </p>

            {joined ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-elvara-gold/10 border border-elvara-gold/30 px-8 py-5"
              >
                <p className="font-serif text-elvara-gold text-xl mb-1">You're on the list.</p>
                <p className="font-sans text-elvara-ivory/50 text-sm">We'll be in touch before the next drop.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-elvara-black border border-elvara-gold/20 border-r-0 sm:border-r-0 px-5 py-3.5 text-elvara-ivory font-sans text-sm focus:outline-none focus:border-elvara-gold placeholder:text-elvara-ivory/20 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-elvara-gold text-elvara-black font-sans text-[10px] tracking-[0.3em] uppercase px-7 py-3.5 hover:bg-elvara-gold-light transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: '50',   label: 'Pieces per style',     desc: 'Every Private Drop produces exactly 50 units per style. No exceptions, no reprints.' },
            { num: '400+', label: 'Hours of craftsmanship', desc: 'Each drop piece receives our highest level of handwork — more than our standard collection.' },
            { num: '0',    label: 'Restocks. Ever.',       desc: 'When a Drop piece sells out, it is retired. No waitlist, no restock, no second chance.' },
          ].map((item) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-elvara-gold/15 p-8 text-center"
            >
              <p className="font-serif text-elvara-gold text-5xl mb-3">{item.num}</p>
              <p className="font-sans text-elvara-ivory text-sm tracking-wider uppercase mb-3">{item.label}</p>
              <p className="font-sans text-elvara-ivory/45 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PrivateDrop
