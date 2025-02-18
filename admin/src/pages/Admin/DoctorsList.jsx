import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import NoDataFound from "../../components/NoDataFound";
import SkeletonCard from "../../components/SkeletonCard";

function DoctorsList() {
  const { doctors, getAllDoctors, aToken, changeAvailability } =
    useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setLoading(true);
      getAllDoctors().finally(() => setLoading(false));
    }
  }, [aToken]);

  return (
    <div className="p-5 max-h-[90vh] overflow-y-scroll w-full">
      <h1 className="text-xl font-medium">Doctors List</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {loading ? (
          Array(8)
            .fill()
            .map((_, i) => <SkeletonCard key={i} />)
        ) : doctors?.length ? (
          doctors.map((item) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={item._id}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={item.image}
                alt="doctor"
              />
              <div className="p-4">
                <p className="text-lg text-neutral-800 font-medium">
                  {item.name}
                </p>
                <p className="text-sm text-zinc-600">{item.speciality}</p>
                <div className="flex items-center gap-1 text-sm mt-2">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}

export default DoctorsList;
