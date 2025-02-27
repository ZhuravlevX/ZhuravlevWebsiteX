
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { t } = useTranslation();

  const sections = [
    "about",
    "projects",
    "art",
    "social",
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-purple-dark/50 backdrop-blur-md z-40 transition-all duration-300">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center py-2 sm:py-4">
          <div className="flex flex-wrap gap-1 sm:gap-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => onSectionChange(section)}
                className={cn(
                  "text-sm sm:text-base text-white/70 hover:text-white transition-all duration-300 px-2 py-1 rounded-md whitespace-nowrap transform hover:scale-105",
                  activeSection === section && "text-white bg-white/10"
                )}
              >
                {t(`nav.${section}`)}
              </button>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm sm:text-base text-white/70 hover:text-white transition-all duration-300 px-2 sm:px-3 py-1 rounded-md border border-white/20 hover:border-white/40 transform hover:scale-105"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
};
