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

const serviceCategories = [
  {
    key: "entity",
    name: "Entity Setup & Registration",
    description:
      "Business structure guidance (LLC, Pvt Ltd, Branch Office), company registration, local licensing & tax IDs, and government approvals.",
    icon: <Building className="w-6 h-6" />,
  },
  {
    key: "entity",
    name: "Government Incentives & Schemes",
    description:
      "Discover and apply for benefits available to foreign investors",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    key: "address",
    name: "Local Address & Office Setup",
    description:
      "Virtual office, physical co-working / leased office, registered agent services, and address proof documentation.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    key: "hiring",
    name: "Hiring & HR Support",
    description:
      "Employer registration (ESI, PF, WPS), talent sourcing, payroll setup, and visa/work permit advisory.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    key: "banking",
    name: "Banking & Financial Setup",
    description:
      "Corporate bank account assistance, payment gateway integration, merchant account setup, and forex account management.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    key: "legal",
    name: "Legal & Compliance Support",
    description:
      "Local contracts review, statutory filings, ongoing compliance calendar, and legal translator/local counsel access.",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    key: "logistics",
    name: "Infrastructure & Logistics",
    description:
      "Warehouse and supply chain setup, customs brokerage assistance, import/export licensing, and manufacturing site scouting.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    key: "concierge",
    name: "Concierge & Local Liaisons",
    description:
      "Local phone number setup, representative services, in-person government follow-ups, and translation + notary support.",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    key: "expert",
    name: "Talk to a Local Expert",
    description:
      "Real-time help from someone who knows the local landscape.",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    key: "vault",
    name: "Document Vault",
    description:
      "Store all your local business documents in one secure place.",
    icon: <FolderLock className="w-6 h-6" />,
  },
];

const Support = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
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
      </div>
    </DashboardLayout>
  );
};

export default Support;
