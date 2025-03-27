import React from 'react'
import noDoctor from '../assets/NoDoctor.gif'


function DoctorNotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-10 w-full">
            <img className="sm:w-1/3" src={noDoctor} alt="No doctors found" />
            <p className="text-lg sm:text-2xl text-center font-bold">No doctors found</p>
        </div>
    )
}

export default DoctorNotFound