import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  MapPin,
  Users,
  CreditCard,
  Scale,
  Truck,
  Phone,
  MessageCircle,
  FolderLock,
  Building2
} from "lucide-react";
import USAExpansionServicesGrid from "@/components/extra/USAExpansionServicesGrid";


const serviceCategories = [
  {
    key: "entity",
    name: "Entity Setup & Registration",
    description:
      "Business structure guidance (LLC, C-Corp, S-Corp, Branch Office), company registration, EIN/Tax IDs, and state-level filings.",
    icon: <Building className="w-6 h-6" />,
  },
  {
    key: "incentives",
    name: "Government Incentives & Grants",
    description:
      "Explore and apply for federal and state-level programs, tax credits, and grants available to new and foreign businesses.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    key: "address",
    name: "Local Address & Office Setup",
    description:
      "Virtual business address, registered agent services, co-working or leased office space, and mail forwarding solutions.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    key: "hiring",
    name: "Hiring & HR Support",
    description:
      "Employer registration (EIN, E-Verify), payroll setup, HR compliance, talent recruitment, and visa/work permit advisory.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    key: "banking",
    name: "Banking & Financial Setup",
    description:
      "Assistance with U.S. corporate bank accounts, payment gateways, merchant accounts, and international transaction management.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    key: "legal",
    name: "Legal & Compliance Support",
    description:
      "Contract drafting & review, state and federal compliance filings, annual reports, business licenses, and ongoing legal counsel access.",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    key: "logistics",
    name: "Infrastructure & Logistics",
    description:
      "Warehouse & distribution setup, 3PL partnerships, customs clearance, import/export licensing, and site selection for operations.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    key: "concierge",
    name: "Concierge & Local Liaisons",
    description:
      "U.S. phone number setup, representative services, notary support, and in-person coordination with state/federal offices.",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    key: "expert",
    name: "Talk to a Local Expert",
    description:
      "On-demand support from advisors with deep knowledge of the U.S. business ecosystem.",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    key: "vault",
    name: "Document Vault",
    description:
      "Securely store all your U.S. business documents in one place.",
    icon: <FolderLock className="w-6 h-6" />,
  },
];


const Support = () => {
  return (
    <DashboardLayout>
       <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 p-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Operational Support –{" "}
            <span className="text-primary">Your Local Business Backbone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            End-to-end assistance for every step of your global expansion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => (
            <Card
              key={cat.key}
              className="flex flex-col h-full justify-between p-6 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4 text-primary">
                {cat.icon}
                <h3 className="text-base font-semibold text-foreground">
                  {cat.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {cat.description}
              </p>
              <Button variant="outline" className="w-full">
                Request Support
              </Button>
            </Card>
          ))}
        </div>
        <USAExpansionServicesGrid/>
      </div>
    </DashboardLayout>
  );
};

export default Support;
