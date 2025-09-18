import { useTranslation } from "react-i18next";
import { Circle, Clock, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Repository } from "@/utils/githubUtils";
import { useToast } from "@/hooks/use-toast";
import { isBirthday } from "@/utils/dateUtils.ts";

interface ProjectCardProps {
  repo: Repository;
  index: number;
  onFetchCommits: (repoName: string) => void;
  isCassette?: boolean;
}

export const ProjectCard = ({ repo, index, onFetchCommits, isCassette = false }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCardClick = () => {
    if (isCassette) {
      toast({
        description: t("projects.noContentYet"),
        duration: 3000,
        className: `${isBirthday() ? 'bg-[#2c1a21] border-[#221F26] text-pink-200' : 'bg-[#1A1F2C] border-[#221F26] text-purple-light'}`
      });
    }
  };

  return (
      <div
          key={repo.id}
          className={cn(
              "p-4 rounded-lg border border-white/10",
              "bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm",
              "hover:bg-white/10 transition-all duration-500",
              `transform hover:scale-105 hover:shadow-lg ${isBirthday() ? 'hover:shadow-[#2c1a21]/10' : 'hover:shadow-purple/10'}`,
              "opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]",
              "flex flex-col h-full"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
          // onClick={handleCardClick}
      >
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-2">
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isBirthday() ? 'hover:text-pink-200' : 'hover:text-purple-light'} transition-colors`}
                onClick={e => {
                  if (isCassette) {
                    e.preventDefault();
                  }
                }}
            >
              <h3 className="font-semibold text-white">{repo.name}</h3>
            </a>

            {repo.language && (
                <div className="flex items-center gap-2">
                  <Circle size={8} className={`${isBirthday() ? 'text-pink-200' : 'text-purple-light'} animate-ping`} />
                  <span className="text-sm text-white/60">{repo.language}</span>
                </div>
            )}
          </div>

          <p className="text-white/60 text-sm mb-4">{repo.description}</p>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/10">
          {!isCassette && (
              <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFetchCommits(repo.name);
                  }}
                  className={`text-sm ${isBirthday() ? 'text-pink-400 hover:text-pink-200' : 'text-purple hover:text-purple-light'} transition-colors flex items-center gap-1 relative overflow-hidden group`}
              >
                <Clock size={14} className="group-hover:animate-pulse" />
                <span className="relative">
              {t("projects.commits")}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px ${isBirthday() ? 'bg-pink-200' : 'bg-purple-light'} group-hover:w-full transition-all duration-300`}></span>
            </span>
              </button>
          )}

          {repo.homepage && (
              <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isBirthday() ? 'text-pink-400 hover:text-pink-200' : 'text-purple hover:text-purple-light'} transition-colors flex items-center gap-1 relative overflow-hidden group`}
              >
                <Link2 size={14} className="group-hover:rotate-12 group-hover:animate-pulse transition-transform" />
                <span className="relative">
              {t("projects.link")}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px ${isBirthday() ? 'bg-pink-200' : 'bg-purple-light'} group-hover:w-full transition-all duration-300`}></span>
            </span>
              </a>
          )}
        </div>

        {isCassette && (
            <div className="mt-2 flex justify-between items-center">
              <p className={`${isBirthday() ? 'text-pink-200' : 'text-purple-light'} text-sm`}>
                {t("projects.comingSoon")}
              </p>
              <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${isBirthday() ? 'text-pink-400 hover:text-pink-200' : 'text-purple hover:text-purple-light'} transition-colors flex items-center gap-1 relative overflow-hidden group`}
              >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 group-hover:animate-pulse"
                >
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.266-1.253 0-2.265-1.014-2.265-2.265z" />
                </svg>
                <span className="relative">
              Steam
              <span className={`absolute -bottom-1 left-0 w-0 h-px ${isBirthday() ? 'bg-pink-200' : 'bg-purple-light'} group-hover:w-full transition-all duration-300`}></span>
            </span>
              </a>
            </div>
        )}
      </div>
  );
};
