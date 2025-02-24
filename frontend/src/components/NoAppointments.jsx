import React from "react";
import noAppointments from "../assets/noAppointments.gif";

function NoAppointments() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img className="sm:w-1/3" src={noAppointments} alt="No appointments" />
      <p className="text-lg sm:text-2xl text-center font-bold">You don't have any appointments</p>
    </div>
  );
}

export default NoAppointments;
