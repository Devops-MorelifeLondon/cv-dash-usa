// CrossAssistPanel.tsx
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send, Bot, User, ArrowRight, Trash2, PlusCircle
} from "lucide-react";

// Function to create a new chat session
const createNewSession = () => ({
  id: `${Date.now()}`,
  title: "New Chat",
  createdAt: new Date(),
  history: [
    {
      id: 1,
      type: "bot",
      message:
        "Hi! I'm CrossAssist 🤖 Your guide for global expansion. What would you like to know?",
      timestamp: new Date(),
    },
  ],
});

export function CrossAssistPanel() {
  const [sessions, setSessions] = useState([
    { ...createNewSession(), title: "Getting Started" },
  ]);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [message, setMessage] = useState("");

  const activeSessionIdx = sessions.findIndex((s) => s.id === activeSessionId);
  const activeSession = sessions[activeSessionIdx];

  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.history?.length, activeSessionId]);

  // Message send logic
  const handleSendMessage = () => {
    if (!message.trim()) return;
    setSessions((prev) =>
      prev.map((s, idx) =>
        idx === activeSessionIdx
          ? {
              ...s,
              history: [
                ...s.history,
                {
                  id: s.history.length + 1,
                  type: "user",
                  message,
                  timestamp: new Date(),
                },
              ],
            }
          : s
      )
    );
    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s, idx) =>
          idx === activeSessionIdx
            ? {
                ...s,
                history: [
                  ...s.history,
                  {
                    id: s.history.length + 1,
                    type: "bot",
                    message:
                      "I'm analyzing your request and will get back with detailed information soon!",
                    timestamp: new Date(),
                  },
                ],
              }
            : s
        )
      );
    }, 850);
    setMessage("");
  };

  // New chat session
  const handleNewSession = () => {
    const newSession = createNewSession();
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  // Delete a session
  const handleDeleteSession = (id: string) => {
    const idx = sessions.findIndex((s) => s.id === id);
    let newList = sessions.filter((s) => s.id !== id);
    if (activeSessionId === id && newList.length) {
      setActiveSessionId(newList[0].id);
    }
    setSessions(newList);
  };

  // Pick session
  const handlePickSession = (id: string) => setActiveSessionId(id);

  // Change session title on input blur
  const handleRenameSession = (idx: number, newTitle: string) => {
    setSessions((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, title: newTitle || "New Chat" } : s))
    );
  };

  // Suggested questions
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

  function handleSuggestedQuestion(q: string) {
    setMessage(q);
  }

  // Responsive layout
  return (
    <div
      className="
        flex flex-col md:flex-row w-full h-[520px] sm:h-[70vh] max-h-[calc(100vh-7rem)]
        border rounded-xl overflow-hidden bg-background shadow-lg"
      style={{
        minHeight: 350,
      }}
    >
      {/* Sidebar */}
      <div
        className="
          w-full md:w-72 lg:w-80 bg-muted/50 border-r flex-shrink-0
          flex flex-col"
        style={{
          minWidth: 0,
          maxWidth: 330,
        }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-xl flex items-center gap-2">
            <Bot className="inline-block w-6 h-6" />
            CrossAssist
          </span>
          <Button variant="ghost" size="icon" onClick={handleNewSession} title="New Chat">
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {sessions.map((s, idx) => (
            <div
              key={s.id}
              className={`flex items-center px-3 py-2 gap-2 cursor-pointer group
                ${s.id === activeSessionId ? "bg-primary/10 border-l-[3px] border-primary" : "border-l-[3px] border-transparent"}
              `}
              onClick={() => handlePickSession(s.id)}
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-gradient-primary text-white text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <input
                className={`bg-transparent border-none px-0 py-0 font-medium flex-1 text-base min-w-0 
                  ${s.id === activeSessionId ? "text-primary" : "text-foreground"}
                  focus:outline-none`}
                value={s.title}
                maxLength={30}
                onChange={e => handleRenameSession(idx, e.target.value)}
                onBlur={e => handleRenameSession(idx, e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              {sessions.length > 1 &&
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={e => { e.stopPropagation(); handleDeleteSession(s.id); }}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  title="Delete chat"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              }
            </div>
          ))}
        </div>
        {/* Suggested questions at bottom (hide on xs/xxs screens) */}
        <div className="hidden sm:block border-t p-4 space-y-2">
          <div className="font-semibold text-muted-foreground mb-2 text-xs">Popular Questions</div>
          {suggestedQuestions.slice(0, 4).map((q, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              className="text-xs w-full mb-1"
              onClick={() => handleSuggestedQuestion(q)}
            >{q}</Button>
          ))}
        </div>
      </div>

      {/* Main chat panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div className="p-4 border-b flex items-center gap-3 bg-gradient-primary/30">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-gradient-primary text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground">
              CrossAssist AI
              <Badge className="ml-2 bg-primary/20 text-primary">AI</Badge>
            </div>
            <div className="text-xs text-muted-foreground">Online & ready</div>
          </div>
        </div>
        {/* Chat messages area - scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-muted/10 min-h-0">
          {activeSession?.history.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${chat.type === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="w-7 h-7">
                  <AvatarFallback className={`${chat.type === 'user' ? "bg-primary" : "bg-gradient-primary"} text-white text-sm`}>
                    {chat.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-3 py-2 text-sm
                    ${chat.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border/40"
                    }`}
                >
                  <div>{chat.message}</div>
                  {/* <div className="text-[10px] mt-1 text-white">
                    {chat.timestamp.toLocaleTimeString()}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Chat input */}
        <form
          className="flex p-3 border-t bg-background gap-2"
          onSubmit={e => { e.preventDefault(); handleSendMessage(); }}
        >
          <Input
            placeholder="Ask about licensing, compliance, market entry, etc..."
            value={message}
            className="min-w-0"
            autoFocus
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
          />
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
        {/* Suggested questions (mobile) */}
        <div className="flex sm:hidden flex-wrap gap-2 px-3 pb-3">
          {suggestedQuestions.map((q, i) => (
            <Button
              variant="outline"
              size="sm"
              key={i}
              type="button"
              onClick={() => handleSuggestedQuestion(q)}
              className="text-xs px-2 py-1 mb-1"
            >{q}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}
