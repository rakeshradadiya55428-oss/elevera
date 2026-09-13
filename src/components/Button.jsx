import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', disabled = false }) => {
  const base =
    'inline-flex items-center justify-center font-sans tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-elvara-gold focus-visible:ring-offset-1 focus-visible:ring-offset-elvara-black disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-elvara-ivory text-elvara-black hover:bg-elvara-gold hover:text-white',
    secondary: 'border border-elvara-ivory/60 text-elvara-ivory hover:border-elvara-gold hover:text-elvara-gold',
    gold:      'bg-elvara-gold text-elvara-black hover:bg-elvara-gold-light',
    ghost:     'text-elvara-ivory hover:text-elvara-gold',
    danger:    'border border-red-500/50 text-red-400 hover:bg-red-900/20',
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-[10px]',
    sm: 'px-5 py-2.5 text-[10px]',
    md: 'px-7 py-3 text-xs',
    lg: 'px-9 py-4 text-xs',
    xl: 'px-12 py-5 text-sm',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.15 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default Button
