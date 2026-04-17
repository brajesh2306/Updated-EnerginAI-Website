import { useState } from "react";
import { Link } from "react-router-dom";

// ── Cities by State ───────────────────────────────────────────────
const citiesByState = {
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior","narmadapuram","Jabalpur", "Ujjain", "Shivpuri", "Vidisha"]
};

const states = Object.keys(citiesByState);

export default function GetStarted() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "Madhya Pradesh",
    city: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataEncoded = new URLSearchParams({
    "form-name": "audit-request",
    ...formData,
  }).toString();

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataEncoded,
    });

    setSubmitted(true);
  } catch (error) {
    console.error("Error:", error);
  }
};

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3.5 py-2 text-[13px] text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-white";
  const labelClass = "block text-[13px] font-semibold text-[#0d1f4c] mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-6">

      {submitted ? (
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[480px]">

          {/* Orange top bar */}
          <div className="h-[5px] bg-orange-400 w-full" />

          <div className="px-8 py-10 text-center">
            
            <h2 className="text-[20px] font-extrabold text-green-500 mb-2">
              You're Successfully Registered!
            </h2>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-7">
              Thank you! Our team will contact you shortly to schedule your free trial.
            </p>
            <Link
              to="/"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[14px] px-10 py-3 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
          </div>

        </div>
      ) : (
        // ── Form Card ──
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[600px]">

          {/* Orange top border */}
          <div className="h-[5px] bg-orange-400 w-full" />

          <div className="px-8 py-5">

            {/* Heading */}
            <div className="text-center mb-4">
              <h1 className="text-[24px] md:text-[28px] font-bold text-[#0d1f4c] mb-1.5">
                Welcome to EnerginAI™
              </h1>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Fill in your details below to book your free trial and get started with smarter energy.
              </p>
            </div>

            {/* Form */}
            <form
              name="audit-request"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <input type="hidden" name="form-name" value="audit-request" />

              {/* Full Name */}
              <div>
                <label className={labelClass}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className={inputClass}
                />
              </div>

              {/* State + City — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>City / District</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select City</option>
                    {(citiesByState[formData.state] || []).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[15px] py-3.5 rounded-xl transition-colors duration-200 mt-1"
              >
                Book My Free Trial
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}