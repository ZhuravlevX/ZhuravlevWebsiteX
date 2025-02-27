
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ImageViewer = ({ src, alt, onClose, isOpen }: ImageViewerProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md",
        "animate-fade-in"
      )}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-purple-light transition-all duration-300 transform hover:scale-110 hover:rotate-180"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
