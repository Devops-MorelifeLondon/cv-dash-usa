import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store"; // Ensure this matches your store file location

// Page Imports
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import Badges from "./pages/Badges";
import Advisory from "./pages/Advisory";
import Support from "./pages/Support"; // This is where your new ServicesHub/Wizard lives
import Resources from "./pages/Resources";
import CrossAssist from "./pages/CrossAssist";
import NotFound from "./pages/NotFound";
import PricingLayout from "./pages/PricingLayout";
import PostLayout from "./pages/PostConsLayout";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  /* 1. Provide the Redux Store to the entire app */
  <Provider store={store}>
    {/* 2. Delay rendering until the persisted state is retrieved */}
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Global UI Components */}
          <Toaster />
          <Sonner />
          
          {/* Routing */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Service & Feature Routes */}
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/advisory" element={<Advisory />} />
              <Route path="/support" element={<Support />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/crossassist" element={<CrossAssist />} />
              
              {/* Layout Routes */}
              <Route path="/pricing" element={<PricingLayout />} />
              <Route path="/post-consultation" element={<PostLayout />} />
              
              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;