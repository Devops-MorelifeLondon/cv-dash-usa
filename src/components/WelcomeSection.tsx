import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Globe, Users, Zap } from "lucide-react";

export function WelcomeSection() {
  return (
    <div className="space-y-8 p-6">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Welcome Back
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Expand
            <br />
            <span className="text-primary-light">Globally?</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Your gateway to India and USA markets. Get personalized guidance, track your progress, and launch your global expansion with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
             className="bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-20 w-12 h-12 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-5 w-8 h-8 bg-white/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Setup Progress</p>
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
              <p className="text-sm text-muted-foreground">Avg. Response</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Quick Start Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-card transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              🇮🇳
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Explore India Market</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Discover state-wise opportunities, find your business match, and explore top-selling products.
            </p>
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-card transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              🇺🇸
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Enter USA Market</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Navigate state business climates, understand regulations, and find the perfect entry strategy.
            </p>
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
              Explore Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 border border-border/50 rounded-lg hover:border-primary/50 hover:shadow-card transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Ask CrossAssist</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get instant AI-powered guidance on licensing, compliance, and market entry strategies.
            </p>
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
              Chat Now <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}