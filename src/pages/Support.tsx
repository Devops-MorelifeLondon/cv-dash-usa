import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  Users,
  CreditCard,
  Building,
  MapPin,
  ClipboardCheck,
  Banknote,
  Scale,
  Truck,
  Phone,
  MessageCircle,
  FolderLock
} from "lucide-react";

// Define service categories for navigation and stats
const serviceCategories = [
  {
    key: "entity",
    name: "Entity Setup & Registration",
    description: "Business setup, registration, and local licensing.",
    icon: <Building className="w-6 h-6" />,
  },
  {
    key: "address",
    name: "Local Address & Office Setup",
    description: "Virtual/physical office, agent services, address proof.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    key: "hiring",
    name: "Hiring & HR Support",
    description: "Employer registration, recruitment, payroll, visa guides.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    key: "banking",
    name: "Banking & Financial Setup",
    description: "Banking, payments, merchant, and forex accounts.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    key: "legal",
    name: "Legal & Compliance Support",
    description: "Contracts, statutory filings, compliance, local counsel.",
    icon: <Scale className="w-6 h-6" />,
  },
  {
    key: "logistics",
    name: "Infrastructure & Logistics",
    description: "Warehouse, brokerage, import/export, site scouting.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    key: "concierge",
    name: "Concierge & Local Liaisons",
    description: "Phone setup, reps, gov liaison, language support.",
    icon: <Phone className="w-6 h-6" />,
  },
  {
    key: "expert",
    name: "Talk to a Local Expert",
    description: "Real-time help from someone who knows the local landscape.",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    key: "vault",
    name: "Document Vault",
    description: "Store all your local business documents in one secure place.",
    icon: <FolderLock className="w-6 h-6" />,
  }
];

const advisors = [
  "Rajesh Sharma",
  "Sarah Johnson",
  "Michael Chen",
  "Lisa Rodriguez"
];

const supportTickets = [
  {
    id: "CV-001",
    title: "India Business Registration",
    status: "completed",
    progress: 100,
    assignee: "Rajesh Sharma",
    dueDate: "2024-01-15",
    description: "Private Limited Company registration with GST and CIN",
    categoryKey: "entity",
  },
  {
    id: "CV-002",
    title: "USA Bank Account Setup",
    status: "in-progress",
    progress: 75,
    assignee: "Sarah Johnson",
    dueDate: "2024-01-20",
    description: "Delaware LLC bank account opening with Stripe integration",
    categoryKey: "banking",
  },
  {
    id: "CV-003",
    title: "Compliance Documentation",
    status: "pending",
    progress: 25,
    assignee: "Michael Chen",
    dueDate: "2024-01-25",
    description: "FDA clearance documentation for cosmetic products",
    categoryKey: "legal",
  },
  {
    id: "CV-004",
    title: "Tax Advisory Session",
    status: "scheduled",
    progress: 0,
    assignee: "Lisa Rodriguez",
    dueDate: "2024-01-18",
    description: "Cross-border taxation strategy consultation",
    categoryKey: "legal",
  },
  {
    id: "CV-005",
    title: "Local Expert Chat (Singapore)",
    status: "in-progress",
    progress: 50,
    assignee: "Lee Wei",
    dueDate: "2024-01-27",
    description: "Direct consultation with Singapore business expert.",
    categoryKey: "expert"
  },
  {
    id: "CV-006",
    title: "Upload Incorporation Docs",
    status: "pending",
    progress: 0,
    assignee: "Client",
    dueDate: "2024-01-30",
    description: "Upload and store Singapore business certificate and local licenses.",
    categoryKey: "vault",
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-cv-success text-white";
    case "in-progress":
      return "bg-cv-blue text-white";
    case "pending":
      return "bg-cv-warning text-white";
    case "scheduled":
      return "bg-cv-blue-light text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "in-progress":
      return <Clock className="w-4 h-4" />;
    case "pending":
      return <AlertCircle className="w-4 h-4" />;
    case "scheduled":
      return <Clock className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const categoryMap = Object.fromEntries(
  serviceCategories.map((c) => [c.key, c])
);

const calcCategoryProgress = (categoryKey: string) => {
  const tickets = supportTickets.filter((t) => t.categoryKey === categoryKey);
  if (!tickets.length) return 0;
  return Math.round(
    tickets.reduce((sum, t) => sum + t.progress, 0) / tickets.length
  );
};

const Support = () => {
  const overallProgress = Math.round(
    supportTickets.reduce((sum, ticket) => sum + ticket.progress, 0) /
      supportTickets.length
  );

  // Tickets per status for stats
  const completedCount = supportTickets.filter(
    (t) => t.status === "completed"
  ).length;
  const inProgressCount = supportTickets.filter(
    (t) => t.status === "in-progress"
  ).length;
  const pendingCount = supportTickets.filter(
    (t) => t.status === "pending"
  ).length;

  // Tickets per category
  const ticketsByCategory: Record<string, typeof supportTickets> = {};
  serviceCategories.forEach(
    (cat) =>
      (ticketsByCategory[cat.key] = supportTickets.filter(
        (t) => t.categoryKey === cat.key
      ))
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Operational Support <span className="text-primary">Status</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track the progress of all your services and stay updated on your global expansion journey.
          </p>
        </div>

        {/* Overall Status */}
        <Card className="p-8 bg-gradient-primary text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-white/90">Your expansion is moving forward smoothly</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{overallProgress}%</div>
              <div className="text-sm text-white/80">Complete</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>All Services Progress</span>
              <span>
                {completedCount} of {supportTickets.length} completed
              </span>
            </div>
            <Progress value={overallProgress} className="h-3 bg-white/20" />
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-cv-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {completedCount}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {inProgressCount}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <AlertCircle className="w-8 h-8 text-cv-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {pendingCount}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{advisors.length}</div>
            <div className="text-sm text-muted-foreground">Active Advisors</div>
          </Card>
        </div>

        {/* Support Tickets */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Active Support Requests</h2>
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="p-6 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {ticket.title}
                        </h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">
                            {ticket.status.replace("-", " ")}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>ID: {ticket.id}</span>
                        <span>Assignee: {ticket.assignee}</span>
                        <span>Due: {ticket.dueDate}</span>
                        <span>
                          Category:{" "}
                          <span className="font-semibold">
                            {categoryMap[ticket.categoryKey]?.name ||
                              ticket.categoryKey}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{ticket.progress}%</span>
                  </div>
                  <Progress value={ticket.progress} className="h-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => {
            const tickets = ticketsByCategory[cat.key];
            let activeCount = tickets.filter(
              (t) =>
                t.status === "in-progress" ||
                t.status === "pending" ||
                t.status === "scheduled"
            ).length;
            // Show appropriate subtitle for new categories
            let subtitle = "";
            switch (cat.key) {
              case "expert":
                subtitle = activeCount
                  ? `${activeCount} expert sessions`
                  : "No active sessions";
                break;
              case "vault":
                subtitle = activeCount
                  ? `${activeCount} documents to review/upload`
                  : "No pending documents";
                break;
              case "legal":
                subtitle = `${activeCount} legal matters`;
                break;
              case "banking":
                subtitle = `${activeCount} financial items`;
                break;
              case "hiring":
                subtitle = `${activeCount} HR requests`;
                break;
              case "entity":
                subtitle = `${activeCount} entity setups`;
                break;
              case "concierge":
                subtitle = `${activeCount} concierge actions`;
                break;
              case "logistics":
                subtitle = `${activeCount} logistics tasks`;
                break;
              case "address":
                subtitle = `${activeCount} address/office requests`;
                break;
              default:
                subtitle = activeCount
                  ? `${activeCount} active`
                  : "No active requests";
            }

            return (
              <Card
                key={cat.key}
                className="p-6 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  </div>
                </div>
                <Progress
                  value={calcCategoryProgress(cat.key)}
                  className="h-2 mb-4"
                />
                <Button variant="outline" size="sm" className="w-full">
                  {cat.key === "expert"
                    ? "Talk to an Expert"
                    : cat.key === "vault"
                    ? "Open Document Vault"
                    : `View All ${cat.name.split(" ")[0]} Services`}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="p-8 bg-gradient-card border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Need Additional Support?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you every step of the way. Request additional services or schedule a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Request New Service
            </Button>
            <Button size="lg" variant="outline">
              Schedule Consultation
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;
