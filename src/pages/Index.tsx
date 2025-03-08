
import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { ImageViewer } from "@/components/ImageViewer";
import { Modal } from "@/components/Modal";
import { AboutSection } from "@/components/AboutSection";
import { GallerySection } from "@/components/GallerySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SocialSection } from "@/components/SocialSection";
import { useTranslation } from "react-i18next";
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { fetchUserData, fetchRepositories, fetchReadme, fetchCommits } from "@/utils/githubUtils";
import { calculateDaysUntilBirthday, formatDate } from "@/utils/dateUtils";
import { type Repository, type Commit } from "@/utils/githubUtils";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [selectedRepoCommits, setSelectedRepoCommits] = useState<Commit[]>([]);
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);
  const [isCommitsModalOpen, setIsCommitsModalOpen] = useState(false);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    art: useRef<HTMLDivElement>(null),
    social: useRef<HTMLDivElement>(null),
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationTriggered(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [userData, repositories] = await Promise.all([
          fetchUserData(),
          fetchRepositories()
        ]);
        
        if (userData) {
          setAvatarUrl(userData.avatar_url);
        }
        
        setRepositories(repositories);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };
    
    fetchGithubData();
  }, []);

  useEffect(() => {
    const calculateBirthday = () => {
      const days = calculateDaysUntilBirthday();
      setDaysUntilBirthday(days);
    };
    
    calculateBirthday();
    const timer = setInterval(calculateBirthday, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  const handleFetchReadme = async (repoName: string) => {
    const content = await fetchReadme(repoName);
    setReadmeContent(content);
    setSelectedRepo(repoName);
    setIsReadmeModalOpen(true);
  };

  const handleFetchCommits = async (repoName: string) => {
    const commits = await fetchCommits(repoName);
    setSelectedRepoCommits(commits);
    setSelectedRepo(repoName);
    setIsCommitsModalOpen(true);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutSection daysUntilBirthday={daysUntilBirthday} />;
      case "art":
        return <GallerySection onImageSelect={setSelectedImage} />;
      case "projects":
        return <ProjectsSection 
          repositories={repositories} 
          onFetchCommits={handleFetchCommits} 
        />;
      case "social":
        return <SocialSection />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-purple-dark text-white overflow-x-hidden flex flex-col relative",
      animationTriggered ? "animate-[fadeIn_1s_ease-out]" : "opacity-0"
    )}>
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="container mx-auto px-4 pt-24 pb-12 flex-grow relative">
        {renderSection()}
      </main>
      
      <footer className="w-full bg-[#0D0D0D]/80 py-4 border-t border-white/10 opacity-0 animate-[fadeIn_0.7s_ease-out_1.5s_forwards]">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/60 text-sm">
            {t("footer.text")}
          </p>
          <p className="text-center text-white/60 text-sm mt-2">
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      
      <ImageViewer 
        src={selectedImage || ""} 
        alt="Selected artwork" 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
      
      <Modal 
        isOpen={isReadmeModalOpen} 
        onClose={() => setIsReadmeModalOpen(false)} 
        title={`README - ${selectedRepo}`}
      >
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </Modal>
      
      <Modal 
        isOpen={isCommitsModalOpen} 
        onClose={() => setIsCommitsModalOpen(false)} 
        title={t("projects.commitsModalTitle", { repo: selectedRepo })}
      >
        <div className="space-y-4">
          {selectedRepoCommits.map((commit, index) => (
            <div 
              key={commit.sha}
              className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-1"
              style={{ 
                animationName: "fadeInRight", 
                animationDuration: "0.5s", 
                animationTimingFunction: "ease-out", 
                animationDelay: `${index * 50}ms`, 
                animationFillMode: "backwards" 
              }}
            >
              <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-light transition-colors">
                <p className="text-sm text-white/80 mb-1">{commit.commit.message}</p>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>{commit.commit.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(commit.commit.author.date)}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Index;
