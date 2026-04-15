import { useState } from "react";
import { Link } from "react-router-dom";

// ── Cities by State ───────────────────────────────────────────────
const citiesByState = {
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind", "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Thane", "Navi Mumbai"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Pali"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Meerut", "Ghaziabad", "Noida", "Firozabad", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Mathura", "Jhansi", "Muzaffarnagar", "Rampur", "Shahjahanpur", "Hapur"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumkur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukkudi"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Secunderabad", "Mahbubnagar", "Nalgonda", "Adilabad"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Jalpaiguri"],
  "Jharkhand": ["Jamshedpur", "Ranchi", "Dhanbad", "Bokaro", "Hazaribagh", "Giridih", "Dumka", "Simdega", "Godda", "Deoghar"],
  "Bihar": ["Patna", "Purnia", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga", "Arrah", "Sasaram", "Chapra", "Motihari"],
  "Andhra Pradesh": ["Adoni", "Amaravati", "Anantapur", "Chandragiri", "Chittoor", "Dowlaiswaram", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", "Nagarjunakonda", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram", "Yemmiganur"],
  "Assam": ["Dhuburi", "Dibrugarh", "Dispur", "Guwahati", "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia"],
  "Chhattisgarh": ["Ambikapur", "Bhilai", "Bilaspur", "Dhamtari", "Durg", "Jagdalpur", "Raipur", "Rajnandgaon"],
  "Goa": ["Madgaon", "Panaji", "Vasco da Gama", "Mapusa", "Margao"],
  "Haryana": ["Ambala", "Bhiwani", "Chandigarh", "Faridabad", "Firozpur Jhirka", "Gurugram", "Hansi", "Hisar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Panipat", "Pehowa", "Rewari", "Rohtak", "Sirsa", "Sonipat"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Dalhousie", "Dharamshala", "Hamirpur", "Kangra", "Kullu", "Mandi", "Nahan", "Shimla", "Una"],
  "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Sopore", "Punch", "Rajouri", "Udhampur", "Leh"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram", "Kannur", "Kottayam"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Baripada", "Bhadrak", "Jharsuguda"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Pathankot", "Hoshiarpur", "Gurdaspur"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Kashipur", "Rudrapur", "Kotdwar", "Ramnagar", "Nainital"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezpur", "Ziro"],
  "Chandigarh": ["Chandigarh"],
  "Dadra & Nagar Haveli": ["Silvassa", "Amli", "Khanvel"],
  "Daman & Diu": ["Daman", "Diu"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Andaman & Nicobar": ["Port Blair", "Car Nicobar", "Diglipur", "Rangat"],
  "Ladakh": ["Leh", "Kargil"],
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