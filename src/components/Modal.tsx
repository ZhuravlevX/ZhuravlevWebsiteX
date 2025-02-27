
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-purple-dark w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl p-6 transform transition-all duration-300 scale-in animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:text-purple-light transition-all duration-300 transform hover:scale-110 hover:rotate-180"
          >
            <X size={24} />
          </button>
        </div>
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};
