import { Link } from 'react-router-dom'
import { Globe, AtSign, Play } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-elvara-charcoal border-t border-elvara-gold/15">
      {/* Newsletter strip */}
      <div className="border-b border-elvara-gold/15 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-elvara-ivory text-xl mb-1">Private Circle</h3>
            <p className="font-sans text-elvara-ivory/50 text-sm">
              Receive early access to new arrivals and exclusive offers.
            </p>
          </div>
          <div className="flex gap-0 w-full md:w-auto max-w-md">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-elvara-black/60 border border-elvara-gold/20 border-r-0 px-5 py-3 text-elvara-ivory font-sans text-sm focus:outline-none focus:border-elvara-gold placeholder:text-elvara-ivory/25 transition-colors"
            />
            <button className="bg-elvara-gold text-elvara-black font-sans text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-elvara-gold-light transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="font-serif text-2xl text-elvara-ivory tracking-[0.2em] hover:text-elvara-gold transition-colors">
              ÉLVARA
            </Link>
            <p className="font-sans text-elvara-ivory/40 text-sm leading-relaxed mt-4 max-w-xs">
              Crafted for those who understand the difference between price and value. Luxury, reimagined for a new generation.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-elvara-ivory/40 hover:text-elvara-gold transition-colors">
                <AtSign size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-elvara-ivory/40 hover:text-elvara-gold transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="text-elvara-ivory/40 hover:text-elvara-gold transition-colors">
                <Play size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Products', path: '/shop' },
                { label: 'Timepieces', path: '/shop?collection=timepieces' },
                { label: 'Leather', path: '/shop?collection=leather' },
                { label: 'Atelier', path: '/shop?collection=atelier' },
                { label: 'Essentials', path: '/shop?collection=essentials' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="font-sans text-elvara-ivory/50 text-sm hover:text-elvara-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Private Drop', path: '/private-drop' },
                { label: 'Atelier', path: '/atelier' },
                { label: 'About', path: '/about' },
                { label: 'Account', path: '/account' },
                { label: 'Orders', path: '/orders' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="font-sans text-elvara-ivory/50 text-sm hover:text-elvara-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-sans text-elvara-gold text-[10px] tracking-[0.4em] uppercase mb-5">Info</h4>
            <ul className="space-y-3">
              {['Shipping Policy', 'Returns', 'Size Guide', 'Care & Warranty', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-elvara-ivory/50 text-sm hover:text-elvara-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-elvara-gold/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-elvara-ivory/25 text-xs tracking-wider">
            © {new Date().getFullYear()} ÉLVARA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-elvara-ivory/25 text-xs hover:text-elvara-gold/60 transition-colors">
              Privacy
            </a>
            <a href="#" className="font-sans text-elvara-ivory/25 text-xs hover:text-elvara-gold/60 transition-colors">
              Terms
            </a>
            <a href="#" className="font-sans text-elvara-ivory/25 text-xs hover:text-elvara-gold/60 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
