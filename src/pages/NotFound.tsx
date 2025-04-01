
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isBirthday } from "@/utils/dateUtils";
import { Home } from "lucide-react";
import {cn} from "@/lib/utils.ts";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
      <div className={cn(`min-h-screen flex flex-col items-center justify-center ${isBirthday() ? 'bg-[#2c1a21]' : 'bg-purple-dark'} text-white`)}>
      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-6 bg-gradient-to-r ${isBirthday() ? 'from-pink-300 via-pink-400 to-pink-200' : 'from-purple-light via-purple to-purple-light'} bg-clip-text text-transparent bg-[length:200%] animate-gradient`}>404</h1>
        <p className="text-xl text-white/80 mb-2">{t("notFound.message", "Страница не найдена")}</p>
        <p className="text-sm text-white/60 mb-8">Page not found</p>
        <div>
          <a 
            href="/"
            className={`inline-flex items-center gap-2 px-4 py-2 ${isBirthday() ? 'bg-gradient-to-r from-pink-400 to-pink-200' : 'bg-gradient-to-r from-purple to-purple-light'} hover:transition-colors rounded-md text-white transform hover:scale-105 transition-transform duration-300`}
          >
            <Home size={20} />
            {t("notFound.returnHome", "Вернуться на главную")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
