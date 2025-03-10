
import { format } from "date-fns";

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM d, yyyy');
};

export const calculateDaysUntilBirthday = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const birthday = new Date(currentYear, 3, 13); // April 13th (month is 0-indexed)
  
  if (now > birthday) {
    birthday.setFullYear(currentYear + 1);
  }
  
  const timeDiff = birthday.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return daysDiff;
};

export const clearGalleryLoadedState = () => {
  localStorage.removeItem('galleryLoaded');
};
