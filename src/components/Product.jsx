import { useEffect, useRef } from "react";

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

// ── Steps Reveal Hook ─────────────────────────────────────────────
function useStepsReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items = container.querySelectorAll(".step-item");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item) => item.classList.add("step-visible"));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Animation CSS ─────────────────────────────────────────────────
const animStyles = `
  .pkg-row {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .pkg-row.scroll-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .pkg-img {
    filter: brightness(0.6);
    transition: filter 0.8s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .pkg-row.scroll-visible .pkg-img {
    filter: brightness(1);
  }
  .pkg-row.scroll-visible .pkg-img:hover {
    filter: brightness(0.72);
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }

  /* Steps float animation */
  .step-item {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .step-item.step-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .step-item:nth-child(1) { transition-delay: 0s; }
  .step-item:nth-child(2) { transition-delay: 0.2s; }
  .step-item:nth-child(3) { transition-delay: 0.4s; }
  .step-item:nth-child(4) { transition-delay: 0.6s; }
`;

export default function Product() {

  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();
  const stepsRef = useStepsReveal();

  return (
    <>
      <style>{animStyles}</style>

      <div className="font-sans bg-white text-gray-800">

        {/* ══════════════════════════════════════
            HERO — Dark Navy
        ══════════════════════════════════════ */}
        <section className="bg-[#0d274d] py-12 md:py-20 px-6 text-center">
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white tracking-tight leading-tight ">
            Innovation to Change the World.
          </h1>
        </section>

        {/* ══════════════════════════════════════
            ROW 1 — Image Left, Text Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6">
          <div ref={ref1} className="pkg-row max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[320px]">
              <img
                src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257635/prod1_1_dstdxn.png"
                alt="Smart Monitor"
                className="pkg-img rounded-2xl w-full object-cover h-[260px] cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] md:text-[35px] font-bold text-[#0d1f4c] leading-snug mb-4">
                The EnerginAI™ Smart Monitor
              </h2>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                The brain behind the power. This is not just a sensor; it's a high-fidelity IoT
                device that captures thousands of data points per second, providing an
                unparalleled, real-time view of your home's electrical nervous system.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ROW 2 — Text Left, Image Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6">
          <div ref={ref2} className="pkg-row max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[320px]">
              <img
                src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257641/prod2_1_acog7e.png"
                alt="EnerginAI App"
                className="pkg-img rounded-2xl w-full h-auto object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] md:text-[35px] font-bold text-[#0d1f4c] leading-snug mb-4">
                The EnerginAI™ App
              </h2>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                A world of insight in the palm of your hand. Our app is your one-stop
                command center to control, solve, and optimize. It translates complex data
                into AI-driven predictions, instant anomaly alerts, and a complete, intuitive
                breakdown of your energy usage.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ROW 3 — Image Left, Text Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6">
          <div ref={ref3} className="pkg-row max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[320px]">
              <img
                src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257651/Prod_hero_3_1_pygkkr.png"
                alt="Smart Home"
                className="pkg-img rounded-2xl w-full object-cover h-[280px] cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] md:text-[35px] font-bold text-[#0d1f4c] leading-snug mb-4">
                A Dedicated Environment<br />—Built for You
              </h2>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                True control means a smart home made for you by EnerginAI. We build your
                automated home, giving you full control and easy access to solutions for all
                your energy-related problems—managed directly by us for seamless savings
                and comfort.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            UNLOCK THE POWER OF YOUR DATA
        ══════════════════════════════════════ */}
        <section className="bg-[#f0f4f8] py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[26px] md:text-[34px] font-bold text-[#0d1f4c] tracking-tight mb-3">
                Unlock the Power of Your Data
              </h2>
              <div className="w-12 h-[3px] bg-orange-400 mx-auto rounded-full" />
            </div>

            {/* stepsRef lagaya + step-item class add ki */}
            <div ref={stepsRef} className="relative">
              <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-gray-300 z-0" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-15 relative z-10">
                {[
                  { num: "1", title: "Monitor", desc: "Capture every watt in real-time with our high-accuracy IoT device." },
                  { num: "2", title: "Analyze", desc: "Our AI finds hidden patterns, predicts costs, and detects anomalies." },
                  { num: "3", title: "Act", desc: "Use insights to optimize your energy consumption and act on our recommendations." },
                  { num: "4", title: "Save", desc: "Follow EnerginAI's analysis and see your bills go down right away." },
                ].map((step) => (
                  <div key={step.num} className="step-item flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-[22px] font-bold flex items-center justify-center mb-5 shadow-md flex-shrink-0 transition-all duration-300 hover:scale-110">
                      {step.num}
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-[16px] text-gray-700 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}