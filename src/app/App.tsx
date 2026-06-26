import { useState, useEffect } from "react";
import emblemSrc from "@/imports/d73208ce-cc7a-4b5a-aa75-c9c66dee6782.png";
import wordmarkSrc from "@/imports/ad9c17b8-429d-408f-ba87-6f80829c1be7-1.png";
import bgVideo from "@/imports/Lasvegashyperlapse_bg.mp4";
import { motion } from "motion/react";

function CrestEmblem() {
  return (
    <img
      src={emblemSrc}
      alt="City of Tables CT monogram emblem"
      className="w-20 h-20 md:w-24 md:h-24 object-contain"
    />
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-3xl md:text-4xl font-light tabular-nums"
        style={{ fontFamily: "Playfair Display, serif", color: "#C9A84C" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase"
        style={{ fontFamily: "Montserrat, sans-serif", color: "rgba(201,168,76,0.65)" }}
      >
        {label}
      </span>
    </div>
  );
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const launch = new Date("2026-09-01T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(launch);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-background">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Multi-layer dark overlay for the moody cinematic look */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,4,3,0.72) 0%, rgba(5,4,3,0.42) 40%, rgba(5,4,3,0.62) 75%, rgba(5,4,3,0.90) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
      />


      {/* Vertical edge accent lines */}
      <div className="absolute inset-y-0 left-6 md:left-10 w-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.18) 25%, rgba(201,168,76,0.45) 50%, rgba(201,168,76,0.18) 75%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 left-8 md:left-13 w-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.08) 25%, rgba(201,168,76,0.20) 50%, rgba(201,168,76,0.08) 75%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-6 md:right-10 w-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.18) 25%, rgba(201,168,76,0.45) 50%, rgba(201,168,76,0.18) 75%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-8 md:right-13 w-px pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.08) 25%, rgba(201,168,76,0.20) 50%, rgba(201,168,76,0.08) 75%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center select-none">
        {/* Crest */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 md:mb-10"
        >
          <CrestEmblem />
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.25, ease: "easeOut" }}
          className="flex flex-col items-center leading-none"
        >
          <img
            src={wordmarkSrc}
            alt="City of Tables"
            className="w-[clamp(16rem,65vw,38rem)] object-contain"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.55 }}
          className="mt-5 md:mt-7 text-[clamp(0.55rem,2vw,0.78rem)] tracking-[0.38em] uppercase"
          style={{ fontFamily: "Montserrat, sans-serif", color: "rgba(245,238,216,0.55)", fontWeight: 300 }}
        >
          Las Vegas, Nevada
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
          className="mt-7 md:mt-9 w-24 md:w-32 h-px"
          style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }}
        />

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-7 md:mt-9 flex items-start gap-6 md:gap-10"
        >
          <CountdownUnit value={days} label="Days" />
          <span className="text-2xl mt-1" style={{ color: "rgba(201,168,76,0.4)", fontFamily: "Playfair Display, serif" }}>·</span>
          <CountdownUnit value={hours} label="Hours" />
          <span className="text-2xl mt-1" style={{ color: "rgba(201,168,76,0.4)", fontFamily: "Playfair Display, serif" }}>·</span>
          <CountdownUnit value={minutes} label="Minutes" />
          <span className="text-2xl mt-1" style={{ color: "rgba(201,168,76,0.4)", fontFamily: "Playfair Display, serif" }}>·</span>
          <CountdownUnit value={seconds} label="Seconds" />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
          className="mt-7 md:mt-9 w-24 md:w-32 h-px"
          style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }}
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-8 md:mt-10"
        >
          <button
            className="group relative px-10 py-4 md:px-12 md:py-4 overflow-hidden transition-all duration-300"
            style={{
              border: "1px solid #C9A84C",
              background: "rgba(201,168,76,0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.12)";
            }}
          >
            <span
              className="text-[clamp(0.6rem,2.2vw,0.72rem)] tracking-[0.35em] uppercase transition-colors duration-300"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#C9A84C", fontWeight: 500 }}
            >
              Enter the City
            </span>

            {/* Shimmer on hover */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.18) 50%, transparent 60%)",
              }}
            />
          </button>
        </motion.div>

        {/* Bottom fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="mt-10 md:mt-14 text-[10px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "Montserrat, sans-serif", color: "rgba(245,238,216,0.28)", fontWeight: 300 }}
        >
          Coming Soon — An Exclusive Experience Awaits
        </motion.p>
      </div>
    </div>
  );
}
