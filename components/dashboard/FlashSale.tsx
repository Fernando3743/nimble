"use client";

import { useEffect, useState } from "react";

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 19,
    hours: 5,
    minutes: 20,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 pt-[40px]">
      <div className="flex items-center justify-between rounded-3xl bg-[#E8F36C] px-12 py-10">
        {/* Left - Flash Sale Text */}
        <div className="flex-shrink-0">
          <h2 className="text-lg font-bold text-black">Flash Sale now on!</h2>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-3">
          <span className="text-6xl font-bold text-black">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-6xl font-bold text-black">:</span>
          <span className="text-6xl font-bold text-black">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-6xl font-bold text-black">:</span>
          <span className="text-6xl font-bold text-black">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-6xl font-bold text-black">:</span>
          <span className="text-6xl font-bold text-black">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Right - Description and Button */}
        <div className="flex items-center gap-8">
          <p className="text-base text-black">
            Save on modern table office,
            <br />
            best sellers + more
          </p>
          <button className="flex-shrink-0 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            Use Code: FLASH30
          </button>
        </div>
      </div>
    </section>
  );
}
