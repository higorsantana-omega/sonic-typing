import { type AnimationProps, motion } from 'framer-motion'

export interface ResultProps {
  accuracyPercentage: number
  total: number
  errors: number
  className?: string
}

export function Result ({ accuracyPercentage, total, errors, className }: ResultProps) {
  const animation: AnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }

  return (
    <motion.ul
      className={`flex flex-col items-center space-y-2 ${className}`}
    >
      <motion.li
        className='text-xl font-semibold text-white'
        {...animation}
        transition={{ duration: 0.3, delay: 0 }}
      >
        Result
      </motion.li>
      <motion.li
        {...animation}
        transition={{ duration: 0.3, delay: 0.5 }}
        className='text-white'
      >
        Accuracy: <span className='text-primary'>{accuracyPercentage}</span>
      </motion.li>
      <motion.li
        className='text-white'
        {...animation}
        transition={{ duration: 0.3, delay: 1 }}
      >
        Errors: <span className='text-primary'>{errors}</span>
      </motion.li>
      <motion.li
        {...animation}
        transition={{ duration: 0.3, delay: 1.4 }}
        className='text-white'
      >
        Typed: <span className='text-primary'>{total}</span>
      </motion.li>
    </motion.ul>
  )
}