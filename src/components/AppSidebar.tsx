import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Flag,
  Trophy,
  TrendingUp,
  Users,
  BarChart3,
  BookOpen,
  ChevronRight,
  CreditCard,
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
  useSidebar,
} from "@/components/ui/sidebar";

// Navigation items remain the same...
const navigationItems = [
  { title: "Welcome & Quick Start", url: "/", icon: Flag },
  { title: "Startup Badge Progress", url: "/badges", icon: Trophy },
    { title: "Operational Support Status", url: "/support", icon: BarChart3 },
  { title: "Pricing", url: "/pricing", icon: CreditCard },
  { title: "Discover Opportunities", url: "/opportunities", icon: TrendingUp },
  { title: "Meet Advisory Team", url: "/advisory", icon: Users },

  { title: "Resources & Playbooks", url: "/resources", icon: BookOpen },
];


export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const [country, setCountry] = useState("IN");

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-16" : "w-72"} border-r border-border/10 `}
      collapsible="icon"
    >
      <SidebarContent
        className={`
          bg-gradient-to-b from-background to-muted/20 
          custom-scrollbar 
        `}
      >
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

        {/* The rest of the component remains the same */}
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
                      {/* <item.icon className="w-5 h-5 opacity-80" /> */}

                      {!collapsed && (
                        <span className="text-sm font-medium truncate animate-fade-in">
                          {item.title}
                        </span>
                      )}

                      {!collapsed && isActive(item.url) && (
                        <ChevronRight className="w-4 h-4 opacity-60 ml-auto" />
                      )}

                      {isActive(item.url) && !collapsed && (
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        <div className="px-6 py-4 flex justify-center animate-fade-in">
          <button
            className={`px-3 py-1 text-base font-semibold rounded-md transition-colors duration-150
                  ${country === "IN"
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary text-muted-foreground"
              }`}
        
          >INDIA</button>
        </div>

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
