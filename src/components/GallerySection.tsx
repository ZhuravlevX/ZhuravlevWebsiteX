
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { artImages, photoImages } from "@/data/galleryData";

interface GallerySectionProps {
  onImageSelect: (image: string) => void;
}

export const GallerySection = ({ onImageSelect }: GallerySectionProps) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<"artwork" | "photos">("photos");
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-light via-purple to-purple-light bg-clip-text text-transparent bg-[length:300%] animate-[gradientFlow_3s_ease_infinite]">
        {t("art.title")}
      </h2>
      
      <div className="flex gap-4 mb-8 opacity-0 animate-[fadeInDown_0.5s_ease-out_0.2s_forwards]">
        <button
          onClick={() => setSelectedCategory("photos")}
          className={cn(
            "px-4 py-2 rounded-md transition-all duration-500 transform active:scale-95",
            selectedCategory === "photos"
              ? "bg-gradient-to-r from-purple to-purple-light text-white shadow-lg shadow-purple/20"
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
              ? "bg-gradient-to-r from-purple to-purple-light text-white shadow-lg shadow-purple/20"
              : "bg-white/5 hover:bg-white/10 text-white/80 hover:shadow-md hover:shadow-purple/10"
          )}
        >
          {t("art.categories.artwork")}
        </button>
      </div>
      
      <div 
        key={selectedCategory} 
        className="columns-1 sm:columns-2 lg:columns-3 gap-3 max-w-6xl"
      >
        {(selectedCategory === "artwork" ? artImages : photoImages).map((image, index) => (
          <div
            key={`${selectedCategory}-${index}`}
            onClick={() => onImageSelect(image)}
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
              src={image}
              alt={`${selectedCategory === "artwork" ? "Art" : "Photo"} ${index + 1}`}
              className="w-full object-cover rounded-lg transition-all duration-700 group-hover:scale-110 filter hover:brightness-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
