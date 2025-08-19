import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // <-- shadcn/ui progress
import {
  ArrowRight,
  Building2,
  Landmark,
  ShoppingCart,
} from "lucide-react";
import { CrossAssistPanel } from "@/components/CroaaAssistPanel"; // Adjust path
import SuccessStories from "./SucessStories";
import CrossAssist from "@/pages/CrossAssist";

export function WelcomeSection() {
  return (
    <div className="space-y-10 p-4 max-w-md lg:max-w-full">
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
            Expand Your Business in India
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="sm"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow"
            >
              Explore Opportunities
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

        {/* Smaller Orbs */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-6 right-12 w-8 h-8 bg-white/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>
        {/* PROGRESS CARDS - compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-green-600">Completed</p>
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            Company Registration
          </p>
          <Progress value={100} className="h-1.5" />
        </Card>

        <Card className="p-4 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <Landmark className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-yellow-500">In Progress</p>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Bank Account</p>
          <Progress value={60} className="h-1.5" />
        </Card>

        <Card className="p-4 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-muted-foreground">
              Not Started
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            eCommerce Onboarding
          </p>
          <Progress value={0} className="h-1.5" />
        </Card>
      </div>

      {/* CrossAssist right after Hero */}
      <div className="mt-4">
        <CrossAssist />
      </div>

    

      {/* Success Stories */}
      <div className="max-w-4xl overflow-hidden mx-auto">
        <SuccessStories />
      </div>
    </div>
  );
}

