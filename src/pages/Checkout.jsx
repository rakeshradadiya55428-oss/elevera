import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, DollarSign, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useOrders } from '../hooks/useOrders'

const STEPS = ['Contact', 'Delivery', 'Payment']

const inputClass =
  'w-full bg-elvara-black border border-elvara-gold/20 px-4 py-3 text-elvara-ivory font-sans text-sm focus:outline-none focus:border-elvara-gold placeholder:text-elvara-ivory/20 transition-colors'

const LabeledInput = ({ label, ...props }) => (
  <div>
    <label className="block font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-2">
      {label}
    </label>
    <input className={inputClass} {...props} />
  </div>
)

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const { createOrder } = useOrders()
  const [step, setStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', postalCode: '', country: 'United States',
    paymentMethod: 'card',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
  })

  const shipping = cartTotal >= 500 ? 0 : 85
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipping + tax

  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) { setStep(step + 1); return }
    const num = createOrder(cart, { ...form, total })
    setOrderNumber(num)
    clearCart()
  }

  // Redirect if cart empty and order not placed
  if (cart.length === 0 && !orderNumber) {
    return (
      <div className="pt-36 pb-24 px-6 text-center min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h1 className="font-serif text-3xl text-elvara-ivory">Your bag is empty</h1>
        <Link to="/shop" className="elvara-btn-primary">Return to Shop</Link>
      </div>
    )
  }

  // Order confirmation screen
  if (orderNumber) {
    return (
      <div className="pt-36 pb-24 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-elvara-charcoal border border-elvara-gold/20 p-12 md:p-16 text-center max-w-lg w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            className="w-20 h-20 bg-elvara-gold rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check size={36} className="text-elvara-black" strokeWidth={2.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="elvara-subheading mb-4">Order Confirmed</p>
            <h1 className="font-serif text-4xl text-elvara-ivory mb-2">Thank You</h1>
            <p className="font-sans text-elvara-ivory/50 text-sm mb-6">
              Your order has been received and is being prepared.
            </p>
            <div className="bg-elvara-black/50 border border-elvara-gold/15 py-4 px-6 mb-6">
              <p className="font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-1">Order Number</p>
              <p className="font-serif text-elvara-gold text-2xl">{orderNumber}</p>
            </div>
            <p className="font-sans text-elvara-ivory/50 text-sm mb-10">
              A confirmation has been sent to <strong className="text-elvara-ivory">{form.email || 'your email'}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/orders')}
                className="flex-1 elvara-btn-primary"
              >
                View Order
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 elvara-btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-24">
      <div className="elvara-container">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-wider text-elvara-ivory/40 hover:text-elvara-gold transition-colors mb-6"
          >
            <ArrowLeft size={13} /> Back to Bag
          </Link>
          <h1 className="font-serif text-4xl text-elvara-ivory">Checkout</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12 max-w-sm">
          {STEPS.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-all duration-300 ${
                      done
                        ? 'bg-elvara-gold text-elvara-black'
                        : active
                        ? 'border-2 border-elvara-gold text-elvara-gold'
                        : 'border border-elvara-ivory/20 text-elvara-ivory/30'
                    }`}
                  >
                    {done ? <Check size={14} strokeWidth={2.5} /> : n}
                  </div>
                  <span
                    className={`font-sans text-[9px] tracking-wider uppercase mt-1.5 ${
                      active ? 'text-elvara-gold' : 'text-elvara-ivory/30'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-px w-12 mx-2 mb-4 transition-colors duration-300 ${
                      n < step ? 'bg-elvara-gold' : 'bg-elvara-ivory/15'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-elvara-charcoal border border-elvara-gold/15 p-5 sm:p-8 mb-6"
              >
                {step === 1 && (
                  <>
                    <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <LabeledInput label="First Name" name="firstName" value={form.firstName} onChange={set} required />
                      <LabeledInput label="Last Name"  name="lastName"  value={form.lastName}  onChange={set} required />
                      <div className="sm:col-span-2">
                        <LabeledInput label="Email" name="email" type="email" value={form.email} onChange={set} required />
                      </div>
                      <div className="sm:col-span-2">
                        <LabeledInput label="Phone" name="phone" type="tel" value={form.phone} onChange={set} required />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Delivery Address</h2>
                    <div className="space-y-5">
                      <LabeledInput label="Street Address" name="address" value={form.address} onChange={set} required />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <LabeledInput label="City"        name="city"       value={form.city}       onChange={set} required />
                        <LabeledInput label="State"       name="state"      value={form.state}      onChange={set} required />
                        <LabeledInput label="Postal Code" name="postalCode" value={form.postalCode} onChange={set} required />
                      </div>
                      <div>
                        <label className="block font-sans text-elvara-ivory/40 text-[10px] tracking-[0.3em] uppercase mb-2">
                          Country
                        </label>
                        <select
                          name="country"
                          value={form.country}
                          onChange={set}
                          className={inputClass}
                        >
                          {['United States','Canada','United Kingdom','France','Germany','Italy','Japan','Australia'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="font-serif text-2xl text-elvara-ivory mb-8">Payment</h2>

                    <div className="space-y-3 mb-8">
                      {[
                        { value: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={18} /> },
                        { value: 'upi',  label: 'UPI / Mobile Pay',    icon: <Smartphone size={18} /> },
                        { value: 'cod',  label: 'Cash on Delivery',    icon: <DollarSign size={18} /> },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                            form.paymentMethod === opt.value
                              ? 'border-elvara-gold bg-elvara-gold/8'
                              : 'border-elvara-gold/20 hover:border-elvara-gold/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={opt.value}
                            checked={form.paymentMethod === opt.value}
                            onChange={set}
                            className="accent-elvara-gold"
                          />
                          <span className="text-elvara-gold/70">{opt.icon}</span>
                          <span className="font-sans text-elvara-ivory text-sm">{opt.label}</span>
                        </label>
                      ))}
                    </div>

                    {form.paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        <LabeledInput
                          label="Card Number"
                          name="cardNumber"
                          value={form.cardNumber}
                          onChange={set}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        <LabeledInput
                          label="Cardholder Name"
                          name="cardName"
                          value={form.cardName}
                          onChange={set}
                        />
                        <div className="grid grid-cols-2 gap-5">
                          <LabeledInput label="Expiry" name="cardExpiry" value={form.cardExpiry} onChange={set} placeholder="MM / YY" />
                          <LabeledInput label="CVV"    name="cardCvv"    value={form.cardCvv}    onChange={set} placeholder="•••" maxLength={4} />
                        </div>
                      </motion.div>
                    )}

                    <p className="font-sans text-elvara-ivory/25 text-[10px] tracking-wider mt-6">
                      Demo checkout — no real transaction will occur.
                    </p>
                  </>
                )}
              </motion.div>

              {/* Navigation */}
              <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="elvara-btn-secondary flex items-center gap-2"
                  >
                    <ArrowLeft size={13} /> Back
                  </button>
                )}
                <button type="submit" className="elvara-btn-primary flex items-center gap-2">
                  {step === 3 ? (
                    <>Place Order <Check size={14} /></>
                  ) : (
                    <>Continue <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-elvara-charcoal border border-elvara-gold/15 p-5 sm:p-7 lg:sticky lg:top-28">
              <h2 className="font-serif text-xl text-elvara-ivory mb-6">Your Order</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto hide-scrollbar mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-14 h-14 bg-elvara-black flex-shrink-0 overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-elvara-ivory text-sm truncate">{item.name}</p>
                      <p className="font-sans text-elvara-ivory/40 text-xs">Qty {item.quantity}</p>
                    </div>
                    <p className="font-sans text-elvara-ivory text-sm flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-elvara-gold/15 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/40">Subtotal</span>
                  <span className="font-sans text-elvara-ivory">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/40">Shipping</span>
                  <span className="font-sans text-elvara-ivory">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-sans text-elvara-ivory/40">Tax</span>
                  <span className="font-sans text-elvara-ivory">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-elvara-gold/15 pt-3 flex justify-between">
                  <span className="font-serif text-elvara-ivory">Total</span>
                  <span className="font-serif text-elvara-ivory text-xl">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
