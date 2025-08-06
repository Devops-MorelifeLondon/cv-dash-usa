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
  Building
} from "lucide-react";

const Support = () => {
  const supportTickets = [
    {
      id: "CV-001",
      title: "India Business Registration",
      status: "completed",
      progress: 100,
      assignee: "Rajesh Sharma",
      dueDate: "2024-01-15",
      description: "Private Limited Company registration with GST and CIN"
    },
    {
      id: "CV-002", 
      title: "USA Bank Account Setup",
      status: "in-progress",
      progress: 75,
      assignee: "Sarah Johnson",
      dueDate: "2024-01-20",
      description: "Delaware LLC bank account opening with Stripe integration"
    },
    {
      id: "CV-003",
      title: "Compliance Documentation",
      status: "pending",
      progress: 25,
      assignee: "Michael Chen",
      dueDate: "2024-01-25",
      description: "FDA clearance documentation for cosmetic products"
    },
    {
      id: "CV-004",
      title: "Tax Advisory Session",
      status: "scheduled",
      progress: 0,
      assignee: "Lisa Rodriguez",
      dueDate: "2024-01-18",
      description: "Cross-border taxation strategy consultation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-cv-success text-white';
      case 'in-progress': return 'bg-cv-blue text-white';
      case 'pending': return 'bg-cv-warning text-white';
      case 'scheduled': return 'bg-cv-blue-light text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const overallProgress = Math.round(
    supportTickets.reduce((sum, ticket) => sum + ticket.progress, 0) / supportTickets.length
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
              <span>{supportTickets.filter(t => t.status === 'completed').length} of {supportTickets.length} completed</span>
            </div>
            <Progress 
              value={overallProgress} 
              className="h-3 bg-white/20"
            />
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-cv-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {supportTickets.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {supportTickets.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <AlertCircle className="w-8 h-8 text-cv-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {supportTickets.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">4</div>
            <div className="text-sm text-muted-foreground">Active Advisors</div>
          </Card>
        </div>

        {/* Support Tickets */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Active Support Requests</h2>
          
          <div className="space-y-4">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id} className="p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{ticket.title}</h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>ID: {ticket.id}</span>
                        <span>Assignee: {ticket.assignee}</span>
                        <span>Due: {ticket.dueDate}</span>
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

        {/* Service Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Legal & Compliance</h3>
                <p className="text-sm text-muted-foreground">2 active requests</p>
              </div>
            </div>
            <Progress value={75} className="h-2 mb-4" />
            <Button variant="outline" size="sm" className="w-full">
              View All Legal Services
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Financial Services</h3>
                <p className="text-sm text-muted-foreground">1 active request</p>
              </div>
            </div>
            <Progress value={50} className="h-2 mb-4" />
            <Button variant="outline" size="sm" className="w-full">
              View All Financial Services
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Advisory Services</h3>
                <p className="text-sm text-muted-foreground">1 scheduled session</p>
              </div>
            </div>
            <Progress value={25} className="h-2 mb-4" />
            <Button variant="outline" size="sm" className="w-full">
              View All Advisory Services
            </Button>
          </Card>
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