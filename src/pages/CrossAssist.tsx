import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";

const CrossAssist = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message:
        "Hi! I'm CrossAssist 🤖 Your AI-powered guide for global expansion. What would you like to know?",
      timestamp: new Date(Date.now() - 5000),
    },
  ]);

const suggestedQuestions = [
    "What licenses do I need to sell supplements in the USA?",
    "Which states are cheapest for forming an LLC in the USA?",
    "Should I start selling on Amazon or my own Shopify store?",
    "What are the top US exports by state?",
    "What business can I start in the USA with $5,000 capital?",
    "How to get FDA clearance for cosmetics in the USA?",
    "Which US states are best for tax optimization?",
    "What are the US sales tax requirements for foreign companies?"
];


  const features = [
    { icon: "🇺🇸", title: "USA Market Entry", desc: "LLC formation, state regulations, compliance" },
    { icon: "📦", title: "E-commerce Setup", desc: "Amazon, Shopify, fulfillment strategies" },
    { icon: "📋", title: "Regulatory Guidance", desc: "FDA, licenses, permits, state rules" },
    { icon: "💡", title: "Business Strategy", desc: "Market research, product fit, growth plan" },
];


  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setChatHistory((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user",
        message: message,
        timestamp: new Date(),
      },
    ]);

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          message:
            "Thanks for your question! Let me process and provide accurate details...",
          timestamp: new Date(),
        },
      ]);
    }, 1000);

    setMessage("");
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chatbox */}
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
                  Online & Ready
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
              <div
                key={chat.id}
                className={`flex ${
                  chat.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    chat.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback
                      className={`${
                        chat.type === "user"
                          ? "bg-primary"
                          : "bg-gradient-primary"
                      } text-white text-sm`}
                    >
                      {chat.type === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 ${
                      chat.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border/50"
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <div
                      className={`text-xs mt-1 ${
                        chat.type === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
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
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* FAQ / Popular Questions */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 text-foreground">
            Popular Questions
          </h3>
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

        {/* What I Can Help With */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4 text-foreground">
            What I Can Help With
          </h3>
          <div className="space-y-3">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cv-blue-light rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CrossAssist;
