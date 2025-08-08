import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Flag,
  Trophy,
  TrendingUp,
  Users,
  BarChart3,
  BookOpen,
  MessageCircle,
  ChevronRight,
  CreditCard
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Welcome & Quick Start", 
    url: "/", 
    icon: Flag,
    emoji: "🏁"
  },
  { 
    title: "Startup Badge Progress", 
    url: "/badges", 
    icon: Trophy,
    emoji: "🎖"
  },
  { 
    title: "Discover Opportunities", 
    url: "/opportunities", 
    icon: TrendingUp,
    emoji: "📈"
  },
  { 
    title: "Meet Advisory Team", 
    url: "/advisory", 
    icon: Users,
    emoji: "🤝"
  },
  { 
    title: "Operational Support Status", 
    url: "/support", 
    icon: BarChart3,
    emoji: "📊"
  },
  { 
    title: "Resources & Playbooks", 
    url: "/resources", 
    icon: BookOpen,
    emoji: "📚"
  },
  { 
    title: "Pricing", 
    url: "/pricing", 
   icon: CreditCard,
    emoji: "💳"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  // Country switch state
  const [country, setCountry] = useState("IN");

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-16" : "w-72"} border-r border-border/10`}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-to-b from-background to-muted/20">

        {/* Logo Section */}
        <div className="p-6 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              CV
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-xl font-bold text-primary">CrossVentura</h1>
                <p className="text-xs text-muted-foreground">Global Expansion Hub</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={`text-xs font-medium text-muted-foreground uppercase tracking-wider ${collapsed ? "hidden" : ""}`}>
            Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`
                        relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
                        ${isActive(item.url) 
                          ? "bg-primary text-primary-foreground shadow-card" 
                          : "hover:bg-muted/60 text-foreground hover:text-primary"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-lg">{item.emoji}</span>
                        {!collapsed && (
                          <span className="text-sm font-medium truncate animate-fade-in">
                            {item.title}
                          </span>
                        )}
                      </div>
                      {!collapsed && isActive(item.url) && (
                        <ChevronRight className="w-4 h-4 opacity-60" />
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Country Switch placed here */}
        {!collapsed && (
          <div className="px-6 py-4 flex justify-center animate-fade-in">
            <div className="flex rounded-lg bg-muted/20 border border-border/10">
              <button
                className={`px-3 py-1 text-base font-semibold rounded-l-lg transition-colors duration-150
                  ${country === "IN"
                    ? "bg-primary text-primary-foreground"
                    : "hover:text-primary text-muted-foreground"
                  }`}
                onClick={() => setCountry("IN")}
                aria-pressed={country === "IN"}
                type="button"
              >IN</button>
              <button
                className={`px-3 py-1 text-base font-semibold rounded-r-lg transition-colors duration-150
                  ${country === "US"
                    ? "bg-primary text-primary-foreground"
                    : "hover:text-primary text-muted-foreground"
                  }`}
                onClick={() => setCountry("US")}
                aria-pressed={country === "US"}
                type="button"
              >US</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-border/10">
          {!collapsed && (
            <div className="animate-fade-in">
              <div className="text-xs text-muted-foreground text-center">
                <p className="font-medium">Need help?</p>
                <p className="text-primary cursor-pointer hover:underline">Contact Support</p>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
