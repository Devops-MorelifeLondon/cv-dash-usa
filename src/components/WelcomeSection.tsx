// src/components/WelcomeSection.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import CrossAssist from "@/pages/CrossAssist";
import SuccessStories from "./SucessStories";

export function WelcomeSection() {
  return (
    <div className="w-full">
      {/* Centered, max-width content */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 p-4 space-y-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-6 md:p-8 text-white">
          <div className="relative z-10">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 mb-3"
            >
              Welcome Back
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Expand Your Business in USA
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="sm"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow"
              >
                Discover Opportunities
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-blue-500 font-semibold shadow"
              >
                🚀 FastTrack My Setup
              </Button>
            </div>
          </div>
          {/* Orbs */}
          <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
          <div
            className="absolute bottom-6 right-12 w-8 h-8 bg-white/20 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* CrossAssist Section */}
        <div className="mt-8">
          <CrossAssist />
        </div>
      </div>

      {/* Full-width Success Stories section */}
      <div className="mt-8">
        <SuccessStories />
      </div>
    </div>
  );
}
