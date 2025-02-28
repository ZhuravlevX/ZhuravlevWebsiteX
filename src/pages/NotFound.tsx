
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-dark text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradient">404</h1>
        <p className="text-xl text-white/80 mb-2">{t("notFound.message", "Страница не найдена")}</p>
        <p className="text-sm text-white/60 mb-8">Page not found</p>
        <div>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple hover:bg-purple-light transition-colors rounded-md text-white transform hover:scale-105 transition-transform duration-300"
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
