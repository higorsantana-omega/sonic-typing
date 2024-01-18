import { Clock, BatteryCharging } from 'react-feather'

export function Modes () {
  return (
    <div className='grid gap-2 grid-flow-col justify-around w-100 text-gray-500 text-sm'>
      <div className='bg-[#0b0c11] flex rounded-md'>

        <div className='grid grid-flow-col'>
          <Option icon={<Clock />} text='time' />
          <Option icon={<BatteryCharging />} text='infinity' />
        </div>

      </div>
    </div>
  )
}

function Option ({ icon, text }) {
  return (
    <div className='pt-3 pr-2 pb-3 pl-4 content-center appearance-none border-none rounded cursor-pointer inline-flex text-base gap-2 h-min justify-center text-center'>
      {icon}
      {text}
    </div>
  )
}
