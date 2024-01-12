import { motion } from 'framer-motion'

export function Cursor () {
  return (
    <motion.div
      className='inline-block bg-primary w-0.5 h-8'
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut'}}
    />
  )
}