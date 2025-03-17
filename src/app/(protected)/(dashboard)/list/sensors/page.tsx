import React from 'react'
import { Button } from '@mui/material';
function page() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
      <h1 className="text-2xl font-bold">Sensors</h1>
      <div>
        <Button variant="contained" color="primary">
          Add Sensor
        </Button>
      </div>
      <div className="text-center text-lg">
        No sensors found
      </div>
    </div>
  )
}

export default page