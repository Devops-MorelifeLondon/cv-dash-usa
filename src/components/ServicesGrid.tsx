import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  User, 
  Home, 
  CreditCard, 
  MessageSquare, 
  Search,
  DollarSign,
  FileText,
  Link,
  Plane,
  Users,
  Brain,
  Globe,
  ShoppingCart,
  ArrowRight,
  Heart,
  Bookmark,
  Filter
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  badge?: string;
  isFlipped?: boolean;
  onToggleFlip?: () => void;
}

function ServiceCard({ title, description, icon, cta, badge, isFlipped, onToggleFlip }: ServiceCardProps) {
  return (
    <div className="relative h-64 perspective-1000" onClick={onToggleFlip}>
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <Card className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center backface-hidden border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center text-white mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          {badge && (
            <Badge className="bg-cv-blue-light text-primary border-primary/20">
              {badge}
            </Badge>
          )}
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 p-6 backface-hidden rotate-y-180 border-primary/30 bg-gradient-card">
          <div className="h-full flex flex-col">
            <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
              {description}
            </p>
            <Button size="sm" className="w-full">
              {cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ServicesGrid() {
  const [activeTab, setActiveTab] = useState("india");
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("all");

  const toggleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const indiaServices = [
    {
      id: "india-incorporation",
      title: "Business Incorporation",
      description: "Private Limited, LLP, or OPC — get your Indian entity registered remotely with GST, CIN, and FSSAI compliance included.",
      icon: <Building className="w-8 h-8" />,
      cta: "Start My Incorporation",
      badge: "Most Popular"
    },
    {
      id: "india-director",
      title: "Resident Director Services",
      description: "Don't have a local director? Use our verified RD network to comply with Indian Companies Act requirements.",
      icon: <User className="w-8 h-8" />,
      cta: "Add Resident Director",
      badge: "Required"
    },
    {
      id: "india-address",
      title: "Registered Office Address",
      description: "Get a compliant registered address in major Indian cities with mail forwarding and administrative support.",
      icon: <Home className="w-8 h-8" />,
      cta: "Book Now"
    },
    {
      id: "india-banking",
      title: "Bank Account + Payment Gateway",
      description: "Open accounts with nationalized/private banks. Integrate Razorpay, PayU & Stripe India for seamless payments.",
      icon: <CreditCard className="w-8 h-8" />,
      cta: "Get Started"
    },
    {
      id: "india-consulting",
      title: "Pre-Market Strategy Consulting",
      description: "One-on-one deep-dive sessions to help you validate market entry, products, and go-to-market strategies.",
      icon: <MessageSquare className="w-8 h-8" />,
      cta: "Book My Session"
    },
    {
      id: "india-incentives",
      title: "Government Incentives Research",
      description: "We map central & state schemes relevant to your sector and location — including PLI, Startup India, and more.",
      icon: <Search className="w-8 h-8" />,
      cta: "Find Incentives"
    },
    {
      id: "india-tariff",
      title: "Tariff & Duty Analysis",
      description: "Understand import duties, GST, HSN codes and pricing implications on your product for accurate cost planning.",
      icon: <DollarSign className="w-8 h-8" />,
      cta: "Run Tariff Study"
    },
    {
      id: "india-customs",
      title: "Custom Clearance & Import Advisory",
      description: "Get licensed CHA support for smooth import/export through India's major ports with compliance guidance.",
      icon: <FileText className="w-8 h-8" />,
      cta: "Speak to Customs Advisor"
    },
    {
      id: "india-partners",
      title: "Local Partner & Distribution Matching",
      description: "Find vetted partners, vendors & distributors across Tier-1/2/3 Indian markets to accelerate your growth.",
      icon: <Link className="w-8 h-8" />,
      cta: "Request Matches"
    }
  ];

  const usaServices = [
    {
      id: "usa-entity",
      title: "Entity Formation (LLC/C-Corp/S-Corp)",
      description: "Start your U.S. business in the right state with expert legal and tax structure guidance for optimal benefits.",
      icon: <Building className="w-8 h-8" />,
      cta: "Compare Delaware vs Wyoming vs California",
      badge: "Tax Optimized"
    },
    {
      id: "usa-ein",
      title: "EIN & Tax ID Acquisition",
      description: "We obtain your U.S. Employer Identification Number without you having to fly in, streamlining the process.",
      icon: <FileText className="w-8 h-8" />,
      cta: "Get your EIN in One Day"
    },
    {
      id: "usa-agent",
      title: "Registered Agent & Office Address",
      description: "Fulfill compliance by assigning a registered agent and U.S. business address as required by law and Google.",
      icon: <Home className="w-8 h-8" />,
      cta: "Required by law & Google verification"
    },
    {
      id: "usa-banking",
      title: "Bank Account + Payment Gateway Setup",
      description: "Get U.S. bank account and Stripe/PayPal/Authorize.net access through verified networks. No SSN required.",
      icon: <CreditCard className="w-8 h-8" />,
      cta: "No SSN? We handle it for non-residents",
      badge: "Non-Resident Friendly"
    },
    {
      id: "usa-licenses",
      title: "Business Licenses & Permits",
      description: "We navigate local/state licensing needs based on your product/service to avoid shutdowns from missing compliance.",
      icon: <FileText className="w-8 h-8" />,
      cta: "Avoid shutdowns from missing compliance!"
    },
    {
      id: "usa-warehouse",
      title: "Warehouse, Fulfillment & 3PL",
      description: "Connect with U.S. warehouse/fulfillment partners near your target markets for eCom, Amazon FBA, and D2C brands.",
      icon: <Globe className="w-8 h-8" />,
      cta: "For eCom, Amazon FBA, and D2C brands"
    },
    {
      id: "usa-tax",
      title: "U.S. Tax Filings & Compliance",
      description: "Monthly bookkeeping + annual tax filings with CrossVentura Certified Partners including 1099s, franchise taxes.",
      icon: <DollarSign className="w-8 h-8" />,
      cta: "Includes 1099s, franchise taxes & sales tax"
    },
    {
      id: "usa-director",
      title: "Resident Director/Signatory Support",
      description: "We provide local signatories or directors to fulfill legal/tax mandates for certain banks, permits, or visas.",
      icon: <User className="w-8 h-8" />,
      cta: "For banks, permits, or expansion visas"
    },
    {
      id: "usa-customs",
      title: "Customs & Trade Compliance",
      description: "Ensure your product enters the U.S. legally, affordably, and fast with tariff study and HTS code classification.",
      icon: <Plane className="w-8 h-8" />,
      cta: "Tariff study, HTS codes, broker guidance"
    },
    {
      id: "usa-visa",
      title: "Business Visas & Global Mobility",
      description: "Access U.S. EB-5 or L1 visa assistance via our partner attorneys for founders and key personnel travel.",
      icon: <Plane className="w-8 h-8" />,
      cta: "For founders, sales, or logistics travel"
    },
    {
      id: "usa-hiring",
      title: "Local Hiring & HR Advisory",
      description: "Source vetted local employees and navigate U.S. employment laws with job board marketing and payroll setup.",
      icon: <Users className="w-8 h-8" />,
      cta: "Includes job board marketing and payroll"
    },
    {
      id: "usa-consulting",
      title: "Pre-Entry Consulting & Feasibility",
      description: "Strategic insights on entry pathways, margins & product demand including competitor scan and unit economics.",
      icon: <Brain className="w-8 h-8" />,
      cta: "Includes competitor scan + unit economics"
    },
    {
      id: "usa-ecom",
      title: "Amazon USA / eCom Setup",
      description: "Launch on Amazon, Walmart, Etsy with end-to-end onboarding from listings to warehousing to logistics.",
      icon: <ShoppingCart className="w-8 h-8" />,
      cta: "From listings to warehousing to logistics",
      badge: "Complete Solution"
    }
  ];

  const filters = [
    { id: "all", label: "All Services" },
    { id: "popular", label: "Most Popular" },
    { id: "fastest", label: "Fastest Setup" },
    { id: "required", label: "Most Needed" }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Our <span className="text-primary">Services</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive support for your global expansion. Click any service card to learn more.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
          <TabsTrigger value="india" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇮🇳 India Services
          </TabsTrigger>
          <TabsTrigger value="usa" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🇺🇸 USA Services
          </TabsTrigger>
        </TabsList>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground mr-2 mt-2" />
          {filters.map((filterOption) => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.id)}
              className="h-8"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        <TabsContent value="india" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indiaServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                isFlipped={flippedCards.has(service.id)}
                onToggleFlip={() => toggleCardFlip(service.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usa" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usaServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                isFlipped={flippedCards.has(service.id)}
                onToggleFlip={() => toggleCardFlip(service.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Smart Enhancements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">Build My Kit</h3>
          <p className="text-sm text-muted-foreground mb-4">Bundle 4+ services to unlock discounts & personal advisor</p>
          <Button variant="outline" size="sm">Start Building</Button>
        </Card>

        <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
          <Bookmark className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">Progress Tracker</h3>
          <p className="text-sm text-muted-foreground mb-4">Track services explored and saved for later</p>
          <Button variant="outline" size="sm">View Progress</Button>
        </Card>

        <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
          <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">Auto Estimator</h3>
          <p className="text-sm text-muted-foreground mb-4">Calculate pricing of bundled services instantly</p>
          <Button variant="outline" size="sm">Get Estimate</Button>
        </Card>
      </div>
    </div>
  );
}