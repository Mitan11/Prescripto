import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Show PreLoader on route change
    const timer = setTimeout(() => {
      setLoading(false); // Hide PreLoader after 1 seconds
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Run effect when route changes

  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* Show PreLoader before rendering content */}
      {loading ? (
        <PreLoader />
      ) : (
        <>
          {/* Hide Navbar on login route */}
          {location.pathname !== "/login" && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
          </Routes>
          {/* Hide Footer on login route */}
          {location.pathname !== "/login" && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
