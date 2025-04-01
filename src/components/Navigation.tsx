import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {isBirthday} from "@/utils/dateUtils.ts";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    "about",
    "projects",
    "art",
    "social",
  ];

  useEffect(() => {
    // Initial animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Scroll effect handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <nav className={cn(
          "fixed top-0 left-0 right-0 backdrop-blur-md z-40 transition-all duration-700",
          isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-8",
          scrolled
              ? `${isBirthday() ? 'bg-[#1f1317]/80 shadow-lg shadow-[#2c1a21]/20' : 'bg-purple-dark/80 shadow-lg shadow-purple/20'}`
              : `${isBirthday() ? 'bg-[#1f1317]/50' : 'bg-purple-dark/50'}`
      )}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center py-2 sm:py-4">
          <div className="flex flex-wrap gap-1 sm:gap-6">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
                className={cn(
                  "text-sm sm:text-base text-white/70 hover:text-white transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap",
                  activeSection === section
                      ? `text-white bg-gradient-to-r ${isBirthday() ? 'from-pink-200/30 to-pink-400/30' : 'from-purple-light/30 to-purple/30'} shadow-inner`
                      : "hover:bg-white/5",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  `transition-all duration-500 delay-[${index * 150}ms] transform hover:scale-110 hover:shadow-md ${isBirthday() ? 'hover:shadow-pink-400/20' : 'hover:shadow-purple/20'}`
                )}
              >
                <span className={cn(
                    "relative",
                    activeSection === section &&
                    `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5  ${isBirthday() ? 'after:bg-pink-400' : 'after:bg-purple-light'} after:rounded-full after:animate-pulse`
                )}>
                  {t(`nav.${section}`)}
                </span>
              </button>
            ))}
          </div>
          <LanguageSwitcher isVisible={isVisible} />
        </div>
      </div>
    </nav>
  );
};

const LanguageSwitcher = ({ isVisible }: { isVisible: boolean }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
      <button
          onClick={toggleLanguage}
          className={cn(
              "text-sm sm:text-base text-white/80 transition-all duration-500 px-3 sm:px-4 py-1.5 rounded-md",
              `relative overflow-hidden group bg-gradient-to-br ${isBirthday() ? 'from-pink-400/40 to-pink-200/20' : 'from-purple/40 to-purple-light/20'} border border-white/10`,
              isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              `transition-all duration-500 delay-[500ms] transform hover:shadow-md ${isBirthday() ? 'hover:shadow-pink-400/20' : 'hover:shadow-purple/20'} hover:border-white/20`
          )}
      >
        <span className="relative z-10">{i18n.language.toUpperCase()}</span>
        <span className={`absolute inset-0 bg-gradient-to-r ${isBirthday() ? 'from-pink-400/40 to-pink-400/40' : 'from-purple/40 to-purple-light/40'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform`}></span>
        <span className={`absolute -inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent ${isBirthday() ? 'via-pink-400' : 'via-purple-light'} to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300 transform`}></span>
      </button>
  );
};
