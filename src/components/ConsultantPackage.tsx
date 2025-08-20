import {
  Rocket,
  ShieldCheck,
  TrendingUp,
  Compass,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- DATA ---

// 1. Data for Consultation Packages
const consultationPackagesData = [
  {
    icon: <Compass className="w-8 h-8 text-primary" />,
    title: "India Entry Navigator – Starter Consultation",
    duration: "30 minutes (Virtual)",
    price: "USD 59",
    target: "Founders exploring expansion but unsure of entity type, capital route, or structure.",
    includes: [
      "Understanding your business model",
      "High-level eligibility check for Indian entry",
      "Brief on regulatory landscape (FEMA, RBI, DPIIT)",
      "Suggestion of ideal market entry route (liaison, branch, WOS, JV)",
    ],
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Regulatory Readiness Check – FEMA Focused",
    duration: "60 minutes + Summary Report",
    price: "USD 99",
    target: "Businesses planning FDI and capital movement into India.",
    includes: [
      "FEMA compliance overview specific to your model",
      "Sector-specific caps (FDI limits, automatic vs approval route)",
      "RBI reporting framework (FC-GPR, FC-TRS)",
      "Advisory on capital inflow documentation",
    ],
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Tax and Entity Structuring Advisory",
    duration: "90 minutes + Advisory Memo",
    price: "USD 99",
    target: "Foreign founders needing help with tax-efficient India entity setup.",
    includes: [
      "Ideal entity type (Pvt Ltd, LLP, Branch, etc.)",
      "Cross-border taxation basics (DTAA, PE Risk)",
      "Advice on shareholding, repatriation & exit options",
      "One free follow-up email consultation",
    ],
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Complete India Entry Planning Workshop",
    duration: "2 hours – Zoom Workshop + Detailed Roadmap (PDF)",
    price: "USD 199",
    target: "Those ready to enter India and need execution clarity.",
    includes: [
      "Entity structuring",
      "Tax and compliance overview",
      "Capital movement, banking, RBI/FEMA requirements",
      "Hiring, payroll, and local partner risks",
    ],
  },
];

// 2. Data for Customized Execution Services
const customExecutionServicesData = [
  { serviceArea: "Business Registration", examples: "State ROC filings, GST, FSSAI, Factory License, MSME/Udyam registration" },
  { serviceArea: "Local Office & Presence", examples: "Registered office setup, co-working space support, address compliance" },
  { serviceArea: "Licenses & Permits", examples: "Trade license, import/export code, labor registration, fire/NOC, pollution board clearance" },
  { serviceArea: "Recruitment & HR Setup", examples: "Local HR partner sourcing, payroll system, EPFO/ESIC registration" },
  { serviceArea: "Vendor & Supply Chain Onboarding", examples: "Ground partner search, due diligence, negotiation support" },
  { serviceArea: "Legal & Taxation Setup", examples: "Chartered Accountant onboarding, tax registration, compliance calendar setup" },
  { serviceArea: "Banking & Payments", examples: "Guidance on nationalized/private banks, KYC support, account opening assistance" },
  { serviceArea: "Operational Compliance", examples: "Shops & Establishment Act, state labor laws, professional tax setup" },
];

// 3. Data for Suggested Bundled Packages
const bundledPackagesData = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Entry Assist",
    price: "Indicative: Starting at $1,500",
    description: "Company Incorporation (Pvt Ltd or LLP), basic licenses, local office support, and 1-month compliance handholding.",
    inclusions: [
      "Company Incorporation (Pvt Ltd or LLP)",
      "Basic licenses (GST, MSME, Import/Export)",
      "Local registered office support",
      "1-month compliance handholding",
    ],
    cta: "Get Started with Entry Assist",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Operational Launchpad",
    price: "Indicative: Starting at $3,500",
    description: "All of Entry Assist plus office setup, hiring coordination, payroll, and a dedicated Relationship Manager.",
    inclusions: [
      "All of Entry Assist +",
      "Physical/Virtual Office Setup",
      "Local hiring coordination",
      "Payroll + HR compliance",
      "Dedicated Relationship Manager (2 months)",
    ],
    cta: "Launch with this Plan",
    featured: true,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Scale India",
    price: "Custom Quote",
    description: "Custom solutions for multi-state setup, industry-specific licensing, tax structuring, and more.",
    inclusions: [
      "Multi-state setup",
      "Industry-specific licensing (e.g., food, manufacturing, logistics)",
      "Tax structuring & audits",
      "Vendor onboarding",
      "Continued operational support (3–6 months retainer)",
    ],
    cta: "Request a Custom Quote",
  },
];


// --- COMPONENT ---

export default function IndiaEntryPricingPage() {
  return (
    <div className="bg-white antialiased">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24 space-y-16 md:space-y-24">
        {/* Section 1: Consultation Packages */}
       {/* Section 1: Consultation Packages */}
<section>
  <div className="text-center max-w-3xl mx-auto mb-10">
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
      Consultation Packages - (India Entry – Paid Advisory)
    </h1>
    <p className="mt-4 text-lg text-muted-foreground">
      Start with an expert-led advisory session to build your strategic roadmap for India.
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
    {consultationPackagesData.map((pkg, idx) => (
      <Card
        key={idx}
        className={`flex flex-col h-full transition-all duration-300 bg-white hover:shadow-xl`}
      >
        <CardHeader className="items-center text-center">
          {pkg.icon}
          <CardTitle className="text-xl mt-4">{pkg.title}</CardTitle>
          <div className="mt-2 flex flex-col gap-2 items-center">
            <Badge variant="outline" className="bg-white">
              {pkg.duration}
            </Badge>
            <p className="text-lg font-bold text-primary">{pkg.price}</p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col flex-grow">
          <p className="text-center mb-6 text-muted-foreground">{pkg.target}</p>
          <ul className="space-y-3 flex-grow text-sm">
            {pkg.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button className="w-full">
            Book Consultation <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
</section>


        {/* Section 2: Customized Execution */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Customized Execution (Priced Post-Discovery)</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              After your consultation, we provide hands-on support to execute your India entry plan.
            </p>
          </div>
          <Card className="max-w-6xl mx-auto overflow-hidden">
             <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-1/3 bg-zinc-50 text-base">Service Area</TableHead>
                        <TableHead className="bg-zinc-50 text-base">Examples of Support</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customExecutionServicesData.map((service) => (
                        <TableRow key={service.serviceArea}>
                            <TableCell className="font-medium">{service.serviceArea}</TableCell>
                            <TableCell className="text-muted-foreground">{service.examples}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </CardContent>
             <CardFooter className="bg-zinc-50 p-6">
                <div>
                    <h3 className="font-bold">Pricing: Post-consultation custom quote based on:</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground list-disc list-inside">
                        <li>State(s) involved</li>
                        <li>Sector complexity</li>
                        <li>Type of entity</li>
                        <li>Required turnaround time</li>
                    </ul>
                </div>
             </CardFooter>
          </Card>
        </section>

        {/* Section 3: Suggested Bundled Packages */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Suggested Bundled Packages (Post-Consult)</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started faster with curated packages for common entry needs. Prices are indicative.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {bundledPackagesData.map((pkg, idx) => (
              <Card
                key={idx}
                className={`flex flex-col h-full transition-all duration-300 ${pkg.featured ? "bg-primary text-primary-foreground shadow-2xl scale-105" : "bg-zinc-50 shadow-lg"}`}
              >
                <CardHeader className="items-center text-center">
                  {pkg.icon}
                  <CardTitle className="text-2xl mt-4">{pkg.title}</CardTitle>
                  <p className={`text-xl font-bold ${pkg.featured ? 'text-white' : 'text-primary'}`}>{pkg.price}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className={`text-center mb-6 ${pkg.featured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{pkg.description}</p>
                  <ul className="space-y-3 flex-grow text-sm">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pkg.featured ? 'text-white' : 'text-green-500'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Button variant={pkg.featured ? "secondary" : "default"} className="w-full">
                        {pkg.cta} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
