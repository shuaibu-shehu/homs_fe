import OxygenPredictionForm from '@/components/prediction/oxygen-prediction'
import React from 'react'

function page() {
  return (
    <div className=' w-full flex flex-col justify-center items-center p-5'>
      {/* predict */}
      <OxygenPredictionForm />
    </div>
  )
}

export default page