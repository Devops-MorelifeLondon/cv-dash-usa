"use client";

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Check, Briefcase, History, Globe2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ------------------------- Stepper UI Components -------------------------
interface StepProps {
    title: string;
    description?: string;
    isActive: boolean;
    isCompleted: boolean;
    isLast: boolean;
    stepNumber: number;
}

const Step = ({ title, description, isActive, isCompleted, isLast, stepNumber }: StepProps) => {
    return (
        <div className={cn("flex md:block", !isLast && "flex-1")}>
            <div className="flex items-center md:flex-col md:items-center">
                <div className={cn("flex flex-col items-center relative", !isLast && "md:hidden")}>
                     <div className={cn(
                        "absolute top-10 left-1/2 -translate-x-1/2 h-full w-0.5 md:hidden",
                        isCompleted ? "bg-primary" : "bg-muted"
                    )}></div>
                </div>
                <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors z-10",
                    isCompleted ? "bg-primary border-primary text-primary-foreground" :
                    isActive ? "border-primary text-primary bg-background" : "border-muted-foreground text-muted-foreground bg-background"
                )}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm font-medium">{stepNumber}</span>}
                </div>
                <div className="ml-4 md:ml-0 md:mt-2 text-left md:text-center">
                    <div className={cn("text-sm font-medium", isActive ? "text-primary" : "text-muted-foreground")}>{title}</div>
                    {description && <div className="text-sm text-muted-foreground mt-1">{description}</div>}
                </div>
            </div>
            {!isLast && (
                <div className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors hidden md:block mt-4",
                    isCompleted ? "bg-primary" : "bg-muted"
                )}></div>
            )}
        </div>
    );
};

interface StepperProps {
    steps: Array<{ title: string; description?: string }>;
    currentStep: number;
    className?: string;
}

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
    return (
        <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-y-8 md:gap-y-0", className)}>
            {steps.map((step, index) => (
                <Step
                    key={index}
                    title={step.title}
                    description={step.description}
                    stepNumber={index + 1}
                    isActive={index === currentStep}
                    isCompleted={index < currentStep}
                    isLast={index === steps.length - 1}
                />
            ))}
        </div>
    );
};

// ------------------------- Static Data -------------------------
const BROAD_BACKGROUNDS = [
    { id: 'tech', label: 'Technology & IT', icon: '💻', desc: 'Software, AI, Cloud, Digital' },
    { id: 'finance', label: 'Finance, Accounting & Legal', icon: '⚖️', desc: 'Banking, Compliance, Tax' },
    { id: 'marketing', label: 'Marketing, Sales & Branding', icon: '📈', desc: 'Branding, Digital Marketing' },
    { id: 'manufacturing', label: 'Manufacturing & Product Development', icon: '🏭', desc: 'Factories, Product Design' },
    { id: 'trading', label: 'Trading & Business Development', icon: '🤝', desc: 'Wholesale, Imports & Exports' },
    { id: 'logistics', label: 'Logistics & Supply Chain', icon: '🚚', desc: 'Warehousing, Fleet Management' },
    { id: 'healthcare', label: 'Healthcare & Life Sciences', icon: '❤️', desc: 'Medical, Wellness, Pharma' },
    { id: 'education', label: 'Education & Training', icon: '🎓', desc: 'EdTech, Training Platforms' },
    { id: 'creative', label: 'Creative, Arts & Lifestyle', icon: '🎨', desc: 'Design, Arts, Handicrafts' },
    { id: 'agriculture', label: 'Agriculture & Food', icon: '🌾', desc: 'Farming, Food Processing' },
    { id: 'realestate', label: 'Real Estate & Infrastructure', icon: '🏢', desc: 'Properties, Smart Cities' },
    { id: 'general', label: 'General Management & Multi-Skilled', icon: '🌟', desc: 'Leadership, Consulting' },
    { id: 'energy', label: 'Energy & Renewables', icon: '💡', desc: 'Solar, Wind, Sustainable Energy'},
    { id: 'tourism', label: 'Tourism & Hospitality', icon: '✈️', desc: 'Travel, Eco-Tourism, Hotels'},
    { id: 'retail', label: 'Retail & Consumer Services', icon: '🛍️', desc: 'Offline/Online Retail, Services'},
    { id: 'environment', label: 'Environment & Sustainability', icon: '♻️', desc: 'Eco-Projects, Waste Management'}
];

const CATEGORY_MAPPING = {
    tech: ['Tech & Digital Solutions', 'E-Commerce & D2C', 'Smart Logistics & Warehousing', 'Integrated Supply Chain (B2B)'],
    finance: ['Financial & FinTech Services', 'Legal, Compliance & Advisory', 'Offshore Service Hubs', 'E-Commerce & D2C'],
    marketing: ['Digital Marketing & Brand Growth', 'E-Commerce & D2C', 'Consumer Products & Lifestyle Goods', 'Education & Skilling'],
    manufacturing: ['Innovative Manufacturing & Production', 'Consumer Products & Lifestyle Goods', 'Import/Export Excellence', 'Integrated Supply Chain (B2B)'],
    trading: ['Domestic & International Trading', 'Import/Export Excellence', 'E-Commerce & D2C'],
    logistics: ['Smart Logistics & Warehousing', 'Integrated Supply Chain (B2B)', 'Domestic & International Trading'],
    healthcare: ['Healthcare & Wellness', 'Consumer Products & Lifestyle Goods', 'Education & Skilling'],
    education: ['Education & Skilling', 'Offshore Service Hubs', 'Digital Marketing & Brand Growth', 'Adult Upskilling Products'],
    creative: ['E-Commerce & D2C', 'Consumer Products & Lifestyle Goods', 'Digital Marketing & Brand Growth'],
    agriculture: ['Agriculture & Food', 'Import/Export Excellence', 'Consumer Products & Lifestyle Goods'],
    realestate: ['Real Estate & Smart Cities', 'Consumer Products & Lifestyle Goods', 'Integrated Supply Chain (B2B)'],
    general: ['E-Commerce & D2C', 'Offshore Service Hubs', 'Integrated Supply Chain (B2B)', 'Financial & FinTech Services'],
    energy: ['Energy & Renewables Solutions', 'Integrated Supply Chain (B2B)', 'Agriculture & Food', 'Real Estate & Smart Cities'],
    tourism: ['Digital Marketing & Brand Growth', 'E-Commerce & D2C', 'Healthcare & Wellness', 'Creative, Arts & Lifestyle'],
    retail: ['Consumer Products & Lifestyle Goods', 'E-Commerce & D2C', 'Domestic & International Trading', 'Digital Marketing & Brand Growth'],
    environment: ['Environment & Sustainability', 'Healthcare & Wellness', 'Agriculture & Food', 'Smart Logistics & Warehousing']
};

// UPDATED: Business Opportunities in the USA
const GLOBAL_OPPORTUNITIES = [
    { 
        title: 'Technology & Artificial Intelligence', 
        desc: 'AI-powered SaaS solutions, cybersecurity services for enterprises, cloud infrastructure management, and data analytics platforms.', 
        reason: 'Silicon Valley\'s dominance, massive R&D funding, and widespread corporate adoption of AI and cloud tech drive continuous growth.', 
        icon: '🤖' 
    },
    { 
        title: 'Healthcare & Biotechnology', 
        desc: 'Development of personalized medicine, advanced medical devices, telehealth platforms, and biotech research for novel therapies.', 
        reason: 'An aging population, high healthcare spending, and world-leading research institutions create a robust market for health innovation.', 
        icon: '🧬' 
    },
    { 
        title: 'Renewable Energy & Cleantech', 
        desc: 'Manufacturing and installation of solar panels and wind turbines, EV charging infrastructure development, and grid-scale battery storage solutions.', 
        reason: 'Strong government incentives like the Inflation Reduction Act, corporate sustainability goals, and falling costs drive a nationwide energy transition.', 
        icon: '🔋' 
    },
    { 
        title: 'Advanced Manufacturing & Reshoring', 
        desc: 'Semiconductor fabrication plants (fabs), aerospace and defense components, and robotics and automation systems for industrial use.', 
        reason: 'A push for supply chain resilience, reinforced by legislation like the CHIPS Act, and automation make domestic manufacturing cost-competitive.', 
        icon: '🏭' 
    },
    { 
        title: 'E-commerce & Logistics', 
        desc: 'Direct-to-Consumer (D2C) brands, automated warehousing, last-mile delivery robotics, and supply chain optimization software.', 
        reason: 'A mature consumer market with high online penetration creates continuous demand for faster, more efficient delivery and personalized shopping.', 
        icon: '📦' 
    },
    { 
        title: 'FinTech & Digital Assets', 
        desc: 'Digital payment platforms, blockchain-based financial solutions, automated wealth management (robo-advisors), and regulatory technology (RegTech).', 
        reason: 'The world\'s largest financial market is rapidly digitizing, with growing acceptance of digital assets and demand for frictionless services.', 
        icon: '💳' 
    },
    { 
        title: 'Entertainment & Digital Media', 
        desc: 'Content production for streaming platforms, video game development, VR/AR experiences, and creator economy tools.', 
        reason: 'Global demand for American media content remains high, and the US is the largest market for video games and interactive entertainment.', 
        icon: '🎬' 
    },
    { 
        title: 'Real Estate & Infrastructure', 
        desc: 'Build-to-rent housing developments, smart city technology implementation, and retrofitting commercial buildings for sustainability.', 
        reason: 'Housing shortages in key markets, federal infrastructure spending, and evolving work patterns create new real estate demands.', 
        icon: '🏙️' 
    },
    { 
        title: 'AgriTech & Food Innovation', 
        desc: 'Precision agriculture using drones and IoT, development of plant-based and cell-cultured proteins, and vertical farming in urban areas.', 
        reason: 'A need for sustainable food production and changing consumer preferences towards healthier and ethical foods drive agricultural innovation.', 
        icon: '🌱' 
    },
    { 
        title: 'Professional & EdTech Services', 
        desc: 'Specialized B2B consulting, corporate e-learning and reskilling platforms, and software solutions for remote team management.', 
        reason: 'The shift to a knowledge-based economy and remote work models requires continuous upskilling and specialized business solutions.', 
        icon: '📈' 
    },
];


// ------------------------- Helper utils -------------------------
const formatCurrency = (n) => `$${n.toLocaleString()}`;

const getScalabilityIcon = (scalability) => {
    if (scalability?.includes('Global') || scalability?.includes('International')) return '🌍';
    return '🇮🇳';
};

// ------------------------- API Functions -------------------------
async function generateBusinessIdeasWithGemini(background, category, minBudget, maxBudget, scalability) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
        console.error("API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
        return [];
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

        const prompt = `
            You are an expert business strategy consultant specializing in cross-border and international business opportunities in USA.
            Based on the following user profile, generate 5-7 innovative business ideas focused on global markets.

            User Profile:
            - Background: ${background?.label ?? 'General'}
            - Chosen Category: ${category ?? 'General Business'}
            - Budget Range: ${formatCurrency(minBudget)} to ${formatCurrency(maxBudget)}
            - Desired Scalability: ${scalability} (Focus on Cross-Border or International markets)

            Instructions:
            1.  Generate 5 to 7 distinct business ideas that have cross-border or international market potential.
            2.  For each idea, provide a 'name', a one-sentence 'description', a 'scalability' level ('Cross-Border' or 'International'), a 'skills' array of 2-3 required skills, and a 'budget' array with a min and max estimate within the user's range.
            3.  ALL ideas must focus on USA-Global business opportunities, export potential, or serving international markets.
            4.  Return the output as a valid JSON array of objects. Do NOT include any text, markdown formatting like \`\`\`json, or explanations outside of the JSON array itself. The response must start with '[' and end with ']'.

            Example JSON output format:
            [
                {
                    "name": "Export-Ready Sustainable Packaging Solutions",
                    "description": "Manufacturing eco-friendly packaging materials for USA exporters selling to environmentally-conscious global markets.",
                    "budget": [50000, 150000],
                    "skills": ["Manufacturing", "Export Compliance", "Sustainability"],
                    "scalability": "International"
                }
            ]
        `;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        
        const startIndex = text.indexOf('[');
        const endIndex = text.lastIndexOf(']');
        
        if (startIndex === -1 || endIndex === -1) {
            console.error("Could not find a JSON array in the response.");
            return [];
        }

        const jsonString = text.substring(startIndex, endIndex + 1);

        try {
            const parsedJson = JSON.parse(jsonString);
            return parsedJson;
        } catch (parseError) {
            console.error("Failed to parse JSON from response:", parseError);
            console.error("Extracted JSON String that failed:", jsonString);
            return [];
        }

    } catch (err) {
        console.error("Idea Generation Error:", err);
        return [];
    }
}

async function generateFinalPlanWithGemini(idea, background, minBudget, maxBudget, teamSize, selectedCategory) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
        return "Error: API key not configured. Set VITE_GEMINI_API_KEY in your environment.";
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            You are an expert business strategy consultant specializing in the USA market and cross-border opportunities.
            Generate a complete, original business launch strategy based on the user's profile and selected business idea.

            Use the following inputs:
            - User Background: ${background?.label ?? 'N/A'}
            - Selected Business Category: ${selectedCategory ?? 'General'}
            - Business Idea Name: ${idea.name}
            - Business Idea Description: ${idea.description}
            - Business Scalability: ${idea.scalability || 'Cross-Border'}
            - Budget Range: ${formatCurrency(minBudget)} to ${formatCurrency(maxBudget)}
            - Team Size: ${teamSize === 'solo' ? 'Solo entrepreneur' : 'Small team'}

            Output Requirements:
            - Structure the content with clear headings for each section (use markdown H2 and H3).
            - Include bullet points for readability and actionability.
            - Make the content concise, strategic, and implementable.
            - Focus on practical steps, market entry strategies, and cross-border considerations.

            Sections to Include:
            1.  **Executive Summary**: Business overview, unique value proposition, and international market fit.
            2.  **Market Opportunity**: Target markets (domestic and international), market size, competitive landscape, and entry barriers.
            3.  **Product/Service Offering**: Core offerings, key features, pricing strategy, and customer benefits.
            4.  **Go-to-Market Strategy**: Marketing channels, sales approach, distribution strategy, and international partnership opportunities.
            5.  **Financial Snapshot**: Budget allocation breakdown, revenue projections, cost structure, and profitability timeline.
            6.  **Regulatory & Compliance**: Export licenses, certifications, legal requirements, and cross-border considerations.
            7.  **90-Day Action Plan**: Week-by-week roadmap for validation, setup, and initial launch activities.
            8.  **Risk Mitigation**: Key risks and mitigation strategies for cross-border operations.
        `;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return text;

    } catch (err) {
        console.error("Plan generation error:", err);
        return `Error: Could not generate business plan. Error: ${err?.message ?? String(err)}.`;
    }
}

// ------------------------- Main UI component -------------------------
export default function BusinessGeneratorWithGeminiV2() {
    const [step, setStep] = useState(1);
    const [userBackground, setUserBackground] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    // UPDATED: Budget range with min/max
    const [minBudget, setMinBudget] = useState(20000);
    const [maxBudget, setMaxBudget] = useState(200000);
    
    const [teamSize, setTeamSize] = useState('solo');
    
    // UPDATED: Removed "All" and "LOCAL" options
    const [scalabilityFilter, setScalabilityFilter] = useState('Cross-Border');
    
    const [generatedIdeas, setGeneratedIdeas] = useState([]);
    const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
    
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [customIdea, setCustomIdea] = useState({ name: '', description: '', scalability: 'Cross-Border' });
    const [finalPlan, setFinalPlan] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // UPDATED: History feature with localStorage
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    const steps = [
        { title: 'Explore', description: 'Market opportunities' },
        { title: 'Select Background', description: 'Choose your expertise' },
        { title: 'Choose Category', description: 'Pick business focus' },
        { title: 'Budget & Team', description: 'Set your resources' },
        { title: 'View Ideas', description: 'Expert-curated options' },
        { title: 'Custom Idea', description: 'Or create your own' },
        { title: 'Get Blueprint', description: 'Your strategic plan' },
    ];

    // Load history on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('businessIdeaHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Error loading history:', e);
            }
        }
    }, []);

    const restart = () => {
        setStep(1);
        setUserBackground(null);
        setSelectedCategory(null);
        setMinBudget(20000);
        setMaxBudget(200000);
        setTeamSize('solo');
        setScalabilityFilter('Cross-Border');
        setSelectedIdea(null);
        setFinalPlan('');
        setCustomIdea({ name: '', description: '', scalability: 'Cross-Border' });
        setIsLoading(false);
        setGeneratedIdeas([]);
        setIsGeneratingIdeas(false);
    };

    const handleGeneratePlan = async (idea) => {
        setIsLoading(true);
        setStep(7);
        const ideaToGenerate = idea?.name ? idea : customIdea;
        setSelectedIdea(ideaToGenerate);
        const plan = await generateFinalPlanWithGemini(ideaToGenerate, userBackground, minBudget, maxBudget, teamSize, selectedCategory);
        setFinalPlan(plan);
        setIsLoading(false);
        
        // Save to history
        const newHistoryEntry = {
            ...ideaToGenerate,
            timestamp: new Date().toISOString(),
            background: userBackground?.label,
            category: selectedCategory,
            budgetRange: `${formatCurrency(minBudget)} - ${formatCurrency(maxBudget)}`
        };
        
        setHistory(prevHistory => {
            const updatedHistory = [newHistoryEntry, ...prevHistory].slice(0, 50); // Keep last 50
            localStorage.setItem('businessIdeaHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };

    useEffect(() => {
        const fetchIdeas = async () => {
            if (step === 5 && userBackground && selectedCategory) {
                setIsGeneratingIdeas(true);
                setGeneratedIdeas([]);
                const ideas = await generateBusinessIdeasWithGemini(userBackground, selectedCategory, minBudget, maxBudget, scalabilityFilter);
                setGeneratedIdeas(ideas);
                setIsGeneratingIdeas(false);
            }
        };
        fetchIdeas();
    }, [step, userBackground, selectedCategory, minBudget, maxBudget, scalabilityFilter]);
    
    // UPDATED: Step 1 - Global Business Opportunities
    const renderStep1Opportunities = () => (
        <section>
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                    <Globe2 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Cross-Border Focus</span>
                </div>
                 
            <div className="my-10 text-center bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Build Your Own Cross-Border Business?</h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    Get a customized business strategy tailored to your background, budget, and market goals with guidance from our expert consultants.
                </p>
                <button 
                    onClick={() => setStep(2)} 
                    className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                >
                    Start Building My Business Idea →
                </button>
            </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Global Business Opportunities in USA 🌍</h2>
                <p className="text-slate-600 mb-2 max-w-3xl mx-auto">
                    USA's strategic position and robust economy make it an ideal launchpad for international ventures. Explore these high-growth sectors with expert-curated insights.
                </p>
                <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                    Each opportunity represents real market potential backed by government initiatives, global demand, and USA's competitive advantages.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {GLOBAL_OPPORTUNITIES.map((opp, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all">
                        <div className="flex items-start mb-4">
                            <span className="text-3xl mr-3 flex-shrink-0">{opp.icon}</span>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 mb-2">{opp.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{opp.desc}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
                            <p className="text-xs font-semibold text-blue-900 mb-1">Why This Opportunity?</p>
                            <p className="text-sm text-slate-700">{opp.reason}</p>
                        </div>
                        <button 
                            onClick={() => window.location.href='mailto:experts@yourdomain.com?subject=Consultation Request: ' + opp.title + '&body=I would like to discuss opportunities in ' + opp.title + ' and explore how to enter this market.'} 
                            className="w-full text-center px-4 py-3 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                        >
                            Connect with Expert Consultant
                        </button>
                    </div>
                ))}
            </div>
           
        </section>
    );

    const renderStep2 = () => (
        <section>
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2 mb-6">Step 2: Select Your Primary Background</h2>
            <p className="text-slate-600 mb-6">Our consultants will use this to recommend the most suitable cross-border opportunities for you.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BROAD_BACKGROUNDS.map(bg => (
                    <div
                        key={bg.id}
                        onClick={() => { setUserBackground(bg); setSelectedCategory(null); setStep(3); }}
                        title={bg.desc}
                        className="p-4 border-2 rounded-xl cursor-pointer transition-all bg-white hover:border-blue-500 hover:shadow-lg hover:scale-105"
                    >
                        <span className="text-3xl" role="img">{bg.icon}</span>
                        <h3 className="font-bold text-md sm:text-lg mt-2 text-slate-800">{bg.label}</h3>
                        <p className="hidden sm:block text-sm text-slate-500 mt-1">{bg.desc}</p>
                    </div>
                ))}
            </div>
             <div className="mt-6">
                <button onClick={() => setStep(1)} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300">← Back to Opportunities</button>
            </div>
        </section>
    );

    const renderStep3 = () => (
        <section>
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2 mb-6">Step 3: Recommended Business Categories</h2>
            <p className="text-slate-600 mb-4">Based on your <span className="font-semibold">{userBackground?.label}</span> background, our experts recommend these international market-focused categories.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(CATEGORY_MAPPING[userBackground?.id] || []).slice(0, 4).map(cat => (
                    <div
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setStep(4); }}
                        className="p-5 border-2 rounded-xl cursor-pointer transition-all bg-white hover:border-blue-500 hover:shadow-lg hover:scale-105"
                    >
                        <h3 className="font-bold text-lg text-slate-800">{cat}</h3>
                        <p className="text-sm text-slate-500 mt-2">Tap to explore opportunities →</p>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <button onClick={() => setStep(2)} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300">← Back</button>
            </div>
        </section>
    );

    // UPDATED: Step 4 with Budget Range Selector
    const renderStep4 = () => (
        <section>
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2 mb-6">Step 4: Budget Range, Team & Market Focus</h2>
            <div className="space-y-6">
                {/* UPDATED: Budget Range Selector */}
                <div className="p-6 bg-white rounded-lg border-2 border-slate-200">
                    <label className="block text-lg font-medium text-slate-700 mb-4">Investment Budget Range</label>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-600">Minimum Budget</span>
                                <span className="text-base font-bold text-blue-600">{formatCurrency(minBudget)}</span>
                            </div>
                            <input
                                type="range" 
                                min="20000" 
                                max="500000" 
                                step="10000"
                                value={minBudget}
                                onChange={(e) => {
                                    const newMin = Number(e.target.value);
                                    setMinBudget(newMin);
                                    if (newMin > maxBudget) {
                                        setMaxBudget(newMin);
                                    }
                                }}
                                className="w-full h-2 bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>$20,000</span>
                                <span>$5,00,000</span>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-slate-600">Maximum Budget</span>
                                <span className="text-base font-bold text-indigo-600">{formatCurrency(maxBudget)}</span>
                            </div>
                            <input
                                type="range" 
                                min="20000" 
                                max="1000000" 
                                step="10000"
                                value={maxBudget}
                                onChange={(e) => {
                                    const newMax = Number(e.target.value);
                                    setMaxBudget(newMax);
                                    if (newMax < minBudget) {
                                        setMinBudget(newMax);
                                    }
                                }}
                                className="w-full h-2 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>$20,000</span>
                                <span>$10,00,000+</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-slate-700">
                            <span className="font-semibold">Your Budget Range:</span> {formatCurrency(minBudget)} - {formatCurrency(maxBudget)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Our consultants will recommend ideas within this range</p>
                    </div>
                </div>
                
                <div className="p-6 bg-white rounded-lg border-2 border-slate-200">
                    <h3 className="text-lg font-medium mb-4">Team Structure</h3>
                    <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer">
                            <input 
                                type="radio" 
                                value="solo" 
                                checked={teamSize === 'solo'} 
                                onChange={e => setTeamSize(e.target.value)} 
                                className="sr-only peer" 
                            />
                            <div className="p-4 border-2 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-blue-300">
                                <p className="font-semibold text-slate-800">Solo Entrepreneur</p>
                                <p className="text-sm text-slate-600 mt-1">Individual effort, full control</p>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input 
                                type="radio" 
                                value="team" 
                                checked={teamSize === 'team'} 
                                onChange={e => setTeamSize(e.target.value)} 
                                className="sr-only peer" 
                            />
                            <div className="p-4 border-2 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-blue-300">
                                <p className="font-semibold text-slate-800">With Team</p>
                                <p className="text-sm text-slate-600 mt-1">Collaborative approach</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* UPDATED: Removed "All" and "LOCAL" options */}
                <div className="p-6 bg-white rounded-lg border-2 border-slate-200">
                    <h3 className="text-lg font-medium mb-4">Market Scalability Focus</h3>
                    <select
                        value={scalabilityFilter}
                        onChange={(e) => setScalabilityFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                        <option value="Cross-Border">Cross-Border (USA + Neighboring Markets)</option>
                        <option value="International">International (Global Markets)</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-2">All opportunities focus on international market potential</p>
                </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
                <button onClick={() => setStep(3)} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300">← Back</button>
                <button onClick={() => setStep(5)} className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md">View Expert Recommendations →</button>
            </div>
        </section>
    );

    // UPDATED: Step 5 with new CTAs
    const renderStep5 = () => (
        <section>
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2 mb-6">Step 5: Expert-Curated Business Ideas</h2>
            <p className="text-slate-600 mb-6">Our consultants have curated these opportunities based on your profile, budget, and market preferences.</p>
            
            {isGeneratingIdeas ? (
                 <div className="text-center p-12 bg-white rounded-xl border-2 border-blue-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-slate-700 font-medium mt-4">Our expert consultants are analyzing opportunities...</p>
                    <p className="text-slate-500 text-sm mt-2">Customizing recommendations based on your profile</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {generatedIdeas.length > 0 ? generatedIdeas.map((idea, index) => (
                        <div key={index} className="p-6 border-2 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all hover:border-blue-300">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-xl text-slate-800 pr-4">{idea.name}</h4>
                                <span className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 flex-shrink-0">
                                    {getScalabilityIcon(idea.scalability)}
                                    {idea.scalability}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">{idea.description}</p>
                            <div className="text-sm text-slate-600 mb-4 flex flex-wrap gap-x-6 gap-y-2 bg-slate-50 p-3 rounded-lg">
                                {idea.budget && (
                                    <span className="flex items-center gap-1">
                                        <strong className="text-slate-700">Budget:</strong> 
                                        <span className="font-medium text-blue-700">{formatCurrency(idea.budget[0])} - {formatCurrency(idea.budget[1])}</span>
                                    </span>
                                )}
                                {idea.skills && (
                                    <span className="flex items-center gap-1">
                                        <strong className="text-slate-700">Key Skills:</strong> 
                                        <span className="text-slate-600">{idea.skills.join(', ')}</span>
                                    </span>
                                )}
                            </div>
                            
                            {/* UPDATED: Three CTAs */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <button 
                                    onClick={() => handleGeneratePlan(idea)} 
                                    className="px-4 py-3 text-sm rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
                                >
                                    📋 Get the Playbook
                                </button>
                                <button 
                                    onClick={() => window.location.href='mailto:experts@yourdomain.com?subject=Consultation: ' + idea.name + '&body=I would like to discuss the business roadmap for: ' + idea.name} 
                                    className="px-4 py-3 text-sm rounded-lg font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 transition-all border-2 border-blue-200"
                                >
                                    👨‍💼 Book Expert Consultation
                                </button>
                                <button 
                                    onClick={() => handleGeneratePlan(idea)} 
                                    className="px-4 py-3 text-sm rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border-2 border-slate-200"
                                >
                                    🤖 Get Strategy Roadmap
                                </button>
                            </div>
                        </div>
                    )) : (
                         <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                            <p className="text-slate-700 font-medium">No ideas match your current criteria.</p>
                            <p className="text-slate-600 text-sm mt-2">Try adjusting your budget range or market focus, or create a custom idea below.</p>
                        </div>
                    )}

                    <div 
                        onClick={() => setStep(6)} 
                        className="p-6 border-2 border-dashed border-green-300 rounded-xl cursor-pointer transition-all bg-gradient-to-r from-green-50 to-emerald-50 hover:border-green-500 hover:shadow-lg hover:scale-102"
                    >
                        <h4 className="font-bold text-xl text-green-800 text-center">+ Have Your Own Idea?</h4>
                        <p className="text-sm text-slate-600 text-center mt-2">Share your business concept and get a customized strategic plan from our consultants.</p>
                    </div>
                </div>
            )}
             <div className="mt-6">
                <button onClick={() => setStep(4)} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300">← Back</button>
            </div>
        </section>
    );
    
    const renderStep6CustomIdea = () => (
        <section>
            <h2 className="text-2xl font-semibold text-slate-700 border-b pb-2 mb-6">Step 6: Describe Your Custom Business Idea</h2>
            <p className="text-slate-600 mb-6">Share your business concept and our consultants will create a tailored strategic plan.</p>
            
            <div className="space-y-4 p-6 bg-white rounded-xl border-2 border-slate-200">
                <div>
                    <label htmlFor="custom-idea-name" className="block text-sm font-semibold text-slate-700 mb-2">Business Idea Name *</label>
                    <input
                        type="text" 
                        id="custom-idea-name"
                        value={customIdea.name}
                        onChange={(e) => setCustomIdea({ ...customIdea, name: e.target.value })}
                        placeholder="e.g., Export-Ready Ayurvedic Products for European Market"
                        className="block w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="custom-idea-desc" className="block text-sm font-semibold text-slate-700 mb-2">Business Description *</label>
                    <textarea
                        id="custom-idea-desc" 
                        rows={4}
                        value={customIdea.description}
                        onChange={(e) => setCustomIdea({ ...customIdea, description: e.target.value })}
                        placeholder="e.g., Manufacturing and exporting certified organic Ayurvedic wellness products to health-conscious European consumers through D2C and B2B channels."
                        className="block w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    ></textarea>
                    <p className="text-xs text-slate-500 mt-2">Describe your business model, target market, and unique value proposition</p>
                </div>
                <div>
                    <label htmlFor="custom-idea-scalability" className="block text-sm font-semibold text-slate-700 mb-2">Target Market Scalability</label>
                    <select
                        id="custom-idea-scalability"
                        value={customIdea.scalability}
                        onChange={(e) => setCustomIdea({ ...customIdea, scalability: e.target.value })}
                        className="block w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg text-sm font-medium shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                        <option value="Cross-Border">Cross-Border (USA + Regional Markets)</option>
                        <option value="International">International (Global Markets)</option>
                    </select>
                </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6">
                <button onClick={() => setStep(5)} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300">← Back</button>
                <button
                    onClick={() => handleGeneratePlan(customIdea)}
                    disabled={!customIdea.name || !customIdea.description}
                    className="px-10 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed shadow-md transition-all"
                >
                    Generate Custom Business Plan →
                </button>
            </div>
        </section>
    );

    // UPDATED: Step 7 with new playbook options
    const renderStep7FinalPlan = () => (
        <section>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Strategic Business Blueprint</h2>
                <p className="text-slate-600">
                    Custom plan for: <span className="font-semibold text-blue-700">{selectedIdea?.name || customIdea.name}</span>
                </p>
            </div>

            {isLoading ? (
                <div className="text-center p-12 bg-white rounded-xl border-2 border-blue-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-slate-700 font-medium mt-4">Our expert consultants are crafting your business plan...</p>
                    <p className="text-slate-500 text-sm mt-2">This comprehensive strategy will include market analysis, financial projections, and actionable steps</p>
                </div>
            ) : (
                <>
                    {/* UPDATED: Playbook Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">Book Consulting Session</h3>
                                    <p className="text-sm text-slate-600 mt-1">Get playbook FREE + 60-min expert consultation</p>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-4 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Complete business playbook with roadmap</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>60-minute strategy session with expert</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Market entry guidance & compliance review</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Personalized action plan refinement</span>
                                </li>
                            </ul>
                            <button 
                                onClick={() => window.location.href='mailto:experts@yourdomain.com?subject=Consulting Session Booking: ' + (selectedIdea?.name || customIdea.name) + '&body=I would like to book a consulting session to discuss my business plan for: ' + (selectedIdea?.name || customIdea.name) + '%0D%0A%0D%0APlease send me details about scheduling and next steps.'}
                                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Book Consultation Now
                            </button>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">Purchase Playbook Only</h3>
                                    <p className="text-sm text-slate-600 mt-1">Get playbook + 15-min FREE consultation</p>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-4 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Comprehensive business playbook (PDF)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>15-minute complimentary expert call</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Financial projections & templates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span>Quick Q&A to clarify key points</span>
                                </li>
                            </ul>
                            <button 
                                onClick={() => window.location.href='mailto:experts@yourdomain.com?subject=Playbook Purchase: ' + (selectedIdea?.name || customIdea.name) + '&body=I would like to purchase the business playbook for: ' + (selectedIdea?.name || customIdea.name) + '%0D%0A%0D%0APlease send me payment details and delivery information.'}
                                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                            >
                                Purchase Playbook
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b-2 border-slate-200">
                            <h3 className="font-bold text-lg text-slate-800">Business Plan Preview</h3>
                            <p className="text-sm text-slate-600 mt-1">Expert-curated strategy tailored to your requirements</p>
                        </div>
                        <div className="markdown-container p-6 prose prose-slate max-w-none">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {finalPlan || "Generating your comprehensive business strategy..."}
                            </ReactMarkdown>
                        </div>
                    </div>
                </>
            )}
            
            <div className="mt-8 flex flex-wrap gap-4">
                <button 
                    onClick={restart} 
                    className="px-8 py-3 rounded-lg font-semibold text-white bg-slate-700 hover:bg-slate-800 transition-all shadow-md"
                >
                    🔄 Generate Another Idea
                </button>
                <button 
                    onClick={() => setStep(5)} 
                    className="px-6 py-3 rounded-lg font-semibold text-slate-700 bg-gray-200 hover:bg-gray-300 transition-all"
                >
                    ← Back to Ideas
                </button>
                <button 
                    onClick={() => setShowHistory(true)} 
                    className="px-6 py-3 rounded-lg font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-all flex items-center gap-2"
                >
                    <History className="w-4 h-4" />
                    View Saved History
                </button>
            </div>
        </section>
    );
    
    // UPDATED: History Modal
    const renderHistory = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                        <History className="w-6 h-6 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Saved Business Ideas</h3>
                            <p className="text-sm text-slate-600">Your previously generated concepts</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowHistory(false)} 
                        className="text-slate-500 hover:text-slate-800 text-3xl font-bold leading-none transition-colors"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    {history.length > 0 ? (
                        <div className="space-y-4">
                            {history.map((idea, index) => (
                                <div key={index} className="p-4 border-2 rounded-lg bg-slate-50 hover:bg-white hover:border-blue-300 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800">{idea.name}</h4>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                                            {getScalabilityIcon(idea.scalability)} {idea.scalability}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{idea.description}</p>
                                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                        {idea.background && <span className="bg-slate-200 px-2 py-1 rounded">📊 {idea.background}</span>}
                                        {idea.category && <span className="bg-slate-200 px-2 py-1 rounded">🎯 {idea.category}</span>}
                                        {idea.budgetRange && <span className="bg-slate-200 px-2 py-1 rounded">💰 {idea.budgetRange}</span>}
                                        {idea.timestamp && <span className="bg-slate-200 px-2 py-1 rounded">📅 {new Date(idea.timestamp).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">No saved business ideas yet</p>
                            <p className="text-slate-400 text-sm mt-2">Generate your first idea to see it here</p>
                        </div>
                    )}
                </div>
                 <div className="p-4 border-t bg-slate-50 flex justify-between items-center">
                    <p className="text-sm text-slate-600">{history.length} saved {history.length === 1 ? 'idea' : 'ideas'}</p>
                    <button 
                        onClick={() => setShowHistory(false)} 
                        className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 font-semibold transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (step) {
            case 1: return renderStep1Opportunities();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            case 6: return renderStep6CustomIdea();
            case 7: return renderStep7FinalPlan();
            default: return renderStep1Opportunities();
        }
    };

    return (
        <div className="font-sans max-w-7xl mx-auto p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
            <header className="text-center mb-10">
                
                <h1 className="text-4xl  font-bold text-slate-800 mb-2">Business Idea Generator</h1>
                <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Expert-curated business strategies for international markets. Get consulting-backed playbooks tailored to your profile.</p>
                <div className="mt-6 flex justify-center gap-4">
                    <button 
                        onClick={() => setShowHistory(true)} 
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-all shadow-sm hover:shadow-md"
                    >
                        <History className="w-4 h-4" />
                        Saved History ({history.length})
                    </button>
                </div>
            </header>
            
            <div className="max-w-6xl mx-auto mt-8 p-6 md:p-10 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-slate-200 shadow-xl">
                <Stepper steps={steps} currentStep={step - 1} className="mb-12" />
                <main>
                    {renderContent()}
                </main>
            </div>
            
            {showHistory && renderHistory()}
            
            <footer className="text-center mt-12 text-sm text-slate-500">
                <p>© 2025 Global Business Consultancy. Expert guidance for cross-border entrepreneurs.</p>
            </footer>
        </div>
    );
}
