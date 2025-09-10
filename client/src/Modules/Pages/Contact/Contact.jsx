import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/api/axiosInstance";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/conactemail/enquiry", formData);
      toast.success(response.data.message);
      setFormData({
        name: "",
        location: "",
        mobile: "",
        email: "",
        date: "",
        time: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit enquiry", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-orange-200 shadow-xl shadow-orange-100/60">
        {/* Heading */}
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Franchise Enquiry
        </h2>
        <p className="text-center text-gray-600 text-sm mb-8">
          Fill in your details and we’ll reach out shortly.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Your Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"in"}
              value={formData.mobile}
              onChange={handlePhoneChange}
              inputClass="!w-full !rounded-xl !border !border-gray-200 !pl-12 !pr-4 !py-3 !shadow-sm focus:!ring-2 focus:!ring-orange-400 transition text-gray-800"
              containerClass="w-full"
              buttonClass="!rounded-l-xl !border-gray-200"
              inputStyle={{ width: "100%" }}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-gray-800"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
