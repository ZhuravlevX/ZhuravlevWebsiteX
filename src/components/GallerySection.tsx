
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { artImages, photoImages, type GalleryImage } from "@/data/galleryData";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isBirthday } from "@/utils/dateUtils.ts";

interface GallerySectionProps {
  onImageSelect: (image: string) => void;
}

export const GallerySection = ({ onImageSelect }: GallerySectionProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<"artwork" | "photos">("photos");
  const [showGallery, setShowGallery] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load gallery state from localStorage on mount
  useEffect(() => {
    const galleryLoaded = localStorage.getItem('galleryLoaded');
    if (galleryLoaded === 'true') {
      setShowGallery(true);
    }
  }, []);

  const handleLoadImages = () => {
    setShowGallery(true);
    // Store gallery loaded state in localStorage
    localStorage.setItem('galleryLoaded', 'true');
  };

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      <h2 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${isBirthday() ? 'from-pink-300 via-pink-400 to-pink-200' : 'from-purple-light via-purple to-purple-light'} bg-clip-text text-transparent bg-[length:300%] animate-[gradientFlow_3s_ease_infinite]`}>
        {t("art.title")}
      </h2>
      
      {/* Category buttons always visible */}
      <div className="flex gap-4 mb-8 animate-fadeIn">
        <button
          onClick={() => setSelectedCategory("photos")}
          className={cn(
            "px-4 py-2 rounded-md transition-all duration-500 transform active:scale-95",
            selectedCategory === "photos"
                ? `bg-gradient-to-r ${isBirthday() ? 'from-pink-400 to-pink-200' : 'from-purple to-purple-light'} text-white shadow-lg shadow-purple/20`
              : "bg-white/5 hover:bg-white/10 text-white/80 hover:shadow-md hover:shadow-purple/10"
          )}
        >
          {t("art.categories.photos")}
        </button>

        <button
            onClick={() => setSelectedCategory("artwork")}
            className={cn(
                "px-4 py-2 rounded-md transition-all duration-500 transform active:scale-95",
                selectedCategory === "artwork"
                    ? `bg-gradient-to-r ${isBirthday() ? 'from-pink-400 to-pink-200' : 'from-purple to-purple-light'} text-white shadow-lg shadow-purple/20`
                    : "bg-white/5 hover:bg-white/10 text-white/80 hover:shadow-md hover:shadow-purple/10"
            )}
        >
          {t("art.categories.artwork")}
        </button>
      </div>
      
      {!showGallery ? (
        <div className="max-w-xl bg-purple-light/10 border border-purple-light/20 rounded-lg p-6 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4 text-yellow-400">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="font-semibold text-lg">{t("art.warning.title")}</h3>
          </div>
          <p className="text-white/80 mb-6">
            {t("art.warning.message")}
          </p>
          <Button 
            onClick={handleLoadImages}
            className={`w-full bg-gradient-to-r ${isBirthday() ? 'from-pink-500 to-pink-200' : 'from-purple to-purple-light'} hover:border-opacity-90 transition-opacity`}
          >
            {t("art.warning.loadButton")}
          </Button>
        </div>
      ) : (
        <div 
          key={selectedCategory} 
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 max-w-6xl"
        >
          {(selectedCategory === "artwork" ? artImages : photoImages).map((image, index) => (
            <div
              key={`${selectedCategory}-${index}`}
              onClick={() => onImageSelect(image.src)}
              className={cn(
                "cursor-pointer mb-3 break-inside-avoid opacity-0",
                "relative group overflow-hidden rounded-lg"
              )}
              style={{
                animationName: "fadeInScale",
                animationDuration: "0.7s",
                animationTimingFunction: "ease-out",
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards"
              }}
            >
              <img
                src={image.src}
                alt={`${selectedCategory === "artwork" ? "Art" : "Photo"} ${index + 1}`}
                className="w-full object-cover rounded-lg transition-all duration-700 group-hover:scale-110 filter hover:brightness-110"
                loading="lazy"
              />
              
              {image.isNew && (
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-md 
                  ${isBirthday() 
                    ? 'bg-gradient-to-r from-pink-500 to-pink-200' 
                    : 'bg-gradient-to-r from-purple to-purple-light'} 
                  shadow-lg backdrop-blur-sm border border-white/20`}>
                  {t("art.newBadge.label")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
