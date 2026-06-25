import { useState, useEffect } from "react";
import emblemSrc from "@/imports/d73208ce-cc7a-4b5a-aa75-c9c66dee6782.png";
import { motion } from "motion/react";

const BG_URL =
  "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYXMlMjBWZWdhcyUyMHN0cmlwJTIwbmlnaHQlMjBsaWdodHMlMjBsdXh1cnl8ZW58MXx8fHwxNzgyMzMwOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080";

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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_URL})` }}
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

      {/* Perspective road light streaks — radiate from vanishing point */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <style>{`
          @keyframes vp-streak {
            0%   { transform: rotate(var(--a)) translateX(2%) scaleX(0.04); opacity: 0; }
            8%   { opacity: var(--op); }
            88%  { opacity: var(--op); }
            100% { transform: rotate(var(--a)) translateX(160%) scaleX(1); opacity: 0; }
          }
          .vp-ray {
            position: absolute;
            top: 0;
            left: 0;
            height: var(--h);
            width: var(--w);
            transform-origin: 0% 50%;
            border-radius: 999px;
            will-change: transform, opacity;
            animation: vp-streak var(--dur) var(--delay) linear infinite;
          }
        `}</style>

        {/* Vanishing point anchor — sits at the road horizon (~53% down, dead center) */}
        <div className="absolute" style={{ top: "53%", left: "50%" }}>
          {[
            /* Right lanes — warm headlights fanning toward bottom-right */
            { a:  8,  w: "55vw", h: "1.5px", op: 0.55, dur: "1.5s", delay: "0.0s",  color: "rgba(255,225,130,0.9)" },
            { a: 14,  w: "62vw", h: "1px",   op: 0.45, dur: "1.9s", delay: "0.6s",  color: "rgba(255,210,90,0.9)"  },
            { a: 20,  w: "50vw", h: "2px",   op: 0.50, dur: "1.3s", delay: "1.2s",  color: "rgba(255,240,160,0.9)" },
            { a: 26,  w: "68vw", h: "1px",   op: 0.38, dur: "2.1s", delay: "0.3s",  color: "rgba(220,170,60,0.9)"  },
            { a: 33,  w: "45vw", h: "1.5px", op: 0.42, dur: "1.7s", delay: "1.8s",  color: "rgba(255,200,80,0.9)"  },
            { a: 10,  w: "70vw", h: "1px",   op: 0.30, dur: "2.5s", delay: "2.4s",  color: "rgba(255,220,120,0.9)" },
            { a: 18,  w: "40vw", h: "2.5px", op: 0.48, dur: "1.1s", delay: "0.9s",  color: "rgba(255,245,180,0.9)" },
            { a: 28,  w: "58vw", h: "1px",   op: 0.35, dur: "2.3s", delay: "1.5s",  color: "rgba(200,150,50,0.9)"  },
            { a:  6,  w: "48vw", h: "1px",   op: 0.40, dur: "1.6s", delay: "3.1s",  color: "rgba(255,230,140,0.9)" },
            { a: 22,  w: "75vw", h: "1.5px", op: 0.32, dur: "2.8s", delay: "0.4s",  color: "rgba(240,200,80,0.9)"  },

            /* Left lanes — cool red tail-lights fanning toward bottom-left */
            { a: -8,  w: "55vw", h: "1.5px", op: 0.50, dur: "1.6s", delay: "0.2s",  color: "rgba(230,55,55,0.9)"   },
            { a:-14,  w: "60vw", h: "1px",   op: 0.42, dur: "2.0s", delay: "0.8s",  color: "rgba(210,40,40,0.9)"   },
            { a:-20,  w: "50vw", h: "2px",   op: 0.48, dur: "1.4s", delay: "1.4s",  color: "rgba(245,70,70,0.9)"   },
            { a:-27,  w: "65vw", h: "1px",   op: 0.36, dur: "2.2s", delay: "0.5s",  color: "rgba(200,35,35,0.9)"   },
            { a:-33,  w: "44vw", h: "1.5px", op: 0.40, dur: "1.8s", delay: "2.0s",  color: "rgba(220,60,60,0.9)"   },
            { a:-10,  w: "72vw", h: "1px",   op: 0.28, dur: "2.6s", delay: "2.7s",  color: "rgba(235,65,65,0.9)"   },
            { a:-18,  w: "42vw", h: "2px",   op: 0.44, dur: "1.2s", delay: "1.0s",  color: "rgba(255,80,80,0.9)"   },
            { a:-24,  w: "56vw", h: "1px",   op: 0.33, dur: "2.4s", delay: "1.7s",  color: "rgba(190,30,30,0.9)"   },
          ].map((s, i) => (
            <div
              key={i}
              className="vp-ray"
              style={{
                "--a": `${s.a}deg`,
                "--w": s.w,
                "--h": s.h,
                "--op": s.op,
                "--dur": s.dur,
                "--delay": s.delay,
                background: `linear-gradient(to right, ${s.color} 0%, ${s.color} 60%, transparent 100%)`,
                filter: `blur(${Math.abs(s.a) > 20 ? 2 : 1}px)`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

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
          <h1
            className="text-[clamp(3.4rem,14vw,7.5rem)] font-bold tracking-[0.04em] text-white"
            style={{ fontFamily: "Playfair Display, serif", lineHeight: 0.95 }}
          >
            CITY
          </h1>

          <span
            className="text-[clamp(0.55rem,2.2vw,0.85rem)] tracking-[0.45em] my-1 md:my-2"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#C9A84C", fontWeight: 300 }}
          >
            OF
          </span>

          <h1
            className="text-[clamp(3.4rem,14vw,7.5rem)] font-bold tracking-[0.04em] text-white"
            style={{ fontFamily: "Playfair Display, serif", lineHeight: 0.95 }}
          >
            TABLES.
          </h1>
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
