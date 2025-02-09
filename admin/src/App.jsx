import React from "react";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointments from "./pages/Admin/AllApointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

function App() {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <Toaster />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes >
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
          <Route path="/all-appointments" element={<AllApointments/>}></Route>
          <Route path="/add-doctor" element={<AddDoctor/>}></Route>
          <Route path="/doctor-list" element={<DoctorsList/>}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Toaster />
      <Login />
    </>
  );
}

export default App;
