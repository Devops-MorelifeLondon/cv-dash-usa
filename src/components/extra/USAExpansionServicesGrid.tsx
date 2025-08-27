"use client";

import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

type ServiceItem = {
  service: string;
  description: string;
  tooltip: string;
};

const servicesData: ServiceItem[] = [
  {
    service: "Entity Formation (LLC / C-Corp / S-Corp)",
    description: "Start your U.S. business in the right state with expert legal and tax structure guidance.",
    tooltip: "Compare Delaware vs. Wyoming vs. California vs. Texas for your business",
  },
  {
    service: "EIN & Tax ID Acquisition",
    description: "We obtain your U.S. Employer Identification Number without you having to fly in.",
    tooltip: "Get your EIN in One Day",
  },
  {
    service: "Registered Agent & Office Address",
    description: "Fulfill compliance by assigning a registered agent and U.S. business address.",
    tooltip: "Required by law & Google to verify you",
  },
  {
    service: "Bank Account + Payment Gateway Setup",
    description: "Get U.S. bank account and Stripe/PayPal/Authorize.net/PayCompass access through verified networks.",
    tooltip: "No SSN? Do not worry we handle it for non-residents",
  },
  {
    service: "Business Licenses & Permits (by State & Industry)",
    description: "We navigate local/state licensing needs based on your product/service.",
    tooltip: "Avoid shutdowns from missing compliance!",
  },
  {
    service: "Warehouse, Fulfillment & 3PL Solutions",
    description: "We connect you with U.S. warehouse/fulfillment partners near your target markets.",
    tooltip: "For eCom, Amazon FBA, and D2C brands",
  },
  {
    service: "U.S. Tax Filings & Compliance",
    description: "Monthly bookkeeping + annual tax filings with CrossVentura Certified Partners.",
    tooltip: "Includes 1099s, franchise taxes & sales tax nexus",
  },
  {
    service: "Resident Director / Signatory Support",
    description: "We provide local signatories or directors to fulfill legal/tax mandates.",
    tooltip: "For certain banks, permits, or expansion visas",
  },
  {
    service: "Customs & Trade Compliance (Import/Export)",
    description: "Ensure your product enters the U.S. legally, affordably, and fast.",
    tooltip: "Tariff study, HTS code classification, broker guidance",
  },
  {
    service: "Business Visas & Global Mobility",
    description: "Access U.S. EB-5 or L1 visa assistance via our partner attorneys.",
    tooltip: "For founders, sales, or logistics coordination travel",
  },
  {
    service: "Local Hiring & HR Advisory",
    description: "Source vetted local employees and navigate U.S. employment laws.",
    tooltip: "Includes job board marketing and payroll setup",
  },
  {
    service: "Pre-Entry Consulting + Feasibility Study",
    description: "Not sure where to start? We offer strategic insights on entry pathways, margins & product demand.",
    tooltip: "Includes competitor scan + unit economics",
  },
  {
    service: "GCC / Back Office Setup (in India/USA)",
    description: "Launch U.S. back-office or support ops remotely via India or in the U.S.",
    tooltip: "Ideal for SaaS, CX teams, legal, logistics & ops",
  },
  {
    service: "Amazon USA / eCom Setup",
    description: "Launch on Amazon, Walmart, Etsy, etc., with our end-to-end onboarding + compliance pack.",
    tooltip: "From listings to warehousing to cross-border logistics",
  },
];

const USAExpansionServicesGrid = () => {
  return (
    <TooltipProvider>
       
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
         CrossVentura’s USA Expansion Services Grid
          </h1>
         
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
        {servicesData.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              {item.service}
              <Tooltip>
                <TooltipTrigger>
                  <span className="ml-2 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm cursor-pointer">
  i
</span>

                </TooltipTrigger>
                <TooltipContent>
                  {item.tooltip}
                </TooltipContent>
              </Tooltip>
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default USAExpansionServicesGrid;
