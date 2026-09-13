import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../hooks/useCart'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 px-6 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm"
        >
          <ShoppingBag size={56} className="text-elvara-ivory/10 mx-auto mb-8" strokeWidth={1} />
          <h1 className="font-serif text-3xl text-elvara-ivory mb-3">Your Bag is Empty</h1>
          <p className="font-sans text-elvara-ivory/40 text-sm mb-10 leading-relaxed">
            Discover our curated collection of luxury pieces and add them to your bag.
          </p>
          <Link to="/shop" className="elvara-btn-primary">
            Explore Collection
          </Link>
        </motion.div>
      </div>
    )
  }

  const shipping = cartTotal >= 500 ? 0 : 85
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipping + tax

  return (
    <div className="pt-28 pb-24">
      <div className="elvara-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-elvara-gold/15 pb-8 mb-10"
        >
          <p className="elvara-subheading mb-3">Your Selection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-elvara-ivory">Shopping Bag</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex gap-6 py-8 border-b border-elvara-gold/10"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <div className="w-28 h-36 md:w-32 md:h-40 bg-elvara-charcoal overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-serif text-elvara-ivory text-xl hover:text-elvara-gold transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="font-sans text-elvara-ivory/40 text-xs tracking-wider mt-1">
                          {item.category}
                        </p>
                        <p className="font-sans text-elvara-ivory/30 text-xs mt-1 line-clamp-1">
                          {item.material}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-elvara-ivory/20 hover:text-red-400 transition-colors ml-4 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                      {/* Qty controls */}
                      <div className="flex items-center border border-elvara-gold/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-elvara-ivory/50 hover:text-elvara-gold transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-4 py-2 font-sans text-elvara-ivory text-sm min-w-[36px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-elvara-ivory/50 hover:text-elvara-gold transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="font-serif text-elvara-ivory text-xl">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Footer actions */}
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={clearCart}
                className="font-sans text-elvara-ivory/30 text-xs tracking-wider hover:text-red-400 transition-colors"
              >
                Clear bag
              </button>
              <Link
                to="/shop"
                className="font-sans text-elvara-ivory/50 text-xs tracking-wider hover:text-elvara-gold transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-elvara-charcoal border border-elvara-gold/15 p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-sans text-elvara-ivory/50 truncate mr-4">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-sans text-elvara-ivory flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-elvara-gold/15 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/50">Subtotal</span>
                  <span className="font-sans text-elvara-ivory">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/50">Shipping</span>
                  <span className="font-sans text-elvara-ivory">
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/50">Estimated Tax</span>
                  <span className="font-sans text-elvara-ivory">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-elvara-gold/15 pt-4 flex justify-between">
                  <span className="font-serif text-elvara-ivory text-lg">Total</span>
                  <span className="font-serif text-elvara-ivory text-lg">${total.toLocaleString()}</span>
                </div>
              </div>

              {cartTotal < 500 && (
                <p className="font-sans text-elvara-gold text-xs mb-6 leading-relaxed">
                  Add ${(500 - cartTotal).toLocaleString()} more for complimentary shipping
                </p>
              )}

              <Link to="/checkout" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-elvara-ivory text-elvara-black font-sans text-xs tracking-[0.25em] uppercase py-4 hover:bg-elvara-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </motion.button>
              </Link>

              <p className="font-sans text-elvara-ivory/25 text-[10px] text-center mt-4 tracking-wider">
                Secure checkout · SSL encrypted
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
