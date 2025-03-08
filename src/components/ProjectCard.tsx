
import { useTranslation } from "react-i18next";
import { Circle, Clock, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Repository } from "@/utils/githubUtils";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  repo: Repository;
  index: number;
  onFetchCommits: (repoName: string) => void;
  isFurTopia?: boolean;
}

export const ProjectCard = ({ repo, index, onFetchCommits, isFurTopia = false }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleCardClick = () => {
    if (isFurTopia) {
      toast({
        description: t("projects.noContentYet"),
        duration: 3000,
        className: "bg-[#1A1F2C] border-[#221F26] text-purple-light"
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
        "transform hover:scale-105 hover:shadow-lg hover:shadow-purple/10",
        "opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]",
        "flex flex-col h-full"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleCardClick}
    >
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-purple-light transition-colors"
            onClick={e => {
              if (isFurTopia) {
                e.preventDefault();
              }
            }}
          >
            <h3 className="font-semibold text-white">{repo.name}</h3>
          </a>
          
          {repo.language && (
            <div className="flex items-center gap-2">
              <Circle size={8} className="text-purple-light animate-pulse" />
              <span className="text-sm text-white/60">{repo.language}</span>
            </div>
          )}
        </div>
        
        <p className="text-white/60 text-sm mb-4">{repo.description}</p>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/10">
        {!isFurTopia && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFetchCommits(repo.name);
            }} 
            className="text-sm text-purple hover:text-purple-light transition-colors flex items-center gap-1 relative overflow-hidden group"
          >
            <Clock size={14} className="group-hover:animate-bounce" />
            <span className="relative">
              {t("projects.commits")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-light group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>
        )}
        
        {repo.homepage && (
          <a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-purple hover:text-purple-light transition-colors flex items-center gap-1 relative overflow-hidden group"
          >
            <Link2 size={14} className="group-hover:rotate-12 transition-transform" />
            <span className="relative">
              {t("projects.link")}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-light group-hover:w-full transition-all duration-300"></span>
            </span>
          </a>
        )}
      </div>
      
      {isFurTopia && (
        <p className="text-purple-light text-sm mt-2 animate-pulse">
          {t("projects.comingSoon")}
        </p>
      )}
    </div>
  );
};
