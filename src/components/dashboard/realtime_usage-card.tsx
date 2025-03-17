import { MoveUp } from 'lucide-react'
import React from 'react'

function RealtimeUsageCard() {
  return (
      <div className='p-2 bg-white dark:bg-gray-800 rounded-xl mx-auto'>
          <h1 className=' text-custome-green-300 dark:text-white font-bold m-2'>Realtime-Usage</h1>
          <div className='flex flex-col items-center gap-3'>
              <p className=' flex  text-xl bg-custome-green-200 dark:bg-gray-700 p-2 rounded-full'>
                  <span className=' text-custome-green-300'>(130 L/min)</span>
                  <span className='text-lg text-custome-green-500 '>
                      <MoveUp width={16} height={29} />
                  </span>
              </p>
              <span className=' text-xs'>Last updated: 2 sec ago</span>
          </div>
      </div>
  )
}

export default RealtimeUsageCard