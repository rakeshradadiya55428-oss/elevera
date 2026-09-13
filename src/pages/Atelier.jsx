import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, ShoppingBag, Check } from 'lucide-react'
import Toast from '../components/Toast'
import { useCart } from '../hooks/useCart'

// ─── Config ─────────────────────────────────────────────────────────────────

const MATERIALS = [
  { id: 'obsidian', name: 'Obsidian',  price: 8900,  color: '#1a1a1a',  hex: '#1a1a1a',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { id: 'ivory',    name: 'Ivory',     price: 9200,  color: '#f5f0e8',  hex: '#f5f0e8',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80' },
  { id: 'burgundy', name: 'Burgundy',  price: 9500,  color: '#722f37',  hex: '#722f37',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80' },
  { id: 'navy',     name: 'Midnight',  price: 9800,  color: '#1b2a4a',  hex: '#1b2a4a',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80' },
]

const FINISHES = [
  { id: 'matte',    name: 'Matte',    price: 0,    desc: 'Understated elegance' },
  { id: 'brushed',  name: 'Brushed',  price: 350,  desc: 'Subtle texture' },
  { id: 'polished', name: 'Polished', price: 600,  desc: 'Mirror-like brilliance' },
]

const HARDWARE = [
  { id: 'champagne', name: 'Champagne Gold', price: 0,    swatch: '#c9a84c' },
  { id: 'silver',    name: 'Brushed Silver', price: 300,  swatch: '#a8a8a8' },
  { id: 'rose',      name: 'Rose Gold',      price: 500,  swatch: '#b76e79' },
  { id: 'black',     name: 'Matte Black',    price: 200,  swatch: '#222222' },
]

const STRAPS = [
  { id: 'alligator', name: 'Alligator',   price: 1200, desc: 'Exotic leather' },
  { id: 'calfskin',  name: 'Calfskin',    price: 0,    desc: 'Classic smooth' },
  { id: 'rubber',    name: 'Rubber',      price: 200,  desc: 'Sport & adventure' },
  { id: 'mesh',      name: 'Steel Mesh',  price: 400,  desc: 'Contemporary' },
]

// ─── Option Picker ───────────────────────────────────────────────────────────

const OptionRow = ({ label, children }) => (
  <div>
    <h3 className="font-sans text-elvara-gold text-[9px] tracking-[0.4em] uppercase mb-4">{label}</h3>
    {children}
  </div>
)

// ─── Main Component ──────────────────────────────────────────────────────────

const Atelier = () => {
  const [material, setMaterial] = useState('obsidian')
  const [finish,   setFinish]   = useState('matte')
  const [hardware, setHardware] = useState('champagne')
  const [strap,    setStrap]    = useState('calfskin')
  const [engraving, setEngraving] = useState('')
  const [toast, setToast] = useState(null)
  const { addToCart } = useCart()

  const m = MATERIALS.find((x) => x.id === material)
  const f = FINISHES.find((x)  => x.id === finish)
  const h = HARDWARE.find((x)  => x.id === hardware)
  const s = STRAPS.find((x)    => x.id === strap)

  const engravingPrice = engraving.trim() ? 250 : 0
  const totalPrice = m.price + f.price + h.price + s.price + engravingPrice

  const handleSave = () => {
    const design = { material, finish, hardware, strap, engraving, price: totalPrice, savedAt: new Date().toISOString() }
    const saved = JSON.parse(localStorage.getItem('elvara-designs') || '[]')
    saved.push(design)
    localStorage.setItem('elvara-designs', JSON.stringify(saved))
    setToast({ message: 'Design saved to your account', type: 'success' })
  }

  const handleOrder = () => {
    const product = {
      id: `atelier-${Date.now()}`,
      name: `Custom ${m.name} Timepiece`,
      category: 'Atelier',
      collection: 'atelier',
      price: totalPrice,
      images: [m.image],
      material: `${m.name} · ${f.name} finish · ${h.name} hardware`,
      availability: 'Made to Order',
    }
    addToCart(product)
    setToast({ message: 'Custom piece added to bag', type: 'success' })
  }

  return (
    <div className="pt-28 pb-24 min-h-screen">
      {toast && (
        <Toast key={toast.message + Date.now()} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-sans text-elvara-gold text-[10px] tracking-[0.5em] uppercase mb-4">Bespoke Service</p>
          <h1 className="font-serif text-5xl md:text-7xl text-elvara-ivory mb-4 tracking-wide">
            ÉLVARA <em className="italic font-light">Atelier</em>
          </h1>
          <div className="w-14 h-px bg-elvara-gold mx-auto mb-5" />
          <p className="font-sans text-elvara-ivory/55 text-sm max-w-xl mx-auto leading-loose">
            Design your signature timepiece. Select every detail — our master artisans will craft it by hand, in 8–12 weeks.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── Left: Live Preview ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            {/* Watch preview */}
            <div className="relative aspect-square overflow-hidden bg-elvara-charcoal mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={m.id}
                  src={m.image}
                  alt={m.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Color tint overlay to show material */}
              <motion.div
                key={`tint-${m.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{ backgroundColor: m.color }}
              />

              {/* Hardware accent */}
              <div
                className="absolute bottom-6 right-6 w-10 h-10 rounded-full border-2 shadow-xl"
                style={{ backgroundColor: h.swatch, borderColor: h.swatch + '88' }}
                title={`${h.name} hardware`}
              />

              {/* Label overlay */}
              <div className="absolute top-4 left-4 bg-elvara-black/70 backdrop-blur-sm px-4 py-2">
                <p className="font-serif text-elvara-ivory text-sm">
                  {m.name} · {f.name}
                </p>
                <p className="font-sans text-elvara-gold/70 text-[10px] tracking-wider">{h.name} Hardware</p>
              </div>
            </div>

            {/* Material swatches quick-pick */}
            <div className="flex gap-2">
              {MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setMaterial(mat.id)}
                  title={mat.name}
                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                    material === mat.id ? 'border-elvara-gold scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: mat.hex }}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Right: Options ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Material */}
            <OptionRow label="Case Material">
              <div className="grid grid-cols-2 gap-3">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setMaterial(mat.id)}
                    className={`p-4 border transition-all duration-200 text-left group ${
                      material === mat.id
                        ? 'border-elvara-gold bg-elvara-gold/8'
                        : 'border-elvara-gold/20 hover:border-elvara-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                        style={{ backgroundColor: mat.hex }}
                      />
                      <span className="font-serif text-elvara-ivory text-base">{mat.name}</span>
                      {material === mat.id && <Check size={12} className="text-elvara-gold ml-auto" />}
                    </div>
                    <p className="font-sans text-elvara-gold text-xs ml-8">
                      From ${mat.price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </OptionRow>

            {/* Finish */}
            <OptionRow label="Dial Finish">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setFinish(fin.id)}
                    className={`py-4 px-3 border transition-all duration-200 text-center ${
                      finish === fin.id
                        ? 'border-elvara-gold bg-elvara-gold/8'
                        : 'border-elvara-gold/20 hover:border-elvara-gold/50'
                    }`}
                  >
                    <p className="font-sans text-elvara-ivory text-sm mb-1">{fin.name}</p>
                    <p className="font-sans text-elvara-ivory/40 text-[10px] mb-1">{fin.desc}</p>
                    <p className="font-sans text-elvara-gold text-[10px]">
                      {fin.price > 0 ? `+$${fin.price}` : 'Included'}
                    </p>
                  </button>
                ))}
              </div>
            </OptionRow>

            {/* Hardware */}
            <OptionRow label="Hardware Finish">
              <div className="grid grid-cols-2 gap-3">
                {HARDWARE.map((hw) => (
                  <button
                    key={hw.id}
                    onClick={() => setHardware(hw.id)}
                    className={`p-4 border transition-all duration-200 flex items-center gap-3 text-left ${
                      hardware === hw.id
                        ? 'border-elvara-gold bg-elvara-gold/8'
                        : 'border-elvara-gold/20 hover:border-elvara-gold/50'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-white/10 flex-shrink-0"
                      style={{ backgroundColor: hw.swatch }}
                    />
                    <div className="min-w-0">
                      <p className="font-sans text-elvara-ivory text-sm leading-tight">{hw.name}</p>
                      <p className="font-sans text-elvara-gold text-[10px]">
                        {hw.price > 0 ? `+$${hw.price}` : 'Included'}
                      </p>
                    </div>
                    {hardware === hw.id && <Check size={12} className="text-elvara-gold ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </OptionRow>

            {/* Strap */}
            <OptionRow label="Strap Material">
              <div className="grid grid-cols-2 gap-3">
                {STRAPS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStrap(st.id)}
                    className={`p-4 border transition-all duration-200 text-left ${
                      strap === st.id
                        ? 'border-elvara-gold bg-elvara-gold/8'
                        : 'border-elvara-gold/20 hover:border-elvara-gold/50'
                    }`}
                  >
                    <p className="font-sans text-elvara-ivory text-sm mb-0.5">{st.name}</p>
                    <p className="font-sans text-elvara-ivory/40 text-[10px] mb-1">{st.desc}</p>
                    <p className="font-sans text-elvara-gold text-[10px]">
                      {st.price > 0 ? `+$${st.price}` : 'Included'}
                    </p>
                  </button>
                ))}
              </div>
            </OptionRow>

            {/* Engraving */}
            <OptionRow label={`Personal Engraving ${engraving.trim() ? '· +$250' : '· Optional'}`}>
              <div className="relative">
                <input
                  type="text"
                  maxLength={30}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="e.g. Per aspera ad astra"
                  className="w-full bg-elvara-black border border-elvara-gold/20 px-4 py-3 text-elvara-ivory font-serif italic text-base focus:outline-none focus:border-elvara-gold placeholder:text-elvara-ivory/20 placeholder:not-italic placeholder:font-sans transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-elvara-ivory/25 text-[10px]">
                  {engraving.length}/30
                </span>
              </div>
              <p className="font-sans text-elvara-ivory/30 text-[10px] mt-2 tracking-wider">
                Caseback engraving in our signature script
              </p>
            </OptionRow>

            {/* Summary & Price */}
            <div className="bg-elvara-charcoal border border-elvara-gold/20 p-5 sm:p-7">
              <h3 className="font-sans text-elvara-gold text-[9px] tracking-[0.4em] uppercase mb-5">Your Configuration</h3>

              <div className="space-y-2.5 mb-5">
                {[
                  { label: 'Material',  value: `${m.name}`, price: m.price },
                  { label: 'Finish',    value: f.name,  price: f.price },
                  { label: 'Hardware',  value: h.name,  price: h.price },
                  { label: 'Strap',     value: s.name,  price: s.price },
                  ...(engraving.trim() ? [{ label: 'Engraving', value: `"${engraving}"`, price: 250 }] : []),
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="font-sans text-elvara-ivory/40">{row.label}</span>
                    <span className="font-sans text-elvara-ivory text-right max-w-[55%]">
                      {row.value}
                      {row.price > 0 && row.label !== 'Material' && (
                        <span className="text-elvara-gold/60 ml-1">(+${row.price.toLocaleString()})</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-elvara-gold/15 pt-4 flex justify-between items-baseline mb-6">
                <span className="font-sans text-elvara-ivory/40 text-sm">Total Investment</span>
                <motion.span
                  key={totalPrice}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-serif text-elvara-ivory text-3xl"
                >
                  ${totalPrice.toLocaleString()}
                </motion.span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleOrder}
                  className="flex-1 bg-elvara-ivory text-elvara-black font-sans text-[10px] tracking-[0.25em] uppercase py-4 hover:bg-elvara-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Add to Bag
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 border border-elvara-ivory/30 text-elvara-ivory font-sans text-[10px] tracking-[0.25em] uppercase py-4 hover:border-elvara-gold hover:text-elvara-gold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save size={14} />
                  Save Design
                </button>
              </div>

              <p className="font-sans text-elvara-ivory/25 text-[10px] text-center mt-4 tracking-wider">
                Handcrafted in 8–12 weeks · Free delivery worldwide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Atelier
