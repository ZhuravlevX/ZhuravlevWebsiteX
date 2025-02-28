
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ImageViewer } from "@/components/ImageViewer";
import { Modal } from "@/components/Modal";
import { useTranslation } from "react-i18next";
import { Octokit } from "@octokit/rest";
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";
import { Github, Clock, Circle, Link2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const octokit = new Octokit();
const GITHUB_USERNAME = "ZhuravlevX";

const artImages = [
  "/lovable-uploads/0d1283f2-cb21-46e1-85b6-81be3521f8c3.png", 
  "/lovable-uploads/19929ee8-5efd-4c53-b9da-b353539a72af.png", 
  "/lovable-uploads/28f40eac-9977-491f-a0ef-ad90340b52f0.png", 
  "/lovable-uploads/3337fad9-26e0-4f24-96b6-cace42d94c6d.png", 
  "/lovable-uploads/538e6b34-1f0e-42d2-a066-8649a3e72357.png", 
  "/lovable-uploads/5d0e8bc6-db59-4233-a985-e9c0b04c0d2a.png", 
  "/lovable-uploads/6345fdb0-ab9f-4470-bf16-38d24bac30de.png", 
  "/lovable-uploads/7877656a-74a2-442f-be3c-2835881ab0fa.png", 
  "/lovable-uploads/8548b7ea-f8e3-4233-9d46-68cbafa653f1.png", 
  "/lovable-uploads/92b6ff3e-3cfa-4548-825d-112c414c83c8.png", 
  "/lovable-uploads/9a26b27c-cbae-4af2-9139-f4cdd28a7bfb.png", 
  "/lovable-uploads/a923fea8-b3ec-4381-a0bd-d18039b48e1d.png", 
  "/lovable-uploads/b9198cd9-b141-45c3-8323-ea4fcaaeb573.png", 
  "/lovable-uploads/bd622df0-b04c-427f-82d8-0c78820b58ff.png", 
  "/lovable-uploads/d819c9a8-1805-4f0c-9bc9-d8aa11b31751.png", 
  "/lovable-uploads/dba87e47-e3b0-4c03-b987-18b9f3e03cca.png",
  "/lovable-uploads/b2eaaa75-df25-4419-8b64-48f87be986ba.png",
  "/lovable-uploads/812906ad-bccc-4206-a48c-a0f558e41f64.png",
  "/lovable-uploads/2d412165-ecdf-4976-a142-5b00f95251cb.png",
  "/lovable-uploads/3759d3cd-9eea-4303-b2de-511c1bc94827.png",
  "/lovable-uploads/7571356b-dbb4-425c-a319-c5cb058d48fa.png"
];

const photoImages = [
  "/lovable-uploads/3079284f-103d-418b-af8d-437a44fad638.png",
  "/lovable-uploads/4be0f5d6-6404-4327-9f4a-641192127249.png",
  "/lovable-uploads/d65d8443-3477-49e7-bac5-caeec820d714.png",
  "/lovable-uploads/e92a2158-0c0c-4f5f-b07b-a0c70b89c20d.png",
  "/lovable-uploads/09dae5f5-7634-4749-9a0b-fbe85fd6ca93.png",
  "/lovable-uploads/3e6d02db-f636-4afd-bf53-b0a6513d0fd9.png",
  "/lovable-uploads/efac75c3-9222-4a8e-ae93-3f55dc4607b2.png",
  "/lovable-uploads/0831a829-d4c0-4707-82ec-57ee65bb6a13.png",
  "/lovable-uploads/74d838f1-4aca-4121-baa1-4771a26377dd.png"
];

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
  homepage: string | null;
  has_readme?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [selectedCategory, setSelectedCategory] = useState<"artwork" | "photos">("photos");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [selectedRepoCommits, setSelectedRepoCommits] = useState<Commit[]>([]);
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);
  const [isCommitsModalOpen, setIsCommitsModalOpen] = useState(false);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const {
    t,
    i18n
  } = useTranslation();
  const {
    toast
  } = useToast();

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([octokit.users.getByUsername({
          username: GITHUB_USERNAME
        }), octokit.repos.listForUser({
          username: GITHUB_USERNAME,
          sort: "updated"
        })]);
        const reposWithReadme = await Promise.all(reposResponse.data.map(async repo => {
          try {
            await octokit.repos.getReadme({
              owner: GITHUB_USERNAME,
              repo: repo.name
            });
            return {
              ...repo,
              has_readme: true
            };
          } catch {
            return {
              ...repo,
              has_readme: false
            };
          }
        }));
        setAvatarUrl(userResponse.data.avatar_url);
        setRepositories(reposWithReadme as Repository[]);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };
    fetchGithubData();
  }, []);

  useEffect(() => {
    const calculateDaysUntilBirthday = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const birthday = new Date(currentYear, 3, 13);
      if (now > birthday) {
        birthday.setFullYear(currentYear + 1);
      }
      const timeDiff = birthday.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysUntilBirthday(daysDiff);
    };
    calculateDaysUntilBirthday();
    const timer = setInterval(calculateDaysUntilBirthday, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  const fetchReadme = async (repoName: string) => {
    try {
      const response = await octokit.repos.getReadme({
        owner: GITHUB_USERNAME,
        repo: repoName,
        mediaType: {
          format: "raw"
        }
      });
      const content = Buffer.from((response.data as any).content, 'base64').toString();
      setReadmeContent(content);
      setSelectedRepo(repoName);
      setIsReadmeModalOpen(true);
    } catch (error) {
      console.error("Error fetching README:", error);
      setReadmeContent("No README available");
      setIsReadmeModalOpen(true);
    }
  };

  const fetchCommits = async (repoName: string) => {
    try {
      const response = await octokit.repos.listCommits({
        owner: GITHUB_USERNAME,
        repo: repoName,
        per_page: 10
      });
      setSelectedRepoCommits(response.data as Commit[]);
      setSelectedRepo(repoName);
      setIsCommitsModalOpen(true);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };

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

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {gameProjects.map(repo => <div key={repo.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors transform hover:scale-105 transition-transform duration-300" onClick={() => {
        if (repo.name === "FurTopia") {
          toast({
            description: t("projects.noContentYet"),
            duration: 3000,
            className: "bg-[#1A1F2C] border-[#221F26] text-purple-light"
          });
        }
      }}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-light transition-colors" onClick={e => {
          if (repo.name === "FurTopia") {
            e.preventDefault();
          }
        }}>
          <h3 className="font-semibold text-white mb-2 animate-fade-in">{repo.name}</h3>
          <p className="text-white/60 text-sm mb-2 animate-fade-in">{repo.description}</p>
        </a>
        {repo.language && <div className="flex items-center gap-2 mb-3 animate-fade-in">
            <Circle size={8} className="text-purple-light" />
            <span className="text-sm text-white/60">{repo.language}</span>
          </div>}
        <div className="flex justify-between items-center">
          {!repo.name.includes("FurTopia") && (
            <button onClick={() => fetchCommits(repo.name)} className="text-sm text-purple hover:text-purple-light transition-colors flex items-center gap-1">
              <Clock size={14} />
              {t("projects.commits")}
            </button>
          )}
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-sm text-purple hover:text-purple-light transition-colors flex items-center gap-1">
              <Link2 size={14} />
              {t("projects.link")}
            </a>
          )}
        </div>
        {repo.name === "FurTopia" && <p className="text-purple-light text-sm mt-2">
            {t("projects.comingSoon")}
          </p>}
      </div>)}
    </div>;
  };

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              {t("about.title")}
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 max-w-3xl">
              <img src="/lovable-uploads/98832de4-7399-438e-8f82-9625067892d8.png" alt="Profile Avatar" className="w-32 h-32 rounded-full border-2 border-purple animate-float" />
              <div className="text-center md:text-left">
                <div className="flex flex-col gap-2 mb-4">
                  <p className="text-lg text-white/80 opacity-0 animate-fade-in" style={{
                  animationDelay: '100ms',
                  animationFillMode: 'forwards'
                }}>
                    {t("about.description")}
                  </p>
                  <div className="text-purple-light text-sm opacity-0 animate-fade-in" style={{
                  animationDelay: '200ms',
                  animationFillMode: 'forwards'
                }}>
                    {daysUntilBirthday === 0 ? t("about.birthday.today") : t("about.birthday.daysLeft", {
                    days: `${daysUntilBirthday} ${daysUntilBirthday === 1 ? t("about.birthday.day") : t("about.birthday.days")}`
                  })}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/80 leading-relaxed opacity-0 animate-fade-in" style={{
                  animationDelay: '300ms',
                  animationFillMode: 'forwards'
                }}>
                    {t("about.bio").split("\n\n")[0]}
                  </p>
                  <div className="opacity-0 animate-fade-in" style={{
                  animationDelay: '400ms',
                  animationFillMode: 'forwards'
                }}>
                    <img src="/lovable-uploads/43cef4b8-3c64-4f7b-a42f-5784dc8c3338.png" alt="Danny Lisitsky Fursona" className="mx-auto max-w-full h-auto rounded-lg border-2 border-purple my-4 transform hover:scale-105 transition-transform duration-300 w-3/4" />
                    <p className="text-center italic text-white/60">
                      {t("about.fursonaRef")}
                    </p>
                  </div>
                  <p className="text-white/80 leading-relaxed opacity-0 animate-fade-in" style={{
                  animationDelay: '500ms',
                  animationFillMode: 'forwards'
                }}>
                    {t("about.bio").split("\n\n")[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>;

      case "art":
        return <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              {t("art.title")}
            </h2>
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setSelectedCategory("photos")}
                className={`px-4 py-2 rounded-md transition-all duration-300 transform active:scale-95 ${
                  selectedCategory === "photos"
                    ? "bg-purple text-white shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-white/80"
                }`}
              >
                {t("art.categories.photos")}
              </button>
              <button
                onClick={() => setSelectedCategory("artwork")}
                className={`px-4 py-2 rounded-md transition-all duration-300 transform active:scale-95 ${
                  selectedCategory === "artwork"
                    ? "bg-purple text-white shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-white/80"
                }`}
              >
                {t("art.categories.artwork")}
              </button>
            </div>
            <div key={selectedCategory} className="columns-1 sm:columns-2 lg:columns-3 gap-2 max-w-6xl">
              {(selectedCategory === "artwork" ? artImages : photoImages).map((image, index) => (
                <div
                  key={`${selectedCategory}-${index}`}
                  onClick={() => setSelectedImage(image)}
                  className="cursor-pointer mb-2 break-inside-avoid opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <img
                    src={image}
                    alt={`${selectedCategory === "artwork" ? "Art" : "Photo"} ${index + 1}`}
                    className="w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>;

      case "projects":
        return <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              {t("projects.title")}
            </h2>
            <div className="w-full max-w-6xl flex flex-col items-center">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-purple hover:bg-purple-light transition-colors rounded-md text-white mb-8 transform hover:scale-105 transition-transform duration-300">
                <Github size={20} />
                {t("projects.githubProfile")}
              </a>
              
              <div className="space-y-8 w-full">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white/90">{t("projects.githubRepos")}</h3>
                  {renderProjects(false)}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-white/90">{t("projects.games")}</h3>
                  {renderProjects(true)}
                </div>
              </div>
            </div>
          </div>;

      case "social":
        return <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              {t("social.title")}
            </h2>
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <a 
                href="https://t.me/FoxDanny" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2AABEE] hover:bg-[#229ED9] transition-all duration-300 rounded-md text-white transform hover:scale-105 opacity-0 animate-fade-in" 
                style={{
                  animationDelay: '100ms',
                  animationFillMode: 'forwards'
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="shrink-0"
                >
                  <path d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4 c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8 C17,6.9,17.4,7.1,17.1,7.4z" />
                  <rect y="0" className="st0" width="24" height="24" style={{ fill: 'none' }} />
                </svg>
                {t("social.telegram")}
              </a>
              
              {i18n.language === "ru" && <a href="https://vk.com/foxdanny" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0077FF] hover:bg-[#0066CC] transition-all duration-300 rounded-md text-white transform hover:scale-105 opacity-0 animate-fade-in" style={{
              animationDelay: '200ms',
              animationFillMode: 'forwards'
            }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.597v1.573c0 .424-.137.678-1.252.678-1.846 0-3.896-1.12-5.339-3.202-2.171-3.057-2.76-5.344-2.76-5.813 0-.254.102-.491.596-.491h1.744c.424 0 .627.187.796.678.881 2.45 2.352 4.8 2.96 4.8.229 0 .339-.102.339-.666V9.66c-.068-1.2-.705-1.302-.705-1.727 0-.204.17-.407.44-.407h2.74c.373 0 .508.187.508.62v3.32c0 .356.153.475.254.475.229 0 .424-.119.847-.543 1.32-1.471 2.418-3.726 2.418-3.726.136-.272.288-.526.728-.526h1.744c.525 0 .644.272.525.62-.204.95-2.206 3.794-2.206 3.794-.17.272-.237.407 0 .712.17.254.745.779 1.123 1.25.78.847 1.387 1.557 1.54 2.048.17.474-.085.712-.576.712z" />
                  </svg>
                  {t("social.vk")}
                </a>}
              <a href="https://discordapp.com/users/663453268784971796" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 rounded-md text-white transform hover:scale-105 opacity-0 animate-fade-in" style={{
              animationDelay: '300ms',
              animationFillMode: 'forwards'
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                {t("social.discord")}
              </a>
              <a href="https://steamcommunity.com/id/ZhuravlevX/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#171a21] hover:bg-[#2a475e] transition-all duration-300 rounded-md text-white transform hover:scale-105 opacity-0 animate-fade-in" style={{
              animationDelay: '400ms',
              animationFillMode: 'forwards'
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.266-1.253 0-2.265-1.014-2.265-2.265z" />
                </svg>
                {t("social.steam")}
              </a>
              <a href="https://open.spotify.com/user/31dgwdgrkyfvvahwrjyx5yjdspey?si=87317b59bc7c4dbb" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] transition-all duration-300 rounded-md text-black transform hover:scale-105 opacity-0 animate-fade-in" style={{
              animationDelay: '500ms',
              animationFillMode: 'forwards'
            }}>
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" />
                </svg>
                Spotify
              </a>
            </div>
          </div>;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-purple-dark text-white overflow-x-hidden flex flex-col">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        {renderSection()}
      </main>
      <footer className={cn(
        "w-full bg-[#0D0D0D]/80 py-4 border-t border-white/10 transition-all duration-700",
        "opacity-0 animate-fade-in"
      )} style={{animationFillMode: 'forwards'}}>
        <div className="container mx-auto px-4">
          <p className="text-center text-white/60 text-sm">
            {t("footer.text")}
          </p>
          <p className="text-center text-white/60 text-sm mt-2">
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      <ImageViewer src={selectedImage || ""} alt="Selected artwork" isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} />
      <Modal isOpen={isReadmeModalOpen} onClose={() => setIsReadmeModalOpen(false)} title={`README - ${selectedRepo}`}>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </div>
      </Modal>
      <Modal isOpen={isCommitsModalOpen} onClose={() => setIsCommitsModalOpen(false)} title={t("projects.commitsModalTitle", {
      repo: selectedRepo
    })}>
        <div className="space-y-4">
          {selectedRepoCommits.map(commit => <div key={commit.sha} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="block hover:text-purple-light transition-colors">
                <p className="text-sm text-white/80 mb-1">{commit.commit.message}</p>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>{commit.commit.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(commit.commit.author.date)}</span>
                </div>
              </a>
            </div>)}
        </div>
      </Modal>
    </div>
  );
};

export default Index;
