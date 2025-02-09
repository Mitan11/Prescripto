import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [loading, setLoading] = useState(false); 

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        console.log(data.message);
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        setSpeciality('General physician')
        setExperience('1 Year')
        setShowPassword(false)
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow">
        {/* Upload Section */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 object-cover bg-gray-100 rounded-full border-2 border-dashed border-gray-300 hover:border-primary transition-all"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor upload"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
            disabled={loading}
          />
          <p className="text-sm">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Doctor Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Doctor name</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* Doctor Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Doctor email</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* Doctor Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="text-sm font-medium">Doctor password</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10"
                type={showPassword ? "text" : "password"} // Toggle input type
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              {/* Eye Icon for Toggle */}
              <button
                type="button"
                className="absolute right-3 top-9.5 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Experience */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Experience</label>
              <select
                className="w-full px-4 py-2  border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all "
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                disabled={loading}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            {/* Fees */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Fees</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="number"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Speciality */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Speciality</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                disabled={loading}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            {/* Education */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Education</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="text"
                placeholder="Education"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Address</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="text"
                placeholder="Address1"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                disabled={loading}
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                type="text"
                placeholder="Address2"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div>
          <label className="block text-sm font-medium mt-4 text-gray-500 mb-2">
            About Doctor
          </label>
          <textarea
            className="w-full px-4 pt-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-gray-600"
            rows={5}
            placeholder="Write about doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            disabled={loading}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-primary/90 font-medium transition-all cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Doctor"}
        </button>
      </div>
    </form>
  );
}

export default AddDoctor;
