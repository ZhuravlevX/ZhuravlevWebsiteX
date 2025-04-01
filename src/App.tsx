import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { isBirthday } from "@/utils/dateUtils";

const queryClient = new QueryClient();

const getBackgroundClass = () => {
    return isBirthday() ? 'bg-[#2c1a21]' : 'bg-purple-dark';
};

const changeFavicon = () => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = isBirthday() ? '/public/favicon_hb.ico' : '/public/favicon.ico';
    }
};

const App = () => {
    useEffect(() => {
        changeFavicon();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <div className={getBackgroundClass()}>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;