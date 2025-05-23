
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { isBirthday } from "@/utils/dateUtils.ts";


interface AboutSectionProps {
  daysUntilBirthday: number;
}

export const AboutSection = ({ daysUntilBirthday }: AboutSectionProps) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
      <div ref={sectionRef} className="flex flex-col items-center">
        <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${isBirthday() ? 'from-pink-300 via-pink-400 to-pink-200' : 'from-purple-light via-purple to-purple-light'} bg-clip-text text-transparent bg-[length:300%] animate-[gradientFlow_3s_ease_infinite]`}>
          {t("about.title")}
        </h2>


      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 max-w-3xl">
        <div className={cn(
          "relative w-32 h-32 flex-shrink-0 md:mr-4",
          "opacity-0 animate-[fadeInScale_0.7s_ease-out_0.3s_forwards]",
          "before:content-[''] before:absolute before:inset-0 before:rounded-full",
            `before:bg-gradient-to-r ${isBirthday() ? 'before:from-pink-300 before:to-pink-200' : 'before:from-purple before:to-purple-light'}`,
          "before:opacity-50 before:animate-spin before:animate-[spin_10s_linear_infinite]",
          "before:blur-md"
        )}>
          <img
            src="/gallery/arts/art10.png"
            alt="Profile Avatar"
            className={`w-full h-full object-cover rounded-full border-2 ${isBirthday() ? 'border-pink-400' : 'border-purple'} relative z-10 animate-[float_6s_ease-in-out_infinite]`}
          />
        </div>

        <div className="text-center md:text-left flex-grow">
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-lg text-white/80 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
              {t("about.description")}
            </p>

            <div className={`${isBirthday() ? 'text-pink-200' : 'text-purple-light'} text-sm opacity-0 animate-[fadeInUp_0.6s_ease-out_0.7s_forwards]`}>
              {isBirthday()
                ? t("about.birthday.today")
                : t("about.birthday.daysLeft", {
                    days: `${daysUntilBirthday} ${daysUntilBirthday === 1 
                      ? t("about.birthday.day") 
                      : t("about.birthday.days")}`
                  })}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white/80 leading-relaxed opacity-0 animate-[fadeInUp_0.6s_ease-out_0.9s_forwards]">
              {t("about.bio").split("\n\n")[0]}
            </p>

            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_1.1s_forwards]">
              <img
                src="/gallery/arts/art18.png"
                alt="Fursona"
                className={`mx-auto max-w-full h-auto rounded-lg border-2 ${isBirthday() ? 'border-pink-400' : 'border-purple'} my-4 transform hover:scale-105 transition-all duration-500 shadow-lg ${isBirthday() ? 'shadow-[#2c1a21]/20 w-3/4 hover:shadow-xl hover:shadow-[#2c1a21]/30' : 'shadow-purple/20 w-3/4 hover:shadow-xl hover:shadow-purple/30'} ${isBirthday() ? 'hover:shadow-pink-400/50' : 'hover:shadow-purple/50'} hover:shadow-lg`}
              />
              <p className="text-center italic text-white/60">
                {t("about.fursonaRef")}
              </p>
            </div>

            <p className="text-white/80 leading-relaxed opacity-0 animate-[fadeInUp_0.6s_ease-out_1.3s_forwards]">
              {t("about.bio").split("\n\n")[1]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
