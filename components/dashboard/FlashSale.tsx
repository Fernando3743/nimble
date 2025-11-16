"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

export function FlashSale() {
  const t = useTranslation();
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
    <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px] pt-[40px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl bg-[#E8F36C] px-6 sm:px-8 md:px-12 py-6 md:py-10">
        {/* Left - Flash Sale Text */}
        <div className="flex-shrink-0">
          <h2 className="text-lg font-bold text-black">{t.flashSale.title}</h2>
        </div>

        {/* Center - Countdown Timer */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">:</span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">:</span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">:</span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Right - Description and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 text-center sm:text-left">
          <p className="text-sm sm:text-base text-black">
            {t.flashSale.subtitle}
          </p>
          <button className="flex-shrink-0 rounded-full bg-black px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            {t.flashSale.code}
          </button>
        </div>
      </div>
    </section>
  );
}
