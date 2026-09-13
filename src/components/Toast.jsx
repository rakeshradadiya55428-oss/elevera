import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Info, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), duration)
    const remove = setTimeout(onClose, duration + 350)
    return () => { clearTimeout(hide); clearTimeout(remove) }
  }, [duration, onClose])

  const configs = {
    success: { icon: <Check size={16} />, color: 'text-emerald-400', border: 'border-emerald-500/30' },
    error:   { icon: <X size={16} />,     color: 'text-red-400',     border: 'border-red-500/30' },
    info:    { icon: <Info size={16} />,  color: 'text-blue-400',    border: 'border-blue-500/30' },
    warning: { icon: <AlertCircle size={16} />, color: 'text-amber-400', border: 'border-amber-500/30' },
  }
  const { icon, color, border } = configs[type] || configs.success

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div
            className={`bg-elvara-charcoal/95 backdrop-blur-md border ${border} px-6 py-3.5 flex items-center gap-3 shadow-2xl min-w-[240px]`}
          >
            <span className={color}>{icon}</span>
            <span className="text-elvara-ivory font-sans text-sm">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
