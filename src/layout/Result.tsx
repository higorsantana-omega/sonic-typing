import { type AnimationProps, motion } from 'framer-motion'
import { cn } from '~/utils/cn'

export interface ResultProps {
  accuracyPercentage: number
  total: number
  errors: number
  show: boolean
  className?: string
}

export function Result ({ accuracyPercentage, total, errors, show, className }: ResultProps) {
  const animation: AnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }

  if (!show) {
    return null
  }

  return (
    <motion.div
      className={cn(`grid items-start justify-between gap-x-8 grid-flow-col`, className)}
      {...animation}
      transition={{ duration: 0.3, delay: 0 }}
    >
      <Information
        delay={0.5}
        duration={0.3}
        title={'Accuracy'}
        information={accuracyPercentage}
      />

      <Information
        delay={0.5}
        duration={1}
        title={'Errors'}
        information={errors}
      />

      <Information
        delay={0.5}
        duration={1.4}
        title={'Typed'}
        information={total}
      />
    </motion.div>
  )
}

function Information (
  { duration, delay, title, information }: { duration: number; delay: number; title: string; information: string | number }
) {
  const animation: AnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }

  return (
    <motion.div
        className={'text-gray-500 text-lg leading-4'}
        {...animation}
        transition={{ duration, delay }}
      >
        <motion.div
          className='mb-2 text-md'
        >
          {title}
        </motion.div>
          
        <motion.div
          className={'text-primary'}
          {...animation}
          transition={{ duration, delay: delay * 1.65 }}
        >
          {information}
        </motion.div>
    </motion.div>
  )
}