import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Brain, 
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const CrossAssist = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hi! I'm CrossAssist 🤖 Your AI-powered guide for global expansion. I can help you with market entry strategies, compliance questions, licensing requirements, and much more. What would you like to know?",
      timestamp: new Date(Date.now() - 5000)
    }
  ]);

  const suggestedQuestions = [
    "What licenses do I need for supplements in the USA?",
    "Which states are cheapest for LLCs?",
    "Should I start with Amazon or Shopify?",
    "Show me top exports from Gujarat",
    "What can I start with ₹5L capital?",
    "How to get FDA clearance for cosmetics?",
    "Best states for tax optimization",
    "GST requirements for foreign companies"
  ];

  const quickStats = [
    { label: "Questions Answered", value: "10,000+", icon: <MessageCircle className="w-5 h-5" /> },
    { label: "Average Response Time", value: "< 3 sec", icon: <Clock className="w-5 h-5" /> },
    { label: "Accuracy Rate", value: "96%", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Languages Supported", value: "12", icon: <Brain className="w-5 h-5" /> }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setChatHistory(prev => [...prev, {
      id: prev.length + 1,
      type: "user",
      message: message,
      timestamp: new Date()
    }]);

    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: prev.length + 1,
        type: "bot",
        message: "Thanks for your question! I'm processing your request and will provide you with detailed, accurate information. Let me analyze the latest regulations and requirements for your specific situation...",
        timestamp: new Date()
      }]);
    }, 1000);

    setMessage("");
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <Bot className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Ask <span className="text-primary">CrossAssist</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your AI-powered assistant for global expansion. Get instant, expert answers to all your market entry questions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 bg-cv-blue-light rounded-lg flex items-center justify-center text-primary mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 bg-gradient-card rounded-t-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">CrossAssist AI</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="w-2 h-2 bg-cv-success rounded-full"></div>
                      Online & Ready to Help
                    </div>
                  </div>
                  <Badge className="ml-auto bg-cv-blue-light text-primary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-muted/20">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`${chat.type === 'user' ? 'bg-primary' : 'bg-gradient-primary'} text-white text-sm`}>
                          {chat.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`rounded-lg p-3 ${
                        chat.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background border border-border/50'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                        <div className={`text-xs mt-1 ${
                          chat.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {chat.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about licensing, compliance, market entry, or anything else..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 text-foreground">Popular Questions</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-cv-blue-light/30 transition-all duration-200 text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 text-foreground">What I Can Help With</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cv-blue-light rounded-lg flex items-center justify-center">
                    🇮🇳
                  </div>
                  <div>
                    <div className="font-medium text-foreground">India Market Entry</div>
                    <div className="text-xs text-muted-foreground">GST, licensing, compliance</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cv-blue-light rounded-lg flex items-center justify-center">
                    🇺🇸
                  </div>
                  <div>
                    <div className="font-medium text-foreground">USA Expansion</div>
                    <div className="text-xs text-muted-foreground">LLC formation, state regulations</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cv-blue-light rounded-lg flex items-center justify-center">
                    📋
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Compliance Guidance</div>
                    <div className="text-xs text-muted-foreground">Licensing, permits, regulations</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cv-blue-light rounded-lg flex items-center justify-center">
                    💡
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Strategy Advice</div>
                    <div className="text-xs text-muted-foreground">Market entry, product fit</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upgrade Notice */}
            <Card className="p-6 bg-gradient-card border-primary/20">
              <h3 className="text-lg font-bold mb-2 text-foreground">Need Human Expert?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For complex situations, connect with our expert advisors for personalized guidance.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Talk to Expert
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CrossAssist;