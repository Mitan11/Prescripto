import React from "react";
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorReviews from "./pages/Doctor/DoctorReviews";

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken ? (
    <div className="bg-[#F8F9FD] h-screen overflow-hidden ">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Redirect root path to an appropriate page */}
          {/* Admin Routes */}
          <Route path="/" element={<Navigate to={aToken ? "/admin-dashboard" : ""} />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  ) : dToken ? (
    <div className="bg-[#F8F9FD] h-screen w-full overflow-hidden">
      <Navbar />
      <div className="flex items-start w-full">
        <Sidebar />
        <Routes>
          {/* Doctor Routes */}
          <Route path="/" element={<Navigate to={dToken ? "/doctor-dashboard" : ""} />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />} />
          <Route path="/doctor-reviews" element={<DoctorReviews />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route
            path="/doctor-appointment"
            element={<DoctorAppointment />}
          />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
