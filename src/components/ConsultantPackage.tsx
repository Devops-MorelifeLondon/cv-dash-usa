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
    title: "U.S. Entry Navigator – Starter Consultation",
    duration: "30 minutes (Virtual)",
    price: "USD 59",
    target: "For founders exploring U.S. expansion but unsure of entity type, state of registration, or compliance steps.",
    includes: [
      "Understanding your business model",
      "High-level eligibility check for U.S. entry",
      "Brief on regulatory landscape (IRS, SEC, USCIS basics)",
      "Suggestion of ideal market entry route (LLC, C-Corp, S-Corp, Branch)",
    ],
  },
  {
    icon: <Banknote className="w-8 h-8 text-primary" />,
    title: "Regulatory Readiness Check – Federal & State Focused",
    duration: "60 minutes + Summary Report",
    price: "USD 99",
    target: "For businesses planning foreign direct investment (FDI) and capital movement into the U.S.",
    includes: [
      "Overview of federal vs. state compliance specific to your model",
      "State registration requirements (Delaware, Wyoming, etc.)",
      "EIN, ITIN, and IRS reporting framework",
      "Advisory on capital inflow documentation & banking KYC",
    ],
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Tax and Entity Structuring Advisory",
    duration: "90 minutes + Advisory Memo",
    price: "USD 99",
    target: "For foreign founders needing guidance on tax-efficient U.S. entity setup.",
    includes: [
      "Ideal entity type (LLC, C-Corp, S-Corp, Branch Office)",
      "Basics of U.S. taxation & treaties (DTAA, PE risk, state taxes)",
      "Advice on shareholding, profit repatriation & exit strategies",
      "One free follow-up email consultation",
    ],
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Complete U.S. Entry Planning Workshop",
    duration: "2 hours – Zoom Workshop + Detailed Roadmap (PDF)",
    price: "USD 199",
    target: "For those ready to launch in the U.S. and seeking execution clarity.",
    includes: [
      "Entity structuring & registration roadmap",
      "Tax and compliance overview",
      "Banking, payments & capital movement guidance",
      "Hiring, payroll, and local partner/legal risks",
    ],
  },
];


// 2. Data for Customized Execution Services
const customExecutionServicesData = [
  {
    serviceArea: "Business Registration",
    examples: "State incorporation filings, EIN application, registered agent service"
  },
  {
    serviceArea: "Local Office & Presence",
    examples: "Virtual office setup, co-working/leased office support, compliance address proof"
  },
  {
    serviceArea: "Licenses & Permits",
    examples: "State & federal licenses, industry-specific permits (FDA, DOT, etc.)"
  },
  {
    serviceArea: "Recruitment & HR Setup",
    examples: "Local HR partner sourcing, payroll setup, E-Verify, visa/work permit advisory"
  },
  {
    serviceArea: "Vendor & Supply Chain Onboarding",
    examples: "Ground partner search, due diligence, local contracts"
  },
  {
    serviceArea: "Legal & Taxation Setup",
    examples: "CPA onboarding, tax registration, compliance calendar setup"
  },
  {
    serviceArea: "Banking & Payments",
    examples: "Corporate bank account opening, merchant account setup, payment gateway integration"
  },
  {
    serviceArea: "Operational Compliance",
    examples: "State labor law registrations, OSHA compliance, business insurance setup"
  },
];


// 3. Data for Suggested Bundled Packages
const bundledPackagesData = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Entry Assist",
    price: "Indicative: Starting at $1,500",
    description: "Company incorporation (LLC or C-Corp), basic licenses, local address support, and 1-month compliance handholding.",
    inclusions: [
      "Company incorporation (LLC or C-Corp)",
      "Basic registrations (EIN, state filings, business license)",
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
      "Everything in Entry Assist +",
      "Virtual/Physical Office Setup",
      "Local hiring coordination & payroll setup",
      "HR compliance advisory",
      "Dedicated Relationship Manager (2 months)",
    ],
    cta: "Launch with this Plan",
    featured: true,
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Scale U.S.",
    price: "Custom Quote",
    description: "Tailored solutions for multi-state expansion, industry-specific licensing, advanced tax structuring, and long-term support.",
    inclusions: [
      "Multi-state incorporation & compliance",
      "Industry-specific licensing (e.g., food, logistics, fintech, healthcare)",
      "Advanced tax structuring & audits",
      "Vendor onboarding & supply chain compliance",
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
     Consultation Packages – (U.S. Entry – Paid Advisory)
    </h1>
    <p className="mt-4 text-lg text-muted-foreground">
     Start with an expert-led advisory session to build your strategic roadmap for the U.S.
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Customized Execution (Priced Post-Discovery)
</h2>
            <p className="mt-4 text-lg text-muted-foreground">
             After your consultation, we provide hands-on support to execute your U.S. entry plan.

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
              Get started faster with curated packages for common U.S. entry needs. Prices are indicative.
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
