import React from 'react'
import notfound from "../assets/notfound.svg"

function NoDataFound() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <img className='w-1/2' src={notfound} alt="no data found" />
    </div>
  )
}

export default NoDataFound