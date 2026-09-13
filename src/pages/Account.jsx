import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, Package } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import { useOrders } from '../hooks/useOrders'
import Toast from '../components/Toast'

const TABS = [
  { id: 'profile',   label: 'Profile',    icon: User },
  { id: 'orders',    label: 'Orders',     icon: ShoppingBag },
  { id: 'wishlist',  label: 'Wishlist',   icon: Heart },
  { id: 'designs',   label: 'Designs',    icon: Package },
  { id: 'settings',  label: 'Settings',   icon: Settings },
]

const inputClass =
  'w-full bg-elvara-black border border-elvara-gold/20 px-4 py-3 text-elvara-ivory font-sans text-sm focus:outline-none focus:border-elvara-gold transition-colors'

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { wishlist } = useWishlist()
  const { orders } = useOrders()
  const [toast, setToast] = useState(null)
  const savedDesigns = JSON.parse(localStorage.getItem('elvara-designs') || '[]')

  return (
    <div className="pt-28 pb-24">
      {toast && (
        <Toast key={toast.message} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div className="elvara-container">
        <div className="border-b border-elvara-gold/15 pb-8 mb-10">
          <p className="elvara-subheading mb-3">Your Space</p>
          <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory">Account</h1>
        </div>

        {/* Mobile tab bar */}
        <div className="lg:hidden flex overflow-x-auto hide-scrollbar gap-1 bg-elvara-charcoal border border-elvara-gold/15 p-1 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 font-sans text-[10px] tracking-wider transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-elvara-gold/10 text-elvara-gold'
                  : 'text-elvara-ivory/50'
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar — desktop only */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 hidden lg:block"
          >
            <div className="bg-elvara-charcoal border border-elvara-gold/15 overflow-hidden sticky top-28">
              {/* Avatar */}
              <div className="p-6 border-b border-elvara-gold/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-elvara-gold/20 border border-elvara-gold/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={22} className="text-elvara-gold" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-elvara-ivory truncate">Guest User</p>
                  <p className="font-sans text-elvara-ivory/40 text-xs">guest@elvara.com</p>
                </div>
              </div>

              {/* Nav */}
              <nav>
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full px-6 py-3.5 font-sans text-xs tracking-wider transition-colors border-b border-elvara-gold/5 last:border-0 ${
                      activeTab === tab.id
                        ? 'text-elvara-gold bg-elvara-gold/5 border-l-2 border-l-elvara-gold'
                        : 'text-elvara-ivory/50 hover:text-elvara-ivory'
                    }`}
                  >
                    <tab.icon size={15} />
                    {tab.label}
                    {tab.id === 'orders' && orders.length > 0 && (
                      <span className="ml-auto bg-elvara-gold/20 text-elvara-gold text-[9px] px-1.5 py-0.5 rounded-full">
                        {orders.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Content */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-3"
          >
            <div className="bg-elvara-charcoal border border-elvara-gold/15 p-5 sm:p-8">
              {/* ─── Profile ─── */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Profile Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    {[
                      { label: 'First Name', defaultValue: 'Guest' },
                      { label: 'Last Name',  defaultValue: 'User' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-2">
                          {f.label}
                        </label>
                        <input defaultValue={f.defaultValue} className={inputClass} />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-2">
                        Email
                      </label>
                      <input defaultValue="guest@elvara.com" type="email" className={inputClass} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-2">
                        Phone
                      </label>
                      <input placeholder="+1 (555) 000-0000" type="tel" className={inputClass} />
                    </div>
                  </div>
                  <button
                    onClick={() => setToast({ message: 'Profile updated', type: 'success' })}
                    className="elvara-btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {/* ─── Orders ─── */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Recent Orders</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-16">
                      <ShoppingBag size={40} className="text-elvara-ivory/15 mx-auto mb-4" strokeWidth={1} />
                      <p className="font-sans text-elvara-ivory/40 text-sm mb-6">No orders yet</p>
                      <Link to="/shop" className="elvara-btn-secondary">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="border border-elvara-gold/15 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="font-serif text-elvara-ivory">{order.id}</p>
                            <p className="font-sans text-elvara-ivory/40 text-xs">
                              {new Date(order.date).toLocaleDateString()} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`font-sans text-xs px-3 py-1.5 ${
                              order.status === 'Delivered' ? 'bg-emerald-900/20 text-emerald-400' :
                              order.status === 'Shipped' ? 'bg-blue-900/20 text-blue-400' :
                              'bg-amber-900/20 text-amber-400'
                            }`}>
                              {order.status}
                            </span>
                            <p className="font-serif text-elvara-ivory">${order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                      <Link to="/orders" className="block text-center font-sans text-elvara-gold text-xs tracking-wider mt-6 hover:text-elvara-gold-light transition-colors">
                        View All Orders →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ─── Wishlist ─── */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Saved Pieces</h2>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-16">
                      <Heart size={40} className="text-elvara-ivory/15 mx-auto mb-4" strokeWidth={1} />
                      <p className="font-sans text-elvara-ivory/40 text-sm mb-6">Your wishlist is empty</p>
                      <Link to="/shop" className="elvara-btn-secondary">
                        Explore Collection
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          className="flex gap-4 p-4 border border-elvara-gold/10 hover:border-elvara-gold/30 transition-colors group"
                        >
                          <div className="w-16 h-20 bg-elvara-black flex-shrink-0 overflow-hidden">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <p className="font-serif text-elvara-ivory group-hover:text-elvara-gold transition-colors">
                              {item.name}
                            </p>
                            <p className="font-sans text-elvara-ivory/40 text-xs mt-0.5">{item.category}</p>
                            <p className="font-sans text-elvara-gold text-sm mt-1">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ─── Designs ─── */}
              {activeTab === 'designs' && (
                <div>
                  <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Saved Atelier Designs</h2>
                  {savedDesigns.length === 0 ? (
                    <div className="text-center py-16">
                      <Package size={40} className="text-elvara-ivory/15 mx-auto mb-4" strokeWidth={1} />
                      <p className="font-sans text-elvara-ivory/40 text-sm mb-6">No saved designs yet</p>
                      <Link to="/atelier" className="elvara-btn-secondary">
                        Visit Atelier
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {savedDesigns.map((design, i) => (
                        <div key={i} className="border border-elvara-gold/15 p-5">
                          <div className="flex justify-between items-start mb-3">
                            <p className="font-serif text-elvara-ivory">Custom Timepiece</p>
                            <p className="font-serif text-elvara-gold">${design.price.toLocaleString()}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-xs font-sans">
                            <div>
                              <span className="text-elvara-ivory/40 block">Material</span>
                              <span className="text-elvara-ivory capitalize">{design.material}</span>
                            </div>
                            <div>
                              <span className="text-elvara-ivory/40 block">Finish</span>
                              <span className="text-elvara-ivory capitalize">{design.finish}</span>
                            </div>
                            <div>
                              <span className="text-elvara-ivory/40 block">Hardware</span>
                              <span className="text-elvara-ivory capitalize">{design.hardware}</span>
                            </div>
                          </div>
                          <p className="font-sans text-elvara-ivory/25 text-[10px] mt-3">
                            Saved {new Date(design.savedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ─── Settings ─── */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Preferences</h2>
                  <div className="space-y-4">
                    {[
                      'Email notifications for new arrivals',
                      'Email notifications for order updates',
                      'Exclusive drop early access',
                      'Promotional emails',
                    ].map((pref, i) => (
                      <label key={pref} className="flex items-center justify-between py-4 border-b border-elvara-gold/10 cursor-pointer group">
                        <span className="font-sans text-elvara-ivory/70 text-sm group-hover:text-elvara-ivory transition-colors">
                          {pref}
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked={i < 3}
                          className="accent-elvara-gold w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={() => setToast({ message: 'Settings saved', type: 'success' })}
                    className="elvara-btn-primary mt-8"
                  >
                    Save Preferences
                  </button>
                </div>
              )}
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  )
}

export default Account
