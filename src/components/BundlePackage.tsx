import {
  Rocket,
  ShieldCheck,
  TrendingUp,
  Compass,
  Banknote,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data for Suggested Bundled Packages
const bundledPackages = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Entry Assist",
    price: "Starting at $1,500",
    description: "Ideal for getting your basic legal and compliance framework in place quickly.",
    inclusions: [
      "Company Incorporation (Pvt Ltd or LLP)",
      "Basic licenses (GST, MSME, Import/Export)",
      "Local registered office support",
      "1-month compliance handholding",
    ],
    cta: "Choose Entry Assist",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Operational Launchpad",
    price: "Starting at $3,500",
    description: "A comprehensive package to go from registration to a fully operational setup.",
    inclusions: [
      "All of Entry Assist",
      "Physical/Virtual Office Setup",
      "Local hiring coordination",
      "Payroll + HR compliance setup",
      "Dedicated Relationship Manager (2 months)",
    ],
    cta: "Launch with this Plan",
    featured: true,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Scale India",
    price: "Custom Quote",
    description: "For complex, multi-state, or industry-specific expansion needs.",
    inclusions: [
      "Multi-state setup & licensing",
      "Industry-specific compliance (food, manufacturing)",
      "Advanced tax structuring & audits",
      "Vendor onboarding & due diligence",
      "Continued operational support (3–6 months)",
    ],
    cta: "Request a Custom Quote",
  },
];

// Data for Consultation Packages
const consultationPackages = [
  {
    icon: <Compass className="w-6 h-6 text-primary" />,
    title: "India Entry Navigator",
    duration: "30 minutes (Virtual)",
    target: "Founders exploring India but unsure of the path.",
    includes: [
      "High-level eligibility check",
      "Brief on regulatory landscape (FEMA, RBI)",
      "Suggestion of ideal market entry route",
    ],
  },
  {
    icon: <Banknote className="w-6 h-6 text-primary" />,
    title: "Regulatory Readiness Check",
    duration: "60 minutes + Summary Report",
    target: "Businesses planning FDI and capital movement.",
    includes: [
      "FEMA compliance overview for your model",
      "Sector-specific FDI limits and rules",
      "RBI reporting framework (FC-GPR, FC-TRS)",
      "Advisory on capital inflow documentation",
    ],
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Tax & Entity Structuring Advisory",
    duration: "90 minutes + Advisory Memo",
    target: "Founders needing a tax-efficient setup.",
    includes: [
      "Ideal entity type recommendation (Pvt Ltd, LLP, etc.)",
      "Cross-border taxation basics (DTAA, PE Risk)",
      "Advice on shareholding & repatriation",
      "One free follow-up email consultation",
    ],
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Complete India Entry Workshop",
    duration: "2 hours Workshop + Detailed Roadmap",
    target: "Teams ready to execute their India entry.",
    includes: [
      "End-to-end entity structuring",
      "Tax and compliance deep-dive",
      "Capital movement & banking strategy",
      "Hiring, payroll, and local partner risks",
    ],
  },
];

export default function IndiaEntryPackages() {
  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      {/* Bundled Packages Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Suggested Bundled Packages</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Get started faster with our curated packages for common entry needs. Prices are indicative.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {bundledPackages.map((pkg, idx) => (
            <Card
              key={idx}
              className={`flex flex-col h-full transition-all duration-300 ${pkg.featured ? "bg-primary text-primary-foreground shadow-xl -translate-y-2" : "bg-zinc-50 shadow-md"}`}
            >
              <CardHeader className="items-center text-center">
                {pkg.icon}
                <CardTitle className="text-xl mt-2">{pkg.title}</CardTitle>
                <p className={`text-lg font-bold ${pkg.featured ? 'text-white' : 'text-primary'}`}>{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className={`text-sm text-center mb-6 ${pkg.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{pkg.description}</p>
                <ul className="space-y-3 flex-grow">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 ${pkg.featured ? 'text-white' : 'text-green-500'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={pkg.featured ? "secondary" : "default"} className="w-full mt-6">
                  {pkg.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Consultation Packages Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Paid Advisory & Consultation Packages</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Deep-dive into specific challenges with our expert-led advisory sessions, tailored for foreign founders.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultationPackages.map((consult, idx) => (
            <Card key={idx} className="bg-slate-50/70 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                    {consult.icon}
                    <CardTitle>{consult.title}</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit mt-2 bg-white">{consult.duration}</Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-semibold text-sm text-primary">Who it's for:</p>
                  <p className="text-sm text-muted-foreground">{consult.target}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">Includes:</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {consult.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
