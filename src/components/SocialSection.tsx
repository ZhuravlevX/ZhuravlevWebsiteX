import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {isBirthday} from "@/utils/dateUtils.ts";

export const SocialSection = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${isBirthday() ? 'from-pink-300 via-pink-400 to-pink-200' : 'from-purple-light via-purple to-purple-light'} bg-clip-text text-transparent bg-[length:300%] animate-[gradientFlow_3s_ease_infinite]`}>
        {t("social.title")}
      </h2>
      
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <a 
          href="https://t.me/FoxDanny" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white",
            "bg-[#2AABEE] hover:bg-[#229ED9] transition-all duration-500",
            "transform hover:scale-105 hover:shadow-lg hover:shadow-[#2AABEE]/20",
            "relative overflow-hidden group opacity-0",
            "animate-[fadeInDown_0.7s_ease-out_0.2s_forwards]",
            "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:bg-white/10",
            "before:transform before:scale-x-0 before:origin-right",
            "hover:before:scale-x-100 hover:before:origin-left before:transition-all before:duration-500"
          )}
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            className="shrink-0 group-hover:animate-pulse"
          >
            <path d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z" />
            <rect y="0" className="st0" width="24" height="24" style={{ fill: 'none' }} />
          </svg>
          <span className="relative z-10">{t("social.telegram")}</span>
        </a>
        
        <a 
          href="https://discordapp.com/users/663453268784971796" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white",
            "bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-500",
            "transform hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/20",
            "relative overflow-hidden group opacity-0",
            "animate-[fadeInDown_0.7s_ease-out_0.4s_forwards]",
            "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:bg-white/10",
            "before:transform before:scale-x-0 before:origin-right",
            "hover:before:scale-x-100 hover:before:origin-left before:transition-all before:duration-500"
          )}
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            className="shrink-0 group-hover:animate-pulse"
          >
            <path d="M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          </svg>
          <span className="relative z-10">{t("social.discord")}</span>
        </a>
        
        <a 
          href="https://steamcommunity.com/id/ZhuravlevX/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white",
            "bg-[#171a21] hover:bg-[#2a475e] transition-all duration-500",
            "transform hover:scale-105 hover:shadow-lg hover:shadow-gray-900/30",
            "relative overflow-hidden group opacity-0",
            "animate-[fadeInDown_0.7s_ease-out_0.6s_forwards]",
            "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:bg-white/10",
            "before:transform before:scale-x-0 before:origin-right",
            "hover:before:scale-x-100 hover:before:origin-left before:transition-all before:duration-500"
          )}
        >
          <svg 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg" 
            className="shrink-0 group-hover:animate-pulse"
          >
            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.266-1.253 0-2.265-1.014-2.265-2.265z" />
          </svg>
          <span className="relative z-10">{t("social.steam")}</span>
        </a>
        
        <a 
          href="https://open.spotify.com/user/31dgwdgrkyfvvahwrjyx5yjdspey?si=87317b59bc7c4dbb" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={cn(
            "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white",
            "bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-500",
            "transform hover:scale-105 hover:shadow-lg hover:shadow-[#1DB954]/20",
            "relative overflow-hidden group opacity-0",
            "animate-[fadeInDown_0.7s_ease-out_0.8s_forwards]",
            "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:bg-white/10",
            "before:transform before:scale-x-0 before:origin-right",
            "hover:before:scale-x-100 hover:before:origin-left before:transition-all before:duration-500"
          )}
        >
          <svg 
            width="22" 
            height="22" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="white" 
            viewBox="0 0 24 24" 
            className="shrink-0 group-hover:animate-pulse"
          >
            <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
          </svg>
          <span className="relative z-10">Spotify</span>
        </a>

        {i18n.language === "ru" && (
            <a
                href="https://vk.com/foxdanny"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-md text-white",
                    "bg-[#0077FF] hover:bg-[#0066CC] transition-all duration-500",
                    "transform hover:scale-105 hover:shadow-lg hover:shadow-[#0077FF]/20",
                    "relative overflow-hidden group opacity-0",
                    "animate-[fadeInDown_0.7s_ease-out_1.0s_forwards]",
                    "before:content-[''] before:absolute before:inset-0 before:opacity-0 before:bg-white/10",
                    "before:transform before:scale-x-0 before:origin-right",
                    "hover:before:scale-x-100 hover:before:origin-left before:transition-all before:duration-500"
                )}
            >
              <svg
                  width="22"
                  height="22"
                  viewBox="0 0 363.301 363.301"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 group-hover:animate-pulse"
              >
                <path d="M347.506,240.442c-7.91-9.495-16.899-18.005-25.592-26.235c-3.091-2.927-6.287-5.953-9.368-8.962 c-8.845-8.648-9.167-11.897-2.164-21.72c4.845-6.771,9.982-13.551,14.95-20.108c4.506-5.949,9.166-12.101,13.632-18.273l0.917-1.269 c8.536-11.811,17.364-24.024,22.062-38.757c1.22-3.887,2.501-9.607-0.428-14.39c-2.927-4.779-8.605-6.237-12.622-6.918 c-1.987-0.337-3.96-0.383-5.791-0.383l-55.901-0.04l-0.462-0.004c-8.452,0-14.148,3.983-17.412,12.178 c-3.116,7.83-6.539,16.168-10.445,24.096c-7.773,15.787-17.645,33.97-31.93,49.135l-0.604,0.645 c-1.687,1.813-3.598,3.866-4.995,3.866c-0.214,0-0.447-0.041-0.711-0.124c-2.959-1.153-4.945-8.316-4.855-11.648 c0.001-0.046,0.002-0.092,0.002-0.138l-0.039-64.61c0-0.224-0.016-0.446-0.045-0.668c-1.422-10.503-4.572-17.041-16.474-19.372 c-0.316-0.063-0.639-0.094-0.961-0.094h-58.126c-9.47,0-14.688,3.849-19.593,9.61c-1.324,1.54-4.08,4.746-2.714,8.635 c1.386,3.947,5.885,4.791,7.35,5.065c7.272,1.384,11.371,5.832,12.532,13.604c2.027,13.496,2.276,27.901,0.784,45.334 c-0.416,4.845-1.239,8.587-2.595,11.784c-0.315,0.746-1.432,3.181-2.571,3.182c-0.362,0-1.409-0.142-3.316-1.456 c-4.509-3.089-7.808-7.497-11.654-12.942c-13.084-18.491-24.065-38.861-33.575-62.288c-3.527-8.624-10.114-13.452-18.556-13.594 c-9.276-0.141-17.686-0.209-25.707-0.209c-8.764,0-16.889,0.081-24.823,0.246C8.914,83.74,4.216,85.776,1.744,89.676 c-2.476,3.903-2.315,9.03,0.479,15.236c22.366,49.723,42.645,85.876,65.755,117.228c16.193,21.938,32.435,37.123,51.109,47.784 c19.674,11.255,41.722,16.727,67.402,16.727c2.911,0,5.921-0.071,8.956-0.213c14.922-0.727,20.458-6.128,21.158-20.657 c0.333-7.425,1.145-15.212,4.795-21.853c2.304-4.184,4.452-4.184,5.158-4.184c1.36,0,3.046,0.626,4.857,1.799 c3.248,2.12,6.033,4.96,8.316,7.441c2.149,2.357,4.274,4.738,6.401,7.12c4.59,5.141,9.336,10.456,14.294,15.497 c10.852,11.041,22.807,15.897,36.538,14.843h51.252c0.109,0,0.219-0.004,0.328-0.011c5.107-0.337,9.53-3.17,12.135-7.772 c3.227-5.701,3.162-12.974-0.174-19.46C356.718,251.867,351.808,245.601,347.506,240.442z"></path>
              </svg>
              <span className="relative z-10">{t("social.vk")}</span>
            </a>
        )}
      </div>
    </div>
  );
};
