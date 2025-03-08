
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";
import { type Repository } from "@/utils/githubUtils";
import { ProjectCard } from "./ProjectCard";
import { GITHUB_USERNAME } from "@/utils/githubUtils";

interface ProjectsSectionProps {
  repositories: Repository[];
  onFetchCommits: (repoName: string) => void;
}

export const ProjectsSection = ({ repositories, onFetchCommits }: ProjectsSectionProps) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const renderProjects = (isGame: boolean) => {
    if (!isGame && repositories.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-white/70 text-lg">{t("projects.loadingError")}</p>
        </div>
      );
    }

    const filteredRepos = repositories.filter(repo => 
      isGame ? repo.topics?.includes('game') : !repo.topics?.includes('game')
    );
    
    const gameProjects = isGame ? [...filteredRepos, {
      id: 999999,
      name: "FurTopia",
      description: "A furry-themed adventure game with unique characters and engaging storyline",
      html_url: "https://store.steampowered.com/app/2370840/FurTopia/",
      language: "C#",
      topics: ["game"],
      homepage: null,
      has_readme: false
    }] : filteredRepos;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameProjects.map((repo, index) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
            index={index}
            onFetchCommits={onFetchCommits}
            isFurTopia={repo.name === "FurTopia"}
          />
        ))}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:300%] animate-[gradientFlow_3s_ease_infinite]">
        {t("projects.title")}
      </h2>
      
      <div className="w-full max-w-6xl flex flex-col items-center">
        <a 
          href={`https://github.com/${GITHUB_USERNAME}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple to-purple-light hover:from-purple-light hover:to-purple transition-all duration-500 rounded-md text-white mb-8 transform hover:scale-105 shadow-md shadow-purple/20 hover:shadow-lg hover:shadow-purple/30 group opacity-0 animate-[fadeInDown_0.6s_ease-out_0.3s_forwards]"
        >
          <Github size={20} className="group-hover:rotate-12 transition-all duration-300" />
          {t("projects.githubProfile")}
        </a>
        
        <div className="space-y-12 w-full">
          <div className="opacity-0 animate-[fadeInUp_0.7s_ease-out_0.5s_forwards]">
            <h3 className="text-xl font-semibold mb-5 text-white/90 flex items-center gap-2 before:content-[''] before:w-1 before:h-6 before:bg-purple-light before:rounded-full">
              {t("projects.githubRepos")}
            </h3>
            {renderProjects(false)}
          </div>
          
          <div className="opacity-0 animate-[fadeInUp_0.7s_ease-out_0.7s_forwards]">
            <h3 className="text-xl font-semibold mb-5 text-white/90 flex items-center gap-2 before:content-[''] before:w-1 before:h-6 before:bg-purple-light before:rounded-full">
              {t("projects.games")}
            </h3>
            {renderProjects(true)}
          </div>
        </div>
      </div>
    </div>
  );
};
