import {
  Briefcase,
  Scale,
  Banknote,
  Building2,
  Plane,
  ShieldCheck,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data for Post-Consultation Services, organized by category
const serviceCategories = [
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    title: "Business Registration & Licensing",
    services: [
      { name: "Private Ltd / LLC Registration", india: "$499", uae: "$999", usa: "$899" },
      { name: "Trade License / MSME Registration", india: "$149", uae: "$499", usa: "$199" },
      { name: "Import-Export Code (IEC)", india: "$99", uae: "$199", usa: "$149" },
      { name: "MOA/LLP Agreement Drafting", india: "$149", uae: "$349", usa: "$299" },
    ],
  },
  {
    icon: <Scale className="w-6 h-6 text-primary" />,
    title: "Local Legal & Compliance",
    services: [
      { name: "Registered Address Service", india: "$199/year", uae: "$499/year", usa: "$299/year" },
      { name: "Local Nominee Director/Manager", india: "$699/mo", uae: "$999/mo", usa: "$799/mo" },
      { name: "Tax/Regulatory Compliance Setup", india: "$299", uae: "$599", usa: "$499" },
    ],
  },
  {
    icon: <Banknote className="w-6 h-6 text-primary" />,
    title: "Banking & Payments Support",
    services: [
      { name: "Business Bank Account Opening", india: "$249", uae: "$699", usa: "$499" },
      { name: "Payment Gateway Integration", india: "$199", uae: "$499", usa: "$349" },
      { name: "Virtual Bank Account Assistance", india: "$149", uae: "$399", usa: "$299" },
    ],
  },
  {
    icon: <Building2 className="w-6 h-6 text-primary" />,
    title: "Office & Local Presence",
    services: [
      { name: "Virtual Office Setup", india: "$149/mo", uae: "$349/mo", usa: "$299/mo" },
      { name: "Co-working/Physical Office Hunt", india: "$99", uae: "$199", usa: "$149" },
      { name: "Staffing / Local Hiring", india: "Custom", uae: "Custom", usa: "Custom" },
    ],
  },
  {
    icon: <Plane className="w-6 h-6 text-primary" />,
    title: "Relocation & On-Ground Support",
    services: [
      { name: "Visa/Work Permit Assistance", india: "$399", uae: "$999", usa: "$699" },
      { name: "Local SIM, Travel, Transport", india: "$99", uae: "$149", usa: "$129" },
      { name: "Government Liaison/Runner Support", india: "$199", uae: "$349", usa: "$299" },
    ],
  },
];

// Data for Add-on Subscriptions
const addOnPlans = [
  {
    plan: "Basic Support",
    inclusions: "Email support + Documentation library access.",
    price: "$49/month",
    featured: false,
  },
  {
    plan: "Pro Support",
    inclusions: "Priority Support + Monthly Check-in + Local Escalation Assistance.",
    price: "$149/month",
    featured: true,
  },
];

export default function PostConsultationServicesPricing() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Post-Consultation Services</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Select from a-la-carte services to build your custom execution plan. Prices are indicative and will be finalized in a custom quote based on your specific needs.
        </p>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {serviceCategories.map((category, idx) => (
          <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                {category.icon}
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-semibold text-muted-foreground pb-2 pr-2">Service</th>
                      <th className="text-center font-semibold text-muted-foreground pb-2 px-2">India</th>
                      <th className="text-center font-semibold text-muted-foreground pb-2 px-2">UAE</th>
                      <th className="text-center font-semibold text-muted-foreground pb-2 pl-2">USA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.services.map((service, sIdx) => (
                      <tr key={sIdx} className="border-b last:border-none">
                        <td className="py-3 pr-2 font-medium">{service.name}</td>
                        <td className="py-3 px-2 text-center text-muted-foreground">{service.india}</td>
                        <td className="py-3 px-2 text-center text-muted-foreground">{service.uae}</td>
                        <td className="py-3 pl-2 text-center text-muted-foreground">{service.usa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-on Subscription Section */}
      <div className="mt-12">
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary"/>
                Optional Add-on Support
            </h2>
            <p className="text-muted-foreground mt-2">Ensure ongoing success with our monthly support subscriptions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOnPlans.map((plan, idx) => (
                <Card key={idx} className={`flex flex-col p-6 ${plan.featured ? 'border-primary shadow-lg' : 'shadow-sm'}`}>
                    {plan.featured && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground w-fit mb-3 flex items-center gap-1">
                            <Star className="w-3 h-3"/> Recommended
                        </Badge>
                    )}
                    <h3 className="text-lg font-bold">{plan.plan}</h3>
                    <p className="text-muted-foreground text-sm mt-1 flex-grow">{plan.inclusions}</p>
                    <div className="text-2xl font-bold mt-4">{plan.price}</div>
                    <Button variant={plan.featured ? 'default' : 'outline'} className="w-full mt-4">
                        {plan.featured ? 'Choose Pro' : 'Select Basic'}
                    </Button>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
