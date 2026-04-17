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
          el.classList.add("card-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const animStyles = `
  .review-card {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .review-card.card-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ── Testimonial Data ──────────────────────────────────────────────
const testimonials = [
  {
    name: "Mr. Sanjeev Swarnkar",
    location: "Bhopal, Madhya Pradesh",
    pullQuote: "Sometimes the best decisions begin with a recommendation you trust.",
    summary: "After seeing my sister-in-law's experience with EnerginAI, the decision was easy. The Smart Monitor and App gives us a real-time view of solar generation, consumption, and savings — all in one place. Instead of guessing, we can clearly see how our electricity is being used every day.",
    bottomQuote: "When you see a solution working so well in your own family, the decision becomes easy.",
    stars: 5,
    image: "https://res.cloudinary.com/dalrx2wig/image/upload/v1776264582/rev_img_4_2_prv2da.png",
    tag: "Solar + Smart Monitor",
  },
  {
    name: "Mrs. Girija Swarnkar",
    location: "Bhopal, Madhya Pradesh",
    pullQuote: "I don't believe in waiting for problems to grow — I believe in solving them early.",
    summary: "When my bills kept rising, I chose EnerginAI after careful research. Their team designed a solution tailored precisely for my home. The Smart Monitor App completely changed how I manage electricity — I now track real-time generation and make informed decisions with complete visibility.",
    bottomQuote: "Making the switch wasn't just about reducing bills. It was about taking control.",
    stars: 5,
    image: "https://res.cloudinary.com/dalrx2wig/image/upload/v1774325027/rev_img_3_ot38t5.jpg",
    
  },
  {
    name: "Mr. Santram Ahirwar",
    location: "Bhopal, Madhya Pradesh",
    pullQuote: "A new home comes with big dreams — EnerginAI brought the clarity and control I needed.",
    summary: "As a new homeowner, I wanted my house to be efficient from day one. EnerginAI's smart monitor showed me exactly how much power I was consuming, how much solar I was generating, and how much was being exported back to the grid — clearly and in real time.",
    bottomQuote: "If you're serious about saving money and building a sustainable home, EnerginAI is the one solution I trust — without hesitation.",
    stars: 5,
    image: "https://res.cloudinary.com/dalrx2wig/image/upload/v1774325033/rev_img_2_xpzgfh.jpg",
    
  },
  {
    name: "Mrs. Jyoti Rajesh Singh",
    location: "Bhopal, Madhya Pradesh",
    pullQuote: "High bills, no control, constant stress — until I found EnerginAI. Now my bills are ₹0.",
    summary: "For months my bills kept rising with no explanation. EnerginAI's home assessment changed everything. Within the first week my solar was covering most of my home's demand, my bill dropped to ₹0, and I finally understood my energy system completely.",
    bottomQuote: "I didn't just find a service — I found a solution that changed how I manage my home, my savings, and my peace of mind.",
    stars: 5,
    image: "https://res.cloudinary.com/dalrx2wig/image/upload/v1774325044/rev_img_1_mxkhru.jpg",
   
  },
];

// ── Star Rating ───────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-orange-400 text-[16px]">★</span>
      ))}
    </div>
  );
}

// ── Single Review Card ────────────────────────────────────────────
function ReviewCard({ t, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="review-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="flex flex-col md:flex-row">

        {/* ── Left: Photo ── */}
        <div className="flex-shrink-0 w-full md:w-[240px] relative">
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-auto md:h-full object-contain"
          />
         
        </div>

        {/* ── Right: Content ── */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-4">

          {/* Top: Name + Stars */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#0d1f4c] leading-tight">{t.name}</h3>
              <p className="text-[12px] font-semibold text-orange-500 mt-0.5">{t.location}</p>
            </div>
            <Stars count={t.stars} />
          </div>

          {/* Pull Quote */}
          <blockquote className="border-l-4 border-orange-400 pl-4 text-[14px] italic text-gray-700 font-semibold leading-relaxed bg-orange-50 py-2 pr-3 rounded-r-lg">
            "{t.pullQuote}"
          </blockquote>

          {/* Summary */}
          <p className="text-[13.5px] text-gray-600 leading-relaxed">
            {t.summary}
          </p>

          {/* Bottom Quote */}
          <div className="border-l-4 border-[#0d1f4c] pl-4 text-[12.5px] italic text-gray-500 leading-relaxed bg-blue-50 py-2 pr-3 rounded-r-lg">
            "{t.bottomQuote}"
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Main Reviews Page ─────────────────────────────────────────────
export default function Reviews() {
  return (
    <>
      <style>{animStyles}</style>

      <div className="font-sans bg-[#f8fafc] text-gray-800 min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-[#0d274d] py-12 md:py-16 px-6 text-center">
          <p className="text-orange-400 text-[12px] font-bold tracking-[3px] uppercase mb-3">
            Real Stories · Real Savings
          </p>
          <h1 className="text-[32px] md:text-[46px] font-extrabold text-white tracking-tight mb-3">
            Meet Our Customers
          </h1>
          <p className="text-[15px] text-blue-200 max-w-xl mx-auto leading-relaxed">

          </p>
        </section>



        {/* ── Review Cards ── */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-15">
          {testimonials.map((t, i) => (
            <ReviewCard key={i} t={t} index={i} />
          ))}
        </section>

        {/* ── CTA Bottom ── */}
        <section className="text-center py-16 px-4 bg-white border-t border-gray-100">
          <h2 className="text-[22px] md:text-[30px] font-bold text-[#0d1f4c] mb-3">
            People are changing the way they live — you can too.
          </h2>
          <p className="text-[14px] text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
            Take control of your home's energy, reduce your bills, and experience independence with EnerginAI.
          </p>
          <Link
            to="/get-started"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-[15px] px-10 py-4 rounded-xl transition-colors duration-200"
          >
            Start Your Journey →
          </Link>
        </section>

      </div>
    </>
  );
}