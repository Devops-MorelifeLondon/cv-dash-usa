import {
  ArrowRight,
  Rocket,
  ClipboardList,
  BarChart3,
  FileText,
  Building,
  BadgeCheck,
  Users,
  Truck,
  Scale,
  Banknote,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data for the pricing packages and services
const discoveryPackages = [
  {
    icon: <Rocket className="w-6 h-6 text-primary" />,
    title: "Starter Discovery Call",
    price: "$99",
    inclusions: [
      "30-minute strategic call",
      "Entry-readiness checklist",
    ],
    cta: "Book a Call",
  },
  {
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    title: "In-depth Consultation",
    price: "$399",
    inclusions: [
      "90-minute strategy session",
      "Custom market-entry roadmap",
      "Initial compliance briefing",
    ],
    cta: "Start Your Plan",
    featured: true,
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary" />,
    title: "Investor & Regulatory Report",
    price: "$749",
    inclusions: [
      "State-wise opportunity deep-dive",
      "Analysis of regulatory barriers",
      "Sector-specific recommendations",
    ],
    cta: "Order Report",
  },
];

const executionServices = [
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    title: "Business Registration",
    example: "State ROC filings, GST, FSSAI, Factory License, MSME/Udyam.",
  },
  {
    icon: <Building className="w-5 h-5 text-primary" />,
    title: "Local Office & Presence",
    example: "Registered office setup, co-working support, address compliance.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5 text-primary" />,
    title: "Licenses & Permits",
    example: "Trade license, import/export code, labor registration, fire/NOC.",
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "Recruitment & HR Setup",
    example: "Local HR partner sourcing, payroll system, EPFO/ESIC registration.",
  },
  {
    icon: <Truck className="w-5 h-5 text-primary" />,
    title: "Vendor & Supply Chain",
    example: "Ground partner search, due diligence, negotiation support.",
  },
  {
    icon: <Scale className="w-5 h-5 text-primary" />,
    title: "Legal & Taxation Setup",
    example: "CA onboarding, tax registration, compliance calendar setup.",
  },
  {
    icon: <Banknote className="w-5 h-5 text-primary" />,
    title: "Banking & Payments",
    example: "Guidance on banks, KYC support, account opening assistance.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "Operational Compliance",
    example: "Shops & Establishment Act, state labor laws, professional tax.",
  },
];

export default function IndiaMarketEntryPricing() {
  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gradient-to-b from-white/95 via-white/80 to-transparent z-20 pb-4 pt-4 px-4 md:px-0 border-b border-border/30 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Pricing Structure: India Market Entry Support
        </h1>
        <p className="text-muted-foreground mt-2">
          Clear, phased pricing to help you launch and scale in the Indian market.
        </p>
      </div>

      {/* Main Responsive 2-column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* ----- LEFT PANEL: DISCOVERY PACKAGES ----- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Badge variant="outline" className="text-lg bg-primary/10 border-primary/20 text-primary">1</Badge>
              Discovery & Consulting
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Start with a strategic foundation. Choose the plan that fits your current needs.</p>
          </div>
          {discoveryPackages.map((pkg, idx) => (
            <Card
              key={idx}
              className={`p-6 flex flex-col gap-4 transition-all duration-300 ${pkg.featured ? "bg-primary text-primary-foreground shadow-lg border-primary" : "bg-zinc-50 border-border"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {pkg.icon}
                    <h3 className="text-lg font-bold">{pkg.title}</h3>
                  </div>
                </div>
                {pkg.featured && (
                  <Badge variant="secondary" className="bg-white text-primary flex items-center gap-1">
                    <Star className="w-3 h-3"/> Popular
                  </Badge>
                )}
              </div>
              <div className="text-3xl font-bold tracking-tight">{pkg.price}</div>
              <ul className={`space-y-2 text-sm ${pkg.featured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                {pkg.inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.featured ? "secondary" : "outline"}
                className="w-full mt-4"
              >
                {pkg.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* ----- RIGHT PANEL: CUSTOMIZED EXECUTION ----- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col">
             <h2 className="text-xl font-bold flex items-center gap-2">
              <Badge variant="outline" className="text-lg bg-primary/10 border-primary/20 text-primary">2</Badge>
              Customized Execution
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Hands-on support tailored to your roadmap. We handle the complexities on the ground.</p>
          </div>
          <Card className="p-6 flex flex-col gap-4 bg-blue-50/40 border-blue-200/50 h-full">
            <Badge className="w-fit bg-blue-100 text-blue-800 border-blue-300">
              Priced Post-Discovery
            </Badge>
            <p className="text-sm text-blue-900/80 mb-4">
              After the initial discovery phase, we provide a custom quote based on the specific services you need to launch successfully.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {executionServices.map((service, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div>{service.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{service.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{service.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
