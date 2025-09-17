"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";

// --- UI Components (assuming they exist in your project structure) ---
import { Stepper } from "@/components/extra/Stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Lightbulb, DollarSign, MapPin, CheckCircle, ArrowRight, Sparkles, Target, Code2,
    ShoppingCart, Ship, Globe, Building2, Briefcase, TrendingUp, Users, BrainCircuit,
    FileText, LineChart, Factory, Warehouse, Network, Banknote, Scale, Megaphone,
    BookUser, Repeat, Award, Zap, BarChart3, Rocket,
    Globe2,
    Repeat2,
    Package,
    KanbanSquare,
    Landmark,
    Settings
} from "lucide-react";
import DualRangeSlider from "../DualRangeSlider";



// ---------------------------------
// --- HELPER FUNCTIONS & DATA ---
// ---------------------------------

const parseRevenue = (revenueStr) => {
    if (!revenueStr) return { min: 0, max: 0 };
    const matches = revenueStr.match(/\d+/g);
    if (!matches || matches.length < 2) return { min: 0, max: 0 };
    return { min: parseInt(matches[0], 10), max: parseInt(matches[1], 10) };
};

// --- CORE DATA STRUCTURES ---

const PROFESSIONAL_BACKGROUNDS = [
    { value: 'tech', label: 'Tech & IT' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'ops', label: 'Operations & Management' },
    { value: 'legal', label: 'Legal & Compliance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'product', label: 'Product Management' },
    { value: 'creative', label: 'Creative & Design' },
];

const GEOGRAPHY_DATA = [
  {
    label: "California (SF Bay Area, LA)",
    value: "CALIFORNIA",
    marketProfile: {
      tech: 1.5,
      saas: 1.5,
      aiml: 1.4,
      fundraising: 1.4,
      ecom: 1.2,
      consumergoods: 1.2,
    },
  },
  {
    label: "New York (NYC)",
    value: "NEW_YORK",
    marketProfile: {
      finance: 1.5,
      fundraising: 1.3,
      marketing: 1.4,
      corporate: 1.3,
      legal: 1.4,
      trading: 1.2,
    },
  },
  {
    label: "Texas (Austin, Houston, DFW)",
    value: "TEXAS",
    marketProfile: {
      tech: 1.2,
      manufacturing: 1.3,
      logistics: 1.3,
      trading: 1.3, // Energy & Commodities
      corporate: 1.1,
    },
  },
  {
    label: "Washington (Seattle Area)",
    value: "WASHINGTON",
    marketProfile: {
      tech: 1.3,
      saas: 1.4,
      ecom: 1.5, // Amazon HQ
      logistics: 1.2,
      supplychain: 1.2,
    },
  },
  {
    label: "Florida (Miami)",
    value: "FLORIDA",
    marketProfile: {
      impexp: 1.4,
      logistics: 1.3,
      trading: 1.3, // Gateway to LatAm
      finance: 1.1,
      marketing: 1.1,
    },
  },
  {
    label: "Illinois (Chicago)",
    value: "ILLINOIS",
    marketProfile: {
      logistics: 1.4,
      supplychain: 1.3,
      trading: 1.2, // Commodities
      manufacturing: 1.2,
      finance: 1.1,
    },
  },
  {
    label: "Massachusetts (Boston)",
    value: "MASSACHUSETTS",
    marketProfile: {
      tech: 1.2,
      healthcare: 1.4, // Bio-tech hub
      pharma: 1.3,
      fundraising: 1.2,
      edtech: 1.3,
    },
  },
];


const GENCATEGORIES_DATA = [
    { 
        label: "E-Commerce & Online Marketplace Ventures", 
        value: "ecommerce", 
        budget: [10, 80], 
        icon: <ShoppingCart className="w-8 h-8" />, 
        prompts: [
            "Will you launch your own D2C brand or sell on platforms like Amazon, Walmart, or Etsy?", 
            "Are you focusing on dropshipping, private-label products, or subscription box models?", 
            "Do you need guidance on integrating Shopify, Stripe, or cross-border shipping for US customers?"
        ] 
    },
    { 
        label: "Technology & IT Solutions", 
        value: "tech", 
        budget: [50, 300], 
        icon: <Code2 className="w-8 h-8" />, 
        prompts: [
            "Are you building a SaaS product, a mobile app, or offering IT consulting for US enterprises?", 
            "Do you want help recruiting US-based sales teams or remote engineering talent?", 
            "Ready to establish a nearshore/offshore development center to support US clients?"
        ] 
    },
    { 
        label: "Legal Advisory & Consulting", 
        value: "legal", 
        budget: [20, 100], 
        icon: <Scale className="w-8 h-8" />, 
        prompts: [
            "Do you need help with business incorporation, IP protection, or employment law compliance in the US?", 
            "Are you looking for registered agent services for your LLC or Corporation?", 
            "Schedule a consultation for SEC, FTC, or cross-border compliance regulations."
        ] 
    },
    { 
        label: "Financial Strategy & Consulting", 
        value: "finance", 
        budget: [25, 150], 
        icon: <Landmark className="w-8 h-8" />, 
        prompts: [
            "Are you seeking venture capital, SBA loans, or angel investment in the US?", 
            "Do you need support with financial modeling, valuation, or IPO readiness?", 
            "Explore services for tax optimization, FDI structuring, and cross-border financing."
        ] 
    },
    { 
        label: "Digital Marketing & Brand Growth", 
        value: "marketing", 
        budget: [15, 90], 
        icon: <Megaphone className="w-8 h-8" />, 
        prompts: [
            "What is your main focus: lead generation, brand awareness, or e-commerce conversions in the US?", 
            "Will you invest in performance marketing (Google Ads, Meta Ads) or influencer-driven campaigns on TikTok/Instagram?", 
            "Partner with our network of US-based content creators and brand strategists."
        ] 
    },
    { 
        label: "Global Offshore Service Hubs", 
        value: "offshore", 
        budget: [50, 250], 
        icon: <Globe2 className="w-8 h-8" />, 
        prompts: [
            "Are you planning to set up a BPO, call center, or shared services hub supporting US clients?", 
            "Do you need a 'build-operate-transfer' model for scaling operations?", 
            "Explore compliance and HR support for US-based outsourcing partnerships."
        ] 
    },
    { 
        label: "Innovative Manufacturing & Production", 
        value: "manufacturing", 
        budget: [150, 700], 
        icon: <Factory className="w-8 h-8" />, 
        prompts: [
            "Will you produce domestically in the US or use contract manufacturing (OEM/ODM)?", 
            "Are you targeting US government incentives for reshoring and green manufacturing?", 
            "Get assistance with FDA, OSHA, and ISO compliance for your production setup."
        ] 
    },
    { 
        label: "International & Domestic Trading", 
        value: "trading", 
        budget: [30, 200], 
        icon: <Repeat2 className="w-8 h-8" />, 
        prompts: [
            "Are you trading in consumer goods, raw materials, or B2B wholesale products?", 
            "Do you need financing solutions like factoring or trade credit for US buyers?", 
            "Connect with verified US distributors and nationwide retail chains."
        ] 
    },
    { 
        label: "Consumer & Physical Goods", 
        value: "consumer_goods", 
        budget: [40, 350], 
        icon: <Package className="w-8 h-8" />, 
        prompts: [
            "Are you creating a premium niche product or competing in mass-market retail?", 
            "Will you use a D2C subscription model, Amazon FBA, or brick-and-mortar retail?", 
            "Let us help with packaging, UL certification, and brand positioning for US buyers."
        ] 
    },
    { 
        label: "Import–Export Excellence", 
        value: "impexp", 
        budget: [20, 180], 
        icon: <Ship className="w-8 h-8" />, 
        prompts: [
            "Do you need help with US customs clearance, freight forwarding, or FDA/USDA compliance?", 
            "View our trade insights on profitable product flows between the US and global markets.", 
            "Schedule a consultation for optimizing tariffs, duties, and NAFTA/USMCA benefits."
        ] 
    },
    { 
        label: "Smart Logistics & Warehousing", 
        value: "logistics", 
        budget: [100, 500], 
        icon: <Warehouse className="w-8 h-8" />, 
        prompts: [
            "Are you planning an asset-heavy model with your own fleet/warehouses or an asset-light 3PL approach?", 
            "Do you specialize in last-mile delivery, cold-chain logistics, or e-commerce fulfillment?", 
            "Explore automation, robotics, and WMS/TMS solutions for US logistics efficiency."
        ] 
    },
    { 
        label: "Integrated Supply Chain Management", 
        value: "supply_chain", 
        budget: [70, 400], 
        icon: <KanbanSquare className="w-8 h-8" />, 
        prompts: [
            "Will you offer Supply Chain as a Service (SCaaS) for US-based companies?", 
            "Are you targeting visibility, cost optimization, or resilience in US supply chains?", 
            "Leverage predictive analytics and AI to optimize US and global supply networks."
        ] 
    },
];



const SUBCATS_DATA = {
    ecommerce: [
        { label: "Marketplace Selling", description: "Sell products on established platforms like Amazon, Etsy, or Flipkart.", estimatedRevenue: "30K-180K/year" },
        { label: "Direct-to-Consumer (D2C) Brand", description: "Build and market your brand via a dedicated website (e.g., using Shopify).", estimatedRevenue: "40K-250K/year" },
        { label: "Dropshipping & Retail Arbitrage", description: "Sell products without holding inventory by forwarding orders to suppliers.", estimatedRevenue: "20K-90K/year" },
        { label: "Subscription Box Service", description: "Curate and deliver recurring product boxes for a specific niche.", estimatedRevenue: "25K-130K/year" },
        { label: "Social Commerce Business", description: "Sell products directly through social media platforms like Instagram and Facebook.", estimatedRevenue: "15K-70K/year" },
    ],
    tech: [
        { label: "SaaS Product Development", description: "Build and market a Software-as-a-Service solution for a business need.", estimatedRevenue: "50K-300K/year" },
        { label: "IT Consulting & Managed Services", description: "Provide expert tech advice, strategy, and ongoing IT management for businesses.", estimatedRevenue: "60K-250K/year" },
        { label: "Custom Software Development", description: "Develop bespoke web and mobile applications for corporate clients.", estimatedRevenue: "80K-400K/year" },
        { label: "AI & Data Science Solutions", description: "Offer services in AI, machine learning, and data analytics to solve business problems.", estimatedRevenue: "90K-500K/year" },
        { label: "Cybersecurity Consulting", description: "Provide security audits, threat management, and compliance solutions.", estimatedRevenue: "70K-220K/year" },
    ],
    legal: [
        { label: "Corporate & Commercial Law Advisory", description: "Advise on company structures, business contracts, and M&A activities.", estimatedRevenue: "50K-200K/year" },
        { label: "Business Formation & Registration", description: "Assist entrepreneurs with company incorporation and registration processes.", estimatedRevenue: "30K-100K/year" },
        { label: "Intellectual Property (IP) Management", description: "Help businesses file for and protect trademarks, patents, and copyrights.", estimatedRevenue: "40K-160K/year" },
        { label: "Regulatory & Compliance Consulting", description: "Guide companies through industry-specific regulations like GDPR or financial compliance.", estimatedRevenue: "60K-180K/year" },
        { label: "Legal Process Outsourcing (LPO)", description: "Provide outsourced legal support like document review and legal research.", estimatedRevenue: "70K-250K/year" },
    ],
    finance: [
        { label: "Startup Capital & Fundraising Advisory", description: "Assist new ventures in securing funding from angels, VCs, or grants.", estimatedRevenue: "60K-300K/year" },
        { label: "Outsourced CFO & Financial Strategy", description: "Offer fractional CFO services for strategic planning and financial management.", estimatedRevenue: "70K-200K/year" },
        { label: "Investment & Wealth Management", description: "Provide financial advice and manage investment portfolios for clients.", estimatedRevenue: "50K-250K/year" },
        { label: "International Tax & Structuring", description: "Advise on tax-efficient structures for cross-border investments and operations.", estimatedRevenue: "80K-350K/year" },
        { label: "Fintech & Payments Consulting", description: "Advise on financial technology integration, payment gateways, and digital banking.", estimatedRevenue: "90K-400K/year" },
    ],
    marketing: [
        { label: "Full-Service Digital Marketing Agency", description: "Offer a complete suite of services including SEO, PPC, and social media marketing.", estimatedRevenue: "50K-250K/year" },
        { label: "Brand Strategy & Creative Services", description: "Develop brand positioning, messaging, visual identity, and creative campaigns.", estimatedRevenue: "40K-180K/year" },
        { label: "Content Marketing & Production", description: "Create and distribute valuable content like blogs, videos, and podcasts.", estimatedRevenue: "35K-150K/year" },
        { label: "Public Relations (PR) & Communications", description: "Manage media relations, brand reputation, and corporate communications.", estimatedRevenue: "45K-200K/year" },
        { label: "Data Analytics & Market Research", description: "Provide data-driven insights on consumer behavior and market trends.", estimatedRevenue: "60K-220K/year" },
    ],
    offshore: [
        { label: "Business Process Outsourcing (BPO)", description: "Handle non-core operations like customer support, tele-sales, or data entry.", estimatedRevenue: "80K-400K/year" },
        { label: "Knowledge Process Outsourcing (KPO)", description: "Provide high-skill services like research, analytics, or financial analysis.", estimatedRevenue: "100K-500K/year" },
        { label: "Remote IT & Tech Support Hub", description: "Offer outsourced IT helpdesk, network monitoring, and technical support.", estimatedRevenue: "70K-300K/year" },
        { label: "Back-Office Administration Services", description: "Manage HR, payroll processing, and accounting for other companies.", estimatedRevenue: "60K-250K/year" },
        { label: "Remote Team & Captive Center Setup", description: "Build, operate, and manage dedicated offshore teams for clients.", estimatedRevenue: "120K-600K/year" },
    ],
    manufacturing: [
        { label: "Contract Manufacturing (OEM/ODM)", description: "Produce goods for other brands to sell, either to their spec or from your design.", estimatedRevenue: "200K-1.5M/year" },
        { label: "Niche Product Line Manufacturing", description: "Develop and produce a proprietary line of specialized products.", estimatedRevenue: "100K-800K/year" },
        { label: "Food & Beverage Processing", description: "Manufacture and package food products for retail or commercial distribution.", estimatedRevenue: "150K-1M/year", complianceNotes: "Requires food safety licenses like FSSAI/FDA." },
        { label: "Industrial Component Manufacturing", description: "Produce parts and components for other manufacturing or industrial sectors.", estimatedRevenue: "250K-2M/year" },
        { label: "Prototyping & Small-Batch Production", description: "Offer services like 3D printing and CNC machining for new product development.", estimatedRevenue: "80K-450K/year" },
    ],
    trading: [
        { label: "Commodity Trading (Agri, Metal, Energy)", description: "Trade in bulk raw materials on domestic or international markets.", estimatedRevenue: "80K-700K/year" },
        { label: "Merchant Trading & Distribution", description: "Buy and sell a variety of finished goods between manufacturers and retailers.", estimatedRevenue: "60K-500K/year" },
        { label: "Industrial Goods & Equipment Trading", description: "Trade in machinery, spare parts, and other industrial supplies.", estimatedRevenue: "100K-800K/year" },
        { label: "Sourcing & Procurement Agency", description: "Act as a professional sourcing agent to find and vet suppliers for clients.", estimatedRevenue: "50K-150K/year" },
        { label: "Wholesale Consumer Goods Trading", description: "Buy fast-moving consumer goods (FMCG) in bulk and distribute them.", estimatedRevenue: "70K-600K/year" },
    ],
    consumer_goods: [
        { label: "Apparel & Fashion Brand", description: "Design, produce, and sell your own line of clothing, footwear, or accessories.", estimatedRevenue: "50K-300K/year" },
        { label: "Packaged Food & Beverage Brand", description: "Launch a brand of snacks, health foods, drinks, or ready-to-eat meals.", estimatedRevenue: "60K-400K/year" },
        { label: "Home & Lifestyle Brand", description: "Create and sell products for home decor, furniture, kitchenware, or organization.", estimatedRevenue: "40K-250K/year" },
        { label: "Personal Care & Beauty Brand", description: "Develop a line of skincare, cosmetics, haircare, or wellness products.", estimatedRevenue: "55K-350K/year", complianceNotes: "Regulatory approval (FDA/CDSCO) is often required." },
        { label: "Consumer Electronics & Gadgets Brand", description: "Design and sell innovative consumer electronics or smart home devices.", estimatedRevenue: "100K-700K/year" },
    ],
    impexp: [
        { label: "Freight Forwarding Service", description: "Arrange the international transport of goods via air, sea, and land carriers.", estimatedRevenue: "100K-700K/year" },
        { label: "Customs Brokerage Firm", description: "Manage customs documentation, duties, and clearance for import/export shipments.", estimatedRevenue: "70K-300K/year", complianceNotes: "Requires a Customs Broker License." },
        { label: "Import/Export Consulting Agency", description: "Advise businesses on market entry strategies, trade compliance, and documentation.", estimatedRevenue: "60K-250K/year" },
        { label: "Trade Finance Facilitation", description: "Connect importers and exporters with financing solutions like letters of credit.", estimatedRevenue: "50K-200K/year" },
        { label: "Export Management Company (EMC)", description: "Act as an outsourced export department for multiple manufacturing companies.", estimatedRevenue: "90K-500K/year" },
    ],
    logistics: [
        { label: "Third-Party Logistics (3PL) Provider", description: "Offer integrated warehousing, transportation, and order fulfillment services.", estimatedRevenue: "200K-1.5M/year" },
        { label: "Warehousing & Fulfillment Center", description: "Own and operate storage and fulfillment facilities for e-commerce and B2B clients.", estimatedRevenue: "150K-1M/year" },
        { label: "Freight & Transportation Services", description: "Manage a fleet or brokerage for moving goods via trucking, air, or sea freight.", estimatedRevenue: "180K-2M/year" },
        { label: "Last-Mile Delivery Network", description: "Specialize in the final delivery leg from a distribution center to the customer's door.", estimatedRevenue: "100K-600K/year" },
        { label: "Specialized Logistics Solutions", description: "Focus on high-value niches like cold chain, hazardous materials, or oversized cargo.", estimatedRevenue: "250K-3M/year" },
    ],
    supply_chain: [
        { label: "Supply Chain Consulting & Strategy", description: "Advise companies on optimizing their supply chain for cost, speed, and resilience.", estimatedRevenue: "80K-400K/year" },
        { label: "Procurement-as-a-Service", description: "Manage the entire strategic sourcing and procurement lifecycle for other businesses.", estimatedRevenue: "70K-300K/year" },
        { label: "Supply Chain Technology (SaaS)", description: "Develop and sell software for visibility, planning, or warehouse management (WMS).", estimatedRevenue: "100K-600K/year" },
        { label: "Inventory Management & Optimization", description: "Provide services or software to help businesses optimize stock levels and reduce waste.", estimatedRevenue: "60K-280K/year" },
        { label: "Reverse Logistics & Returns Management", description: "Create efficient systems for handling product returns, repairs, and recycling.", estimatedRevenue: "90K-500K/year" },
    ],
};



const INTERESTS_DATA = {
    ecommerce: [
        { value: 'd2c', label: 'Direct-to-Consumer (D2C)' }, { value: 'fba', label: 'Amazon FBA' }, { value: 'dropshipping', label: 'Dropshipping' },
        { value: 'privatelabel', label: 'Private Label Brands' }, { value: 'handmade', label: 'Handmade & Artisanal' }, { value: 'fashion', label: 'Fashion & Apparel' },
        { value: 'homegoods', label: 'Home Goods & Decor' }, { value: 'subscription', label: 'Subscription Boxes' }, { value: 'socialcommerce', label: 'Social Commerce' }
    ],
    tech: [
        { value: 'saas', label: 'B2B/B2C SaaS' }, { value: 'fintech', label: 'Fintech & Payments' }, { value: 'healthcare', label: 'HealthTech' },
        { value: 'aiml', label: 'AI/ML & Data Science' }, { value: 'cybersecurity', label: 'Cybersecurity Solutions' }, { value: 'mobileapp', label: 'Mobile App Development' },
        { value: 'iot', label: 'IoT & Hardware' }, { value: 'devops', label: 'DevOps & Cloud Infra' }, { value: 'edtech', label: 'EdTech Solutions' }
    ],
    legal: [
        { value: 'corporate', label: 'Corporate & M&A' }, { value: 'contracts', label: 'Cross-Border Contracts' }, { value: 'ip', label: 'Intellectual Property (IP)' },
        { value: 'compliance', label: 'Regulatory & Compliance' }, { value: 'formation', label: 'Company Formation' }, { value: 'immigration', label: 'Business Immigration' },
        { value: 'dispute', label: 'Dispute Resolution' }, { value: 'lpo', label: 'Legal Process Outsourcing' }, { value: 'privacy', label: 'Data Privacy & Security' }
    ],
    finance: [
        { value: 'fundraising', label: 'Startup Fundraising (VC/Angel)' }, { value: 'cfo', label: 'Outsourced CFO Services' }, { value: 'tax', label: 'International Tax Planning' },
        { value: 'wealth', label: 'Wealth & Investment Management' }, { value: 'fdi', label: 'Foreign Direct Investment (FDI)' }, { value: 'payments', label: 'Payments & Fintech' },
        { value: 'ma', label: 'Mergers & Acquisitions (M&A)' }, { value: 'valuation', label: 'Business Valuation' }, { value: 'tradefinance', label: 'Trade Finance' }
    ],
    marketing: [
        { value: 'performance', label: 'Performance Marketing (PPC/SEM)' }, { value: 'seo', label: 'SEO & Content Marketing' }, { value: 'branding', label: 'Brand Strategy & Identity' },
        { value: 'social', label: 'Social Media Marketing' }, { value: 'ecommerce', label: 'E-commerce Marketing (CRO)' }, { value: 'influencer', label: 'Influencer Marketing' },
        { value: 'pr', label: 'Public Relations (PR)' }, { value: 'analytics', label: 'Market Research & Analytics' }, { value: 'growth', label: 'Growth Hacking' }
    ],
    offshore: [
        { value: 'bpo', label: 'Customer Support (BPO)' }, { value: 'kpo', label: 'Knowledge Process Outsourcing (KPO)' }, { value: 'medicalbilling', label: 'Medical Billing (RCM)' },
        { value: 'accounting', label: 'Accounting & Bookkeeping' }, { value: 'it', label: 'IT & Tech Support' }, { value: 'hr', label: 'HR & Recruitment Outsourcing' },
        { value: 'virtualassistant', label: 'Virtual Assistant Services' }, { value: 'datainput', label: 'Data Entry & Management' }, { value: 'lpo', label: 'Legal Process Outsourcing (LPO)' }
    ],
    manufacturing: [
        { value: 'contract', label: 'Contract Manufacturing (OEM/ODM)' }, { value: 'electronics', label: 'Electronics & Components' }, { value: 'textiles', label: 'Textiles & Apparel' },
        { value: 'food', label: 'Food & Beverage Processing' }, { value: 'pharma', label: 'Pharma & Medical Devices' }, { value: 'automotive', label: 'Automotive Parts' },
        { value: 'packaging', label: 'Sustainable Packaging' }, { value: 'cosmetics', label: 'Private Label Cosmetics' }, { value: 'prototyping', label: '3D Printing & Prototyping' }
    ],
    trading: [
        { value: 'agro', label: 'Agro-Commodities' }, { value: 'metals', label: 'Metals & Minerals' }, { value: 'textiles', label: 'Textiles & Garments' },
        { value: 'chemicals', label: 'Chemicals & Solvents' }, { value: 'sourcing', label: 'Sourcing Agent Services' }, { value: 'wholesale', label: 'Wholesale Distribution' },
        { value: 'industrial', label: 'Industrial Equipment' }, { value: 'fmcg', label: 'FMCG Distribution' }, { value: 'scrap', label: 'Scrap & Recyclables' }
    ],
    consumer_goods: [
        { value: 'fashion', label: 'Apparel & Fashion' }, { value: 'food', label: 'Packaged Food & Beverages' }, { value: 'beauty', label: 'Beauty & Personal Care' },
        { value: 'home', label: 'Home & Kitchen' }, { value: 'electronics', label: 'Consumer Electronics' }, { value: 'health', label: 'Health & Wellness' },
        { value: 'furniture', label: 'Furniture & Decor' }, { value: 'toys', label: 'Toys & Baby Products' }, { value: 'sports', label: 'Sports & Outdoor' }
    ],
    impexp: [
        { value: 'freight', label: 'Freight Forwarding (Sea/Air)' }, { value: 'customs', label: 'Customs Clearance' }, { value: 'compliance', label: 'Trade Compliance' },
        { value: 'sourcing', label: 'Global Sourcing' }, { value: 'documentation', label: 'Documentation & Licensing' }, { value: 'tradefinance', label: 'Trade Finance' },
        { value: 'marketentry', label: 'Market Entry Strategy' }, { value: 'product', label: 'Product-Specific Export' }, { value: 'consulting', label: 'Import-Export Consulting' }
    ],
    logistics: [
        { value: '3pl', label: '3PL & 4PL Services' }, { value: 'warehousing', label: 'Smart Warehousing & Automation' }, { value: 'ecomfulfillment', label: 'E-commerce Fulfillment' },
        { value: 'lastmile', label: 'Last-Mile Delivery' }, { value: 'coldchain', label: 'Cold Chain Logistics' }, { value: 'freight', label: 'Freight Management' },
        { value: 'fleet', label: 'Fleet & Transport Tech' }, { value: 'drones', label: 'Drone & Autonomous Delivery' }, { value: 'aircargo', label: 'Air Cargo Management' }
    ],
    supply_chain: [
        { value: 'consulting', label: 'Supply Chain Consulting' }, { value: 'procurement', label: 'Strategic Sourcing & Procurement' }, { value: 'saas', label: 'Supply Chain Software (SaaS)' },
        { value: 'inventory', label: 'Inventory Planning & Optimization' }, { value: 'visibility', label: 'Real-Time Visibility & Tracking' }, { value: 'risk', label: 'Risk Management' },
        { value: 'reverse', label: 'Reverse Logistics & Returns' }, { value: 'sustainability', label: 'Green Supply Chains' }, { value: 'planning', label: 'Demand & Supply Planning' }
    ]
};


// --- Hydrate data with parsed revenues ---
const GENCATEGORIES = GENCATEGORIES_DATA.map(cat => ({
    ...cat,
    subCats: (SUBCATS_DATA[cat.value] || []).map(sub => ({
        ...sub,
        revenueRange: parseRevenue(sub.estimatedRevenue),
    }))
}));


// ---------------------------------
// --- HYPER CALCULATION ENGINE ---
// ---------------------------------

const calculateBusinessScore = (subCat, category, user) => {
    const { budget, interests, backgrounds, geography } = user;
    let scores = {
        budget: { score: 0, reason: "" },
        interest: { score: 0, reason: "" },
        background: { score: 0, reason: "" },
        opportunity: { score: 0, reason: "" },
        total: 0
    };
    const reasons = [];

    // 1. Budget Fit Score
    const budgetMid = (budget[0] + budget[1]) / 2;
    const revenueMid = (subCat.revenueRange.min + subCat.revenueRange.max) / 2;
    if (budget[1] < subCat.revenueRange.min * 0.7) {
        scores.budget = { score: 0.2, reason: "Your budget is significantly below the typical starting investment for this model." };
    } else if (budget[0] > subCat.revenueRange.max * 1.5) {
        scores.budget = { score: 0.7, reason: "Your budget is very high for this model; you could target more capital-intensive ventures." };
    } else if (budget[1] >= subCat.revenueRange.min) {
        scores.budget = { score: 1.0, reason: "Strong budget alignment. Your investment capacity is well-suited for this venture's needs." };
    } else {
        scores.budget = { score: 0.6, reason: "Your budget is on the lean side. A focused, phased-in approach would be required." };
    }

    // 2. Interest Synergy Score
    const matchingInterests = interests.filter(interest =>
        subCat.label.toLowerCase().includes(interest.label.toLowerCase()) ||
        subCat.description.toLowerCase().includes(interest.label.toLowerCase())
    ).length;
    if (matchingInterests > 0) {
        scores.interest = {
            score: 0.5 + (matchingInterests * 0.25), // Cap at 1.0
            reason: `High interest synergy. Your focus on ${interests.map(i => i.label).join(', ')} aligns perfectly.`
        };
    } else {
        scores.interest = { score: 0.1, reason: "Low interest alignment. This model may not match your specified niches." };
    }

    // 3. Background Alignment Score
    const backgroundValues = backgrounds.map(b => b.value);
    const hasDirectMatch = backgroundValues.includes(category.value);
    if (hasDirectMatch) {
        scores.background = { score: 1.0, reason: `Excellent background fit. Your experience in ${category.label} provides a strong competitive advantage.` };
    } else {
        scores.background = { score: 0.4, reason: "This is a career transition. Leveraging a mentor or experienced co-founder is recommended." };
    }

    // 4. Market Opportunity Score
    const geoProfile = GEOGRAPHY_DATA.find(g => g.value === geography?.value)?.marketProfile || {};
    const marketMultiplier = geoProfile[category.value] || geoProfile[interests[0]?.value] || 1.0;
    scores.opportunity = {
        score: marketMultiplier > 1.0 ? 1.0 : 0.8,
        reason: marketMultiplier > 1.1 ? `High market opportunity. ${geography.label} shows strong demand for this sector.` : "Solid market opportunity in your chosen geography."
    };

    // Weighted Total Score
    scores.total = (scores.budget.score * 0.25) +
                   (scores.interest.score * 0.35) +
                   (scores.background.score * 0.25) +
                   (scores.opportunity.score * 0.15);

    // Generate Top 4 Reasons
    const allReasons = [
        { ...scores.background, priority: 1 },
        { ...scores.interest, priority: 2 },
        { ...scores.budget, priority: 3 },
        { ...scores.opportunity, priority: 4 },
    ];
    const top4Reasons = allReasons.sort((a, b) => a.priority - b.priority).map(r => r.reason);

    return { ...subCat, score: scores.total, reasons: top4Reasons };
};


// -----------------------
// --- MAIN COMPONENT ---
// -----------------------

export default function BusinessIdeaGenerator() {
    // --- State Management ---
    const [step, setStep] = useState(0);
    const [backgrounds, setBackgrounds] = useState([]);
    const [category, setCategory] = useState(null);
    const [budget, setBudget] = useState([10, 50]);
    const [geography, setGeography] = useState(null);
    const [interests, setInterests] = useState([]);
    const [chosenSub, setChosenSub] = useState(null);
    const [filteredSubs, setFilteredSubs] = useState([]);
    const [bestMatch, setBestMatch] = useState(null);
    
    // --- Async/UI State ---
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [portalTarget, setPortalTarget] = useState(null);

    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    const STEPS = [
        { title: "Background", description: "Share your expertise" },
        { title: "Category", description: "Choose your business type" },
        { title: "Goals", description: "Set investment & interests" },
        { title: "Business Model", description: "Pick a specific model" },
        { title: "Action Plan", description: "Get your next steps" },
    ];

    // --- Navigation & Logic ---
    const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
    const back = () => setStep(s => Math.max(s - 1, 0));

    const handleCategorySelect = (c) => {
        setCategory(c);
        setBudget(c.budget);
        setChosenSub(null);
        setInterests([]);
        next();
    };
    
    const handleFindModels = () => {
        const userProfile = { budget, interests, backgrounds, geography };
        const scoredSubs = category.subCats.map(sub => calculateBusinessScore(sub, category, userProfile));
        const sortedSubs = scoredSubs.sort((a, b) => b.score - a.score);
        
        setFilteredSubs(sortedSubs);
        setBestMatch(sortedSubs[0] || null);
        next();
    };

    const handleGeneratePlan = () => {
        if (!chosenSub) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            next();
        }, 2500); // Simulate analysis
    };
    
    const resetAll = () => {
        setStep(0);
        setBackgrounds([]);
        setCategory(null);
        setBudget([10, 50]);
        setGeography(null);
        setInterests([]);
        setChosenSub(null);
        setFilteredSubs([]);
        setBestMatch(null);
    };

    const AnalysisScreen = () => (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div key={step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center gap-6 text-2xl font-semibold text-white">
          <BrainCircuit className="h-12 w-12 text-primary" />
          <span>Generating Personalized Action Plan...</span>
        </motion.div>
      </motion.div>
    );
    
    return (
        <>
            <AnimatePresence>
                {isAnalyzing && <AnalysisScreen />}
            </AnimatePresence>
            
            <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Settings className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent py-2">Idea to Visionary Program</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Discover the perfect international business opportunity tailored to your background, budget, and goals. Let's build your global venture.
                    </p>
                </div>

                <Card className="p-6 shadow-2xl lg:p-10 space-y-8 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                    <Stepper steps={STEPS} currentStep={step} className="mb-8" />
                    
                    <AnimatePresence mode="wait">
                        {/* --- STEP 0: BACKGROUND --- */}
                        {step === 0 && (
                            <motion.div key="background" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><BookUser className="w-6 h-6 text-primary" /> What is your Professional Background?</h2>
                                    <p className="text-muted-foreground">Select one or more areas of your expertise. This will help us recommend the best-fit categories.</p>
                                </div>
                                <div className="max-w-2xl mx-auto">
                                   <Select isMulti options={PROFESSIONAL_BACKGROUNDS} value={backgrounds} onChange={(opts) => setBackgrounds(opts)} placeholder="e.g., Tech & IT, Marketing..." menuPortalTarget={portalTarget} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex justify-center">
                                    <Button disabled={backgrounds.length === 0} onClick={next} size="lg" className="px-8">Continue <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        )}

                        {/* --- STEP 1: CATEGORY --- */}
                        {step === 1 && (
                            <motion.div key="cat" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><Lightbulb className="w-6 h-6 text-primary" /> Select Your Business Category</h2>
                                    <p className="text-muted-foreground">Choose a category that aligns with your goals. We've highlighted matches for your background.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {GENCATEGORIES.map(cat => {
                                        const isRecommended = backgrounds.some(bg => bg.value === cat.value);
                                        return (
                                            <Card key={cat.value} onClick={() => handleCategorySelect(cat)} className={`p-6 cursor-pointer border-2 transition-all duration-200 hover:scale-105 relative ${category?.value === cat.value ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50'}`}>
                                                {isRecommended && <Badge className="absolute top-2 right-2 bg-green-600">Recommended</Badge>}
                                                <div className="flex items-start gap-4">
                                                    <div className="text-primary">{cat.icon}</div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg mb-2">{cat.label}</h3>
                                                        <p className="text-sm text-muted-foreground mb-3">Est. Budget: ${cat.budget[0]}K - ${cat.budget[1]}K</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between"><Button variant="outline" onClick={back}>Back</Button></div>
                            </motion.div>
                        )}
                        
                        {/* --- STEP 2: GOALS & BUDGET --- */}
                        {step === 2 && category && (
                            <motion.div key="budget" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="space-y-8">
                                <div className="text-center space-y-2">
                                  <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><DollarSign className="w-6 h-6 text-primary" /> Budget & Goals</h2>
                                  <p className="text-muted-foreground">Define your investment, target market, and specific interests.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                  <Card className="p-6 space-y-4"><DualRangeSlider min={1} max={1000} value={budget} onChange={setBudget} label="Investment Budget (USD)" /></Card>
                                  <Card className="p-6 space-y-4">
                                    <Label className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-5 h-5" /> Target Geography</Label>
                                    <Select options={GEOGRAPHY_DATA} onChange={(opt) => setGeography(opt)} placeholder="Choose your target state..." menuPortalTarget={portalTarget} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}/>
                                  </Card>
                                </div>
                                <Card className="p-6 space-y-4">
                                  <Label className="text-lg font-semibold flex items-center gap-2"><Target className="w-5 h-5" /> Specific Interests</Label>
                                  <p className="text-sm text-muted-foreground">Select niche interests to help us refine the business model suggestions.</p>
                                  <Select isMulti options={INTERESTS_DATA[category.value]} value={interests} onChange={(opts) => setInterests(opts)} placeholder="e.g., Fintech, Private Label, SEO..." menuPortalTarget={portalTarget} styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </Card>
                                <div className="flex justify-between">
                                  <Button variant="outline" onClick={back}>Back</Button>
                                  <Button disabled={!geography || interests.length === 0} onClick={handleFindModels}>Find Business Models <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        )}
                        
                        {/* --- STEP 3: BUSINESS MODEL --- */}
                        {step === 3 && category && (
                             <motion.div key="subcat" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><Building2 className="w-6 h-6 text-primary" /> Choose Your Business Model</h2>
                                    <p className="text-muted-foreground">Select one. We've sorted them based on your profile, budget, and interests.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredSubs.map(sub => (
                                        <Card key={sub.label} onClick={() => setChosenSub(sub)} className={`p-4 cursor-pointer border-2 transition-all duration-200 flex flex-col justify-between ${chosenSub?.label === sub.label ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50'}`}>
                                            <div>
                                                <div className="flex items-start justify-between">
                                                  <h3 className="font-semibold text-sm leading-tight pr-4">{sub.label}</h3>
                                                  {sub.score > 0.75 && <Badge variant="default" className="text-xs bg-green-600">Top Match</Badge>}
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">{sub.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 pt-3 mt-auto">
                                                <TrendingUp className="w-3 h-3 text-green-600" />
                                                <Badge variant="outline" className="text-xs">{sub.estimatedRevenue}</Badge>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                 <div className="flex justify-between">
                                    <Button variant="outline" onClick={back}>Back</Button>
                                    <Button disabled={!chosenSub} onClick={handleGeneratePlan}>Generate Action Plan <Sparkles className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        )}

                        {/* --- STEP 4: ACTION PLAN --- */}
                        {step === 4 && category && chosenSub && bestMatch && (
                            <motion.div key="prompts" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><CheckCircle className="w-6 h-6 text-green-600" /> Your Personalized Action Plan</h2>
                                    <p className="text-muted-foreground">Here is your top business match and recommended next steps.</p>
                                </div>
                                
                                {/* --- Best Match Card --- */}
                                <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-green-500/10 border-primary/20">
                                  <div className="flex items-center gap-3 mb-4">
                                      <Award className="w-8 h-8 text-primary" />
                                      <div>
                                          <p className="text-sm font-medium text-primary">Best Matched Business</p>
                                          <h3 className="text-xl font-bold text-foreground">{bestMatch.label}</h3>
                                      </div>
                                  </div>
                                  <p className="text-muted-foreground mb-4">{bestMatch.description}</p>
                                  
                                  <div className="space-y-3">
                                      <h4 className="font-semibold text-md">Why it's a great fit for you:</h4>
                                      <ul className="list-none space-y-2">
                                        {bestMatch.reasons.map((reason, index) => (
                                          <li key={index} className="flex items-start gap-3">
                                            <Zap className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                            <span className="text-sm text-foreground/90">{reason}</span>
                                          </li>
                                        ))}
                                      </ul>
                                  </div>
                                </Card>
                                
                                <Card className="p-6">
                                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-primary"/> Your Selected Venture Details</h4>
                                   <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                                     <div>
                                       <p className="text-sm font-medium text-muted-foreground">Your Investment</p>
                                       <p className="text-lg font-semibold">${budget[0]}K - ${budget[1]}K</p>
                                     </div>
                                     <div>
                                       <p className="text-sm font-medium text-muted-foreground">Target Market</p>
                                       <p className="text-lg font-semibold">{geography?.label.split('(')[0]}</p>
                                     </div>
                                     <div>
                                       <p className="text-sm font-medium text-muted-foreground">Revenue Potential</p>
                                       <p className="text-lg font-semibold text-green-600">{chosenSub.estimatedRevenue}</p>
                                     </div>
                                   </div>
                                  {chosenSub.complianceNotes && <div className="pt-4 mt-4 border-t"><p className="text-sm text-amber-700 font-medium bg-amber-100 p-3 rounded-md"><strong>Compliance Note:</strong> {chosenSub.complianceNotes}</p></div>}
                                </Card>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 order-1 sm:order-2">Book Free Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                    <Button variant="outline" onClick={back} className="order-2 sm:order-1">Edit Selections</Button>
                                </div>
                                <div className="text-center pt-4">
                                    <Button variant="ghost" onClick={resetAll} className="text-muted-foreground">Start Over <Repeat className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </>
    );
}


