import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-dark text-white">
      <div className="text-center opacity-0 animate-fadeInScale" style={{
        animationDelay: '100ms',
        animationFillMode: 'forwards'
      }}>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradientFlow">404</h1>
        <div className="opacity-0 animate-fadeInUp" style={{
          animationDelay: '300ms',
          animationFillMode: 'forwards'
        }}>
          <p className="text-xl text-white/80 mb-2">{t("notFound.message", "Страница не найдена")}</p>
          <p className="text-sm text-white/60 mb-8">Page not found</p>
        </div>
        <div className="opacity-0 animate-fadeInUp" style={{
          animationDelay: '500ms',
          animationFillMode: 'forwards'
        }}>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple to-purple-light hover:from-purple-light hover:to-purple transition-all duration-500 rounded-md text-white transform hover:scale-105 shadow-md shadow-purple/20 hover:shadow-lg hover:shadow-purple/30 group"
          >
            <Home size={20} className="group-hover:rotate-12 transition-all duration-300" />
            {t("notFound.returnHome", "Вернуться на главную")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
