// CrossAssistChatModal.tsx
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, Bot, User, Sparkles, MessageCircle, Clock, CheckCircle, Brain 
} from "lucide-react";

// Make the modal itself flex-col and max-h so it doesn't overflow small screens!
export function CrossAssistChatModal({ triggerClass, triggerChildren }: {
  triggerClass?: string,
  triggerChildren?: React.ReactNode
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hi! I'm CrossAssist 🤖 Your AI-powered guide for global expansion. I can help you with market entry strategies, compliance questions, licensing requirements, and much more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, open]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setChatHistory(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user",
        message: message,
        timestamp: new Date(),
      }
    ]);
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          message:
            "Thanks for your question! I'm processing your request and will provide you detailed, accurate information. Let me analyze the latest regulations and requirements for your specific situation...",
          timestamp: new Date(),
        }
      ]);
    }, 1000);
    setMessage("");
  };

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

  const handleSuggestedQuestion = (q: string) => setMessage(q);

  const quickStats = [
    { label: "Answered", value: "10,000+", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Avg. Response", value: "< 3 sec", icon: <Clock className="w-4 h-4" /> },
    { label: "Accuracy", value: "96%", icon: <CheckCircle className="w-4 h-4" /> },
    { label: "Languages", value: "12", icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClass || ""}>
          {triggerChildren || (
            <>
              <Bot className="mr-2" />
              CrossAssist Chat
            </>
          )}
        </Button>
      </DialogTrigger>
      {/* Outer DialogContent as vertical flex container, with max-h based on viewport. 
          The inner content panel also uses flex-col + min-h-0 on chat to ensure overflow doesn't break. */}
      <DialogContent 
        className="p-0 flex flex-col max-h-[90vh] w-full sm:max-w-[390px] md:max-w-[450px] min-w-[280px] rounded-xl"
        style={{ width: '96vw', maxWidth: 430 }}
      >
        {/* Header */}
        <DialogHeader className="border-b border-border/50 px-4 py-3 bg-gradient-primary text-white shrink-0">
          <div className="flex gap-3 items-center">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-primary text-white">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">CrossAssist AI</div>
              <div className="text-xs flex items-center gap-1">
                <div className="w-2 h-2 bg-cv-success rounded-full"></div>
                Online &amp; Ready
              </div>
            </div>
            <Badge className="ml-auto bg-white/20 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </DialogHeader>
        {/* Quick stats, optional in small screens you can even hide with hidden xs:block if wanted */}
        <div className="flex gap-2 px-4 py-2 bg-cv-blue-light/10 border-b border-border/30 text-xs shrink-0">
          {quickStats.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center px-1">
              {s.icon}
              <div>{s.value}</div>
            </div>
          ))}
        </div>
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-muted/30">
          {/* Chat container: scrollable, always fits available space */}
          <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto min-h-0">
            {chatHistory.map(chat => (
              <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${chat.type === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-7 h-7">
                    <AvatarFallback className={`${chat.type === 'user' ? "bg-primary" : "bg-gradient-primary"} text-white text-xs`}>
                      {chat.type === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg px-3 py-2 text-sm ${
                    chat.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border/40"
                  }`}>
                    <div>{chat.message}</div>
                    <div className={`text-[10px] mt-1 ${
                      chat.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {chat.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form
            className="px-3 py-2 border-t border-border/30 bg-background flex gap-2 shrink-0"
            onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
          >
            <Input
              placeholder="Ask about compliance, market entry..."
              value={message}
              autoFocus
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              className="min-w-0"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
       
        </div>
      </DialogContent>
    </Dialog>
  );
}
