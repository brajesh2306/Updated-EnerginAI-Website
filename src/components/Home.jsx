import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Scroll Reveal Hook ────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Step Card ─────────────────────────────────────────────────────
function StepCard({ num, title, desc, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("step-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="step-card group relative bg-white rounded-2xl p-5 md:p-15 border border-gray-100 shadow-sm hover:shadow-md cursor-default"
      style={{ transitionDelay: delay }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <p className="text-[40px] md:text-[52px] font-extrabold text-gray-100 leading-none mb-2 select-none">{num}</p>
      <h3 className="text-[15px] md:text-[20px] font-bold text-[#0d1f4c] leading-snug mb-2 md:mb-4">{title}</h3>
      <p className="text-[13px] md:text-[16px] text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Animation CSS ─────────────────────────────────────────────────
const animStyles = `
  .pkg-row {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .pkg-row.scroll-visible { opacity: 1; transform: translateY(0); }
  .pkg-img {
    filter: brightness(0.6);
    transition: filter 0.8s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .pkg-row.scroll-visible .pkg-img { filter: brightness(1); }
  .pkg-row.scroll-visible .pkg-img:hover {
    filter: brightness(0.72);
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
  .step-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
  }
  .step-card.step-visible { opacity: 1; transform: translateY(0); }
  .hero-img-wrap {
    opacity: 0;
    transform: translateX(-70px);
    animation: heroSlideLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
  }
  .hero-text-wrap {
    opacity: 0;
    transform: translateX(70px);
    animation: heroSlideRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
  }
  @media (max-width: 767px) {
    .hero-img-wrap {
      transform: translateY(30px);
      animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
    }
    .hero-text-wrap {
      transform: translateY(30px);
      animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
    }
  }
  .hero-card {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
    animation: heroCardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.05s forwards;
  }
  @keyframes heroSlideLeft  { to { opacity: 1; transform: translateX(0); } }
  @keyframes heroSlideRight { to { opacity: 1; transform: translateX(0); } }
  @keyframes heroFadeUp     { to { opacity: 1; transform: translateY(0); } }
  @keyframes heroCardPop    { to { opacity: 1; transform: translateY(0) scale(1); } }

  /* ── Popup Animation ── */
  .popup-overlay {
    animation: fadeIn 0.25s ease forwards;
  }
  .popup-box {
    animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes popIn  { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
`;

// ── FAQ Data ──────────────────────────────────────────────────────
const faqs = [
  {
    q: "What is EnerginAI and how does it work?",
    a: "EnergInAI is a smart energy monitoring system that uses an AI-powered sensor and a mobile app. The sensor attaches to your electrical panel to read your home's energy usage in real-time, while the app analyzes this data to give you detailed insights, appliance breakdowns, and personalized recommendations for saving money.",
  },
  {
    q: "Is the sensor difficult to install?",
    a: "Not at all. The sensor is designed for a simple and safe DIY installation in under 15 minutes. It clamps around your main electrical cables without requiring direct wiring. However, we always recommend consulting a qualified electrician if you are not comfortable working with your electrical panel.",
  },
  {
    q: "How much can I expect to save?",
    a: "Your savings depend on the solutions you choose. Installing solar can drastically reduce or even eliminate your electricity bill. Our Smart Monitor and App help optimize your daily usage—potentially cutting costs by up to 20% (depending on usage and tariffs). If eligible, carbon credits may also provide passive income, further enhancing savings.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We prioritize privacy and security. All data transmitted from the sensor is encrypted, and personal information is stored on the company's secure servers. We never share your individual energy data with third parties without your explicit consent.",
  },
];

// ── FAQ Item ──────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 md:py-5 text-left transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className={`text-[15px] md:text-[20px] font-medium transition-colors ${open ? "text-orange-400" : "text-gray-700 hover:text-orange-400"}`}>
          {q}
        </span>
        <span className={`text-[18px] md:text-[22px] font-light ml-4 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-orange-400" : "text-gray-400"}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 pb-4 md:pb-5" : "max-h-0 opacity-0"}`}>
        <p className="text-[13px] md:text-[13.5px] text-gray-700 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ── Trial Popup ───────────────────────────────────────────────────
function TrialPopup({ onClose }) {
  return (
    <div
      className="popup-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="popup-box bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">

        {/* Orange top bar */}
        <div className="h-[5px] bg-orange-400 w-full" />

        {/* Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 text-[16px] font-bold transition-colors"
        >
          ✕
        </button>

        <div className="px-8 py-7">
          {/* Icon + Heading */}
          <div className="text-center mb-5">
            <div className="text-[48px] mb-3">⚡</div>
            <h2 className="text-[22px] font-extrabold text-[#0d1f4c] mb-2">
              Try EnerginAI™ for Free!
            </h2>
            <p className="text-[13.5px] text-gray-500 leading-relaxed">
              Book your free trial today and discover how much you can save on your electricity bill with AI-powered energy monitoring.
            </p>
          </div>

          {/* Benefits */}
          <ul className="text-[13px] text-gray-700 space-y-2 mb-6">
            {[
              "✅ Free home energy assessment",
              "✅ Real-time usage monitoring",
              "✅ Personalized savings plan",
              "✅ Real-time notifications for system on/off",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/get-started"
            onClick={onClose}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[15px] text-center py-3.5 rounded-xl transition-colors"
          >
            Book My Free Trial →
          </Link>

          {/* Skip */}
          <button
            onClick={onClose}
            className="w-full text-center text-[12px] text-gray-400 hover:text-gray-600 mt-3 transition-colors"
          >
            No thanks, maybe later
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Main Home ─────────────────────────────────────────────────────
export default function Home() {

  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();
  const ref4 = useScrollReveal();

  // ✅ Popup State
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
  const alreadyShown = localStorage.getItem("popupShown");

  if (!alreadyShown) {
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true"); // mark as shown
    }, 800);

    return () => clearTimeout(timer);
  }
}, []);

  return (
    <>
      <style>{animStyles}</style>

      {/* ✅ Popup */}
      {showPopup && <TrialPopup onClose={() => setShowPopup(false)} />}

      <div className="bg-white font-sans text-gray-800">

        {/* ══════════════════════════════════════ HERO ══ */}
        <section
          className="border-t border-gray-100 py-8 md:py-20 mb-8 md:mb-0"
          style={{ background: "linear-gradient(135deg, #dce8f5 10%, #e8f0f8 20%, #ffffff 100%)" }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col md:flex-row items-center gap-5 md:gap-16">

            <div
              className="hero-img-wrap relative w-full md:flex-shrink-0 md:w-[500px] md:pb-12 md:pr-8"
              style={{ overflow: "visible" }}
            >
              <img
                src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256783/heroimg1_1_pix1gn.png"
                alt="Solar panels"
                className="rounded-2xl w-full object-cover h-[210px] md:h-[350px]"
              />
              <div
                className="hero-card absolute bottom-3 right-3 md:-bottom-10 md:-right-6
                           bg-white rounded-2xl shadow-lg md:shadow-2xl
                           p-3 md:p-10
                           w-[148px] md:w-[205px]"
              >
                <p className="text-[13px] md:text-[17px] font-bold tracking-wide mb-1 md:mb-2">
                  Energ<span className="text-orange-500">I</span><span className="text-[#3aa84b]">n</span>AI<span className="text-[10px] md:text-[11px] align-super font-normal text-gray-400">™</span>
                </p>
                <p className="text-[12px] md:text-[15px] font-bold text-[#0d1f4c]">Savings</p>
                <p className="text-[34px] md:text-[52px] font-extrabold text-[#0d1f4c] leading-none my-0.5 md:my-1">
                  28<span className="text-[16px] md:text-[22px] font-bold">%</span>
                </p>
                <div className="w-full my-2 md:my-3">
                  <svg viewBox="0 0 130 70" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ display: "block" }}>
                    <defs>
                      <linearGradient id="gradNavy" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0d274d" />
                        <stop offset="100%" stopColor="#1a3e7a" />
                      </linearGradient>
                      <linearGradient id="gradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2a7a6a" />
                        <stop offset="100%" stopColor="#3aaa8a" />
                      </linearGradient>
                      <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e07010" />
                        <stop offset="100%" stopColor="#f5a020" />
                      </linearGradient>
                    </defs>
                    <path d="M0,70 L0,50 Q15,46 30,43 Q50,38 70,32 Q90,26 110,18 Q120,14 130,10 L130,70 Z" fill="url(#gradOrange)" />
                    <path d="M0,70 L0,44 Q15,40 30,36 Q50,30 70,24 Q90,18 110,12 Q120,9 130,7 L130,42 Q120,38 110,34 Q90,30 70,36 Q50,42 30,46 Q15,48 0,52 Z" fill="url(#gradTeal)" />
                    <path d="M0,70 L0,54 Q15,50 30,46 Q50,40 70,33 Q90,26 110,20 Q120,16 130,13 L130,30 Q120,26 110,22 Q90,18 70,24 Q50,30 30,36 Q15,40 0,44 Z" fill="url(#gradNavy)" />
                  </svg>
                </div>
                <p className="text-[9px] md:text-[11px] text-[#0d1f4c] text-center leading-snug">
                  You are in the{" "}
                  <span className="text-[#228b22] font-extrabold block md:inline">top 2% users</span>
                </p>
              </div>
            </div>

            <div className="hero-text-wrap flex-1 w-full">
              <h1 className="text-[35px] md:text-[50px] font-semibold text-[#0d274d] leading-tight tracking-tight mb-4 md:mb-5 md:pt-[100px] md:px-2 md:pb-4 text-center md:text-left">
                India's First AI-Driven,<br />IoT‑Powered,<br />Automated Energy<br />Solution.
              </h1>
              <p className="text-[17px] md:text-[22px] text-gray-500 leading-relaxed max-w-md text-center md:text-left">
                An All-In-One Home Energy Solution—Monitor, Control and Save through AI-driven Intelligence for a Smarter, More Sustainable Future.
              </p>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════ STATS ══ */}
        <section className="py-4 md:py-6 bg-white mb-6 md:mb-0">
          <div className="max-w-3xl mx-auto px-4 md:px-4">
            <div className="rounded-2xl bg-[#eef1f8] flex flex-row">
              <div className="flex-1 px-4 md:px-10 py-7 md:py-10">
                <p className="text-[12px] md:text-[11px] font-bold text-[#0d1f4c] uppercase tracking-widest mb-1 md:mb-3">Total Energy Saved</p>
                <p className="text-[22px] md:text-[42px] font-bold text-[#0d1f4c] leading-none">37,450<span className="text-[9px] md:text-[17px] font-semibold ml-1">kWh</span></p>
              </div>
              <div className="w-[1px] bg-[#c8cfe0] my-4 md:my-6" />
              <div className="flex-1 px-4 md:px-10 py-7 md:py-10">
                <p className="text-[10px] md:text-[11px] font-bold text-[#0d1f4c] uppercase tracking-widest mb-1 md:mb-3">CO<sub>2</sub> Emissions Reduced</p>
                <p className="text-[22px] md:text-[42px] font-bold text-[#0d1f4c] leading-none">28,281<span className="text-[9px] md:text-[17px] font-semibold ml-1">kg</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ WHAT IS ══ */}
        <section className="bg-[#f0f4f8] py-10 md:py-20 border-t border-gray-100 mb-8 md:mb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-7 md:mb-14">
              <h2 className="text-[35px] md:text-[40px] font-bold text-[#0d1f4c] tracking-tight mb-3">What is EnerginAI</h2>
              <div className="w-14 h-[3px] bg-orange-400 mx-auto mb-4 md:mb-8 rounded-full" />
              <p className="text-[17px] md:text-[20px] text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Tired of high electricity bills, wasted energy, and no control over your home's power usage EnerginAI is your Bill Doctor. What your meter doesn't show you — we do. Track. Save. Relax.<br />
                <span className="font-bold text-gray-700">Smart energy. Smarter savings.</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {[
                { icon: "🔍", title: "The EnerginAI FREE Trial", desc: "Get a firsthand look at how EnerginAI™ transforms your energy management. Test our smart device and dashboard to see your energy use in real time, uncover hidden waste, and discover how AI-powered insights help you save effortlessly. For Free." },
                { icon: "☀️", title: "Customized Solar Solutions", desc: "We don't just recommend solar—we install and optimize it for you. Using the data collected during our device's demo for your home and AI-driven insights, we create a system that maximizes savings, boosts efficiency, and fits your needs." },
                { icon: "✅", title: "Smart Home Monitoring System", desc: "After the trial you can also choose to avail our smart energy device and app to monitor usage, track savings, and receive performance alerts in real-time for your home. Our system is also fully integrable with solar devices for real-time tracking." },
              ].map((card) => (
                <div key={card.title} className="group relative bg-white rounded-2xl p-4 md:p-15 text-center overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default mb-8 md:mb-0">
                  <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="absolute top-3 right-3 text-[48px] md:text-[80px] opacity-10 select-none pointer-events-none leading-none">{card.icon}</div>
                  <h3 className="text-[20px] md:text-[18px] font-bold text-[#0d1f4c] mb-2 md:mb-5 leading-snug relative z-10">{card.title}</h3>
                  <p className="text-[15px] md:text-[16px] text-gray-700 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ PACKAGE ══ */}
        <section className="py-10 md:py-20 bg-white border-t border-gray-50 mb-8 md:mb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12">
            <div className="text-center mb-7 md:mb-16">
              <h2 className="text-[35px] md:text-[40px] font-bold text-[#0d1f4c] tracking-tight mb-3">The EnerginAI™ Package</h2>
              <div className="w-14 h-[3px] bg-orange-400 mx-auto rounded-full" />
            </div>

            <div ref={ref1} className="pkg-row flex flex-col md:flex-row items-center gap-5 md:gap-14 mb-8 md:mb-20">
              <div className="w-full md:hidden"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256791/feature2_1_uz26ni.png" alt="Energy Assessment" className="pkg-img rounded-2xl w-full object-cover h-[175px]" /></div>
              <div className="flex-1 flex items-start gap-3 md:gap-4">
                <div className="w-[3px] md:w-[4px] h-10 bg-orange-400 rounded-full flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#0d1f4c] leading-snug mb-1.5 md:mb-5">Free Device Demo &amp; Home Energy Assessment</h3>
                  <p className="text-[13px] md:text-[16px] text-gray-700 leading-relaxed">Think your home is efficient? Find out with our free trial. Our smart device monitors your energy use 24×7, while AI analyzes your patterns to deliver a detailed assessment of hidden inefficiencies and personalized solutions—so you can start saving immediately.</p>
                </div>
              </div>
              <div className="hidden md:block flex-shrink-0 w-[360px]"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256791/feature2_1_uz26ni.png" alt="Energy Assessment" className="pkg-img rounded-2xl w-full object-cover h-[240px] cursor-pointer" /></div>
            </div>

            <div ref={ref2} className="pkg-row flex flex-col md:flex-row items-center gap-5 md:gap-14 mb-8 md:mb-20">
              <div className="w-full md:hidden"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256799/feat3_1_guqokt.png" alt="Solar Setup" className="pkg-img rounded-2xl w-full object-cover h-[175px]" /></div>
              <div className="hidden md:block flex-shrink-0 w-[360px]"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256799/feat3_1_guqokt.png" alt="Solar Setup" className="pkg-img rounded-2xl w-full object-cover h-[240px] cursor-pointer" /></div>
              <div className="flex-1 flex items-start gap-3 md:gap-4">
                <div>
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#0d1f4c] leading-snug mb-1.5 md:mb-5">Zero-Cost Solar Setup and Net Metering</h3>
                  <p className="text-[13px] md:text-[16px] text-gray-700 leading-relaxed">Wish you could be free from your electricity bill? EnerginAI makes it possible. We install solar with zero upfront cost for up to 3kW. Systems over 3kW? We'll finance up to 90% of total costs. Already have a Solar setup? Our solution will help track performance, calculate your savings, and ensure you get the most out of your system.</p>
                </div>
                <div className="w-[3px] md:w-[4px] h-10 bg-orange-400 rounded-full flex-shrink-0 mt-1" />
              </div>
            </div>

            <div ref={ref3} className="pkg-row flex flex-col md:flex-row items-center gap-5 md:gap-14 mb-8 md:mb-20">
              <div className="w-full md:hidden"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256807/feature1_1_poqx4n.png" alt="AI Monitoring" className="pkg-img rounded-2xl w-full object-cover h-[175px]" /></div>
              <div className="flex-1 flex items-start gap-3 md:gap-4">
                <div className="w-[3px] md:w-[4px] h-10 bg-orange-400 rounded-full flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#0d1f4c] leading-snug mb-1.5 md:mb-5">Real-Time Monitoring of Your Usage — in Your Hands</h3>
                  <p className="text-[13px] md:text-[16px] text-gray-700 leading-relaxed">Our relationship doesn't end at installation. The EnerginAI™ smart monitor and app give you continuous visibility into your energy system — tracking production, consumption, and grid export in real time, with AI-powered alerts and monthly savings reports.</p>
                </div>
              </div>
              <div className="hidden md:block flex-shrink-0 w-[360px]"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256807/feature1_1_poqx4n.png" alt="AI Monitoring" className="pkg-img rounded-2xl w-full object-cover h-[240px] cursor-pointer" /></div>
            </div>

            <div ref={ref4} className="pkg-row flex flex-col md:flex-row items-center gap-5 md:gap-14 mb-8 md:mb-20 md:pt-20">
              <div className="w-full md:hidden"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256815/feature4_1_iho1zu.png" alt="Smart Home" className="pkg-img rounded-2xl w-full object-cover h-[175px]" /></div>
              <div className="hidden md:block flex-shrink-0 w-[360px]"><img src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776256815/feature4_1_iho1zu.png" alt="Smart Home" className="pkg-img rounded-2xl w-full object-cover h-[240px] cursor-pointer" /></div>
              <div className="flex-1 flex items-start gap-3 md:gap-4">
                <div>
                  <h3 className="text-[20px] md:text-[28px] font-bold text-[#0d1f4c] leading-snug mb-1.5 md:mb-5">Smart Home Integration, Carbon Credits, and More</h3>
                  <p className="text-[13px] md:text-[16px] text-gray-700 leading-relaxed">EnergInAI connects with your smart home devices. Helps track your carbon footprint. Gives you access to carbon credits (available if the solar subsidy isn't claimed)—turning eco‑friendly living into a rewarding habit</p>
                </div>
                <div className="w-[3px] md:w-[4px] h-10 bg-orange-400 rounded-full flex-shrink-0 mt-1" />
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════ 3 STEPS ══ */}
        <section className="bg-[#f0f4f8] py-10 md:py-20 px-4 md:px-6 border-t border-gray-100 mb-8 md:mb-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-7 md:mb-14">
              <h2 className="text-[35px] md:text-[34px] font-extrabold text-[#0d1f4c] tracking-tight mb-3">The 3 Steps to Smarter Living</h2>
              <div className="w-14 h-[3px] bg-orange-400 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <StepCard
                num="01"
                title="Book Your FREE Trial & Assessment"
                delay="0s"
                desc={<>Start by filling out our{" "}<span className="bg-yellow-100 text-gray-800 font-bold px-2 py-0.5 rounded">Form</span>{" "}and we'll schedule your free trial of the EnerginAI™ smart device and dashboard. Post trial, our AI-powered system will analyze your usage patterns and deliver a detailed assessment for your home.</>}
              />
              <StepCard
                num="02"
                title="We'll Be at Your Service."
                delay="0.15s"
                desc="Our expert team will visit your home and help you explore the EnerginAI™ smart device. A specialist will install the device, walk you through its features, and show you how AI-powered insights can uncover hidden inefficiencies."
              />
              <StepCard
                num="03"
                title="Get Your Personalized Energy Plan"
                delay="0.3s"
                desc="After the free trial and home assessment, our team will provide expert guidance on the next steps—from solar installation to upgrading your home with our smart monitor and app, We'll help you take the best steps to save your energy and money."
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════ FAQ ══ */}
        <section className="py-10 md:py-20 bg-white border-t border-gray-100 mb-8 md:mb-0">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-[35px] md:text-[34px] font-extrabold text-[#0d1f4c] tracking-tight mb-3">Frequently Asked Questions</h2>
              <div className="w-14 h-[3px] bg-orange-400 mx-auto rounded-full" />
            </div>
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}