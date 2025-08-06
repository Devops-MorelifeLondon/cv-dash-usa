import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Map, 
  Brain, 
  TrendingUp, 
  Video, 
  MessageCircle, 
  ArrowRight,
  Star,
  Target,
  Globe,
  DollarSign
} from "lucide-react";

interface OpportunityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  highlight?: string;
  onClick?: () => void;
}

function OpportunityCard({ title, description, icon, cta, highlight, onClick }: OpportunityCardProps) {
  return (
    <Card className="p-6 h-full hover:shadow-card-hover transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/30" onClick={onClick}>
      <div className="flex flex-col h-full">
        <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
          {description}
        </p>
        
        {highlight && (
          <Badge className="mb-4 w-fit bg-cv-blue-light text-primary border-primary/20">
            {highlight}
          </Badge>
        )}
        
        <Button 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          variant="outline"
        >
          {cta}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}

export function DiscoverOpportunities() {
  const [activeTab, setActiveTab] = useState("india");

  const indiaOpportunities = [
    {
      title: "Explore India's Economic Map",
      description: "Interactive SVG map showing state-wise opportunities, top sectors, available subsidies/incentives, and export potential with detailed tooltip data.",
      icon: <Map className="w-8 h-8" />,
      cta: "Explore State Map",
      highlight: "25+ States Mapped"
    },
    {
      title: "Smart Business Match Quiz",
      description: "Gamified quiz with progress tracking to discover your perfect business model. Get personalized recommendations based on your goals and resources.",
      icon: <Brain className="w-8 h-8" />,
      cta: "Take the Quiz →",
      highlight: "88% Match Rate"
    },
    {
      title: "Top-Selling Indian Exports",
      description: "Discover hot-selling Indian products with profit margin insights, target markets, and sourcing tips. Visual carousel of opportunities.",
      icon: <TrendingUp className="w-8 h-8" />,
      cta: "See Full List",
      highlight: "50+ Products"
    },
    {
      title: "Real Success Stories",
      description: "Watch inspiring video testimonials from entrepreneurs who successfully expanded to India. Learn from their journey and mistakes.",
      icon: <Video className="w-8 h-8" />,
      cta: "Watch Stories",
      highlight: "Real Results"
    },
    {
      title: "Ask CrossAssist India",
      description: "Get instant AI-powered guidance on Indian market entry, licensing, compliance, and growth strategies from our specialized assistant.",
      icon: <MessageCircle className="w-8 h-8" />,
      cta: "Ask Now",
      highlight: "24/7 Available"
    }
  ];

  const usaOpportunities = [
    {
      title: "State-by-State Business Climate",
      description: "Interactive U.S. map showing state taxes, business incentives, R&D credits, and top local industries with comprehensive filtering options.",
      icon: <Map className="w-8 h-8" />,
      cta: "Explore State Map",
      highlight: "50 States Covered"
    },
    {
      title: "U.S. Entry Strategy Quiz",
      description: "Discover the best entry pathway for your business with questions about capital, sector preference, location goals, and time-to-market.",
      icon: <Target className="w-8 h-8" />,
      cta: "Take the Quiz →",
      highlight: "91% Success Rate"
    },
    {
      title: "Hot U.S. Market Products",
      description: "Explore trending products and services in the U.S. market with margin insights, regulatory requirements, and sourcing strategies.",
      icon: <DollarSign className="w-8 h-8" />,
      cta: "See Full List",
      highlight: "High Margins"
    },
    {
      title: "U.S. Success Case Studies",
      description: "Real stories from Indian entrepreneurs who successfully entered the U.S. market, including costs, timelines, and revenue milestones.",
      icon: <Video className="w-8 h-8" />,
      cta: "Watch Their Stories",
      highlight: "Proven Results"
    },
    {
      title: "Ask CrossAssist USA",
      description: "Specialized AI assistant for U.S. market questions about licensing, state regulations, business formation, and compliance requirements.",
      icon: <MessageCircle className="w-8 h-8" />,
      cta: "Ask Now",
      highlight: "Expert Knowledge"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Discover Global <span className="text-primary">Opportunities</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore market opportunities, take smart quizzes, and get AI-powered guidance for your global expansion journey.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger value="india" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇮🇳 India Opportunities
          </TabsTrigger>
          <TabsTrigger value="usa" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇺🇸 USA Opportunities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="india" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indiaOpportunities.map((opportunity, index) => (
              <OpportunityCard key={index} {...opportunity} />
            ))}
          </div>
          
          <Card className="p-8 bg-gradient-card border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Begin Your India Expansion Journey?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get personalized guidance and start your market entry with confidence.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="usa" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usaOpportunities.map((opportunity, index) => (
              <OpportunityCard key={index} {...opportunity} />
            ))}
          </div>
          
          <Card className="p-8 bg-gradient-card border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Enter the World's Biggest Market?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your U.S. expansion with expert guidance and proven strategies.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Progress Tracker */}
      <Card className="p-6 bg-cv-blue-light/30 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Exploration Progress</h3>
            <p className="text-muted-foreground text-sm">Complete activities to unlock personalized recommendations</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary mb-1">60%</div>
            <div className="text-xs text-muted-foreground">3 of 5 completed</div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div className="bg-primary h-2 rounded-full w-3/5 transition-all duration-500"></div>
        </div>
      </Card>
    </div>
  );
}