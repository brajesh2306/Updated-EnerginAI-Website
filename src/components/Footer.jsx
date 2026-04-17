import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1e3c72] bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">

      {/* ── Main Footer Content ── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ── Column 1: Brand ── */}
        <div>
          <Link to="/" className="inline-flex items-end mb-4">
            <span className="text-[28px] font-bold text-white tracking-tight text-white">
              EnergInAI
            </span>
            <sup className="text-[15px] text-white font-semibold mb-3 ml-1">™</sup>
          </Link>
          <p className="text-[14.5px] text-white leading-relaxed max-w-[220px]">
            AI-Powered Energy Management for a Sustainable Future.
          </p>  

          {/* App Download Buttons */}
          <div className="flex flex-row gap-3 mt-4 items-center">

            {/* Google Play */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.anny6969.app" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-12"
              />
            </a>

            {/* App Store */}
            <a 
              href="https://apps.apple.com/us/app/energinai/id6761161398" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-12"
              />
            </a>

          </div>
        </div>

        {/* ── Column 2: Quick Links ── */}
        <div>
          <h4 className="text-[16px] font-bold text-white mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4">
            {[
              { label: "Home",             path: "/"                },
              { label: "Product",          path: "/product"         },
              { label: "Impact",           path: "/impact"          },
              { label: "About",            path: "/about"           },
              { label: "Reviews",          path: "/reviews"         },
              { label: "Legal & Policies", path: "/legal-policies"  },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="text-[15px] text-white hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Column 3: Contact Card ── */}
        <div>
          <div className="border border-blue-400/40 rounded-2xl p-6 bg-white/5 backdrop-blur-sm">
            <h4 className="text-[17px] font-bold text-white mb-5">Questions? Contact Us</h4>

            <div className="flex flex-col gap-3 mb-6">
              <p className="text-[14px] text-blue-100">
                <span className="font-bold text-white">Business:</span>{" "}
                <a href="mailto:info@energinai.com" className="hover:text-white transition-colors">
                  info@energinai.com
                </a>
              </p>
              <p className="text-[14px] text-blue-100">
                <span className="font-bold text-white">Consumer:</span>{" "}
                <a href="mailto:support@energinai.com" className="hover:text-white transition-colors">
                  support@energinai.com
                </a>
              </p>
              <p className="text-[14px] text-blue-100">
                <span className="font-bold text-white">Phone:</span>{" "}
                <a href="tel:+918889991290" className="hover:text-white transition-colors">
                  +918889991290
                </a>
              </p>
              <p className="text-[14px] text-blue-100">
                <span className="font-bold text-white">Google Business Profile:</span>{" "}
                <a href="#" className="hover:text-white transition-colors">
                  Click here to view
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3">

              {/* X / Twitter */}
              <a href="#" aria-label="X" className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                <svg width="17" height="17" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.013 7.053.072 5.196.162 3.47.638 2.014 2.014.638 3.47.162 5.196.072 7.053.013 8.333 0 8.741 0 12c0 3.259.013 3.668.072 4.948.09 1.857.566 3.583 1.942 4.959 1.376 1.376 3.102 1.852 4.959 1.942C8.333 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.857-.09 3.583-.566 4.959-1.942 1.376-1.376 1.852-3.102 1.942-4.959.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.667-.072-4.947-.09-1.857-.566-3.583-1.942-4.959C20.531.638 18.805.162 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg width="17" height="17" fill="white" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition-opacity">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-blue-500/30">
        <div className="max-w-6xl mx-auto px-6 py-5 text-center">
          <p className="text-[13px] text-white">
            © 2025 EnerginAI™. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}