import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, ShoppingBag } from 'lucide-react'
import { useOrders } from '../hooks/useOrders'

const STATUS_CONFIG = {
  Processing: {
    icon: <Package size={15} />,
    color: 'text-amber-400',
    bg:    'bg-amber-900/20 border-amber-900/40',
  },
  Shipped: {
    icon: <Truck size={15} />,
    color: 'text-blue-400',
    bg:    'bg-blue-900/20 border-blue-900/40',
  },
  Delivered: {
    icon: <CheckCircle size={15} />,
    color: 'text-emerald-400',
    bg:    'bg-emerald-900/20 border-emerald-900/40',
  },
}

const Orders = () => {
  const { orders } = useOrders()

  if (orders.length === 0) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <ShoppingBag size={56} className="text-elvara-ivory/10 mx-auto mb-8" strokeWidth={1} />
          <h1 className="font-serif text-3xl text-elvara-ivory mb-3">No Orders Yet</h1>
          <p className="font-sans text-elvara-ivory/40 text-sm mb-10 leading-relaxed">
            Your order history will appear here after you complete a purchase.
          </p>
          <Link to="/shop" className="elvara-btn-primary">
            Start Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24">
      <div className="elvara-container">
        <div className="border-b border-elvara-gold/15 pb-8 mb-12">
          <p className="elvara-subheading mb-3">Account</p>
          <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory">Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => {
            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-elvara-charcoal border border-elvara-gold/15"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-elvara-gold/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-serif text-elvara-ivory text-lg">{order.id}</p>
                    <p className="font-sans text-elvara-ivory/40 text-xs mt-0.5">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 font-sans text-xs tracking-wider px-4 py-2 border ${status.bg} ${status.color} w-fit`}
                  >
                    {status.icon} {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="px-6 py-5">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start">
                        <Link to={`/product/${item.id}`}>
                          <div className="w-16 h-20 bg-elvara-black overflow-hidden flex-shrink-0">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`}>
                            <p className="font-serif text-elvara-ivory hover:text-elvara-gold transition-colors">
                              {item.name}
                            </p>
                          </Link>
                          <p className="font-sans text-elvara-ivory/40 text-xs mt-0.5">
                            {item.category} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="font-sans text-elvara-ivory text-sm flex-shrink-0">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-elvara-gold/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="font-sans text-elvara-ivory/40 text-xs space-y-0.5">
                      {order.shipping?.city && (
                        <p>Ships to: {order.shipping.city}, {order.shipping.country}</p>
                      )}
                      {order.shipping?.email && (
                        <p>Contact: {order.shipping.email}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-elvara-ivory/40 text-xs mb-0.5">Order Total</p>
                      <p className="font-serif text-elvara-ivory text-xl">${order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders
