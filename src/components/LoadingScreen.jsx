import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-elvara-black flex flex-col items-center justify-center z-[200]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h1 className="font-serif text-5xl md:text-7xl text-elvara-ivory tracking-[0.25em] mb-3">
          ÉLVARA
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-sans text-elvara-gold text-[10px] tracking-[0.55em] uppercase mb-16"
        >
          Luxury, Reimagined
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-40 h-px bg-elvara-charcoal mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-elvara-gold to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
