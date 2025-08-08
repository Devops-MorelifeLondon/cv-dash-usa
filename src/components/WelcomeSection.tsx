import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Globe, Users, Zap } from "lucide-react";
import { CrossAssistPanel } from "@/components/CroaaAssistPanel"; // Adjust path as needed
import SuccessStories from "./SucessStories";
import CrossAssist from "@/pages/CrossAssist";


export function WelcomeSection() {
  return (
    <div className="space-y-8 p-6">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              Welcome Back
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Expand Your Business  
            <br />
            <span className="text-white">Across Borders</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Seamlessly launch and scale in the India and USA markets.  
            Get tailored advice, real-time insights, and hands-on support as you grow your global vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold"
              // TODO: Add your onClick or href here
            >
              Explore Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white/10 font-semibold"
              // TODO: Add your onClick or href here
            >
              Fast Track my Set up
            </Button>
          </div>
        </div>
        {/* Floating Orbs + Visuals */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-10 right-20 w-12 h-12 bg-white/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-5 w-8 h-8 bg-white/15 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Profile Completion</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Active Markets</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Expert Advisors</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">24h</p>
              <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            </div>
          </div>
        </Card>
      </div>

     

      {/* CrossAssistPanel, always present */}
      <div className="mt-10">
        <CrossAssist />
      </div>

      <div className="max-w-4xl overflow-hidden mx-auto">
        <SuccessStories />
      </div>
    </div>
  );
}
