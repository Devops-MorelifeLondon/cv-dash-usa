import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux"; // Redux state
import { useNavigate, useLocation } from "react-router-dom"; // Navigation
import { apiClient } from "@/services/config";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Using sonner for notifications
import { 
  Building, MapPin, CreditCard, FileText, Truck, 
  ChevronRight, ChevronLeft, Info, CheckCircle2, HelpCircle, Lock 
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

// --- CONFIGURATION CONSTANTS ---
const TAX_EXEMPT_STATES = ["Alaska", "Florida", "Nevada", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"];
const ALL_STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const SERVICES_CONFIG = {
  company_formation: {
    title: "Company Formation",
    icon: Building,
    description: "Full incorporation service including state filing, EIN, and entity setup.",
    basePrice: 1000,
    steps: [
      { id: "nature_of_business", label: "Nature of Business", type: "select", options: ["Tech Or IT Company", "Importers or Exporters", "Manufacturers", "Ecommerce Sellers", "Others"] },
      { id: "entity_type", label: "Select Entity Type", type: "select", options: ["LLC", "C-Corp"] },
      { id: "sub_entity_type", label: "Ownership Structure", type: "select", options: ["Wholly Owned Subsidiary", "Independent Individual Owned Entity"] },
      { id: "tax_savings_quiz", label: "Do you wish to save on State Income Taxes?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "state_selection", label: "Select State of Incorporation", type: "select", dynamicOptions: (data) => data.tax_savings_quiz === "yes" ? TAX_EXEMPT_STATES : ALL_STATES },
      { id: "has_registered_agent", label: "Do you have a registered agent in the USA?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "agent_details", label: "Enter Registered Agent Details", type: "group", condition: (data) => data.has_registered_agent === "yes", fields: [{ id: "agent_name", label: "Name", type: "text" }, { id: "agent_state", label: "State", type: "text" }, { id: "agent_ssn", label: "SSN (Optional)", type: "text" }] },
      { id: "agent_service_optin", label: "Service Opt-in", type: "info_box", text: "We will provide Registered Agent services for you.", price: 199, recurring: "per year", condition: (data) => data.has_registered_agent === "no" },
      { id: "has_registered_office", label: "Do you have a Registered Office address in the US?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "office_address_details", label: "Enter Registered Office Address", type: "text_area", condition: (data) => data.has_registered_office === "yes" },
      { id: "office_service_optin", label: "Registered Office Service", type: "select", condition: (data) => data.has_registered_office === "no", options: ["Monthly Subscription ($150/mo)", "Yearly Subscription ($1000/yr)"], priceMap: { "Monthly Subscription ($150/mo)": { price: 150, recurring: "monthly" }, "Yearly Subscription ($1000/yr)": { price: 1000, recurring: "yearly" } } },
      { id: "need_bank_account", label: "Do you need Bank Account Opening Support?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "bank_account_type", label: "Select Bank Account Type", type: "select", condition: (data) => data.need_bank_account === "yes", options: ["Virtual Bank Account (Complimentary)", "Physical Bank Account ($500/mo or $2500/yr)"], priceMap: { "Virtual Bank Account (Complimentary)": { price: 0 }, "Physical Bank Account ($500/mo or $2500/yr)": { price: 500, recurring: "monthly (min)" } } }
    ]
  },
  banking: {
    title: "Banking & Payment Gateways",
    icon: CreditCard,
    description: "Setup for physical/virtual accounts and payment processors like Stripe/PayPal.",
    steps: [
      { id: "bank_type", label: "Do you need a Virtual or Physical Bank?", type: "radio", options: [{ label: "Virtual", value: "virtual" }, { label: "Physical", value: "physical" }] },
      { id: "virtual_bank_fee", label: "Virtual Bank Account Assistance", type: "info_box", text: "Assistance Fee: $200 (One-time)", price: 200, condition: (data) => data.bank_type === "virtual" },
      { id: "physical_bank_fee", label: "Physical Bank Account Assistance", type: "info_box", text: "Assistance Fee: $350 (One-time)", price: 350, condition: (data) => data.bank_type === "physical" },
      { id: "need_gateway", label: "Do you need Payment Gateways?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "gateway_selection", label: "Select Payment Gateways", type: "select", condition: (data) => data.need_gateway === "yes", options: ["PayPal", "Stripe", "Square", "Authorize.Net", "Amazon Pay", "Braintree"] }
    ]
  },
  registered_office: {
    title: "Registered Office Services",
    icon: MapPin,
    description: "Virtual mailbox or Physical office lease for compliance and operations.",
    steps: [
      { id: "office_type", label: "Select Service Type", type: "radio", options: [{ label: "Virtual Mailbox", value: "virtual" }, { label: "Physical Office", value: "physical" }] },
      { id: "virtual_plan", label: "Virtual Mailbox Plan", type: "select", condition: (data) => data.office_type === "virtual", options: ["Yearly - $3999/yr (Save 20%)", "Monthly - Standard Rate"], priceMap: { "Yearly - $3999/yr (Save 20%)": { price: 3999, recurring: "yearly" }, "Monthly - Standard Rate": { price: 350, recurring: "monthly" } } },
      { id: "physical_info", label: "Physical Office Features", type: "info_box", text: "Includes: Amazon Store Address, DUNS Number support, Bank Verification support.", condition: (data) => data.office_type === "physical" },
      { id: "physical_plan", label: "Physical Office Plan", type: "select", condition: (data) => data.office_type === "physical", options: ["Monthly Subscription", "Yearly Subscription"], priceMap: { "Monthly Subscription": { price: 500, recurring: "monthly" }, "Yearly Subscription": { price: 5000, recurring: "yearly" } } }
    ]
  },
  warehousing: {
    title: "Warehousing & Logistics",
    icon: Truck,
    description: "Storage, 3PL, and distribution setup.",
    steps: [
      { id: "industry_category", label: "Industry Category", type: "select", options: ["Health & Wellness", "Beauty & Personal Care", "Food & Beverage", "Apparel & Accessories", "Home Goods", "Toys & Games", "Other"] },
      { id: "business_mode", label: "Mode of Business", type: "select", options: ["Import-Export", "Ecommerce Seller", "Reseller on Marketplaces"] },
      { id: "space_required", label: "Space Required (Sq Ft)", type: "select", options: ["Up to 100 Sq Ft", "100 - 200 Sq Ft", "200 - 300 Sq Ft", "Above 300 Sq Ft"] },
      { id: "cold_storage", label: "Is Cold Storage Required?", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "contact_details", label: "Your Contact Details for Quote", type: "group", fields: [{ id: "contact_name", label: "Name", type: "text" }, { id: "contact_email", label: "Email", type: "email" }, { id: "contact_mobile", label: "Mobile No", type: "tel" }] }
    ]
  },
  post_incorporation: {
    title: "Post Incorporation",
    icon: FileText,
    description: "Essential filings after your company is formed.",
    steps: [
      { id: "boi_report", label: "Beneficial Ownership Information (BOI) Report", type: "checkbox_single", text: "Opt-in for BOI Report Filing ($150)", price: 150 }
    ]
  }
};

// --- HELPER: DYNAMIC FIELD RENDERER ---
const DynamicField = ({ field, value, onChange, formData }) => {
  if (field.type === "select") {
    const options = field.dynamicOptions ? field.dynamicOptions(formData) : field.options;
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  if (field.type === "radio") {
    return (
      <div className="space-y-3">
        <Label className="text-base">{field.label}</Label>
        <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-2">
          {field.options.map((opt) => (
            <div key={opt.value} className={`flex items-center space-x-2 p-3 rounded border ${value === opt.value ? 'border-primary bg-primary/5' : 'border-input'}`}>
              <RadioGroupItem value={opt.value} id={`${field.id}-${opt.value}`} />
              <Label htmlFor={`${field.id}-${opt.value}`} className="flex-1 cursor-pointer font-normal">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }
  if (field.type === "text_area") {
    return (
      <div className="space-y-2">
        <Label>{field.label}</Label>
        <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Enter details..." className="min-h-[100px]" />
      </div>
    );
  }
  if (field.type === "info_box") {
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
            <h4 className="font-semibold">{field.label}</h4>
            <p className="text-sm">{field.text}</p>
            {field.price && <p className="font-bold mt-1">+ ${field.price} {field.recurring || "one-time"}</p>}
        </div>
      </div>
    );
  }
  if (field.type === "checkbox_single") {
      return (
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <Checkbox id={field.id} checked={value === true} onCheckedChange={onChange} />
              <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={field.id} className="cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {field.text}
                  </Label>
              </div>
          </div>
      )
  }
  if (field.type === "group" && field.fields) {
      return (
          <div className="space-y-4 border p-4 rounded-lg bg-secondary/10">
              <Label className="text-lg font-semibold">{field.label}</Label>
              {field.fields.map(subField => (
                  <div key={subField.id} className="space-y-2">
                      <Label htmlFor={subField.id}>{subField.label}</Label>
                      <Input id={subField.id} type={subField.type} value={formData[subField.id] || ""} onChange={(e) => onChange({ ...formData, [subField.id]: e.target.value }, true)} />
                  </div>
              ))}
          </div>
      )
  }
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

// --- SUCCESS VIEW COMPONENT ---
const SuccessView = ({ ticketId, onReset }) => {
  return (
    <Card className="max-w-2xl mx-auto py-12 px-6 text-center animate-in zoom-in-95 duration-300">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-2">Request Successful!</h2>
      <p className="text-lg font-mono text-blue-600 mb-4">Ticket ID: {ticketId}</p>
      <p className="text-muted-foreground mb-8 text-lg">
        Thank you! Your request has been processed successfully.
        <br/>
        A confirmation email has been sent to you with all the details.
      </p>
      <Button onClick={onReset} size="lg" className="w-full sm:w-auto">Start New Request</Button>
    </Card>
  );
};

// --- SERVICE WIZARD COMPONENT ---
const ServiceWizard = ({ serviceKey, onBack, onComplete }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const config = SERVICES_CONFIG[serviceKey];
  
  const [formData, setFormData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Restore State
  useEffect(() => {
    const savedState = localStorage.getItem("pendingServiceRequest");
    if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.serviceKey === serviceKey) {
            setFormData(parsed.formData);
            toast.info("Previous session restored.");
        }
    }
  }, [serviceKey]);

  const visibleSteps = useMemo(() => {
    return (config.steps || []).filter(step => {
      if (!step.condition) return true;
      return step.condition(formData);
    });
  }, [formData, config]);

  const totalPrice = useMemo(() => {
    let total = config.basePrice || 0;
    visibleSteps.forEach(step => {
      if (step.type === "info_box" && step.price) total += step.price;
      if (step.priceMap && formData[step.id]) {
         const p = step.priceMap[formData[step.id]];
         if (p && p.price) total += p.price;
      }
      if (step.type === "checkbox_single" && formData[step.id] === true && step.price) {
          total += step.price;
      }
    });
    return total;
  }, [visibleSteps, formData, config]);

  const handleFieldChange = (fieldId, value, isGroup = false) => {
      if (isGroup) {
          setFormData(prev => ({ ...prev, ...value }));
      } else {
          setFormData(prev => ({ ...prev, [fieldId]: value }));
      }
  };

  const handleNext = () => {
    if (currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setCurrentStepIndex(visibleSteps.length); 
    }
  };

  const handleLoginRedirect = () => {
      const stateToSave = { serviceKey, formData, stepIndex: currentStepIndex };
      localStorage.setItem("pendingServiceRequest", JSON.stringify(stateToSave));
      navigate("/auth"); 
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
        setShowAuthDialog(true);
        return;
    }
    setIsSubmitting(true);
    try {
        const payload = {
            serviceKey,
            serviceTitle: config.title,
            formData,
            estimatedPrice: totalPrice
        };
        const response = await apiClient.post("/api/services/create", payload);
        const data = response.data;
        
        if (data.success) {
            localStorage.removeItem("pendingServiceRequest"); // Clear draft
            
            // Scenario 1: Paid Service (Redirect to Stripe)
            if (data.paymentRequired && data.paymentUrl) {
                toast.loading("Redirecting to secure payment...");
                window.location.href = data.paymentUrl;
            } 
            // Scenario 2: Free Service (Show Success Immediately)
            else {
                onComplete(data.ticketId); 
            }
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to submit request.");
    } finally {
        // Stop loading spinner if we aren't redirecting
        // If redirecting, we want spinner to persist until page unloads
        if (!window.location.href.includes("stripe")) { 
             setIsSubmitting(false);
        }
    }
  };

  // Summary View
  if (currentStepIndex === visibleSteps.length) {
    return (
      <>
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><Lock className="w-5 h-5 text-blue-600" /> Login Required</DialogTitle>
                    <DialogDescription>You must be logged in to submit this request.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAuthDialog(false)}>Cancel</Button>
                    <Button onClick={handleLoginRedirect}>Go to Login</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="border-b bg-muted/20">
            <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Review & Confirm</CardTitle>
            <CardDescription>Please verify your details before proceeding.</CardDescription>
            </CardHeader>
            <CardContent className="py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleSteps.map(step => {
                if (step.type === "info_box") return null;
                const val = formData[step.id];
                if (!val && step.type !== "group") return null;
                return (
                    <div key={step.id} className="flex flex-col p-3 rounded bg-secondary/20">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">{step.label}</span>
                    <span className="font-medium truncate">
                        {step.type === "checkbox_single" ? (val ? "Yes" : "No") : step.type === "group" ? "Details Provided" : val.toString()}
                    </span>
                    </div>
                );
                })}
            </div>
            <div className="flex items-center justify-between p-6 bg-primary/5 rounded-lg border border-primary/10 mt-6">
                <div>
                <p className="text-sm text-muted-foreground">Estimated Total</p>
                <h3 className="text-3xl font-bold text-primary">${totalPrice}</h3>
                <p className="text-xs text-muted-foreground">*Final quote may vary.</p>
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-muted/20 py-4">
            <Button variant="outline" onClick={() => setCurrentStepIndex(prev => prev - 1)}>Back</Button>
            <Button onClick={handleSubmit} size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : totalPrice > 0 ? "Pay & Submit" : "Submit Request"}
            </Button>
            </CardFooter>
        </Card>
      </>
    );
  }

  // Step View
  const step = visibleSteps[currentStepIndex];
  const progress = ((currentStepIndex) / visibleSteps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4 pl-0 hover:pl-2 text-muted-foreground">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Catalog
      </Button>
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
            <span>Step {currentStepIndex + 1} of {visibleSteps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="pt-4 flex items-start justify-between gap-4">
            <div>
                <CardTitle className="text-2xl">{step.label}</CardTitle>
                {step.tooltip && (
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" /> {step.tooltip}
                    </p>
                )}
            </div>
            {config.icon && React.createElement(config.icon, { className: "w-8 h-8 text-primary/20" })}
          </div>
        </CardHeader>
        <CardContent className="min-h-[300px] py-6">
          <div className="animate-in fade-in slide-in-from-right-4 duration-300" key={step.id}>
             <DynamicField field={step} value={formData[step.id]} formData={formData} onChange={(val, isGroup) => handleFieldChange(step.id, val, isGroup)} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between py-6 border-t bg-muted/10">
          <Button variant="ghost" onClick={() => setCurrentStepIndex(prev => prev - 1)} disabled={currentStepIndex === 0}>Previous</Button>
          <Button onClick={handleNext} className="min-w-[120px]">
            {currentStepIndex === visibleSteps.length - 1 ? "Review" : "Next"} <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};


// --- MAIN PAGE ---

const ServicesHub = () => {
  const [selectedService, setSelectedService] = useState(null);
  
  // -- Success Logic --
  const [successTicket, setSuccessTicket] = useState(null);
  const location = useLocation();

  // 1. Check URL for Stripe Return (?status=success&ticket=...)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const ticket = queryParams.get("ticket");

    if (status === "success" && ticket) {
        setSuccessTicket(ticket);
        toast.success("Payment Successful!");
        // Clear local storage draft
        localStorage.removeItem("pendingServiceRequest");
        
        // Optional: Clean URL history
        window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.search]);

  // 2. Check for Pending Draft (Restore session)
  useEffect(() => {
    // Only check draft if we are NOT in success mode
    if (!successTicket) {
        const savedState = localStorage.getItem("pendingServiceRequest");
        if (savedState) {
            const parsed = JSON.parse(savedState);
            if (parsed && parsed.serviceKey) {
                setSelectedService(parsed.serviceKey);
            }
        }
    }
  }, [successTicket]);

  const handleReset = () => {
    setSuccessTicket(null);
    setSelectedService(null);
    window.history.pushState({}, document.title, window.location.pathname);
  };

  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* SCENARIO A: SUCCESS VIEW */}
          {successTicket ? (
             <SuccessView ticketId={successTicket} onReset={handleReset} />
          ) : 
          
          /* SCENARIO B: WIZARD (Selected Service) */
          selectedService ? (
            <div className="animate-in fade-in slide-in-from-right-8">
                <ServiceWizard 
                    serviceKey={selectedService} 
                    onBack={() => {
                        setSelectedService(null);
                        localStorage.removeItem("pendingServiceRequest");
                    }}
                    onComplete={(ticketId) => setSuccessTicket(ticketId)}
                />
            </div>
          ) : 
          
          /* SCENARIO C: SERVICE CATALOG (Default) */
          (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Global Expansion Services</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Select a service below to configure your tailored US expansion plan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(SERVICES_CONFIG).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <Card 
                      key={key} 
                      className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-muted hover:border-primary/50"
                      onClick={() => setSelectedService(key)}
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon className="w-24 h-24" />
                      </div>
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{config.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{config.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                          Configure <ChevronRight className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </TooltipProvider>
    </DashboardLayout>
  );
};

export default ServicesHub;