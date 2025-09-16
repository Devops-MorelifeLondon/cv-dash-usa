"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import { Stepper } from "@/components/extra/Stepper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Lightbulb,
    DollarSign,
    MapPin,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Target,
    Code2,
    ShoppingCart,
    Ship,
    Globe,
    Building2,
    Briefcase,
    TrendingUp,
    Users,
    BrainCircuit,
    FileText,
    LineChart,
} from "lucide-react";
import DualRangeSlider from "../DualRangeSlider";


// ---------- HELPER FUNCTIONS & DATA ----------
const parseRevenue = (revenueStr: string): [number, number] => {
    if (!revenueStr) return [0, 0];
    const matches = revenueStr.match(/\d+/g);
    if (!matches || matches.length < 2) return [0, 0];
    return [parseInt(matches[0], 10), parseInt(matches[1], 10)];
};


type SubCat = {
    label: string;
    description?: string;
    estimatedRevenue?: string;
    revenueRange: [number, number]; // [min, max] in USD thousands
};


type GenCategory = {
    label: string;
    value: string;
    budget: [number, number];
    subCats: SubCat[];
    prompts: string[];
    icon: React.ReactNode;
};


// Pre-process data to include numeric revenue ranges
const GEN_CATEGORIES_DATA: Omit<GenCategory, 'subCats'>[] = [
    {
        label: "Tech IT Companies",
        value: "tech",
        budget: [50, 200],
        icon: <Code2 className="w-8 h-8" />,
        prompts: [
            "Would you like to cater to the US market, Indian businesses, or operate as a bridge service provider?",
            "Would you like to consult for top opportunity segments in the US market (e.g., Healthcare IT, Fintech apps, Immigration tech)?",
            "Do you require our Talent Connect feature to hire developers or sales representatives in the US or India?",
            "Interested in Software Development Outsourcing? Book a consultation to plan your project.",
            "Ready to set up a Development Center? Click 'Get Started' to begin.",
        ],
    },
    {
        label: "E-commerce / Amazon Resellers",
        value: "ecom",
        budget: [10, 50],
        icon: <ShoppingCart className="w-8 h-8" />,
        prompts: [
            "Would you like to import products from India to sell in the US?",
            "Would you like to resell US-based trending products?",
            "Want to sell Indian products in the US? Book a consultation for expert advice.",
            "Start your e-commerce journey now—click 'Get Started' for setup tools.",
            "Not sure what to sell? Click here for product ideas and consulting.",
        ],
    },
    {
        label: "Import-Export Business",
        value: "impexp",
        budget: [15, 50],
        icon: <Ship className="w-8 h-8" />,
        prompts: [
            "Please enter your product(s) of interest or select from suggested profitable items.",
            "Would you like to import into the US, export from India, or both?",
            "Need product ideas? Schedule a consultation.",
            "View top demanded US import products from India (latest report).",
        ],
    },
    {
        label: "Offshore Services / Outsourcing",
        value: "offshore",
        budget: [50, 200],
        icon: <Globe className="w-8 h-8" />,
        prompts: [
            "Would you like to hire staff in India for US-based clients?",
            "Do you need help setting up an Indian entity or partner office?",
            "Looking for white-label services to resell in the US?",
        ],
    },
];


const SUB_CATS_DATA: { [key: string]: Omit<SubCat, 'revenueRange'>[] } = {
    tech: [
        { label: "USA Staffing Company", description: "Connect US companies with skilled Indian developers", estimatedRevenue: "$50K-$150K/year" },
        { label: "Offshore Development Center (India)", description: "Set up dedicated development teams", estimatedRevenue: "$100K-$300K/year" },
        { label: "SaaS Product for SMEs / E-commerce", description: "Build software solutions for small businesses", estimatedRevenue: "$30K-$200K/year" },
        { label: "IT Consulting (US Federal / Corporate projects)", description: "Provide specialized consulting services", estimatedRevenue: "$80K-$250K/year" },
        { label: "IT Infrastructure Management Services", description: "Manage cloud and on-premise infrastructure", estimatedRevenue: "$60K-$180K/year" },
        { label: "Custom Mobile / Web App Development", description: "Build custom applications for clients", estimatedRevenue: "$40K-$120K/year" },
        { label: "AI / ML Solutions", description: "Develop AI-powered business solutions", estimatedRevenue: "$70K-$300K/year" },
        { label: "Cybersecurity Solutions", description: "Provide security services and products", estimatedRevenue: "$80K-$200K/year" },
    ],
    ecom: [
        { label: "Dropshipping (US-based suppliers / India-based exports)", description: "Sell products without holding inventory", estimatedRevenue: "$20K-$100K/year" },
        { label: "Private Label Products", description: "Create your own brand of products", estimatedRevenue: "$30K-$150K/year" },
        { label: "Fulfillment by Amazon (FBA) in the USA", description: "Let Amazon handle storage and shipping", estimatedRevenue: "$25K-$200K/year" },
        { label: "Fulfillment & Logistics (cross-border)", description: "Manage international shipping and customs", estimatedRevenue: "$40K-$120K/year" },
        { label: "India-manufactured product reselling in the US", description: "Import and sell Indian products in America", estimatedRevenue: "$35K-$180K/year" },
        { label: "US-manufactured products reselling in India", description: "Bring American products to Indian market", estimatedRevenue: "$25K-$80K/year" },
        { label: "Custom Print-on-Demand", description: "Create custom designs on products", estimatedRevenue: "$15K-$60K/year" },
        { label: "Subscription Boxes", description: "Curate monthly product boxes for customers", estimatedRevenue: "$30K-$150K/year" },
    ],
    impexp: [
        { label: "Food & Agro Commodities", description: "Trade in agricultural products and food items", estimatedRevenue: "$40K-$200K/year" },
        { label: "Ayurveda / Herbal Supplements", description: "Export traditional Indian wellness products", estimatedRevenue: "$30K-$120K/year" },
        { label: "Textiles / Apparels", description: "Trade in clothing and fabric materials", estimatedRevenue: "$50K-$300K/year" },
        { label: "Auto Parts", description: "Import/export automotive components", estimatedRevenue: "$60K-$250K/year" },
        { label: "IT Hardware / Electronics", description: "Trade in technology and electronic goods", estimatedRevenue: "$80K-$400K/year" },
        { label: "Jewelry / Handicrafts", description: "Export Indian artisanal products", estimatedRevenue: "$25K-$150K/year" },
        { label: "Pharmaceuticals / Nutraceuticals", description: "Trade in medical and health products", estimatedRevenue: "$100K-$500K/year" },
        { label: "Trade Facilitation Services", description: "Help others navigate import/export processes", estimatedRevenue: "$35K-$100K/year" },
        { label: "Sourcing Agents", description: "Connect buyers with manufacturers", estimatedRevenue: "$30K-$80K/year" },
    ],
    offshore: [
        { label: "Legal Process Outsourcing (LPO)", description: "Provide legal support services remotely", estimatedRevenue: "$80K-$300K/year" },
        { label: "Medical Billing / RCM", description: "Handle healthcare billing and revenue cycle", estimatedRevenue: "$60K-$200K/year" },
        { label: "Accounting & Tax Filing Services", description: "Provide financial and tax services", estimatedRevenue: "$50K-$150K/year" },
        { label: "Virtual Paralegal or Immigration Support", description: "Assist with legal documentation remotely", estimatedRevenue: "$40K-$120K/year" },
        { label: "Call Center Operations", description: "Handle customer support and sales calls", estimatedRevenue: "$70K-$250K/year" },
        { label: "KPO for Market Research / Compliance", description: "Provide knowledge-based business services", estimatedRevenue: "$80K-$300K/year" },
        { label: "Content & Social Media Management", description: "Create and manage digital content", estimatedRevenue: "$30K-$100K/year" },
    ],
};


// NEW: Pre-defined interests for each category
const INTERESTS_DATA: { [key: string]: { value: string; label: string }[] } = {
    tech: [
        { value: "healthcare", label: "Healthcare IT" },
        { value: "fintech", label: "Fintech" },
        { value: "immigration", label: "Immigration Tech" },
        { value: "saas", label: "SaaS Product" },
        { value: "ai_ml", label: "AI / ML Solutions" },
        { value: "cybersecurity", label: "Cybersecurity Solutions" },
        { value: "mobile_app", label: "Custom Mobile / Web App" },
        { value: "infrastructure", label: "IT Infrastructure" },
    ],
    ecom: [
        { value: "dropshipping", label: "Dropshipping" },
        { value: "private_label", label: "Private Label Products" },
        { value: "fba", label: "Amazon FBA" },
        { value: "logistics", label: "Fulfillment & Logistics" },
        { value: "india_reselling", label: "India-Product Reselling" },
        { value: "us_reselling", label: "US-Product Reselling" },
        { value: "print_on_demand", label: "Print-on-Demand" },
        { value: "subscription", label: "Subscription Boxes" },
    ],
    impexp: [
        { value: "agro", label: "Food & Agro" },
        { value: "ayurveda", label: "Ayurveda / Herbal" },
        { value: "textiles", label: "Textiles / Apparels" },
        { value: "auto_parts", label: "Auto Parts" },
        { value: "electronics", label: "IT Hardware / Electronics" },
        { value: "jewelry", label: "Jewelry / Handicrafts" },
        { value: "pharma", label: "Pharmaceuticals" },
        { value: "sourcing", label: "Sourcing Agents" },
    ],
    offshore: [
        { value: "lpo", label: "Legal Process Outsourcing" },
        { value: "medical_billing", label: "Medical Billing / RCM" },
        { value: "accounting", label: "Accounting & Tax Filing" },
        { value: "paralegal", label: "Virtual Paralegal Support" },
        { value: "call_center", label: "Call Center Operations" },
        { value: "kpo", label: "KPO / Market Research" },
        { value: "content", label: "Content & Social Media" },
    ],
};


export const GEN_CATEGORIES: GenCategory[] = GEN_CATEGORIES_DATA.map(cat => ({
    ...cat,
    subCats: SUB_CATS_DATA[cat.value].map(sub => ({
        ...sub,
        revenueRange: parseRevenue(sub.estimatedRevenue || ''),
    })),
}));


const steps = [
    { title: "Category", description: "Choose your business type" },
    { title: "Budget & Geography", description: "Set investment and location" },
    { title: "Sub-category", description: "Pick specific business model" },
    { title: "Action Plan", description: "Get your next steps" },
];


// ---------- DYNAMIC PROMPTS GENERATOR ----------
const generateDynamicPrompts = (
    category: GenCategory,
    subCategory: SubCat,
    budget: [number, number],
    geography: { label: string; value: string },
    interests: { label: string; value: string }[] // UPDATED TYPE
): string[] => {
    const prompts: string[] = [];


    // Budget-based prompt
    if (budget[1] < subCategory.revenueRange[0]) {
        prompts.push(`Your budget of $${budget[0]}K-$${budget[1]}K is lean for a typical '${subCategory.label}' venture. We suggest focusing on a niche market or a phased rollout. Would you like to explore low-cost entry strategies?`);
    } else {
        prompts.push(`With an investment capacity of $${budget[0]}K-$${budget[1]}K, you are well-positioned to start a '${subCategory.label}' business. Have you allocated funds for marketing and operational costs?`);
    }


    // Geography-based prompt
    const stateName = geography.label.split(' ')[1];
    prompts.push(`For your target market in ${stateName}, it's crucial to understand local regulations and competition. Would you like a detailed market analysis for key cities like ${geography.label.split('(')[1].replace(')', '')}?`);


    // UPDATED: Interest-based prompt
    if (interests.length > 0) {
        const interestLabels = interests.map(i => i.label);
        prompts.push(`Your interest in '${interestLabels.join(', ')}' aligns well with this business model. We recommend tailoring your services to these niches. For example, consider focusing on ${interestLabels[0]}-specific solutions.`);
    } else {
        prompts.push("You haven't specified any niche interests. We recommend researching trending sub-markets within your chosen field to gain a competitive edge. Would you like to see a report on profitable niches?");
    }


    // Add one or two generic prompts from the category
    prompts.push(category.prompts[0]);
    if (category.prompts.length > 3) {
        prompts.push(category.prompts[3]);
    }


    return prompts;
};


// ---------- FULLSCREEN ANALYZING COMPONENT ----------
const FullScreenAnalysis = ({ onComplete }: { onComplete: () => void }) => {
    const analysisSteps = [
        { text: "Analyzing your inputs...", icon: <FileText className="h-10 w-10" /> },
        { text: "Calculating market potential...", icon: <LineChart className="h-10 w-10" /> },
        { text: "Generating personalized action plan...", icon: <BrainCircuit className="h-10 w-10" /> },
    ];
    const [currentStep, setCurrentStep] = useState(0);


    useEffect(() => {
        if (currentStep < analysisSteps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(s => s + 1);
            }, 1500); // Increased duration for a better feel
            return () => clearTimeout(timer);
        } else {
            const completeTimer = setTimeout(onComplete, 500); // A small delay before disappearing
            return () => clearTimeout(completeTimer);
        }
    }, [currentStep, onComplete, analysisSteps.length]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6 text-2xl font-semibold text-white"
                >
                    {analysisSteps[currentStep]?.icon}
                    <span>{analysisSteps[currentStep]?.text}</span>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};


// ---------- MAIN COMPONENT ----------
export default function BusinessIdeaGenerator() {
    const [step, setStep] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [category, setCategory] = useState<GenCategory | null>(null);
    const [budget, setBudget] = useState<[number, number]>([10, 50]);
    const [geography, setGeography] = useState<{ label: string; value: string } | null>(null);
    const [chosenSub, setChosenSub] = useState<SubCat | null>(null);
    const [dynamicPrompts, setDynamicPrompts] = useState<string[]>([]);

    // UPDATED: State for interests now uses object array for react-select
    const [interests, setInterests] = useState<{ label: string; value: string }[]>([]);


    const startAnalysis = () => {
        if (!category || !chosenSub || !geography) return;
        setDynamicPrompts(generateDynamicPrompts(category, chosenSub, budget, geography, interests));
        setIsAnalyzing(true);
    };


    const finishAnalysis = () => {
        setIsAnalyzing(false);
        setStep(s => Math.min(s + 1, 3));
    };


    const next = () => {
        if (step === 2) {
            startAnalysis();
        } else {
            setStep(s => Math.min(s + 1, 3));
        }
    };


    const back = () => setStep(s => Math.max(s - 1, 0));


    const handleCategory = (c: GenCategory) => {
        setCategory(c);
        setBudget(c.budget);
        setChosenSub(null);
        setInterests([]); // Reset interests when category changes
    };

    const resetAll = () => {
        setStep(0);
        setIsAnalyzing(false);
        setCategory(null);
        setChosenSub(null);
        setGeography(null);
        setInterests([]);
    };


    // UPDATED: Filter and sort sub-categories based on new interest structure
    const getFilteredSubCats = () => {
        if (!category) return [];


        return category.subCats
            .map(sub => {
                const isBudgetCompatible = budget[1] >= sub.revenueRange[0] * 0.75; // a bit of leeway
                const interestMatch = interests.some(interest =>
                    sub.label.toLowerCase().includes(interest.label.toLowerCase()) ||
                    sub.description?.toLowerCase().includes(interest.label.toLowerCase())
                );
                return { ...sub, isBudgetCompatible, interestMatch };
            })
            .sort((a, b) => {
                // Prioritize interest matches, then budget compatibility
                if (a.interestMatch && !b.interestMatch) return -1;
                if (!a.interestMatch && b.interestMatch) return 1;
                if (a.isBudgetCompatible && !b.isBudgetCompatible) return -1;
                if (!a.isBudgetCompatible && b.isBudgetCompatible) return 1;
                return 0;
            });
    };


    return (
        <>
            <AnimatePresence>
                {isAnalyzing && <FullScreenAnalysis onComplete={finishAnalysis} />}
            </AnimatePresence>


            <div className="w-full max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            CrossVentura Business Idea Generator
                        </h1>
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the perfect business opportunity tailored to your budget, interests, and goals. Let us guide you through a personalized journey to entrepreneurial success.
                    </p>
                </div>


                <Card className="p-6 shadow-2xl lg:p-10 space-y-8 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                    <Stepper steps={steps} currentStep={step} className="mb-8" />


                    {/* ---------- STEP 0: CATEGORY SELECTION ---------- */}
                    {step === 0 && (
                        <AnimatePresence mode="wait">
                            <motion.div key="cat" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><Lightbulb className="w-6 h-6 text-primary" />Select Your Business Category</h2>
                                    <p className="text-muted-foreground">Choose the business category that aligns with your interests and expertise</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {GEN_CATEGORIES.map((cat) => (
                                        <Card key={cat.value} onClick={() => handleCategory(cat)} className={`p-6 cursor-pointer border-2 transition-all duration-200 hover:scale-105 ${category?.value === cat.value ? "border-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/50 hover:bg-primary/5"}`}>
                                            <div className="flex items-start gap-4">
                                                <div className="text-primary">{cat.icon}</div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-2">{cat.label}</h3>
                                                    <p className="text-sm text-muted-foreground mb-3">Budget Range: ${cat.budget[0]}K - ${cat.budget[1]}K</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {cat.subCats.slice(0, 3).map((sub) => (<Badge key={sub.label} variant="secondary" className="text-xs">{sub.label.split(' ')[0]}</Badge>))}
                                                        {cat.subCats.length > 3 && (<Badge variant="outline" className="text-xs">+{cat.subCats.length - 3} more</Badge>)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <div className="flex justify-center">
                                    <Button disabled={!category} onClick={next} size="lg" className="px-8">Continue<ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}


                    {/* ---------- STEP 1: BUDGET & GEOGRAPHY ---------- */}
                    {step === 1 && category && (
                        <AnimatePresence mode="wait">
                            <motion.div key="budget" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="space-y-8">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><DollarSign className="w-6 h-6 text-primary" />Budget & Geography Setup</h2>
                                    <p className="text-muted-foreground">Define your investment capacity and target markets</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card className="p-6 space-y-4"><DualRangeSlider min={1} max={500} value={budget} onChange={setBudget} label="Investment Budget (USD)" /></Card>
                                    <Card className="p-6 space-y-4">
                                        <Label className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-5 h-5" />Target Geography</Label>
                                        <Select
                                            options={[
                                                { label: "🇺🇸 California (Los Angeles, San Francisco, San Diego, Sacramento)", value: "CALIFORNIA" },
                                                { label: "🇺🇸 New York (New York City, Buffalo, Rochester, Albany)", value: "NEW_YORK" },
                                                { label: "🇺🇸 Texas (Houston, Dallas, Austin, San Antonio)", value: "TEXAS" },
                                                { label: "🇺🇸 Florida (Miami, Orlando, Tampa, Jacksonville)", value: "FLORIDA" },
                                                { label: "🇺🇸 Illinois (Chicago, Springfield, Naperville, Peoria)", value: "ILLINOIS" },
                                                { label: "🇺🇸 Pennsylvania (Philadelphia, Pittsburgh, Harrisburg, Allentown)", value: "PENNSYLVANIA" },
                                                { label: "🇺🇸 Ohio (Columbus, Cleveland, Cincinnati, Toledo)", value: "OHIO" },
                                                { label: "🇺🇸 Georgia (Atlanta, Savannah, Augusta, Columbus)", value: "GEORGIA" },
                                                { label: "🇺🇸 Washington (Seattle, Spokane, Tacoma, Olympia)", value: "WASHINGTON" },
                                                { label: "🇺🇸 Massachusetts (Boston, Worcester, Springfield, Cambridge)", value: "MASSACHUSETTS" },
                                                { label: "🇺🇸 Michigan (Detroit, Grand Rapids, Lansing, Ann Arbor)", value: "MICHIGAN" },
                                                { label: "🇺🇸 North Carolina (Charlotte, Raleigh, Durham, Greensboro)", value: "NORTH_CAROLINA" },
                                                { label: "🇺🇸 Virginia (Richmond, Virginia Beach, Norfolk, Arlington)", value: "VIRGINIA" },
                                                { label: "🇺🇸 Arizona (Phoenix, Tucson, Mesa, Scottsdale)", value: "ARIZONA" },
                                                { label: "🇺🇸 Colorado (Denver, Colorado Springs, Boulder, Aurora)", value: "COLORADO" },
                                            ]}
                                            onChange={(opt) => setGeography(opt)}
                                            placeholder="Choose your target state & cities"
                                            className="react-select-container"
                                            classNamePrefix="react-select"
                                        />

                                        {geography && (<div className="mt-2 p-3 bg-primary/10 rounded-md"><p className="text-sm text-primary font-medium">Selected: {geography.label}</p></div>)}
                                    </Card>
                                </div>

                                {/* UPDATED: Replaced Input with Select for Interests */}
                                <Card className="p-6 space-y-4">
                                    <Label className="text-lg font-semibold flex items-center gap-2"><Target className="w-5 h-5" />Interests & Keywords</Label>
                                    <p className="text-sm text-muted-foreground">Select your interests, skills, or market focus from the category-specific list below.</p>
                                    <Select
                                        isMulti
                                        options={category ? INTERESTS_DATA[category.value] : []}
                                        value={interests}
                                        onChange={(selectedOptions) => setInterests(selectedOptions as any)}
                                        placeholder="Select your interests or skills..."
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                    />
                                </Card>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={back}>Back</Button>
                                    <Button disabled={!geography} onClick={next}>Continue<ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}


                    {/* ---------- STEP 2: SUB-CATEGORY ---------- */}
                    {step === 2 && category && (
                        <AnimatePresence mode="wait">
                            <motion.div key="subcat" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><Building2 className="w-6 h-6 text-primary" />Choose Your Business Model</h2>
                                    <p className="text-muted-foreground">Select a business model within {category.label}. We've sorted them based on your budget and interests.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {getFilteredSubCats().map((sub) => (
                                        <Card key={sub.label} onClick={() => setChosenSub(sub)} className={`p-4 cursor-pointer border-2 transition-all duration-200 hover:scale-105 ${chosenSub?.label === sub.label ? "border-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/50 hover:bg-primary/5"} ${!sub.isBudgetCompatible && 'opacity-60 hover:opacity-100'}`}>
                                            <div className="space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-2">
                                                        <Briefcase className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                                        <h3 className="font-semibold text-sm leading-tight">{sub.label}</h3>
                                                    </div>
                                                    {sub.interestMatch && <Badge variant="default" className="text-xs bg-green-600">Recommended</Badge>}
                                                </div>
                                                {sub.description && (<p className="text-xs text-muted-foreground pl-6">{sub.description}</p>)}
                                                {sub.estimatedRevenue && (
                                                    <div className="flex items-center gap-1 pl-6">
                                                        <TrendingUp className="w-3 h-3 text-green-600" />
                                                        <Badge variant="outline" className="text-xs">{sub.estimatedRevenue}</Badge>
                                                        {!sub.isBudgetCompatible && <Badge variant="destructive" className="text-xs">High Budget</Badge>}
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={back}>Back</Button>
                                    <Button disabled={!chosenSub} onClick={next}>Generate Action Plan<ArrowRight className="ml-2 w-4 h-4" /></Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}


                    {/* ---------- STEP 3: ACTION PLAN ---------- */}
                    {step === 3 && category && chosenSub && !isAnalyzing && (
                        <AnimatePresence mode="wait">
                            <motion.div key="prompts" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="space-y-6">
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-semibold flex items-center justify-center gap-2"><CheckCircle className="w-6 h-6 text-primary" />Your Personalized Action Plan</h2>
                                    <p className="text-muted-foreground">Here's what we recommend for your business journey</p>
                                </div>
                                <Card className="p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="text-primary">{category.icon}</div>
                                            <div>
                                                <h3 className="text-xl font-bold text-primary">{category.label}</h3>
                                                <p className="text-lg font-semibold text-foreground">{chosenSub.label}</p>
                                                {chosenSub.description && (<p className="text-muted-foreground mt-1">{chosenSub.description}</p>)}
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Investment</p>
                                                    <p className="text-lg font-semibold">${budget[0]}K - ${budget[1]}K</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Market</p>
                                                    <p className="text-lg font-semibold">{geography?.label.split(' ')[1]}</p>
                                                </div>
                                            </div>
                                            {chosenSub.estimatedRevenue && (
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">Revenue Potential</p>
                                                        <p className="text-lg font-semibold text-green-600">{chosenSub.estimatedRevenue}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-6">
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" />Next Steps & Key Questions</h4>
                                    <div className="space-y-3">
                                        {dynamicPrompts.map((prompt, index) => (
                                            <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                                                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">{index + 1}</div>
                                                <p className="text-sm">{prompt}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="outline" onClick={back} className="sm:order-1">Back to Edit</Button>
                                    <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 sm:order-2">Book Free Consultation<ArrowRight className="ml-2 w-4 h-4" /></Button>
                                    <Button variant="secondary" className="sm:order-3">Download Action Plan</Button>
                                </div>
                                <div className="text-center pt-4">
                                    <Button variant="ghost" onClick={resetAll} className="text-muted-foreground">Start Over with a Different Idea</Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}

                </Card>
            </div>
        </>
    );
}
