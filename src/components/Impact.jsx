import { useEffect, useRef } from "react";
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

// ── Animation CSS ─────────────────────────────────────────────────
const animStyles = `
  .impact-row {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .impact-row.scroll-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .impact-img {
    filter: brightness(0.6);
    transition: filter 0.8s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }
  .impact-row.scroll-visible .impact-img {
    filter: brightness(1);
  }
  .impact-row.scroll-visible .impact-img:hover {
    filter: brightness(0.75);
    transform: scale(1.03);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

export default function Impact() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();
  const ref4 = useScrollReveal();
  const refQuote = useScrollReveal();

  return (
    <>
      <style>{animStyles}</style>

      <div className="font-sans bg-white text-gray-800">

        {/* ══════════════════════════════════════
            HERO — Dark Navy
        ══════════════════════════════════════ */}
        <section className="bg-[#0d274d] py-12 md:py-20 px-6 text-center">
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white tracking-tight leading-tight">
            Small Actions. Big Impact.
          </h1>
        </section>

        {/* ══════════════════════════════════════
            ROW 1 — Image Left, Text Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6 border-b border-gray-100">
          <div ref={ref1} className="impact-row max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[240px]">
              <div className="bg-white rounded-2xl shadow-md p-3">
                <img
                  src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257797/imp1_1_byl3ra.png"
                  alt="Global Electricity Cost"
                  className="impact-img rounded-xl w-full h-auto object-contain"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[26px] md:text-[30px] font-bold text-[#0d1f4c] leading-snug mb-4">
                No More Fearing the Bill.
              </h2>
              <p className="text-[15px] text-gray-700 leading-relaxed">
                Tired of watching energy costs soar and dreading the bill each month? EnerginAI puts you in the
                driver's seat. See your usage in real-time, catch costly spikes the moment they happen, and cut
                waste before it hits your wallet—so the only surprise you get is how much you've saved.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ROW 2 — Text Left, Image Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6 border-b border-gray-100">
          <div ref={ref2} className="impact-row max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[240px]">
              <div className="bg-white rounded-2xl shadow-md p-3">
                <img
                  src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257803/imp2_1_pgvkru.png"
                  alt="Home Solar Pays Off"
                  className="impact-img rounded-xl w-full object-cover h-[180px] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#0d1f4c] leading-snug mb-4">
                Go Solar, Be Free.
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Solar isn't a luxury—it's an investment. We tailor solar installations to fit your home, lifestyle, and
                budget. Once you've paid it off, enjoy decades of clean, nearly free electricity. Plus, with net
                metering, you can track your savings and even earn credits.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ROW 3 — Image Left, Text Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6 border-b border-gray-100">
          <div ref={ref3} className="impact-row max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[240px]">
              <div className="bg-white rounded-2xl shadow-md p-3">
                <img
                  src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257809/imp3_1_jvt9ha.png"
                  alt="Consumer Awareness"
                  className="impact-img rounded-xl w-full object-cover h-[180px] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#0d1f4c] leading-snug mb-4">
                Consumer Awareness and Control.
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                No more being a passive consumer. EnerginAI puts the power in your hands—literally.
                Understand how your home consumes energy, get personalized insights, and take smart
                actions. Awareness is the first step to change, and you lead it.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ROW 4 — Text Left, Image Right
        ══════════════════════════════════════ */}
        <section className="bg-white py-16 px-6 border-b border-gray-100">
          <div ref={ref4} className="impact-row max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-14">
            <div className="flex-shrink-0 w-full md:w-[300px]">
              <div className="bg-white rounded-2xl shadow-md p-4">
                <img
                  src="https://res.cloudinary.com/dalrx2wig/image/upload/v1776257819/wim_4_1_sv51k0.png"
                  alt="Clean India Ventures"
                  className="impact-img rounded-xl w-full object-cover h-[180px] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-[24px] md:text-[30px] font-bold text-[#0d1f4c] leading-snug mb-4">
                Help Build a Better India.
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">
                Our country is at a crossroads. With rapid growth and rising energy demand, the need for smart,
                sustainable choices has never been greater. When you reduce waste and adopt clean energy,
                you're not just helping yourself—you're shaping a brighter, cleaner future for the next generation.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            QUOTE + CTA
        ══════════════════════════════════════ */}
        <section className="bg-white py-20 px-6">
          <div ref={refQuote} className="impact-row max-w-3xl mx-auto text-center">

            {/* Quote */}
            <div className="flex items-start gap-4 mb-8 text-left">
              <div className="w-1 flex-shrink-0 self-stretch bg-[#0d1f4c] rounded-full" />
              <p className="text-[20px] md:text-[24px] font-semibold text-gray-800 leading-snug italic">
                "The future doesn't just happen—it's built by what we do today."
              </p>
            </div>

            {/* Subtext */}
            <p className="text-[17px] text-gray-500 leading-relaxed mb-10">
              At EnerginAI, we believe in empowering individuals to take control of their energy story—the power to change the world is in your hands.
            </p>

            {/* ── CTA Button — Link se replace kiya ── */}
            <Link
              to="/get-started"
              className="inline-block bg-[#0d1f4c] hover:bg-[#f28c28] text-white font-semibold text-[16px] px-10 py-4 rounded-lg transition-colors duration-200"
            >
              Let's Build Together
            </Link>

          </div>
        </section>

      </div>
    </>
  );
}