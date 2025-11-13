import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, LifeBuoy, ArrowLeft } from "lucide-react";

export function NotFound() {
  const [show404, setShow404] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow404((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#e6fffa] via-[#ecfeff] to-[#f0fdfa] text-[#0f172a] p-4 sm:p-6 md:p-10">
      {/* Floating background orbs */}
      <motion.div
        className="absolute top-20 left-10 w-56 h-56 sm:w-72 sm:h-72 bg-[#a7f3d0]/40 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#99f6e4]/40 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-[#c7f9f2] shadow-xl sm:shadow-2xl p-6 sm:p-10 md:p-12 flex flex-col items-center text-center">
        {/* Floating illustration */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(7,122,125,0.25)]"
          >
            <path
              fill="#99f6e4"
              d="M96 96l96-32 128 32 96-32v320l-96 32-128-32-96 32z"
              opacity="0.9"
            />
            <path
              fill="#0ea5e9"
              d="M192 64v352l128 32V96z"
              opacity="0.4"
            />
            <circle cx="256" cy="220" r="28" fill="#077a7d" />
            <path
              fill="#a7f3d0"
              d="M256 180c-22 0-40 18-40 40 0 40 40 80 40 80s40-40 40-80c0-22-18-40-40-40z"
            />
          </svg>
        </motion.div>

        {/* Animated 404 Text */}
        <motion.div
          key={show404 ? "404" : "notfound"}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.6 }}
          className="mt-4"
        >
          <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#077a7d] to-[#0ea5e9] drop-shadow-[0_0_10px_rgba(7,122,125,0.3)] leading-none">
            {show404 ? "404" : "Not Found"}
          </h1>
        </motion.div>

        {/* Subtitle Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-md sm:max-w-lg text-gray-600 text-sm sm:text-base md:text-lg mt-4 sm:mt-6 px-2"
        >
          Oops, looks like something broke for a moment!
          <br className="hidden sm:block" />
          Our team’s fixing it — hang tight or give the page a quick refresh.
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 w-full px-4"
        >
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#077a7d]/30 text-[#077a7d] font-medium hover:bg-[#e6fffa] transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <ArrowLeft size={18} /> Go Back
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#077a7d] text-white font-semibold hover:bg-[#066a6b] transition-all shadow-md text-sm sm:text-base w-full sm:w-auto"
          >
            <Home size={18} /> Home
          </a>

          <a
            href="/support"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#0ea5e9]/30 text-[#0ea5e9] hover:bg-[#ecfeff] transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <LifeBuoy size={18} /> Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
