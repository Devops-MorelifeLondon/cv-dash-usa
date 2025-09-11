import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageCircle, Star, MapPin, Briefcase, Users } from "lucide-react";

const Advisory = () => {
 const advisors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Business Formation Specialist",
    specialization: "Legal & Compliance",
    location: "Delaware, USA",
    experience: "12+ years",
    rating: 4.8,
    sessions: 189,
    bio: "Corporate attorney specializing in international business formation. Expert in Delaware, Wyoming, and California incorporation strategies.",
    availability: "Available",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Investment & Finance Advisor",
    specialization: "Funding & Growth",
    location: "San Francisco, USA",
    experience: "18+ years",
    rating: 4.7,
    sessions: 312,
    bio: "Former Goldman Sachs analyst and VC partner. Helps companies raise funding and structure financial operations for global expansion.",
    availability: "Available",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    title: "Operations & Logistics Expert",
    specialization: "Supply Chain",
    location: "Texas, USA",
    experience: "14+ years",
    rating: 4.9,
    sessions: 203,
    bio: "Supply chain expert with experience at FedEx and Amazon. Helps companies set up efficient logistics and fulfillment operations across the US.",
    availability: "Available",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "David Miller",
    title: "US Tax & Compliance Advisor",
    specialization: "Tax & Structuring",
    location: "New York, USA",
    experience: "20+ years",
    rating: 4.8,
    sessions: 276,
    bio: "CPA with extensive experience in IRS compliance, federal/state tax filings, and structuring businesses for tax efficiency in the US.",
    availability: "Available",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Emily Davis",
    title: "Digital Marketing & Growth Specialist",
    specialization: "E-commerce & Branding",
    location: "Los Angeles, USA",
    experience: "11+ years",
    rating: 4.9,
    sessions: 167,
    bio: "Former Shopify and Meta strategist. Expert in US e-commerce, paid ads, and scaling direct-to-consumer brands nationwide.",
    availability: "Available",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Robert Williams",
    title: "Technology & SaaS Advisor",
    specialization: "Product & Infrastructure",
    location: "Seattle, USA",
    experience: "13+ years",
    rating: 4.7,
    sessions: 142,
    bio: "Ex-Amazon engineer turned consultant. Specializes in SaaS product development, cloud infrastructure, and scaling tech teams in the US.",
    availability: "Available",
    image: "/placeholder.svg"
  }
];


  return (
    <DashboardLayout>
       <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 p-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Meet Your <span className="text-primary">Advisory Team</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with world-class experts who will guide your global expansion journey with personalized advice and proven strategies.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">50+</div>
            <div className="text-sm text-muted-foreground">Expert Advisors</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">1,200+</div>
            <div className="text-sm text-muted-foreground">Sessions Completed</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Star className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </Card>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {advisors.map((advisor) => (
            <Card 
              key={advisor.id} 
              className="p-6 hover:shadow-card-hover transition-all duration-300 border-border/50 hover:border-primary/30"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={advisor.image} alt={advisor.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-lg font-bold">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-foreground truncate">
                      {advisor.name}
                    </h3>
                    <Badge 
                      className={
                        advisor.availability === "Available" 
                          ? "bg-cv-success text-white" 
                          : "bg-cv-warning text-white"
                      }
                    >
                      {advisor.availability}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-primary mb-1">{advisor.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {advisor.location}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Specialization</span>
                  <span className="font-medium text-foreground">{advisor.specialization}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{advisor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    Rating
                  </div>
                  <span className="font-medium text-foreground">{advisor.rating} ({advisor.sessions} sessions)</span>
                </div>
              </div>

            

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  disabled={advisor.availability !== "Available"}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-card border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Can't Find the Right Advisor?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We have a network of 50+ specialized advisors. Let us match you with the perfect expert based on your specific needs and industry.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Request Custom Match
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Advisory;