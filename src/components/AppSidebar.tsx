import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { logout } from "@/store/authSlice"; // Import logout action
import {
  Flag,
  Trophy,
  TrendingUp,
  Users,
  BarChart3,
  BookOpen,
  ChevronRight,
  CreditCard,
  User,
  LogOut // Import Logout Icon
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
  useSidebar
} from "@/components/ui/sidebar";

// Navigation items
const navigationItems = [
  { title: "Welcome & Quick Start", url: "/", icon: Flag },
  { title: "Discover Opportunities", url: "/opportunities", icon: TrendingUp },
  { title: "Operational Support Status", url: "/support", icon: BarChart3 },
  { title: "Pricing", url: "/pricing", icon: CreditCard },
  { title: "Meet Advisory Team", url: "/advisory", icon: Users },
  { title: "Startup Badge Progress", url: "/badges", icon: Trophy },
  { title: "Resources & Playbooks", url: "/resources", icon: BookOpen },
  { title: "My Support", url: "/my-support", icon: BookOpen },
  // "Login" will be handled conditionally in the render
  { title: "Login", url: "/auth", icon: User }, 
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get Auth State from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("Auth State in Sidebar:", isAuthenticated, user);

  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [country, setCountry] = useState("IN");

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    // 1. Dispatch Logout Action (clears Redux + Cookies/Localstorage inside the slice)
    dispatch(logout());
    // 2. Redirect to Home or Login
    navigate("/auth");
  };

  // Filter navigation: Hide "Login" if user is already authenticated
  const displayItems = navigationItems.filter(item => {
    if (isAuthenticated && item.url === "/auth") return false;
    return true;
  });

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

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={`text-xs font-medium text-muted-foreground uppercase tracking-wider ${collapsed ? "hidden" : ""}`}>
            Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Standard Menu Items */}
              {displayItems.map((item) => (
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
                      {/* Icons are usually passed as props to SidebarMenuButton or handled here if dynamic */}
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

              {/* LOGGED IN USER SECTION */}
              {isAuthenticated && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    className="relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-red-50 hover:text-red-600 text-muted-foreground cursor-pointer"
                  >
                    <LogOut className="w-5 h-5 opacity-80" />
                    {!collapsed && (
                      <div className="flex flex-col items-start animate-fade-in overflow-hidden">
                        <span className="text-sm font-semibold truncate text-foreground group-hover:text-red-600">
                          {user?.name || "User"}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide">
                          Logout
                        </span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Country Switcher */}
        <div className="px-6 py-4 flex justify-center animate-fade-in gap-3">
          {/* India Button */}
          <a
            href="https://cv-dash-2-git-v4-devopmlls-projects.vercel.app/"
            className={`px-3 py-1 text-base font-semibold rounded-md transition-colors duration-150
              ${country === "IN"
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary text-muted-foreground"
              }`}
          >
            INDIA
          </a>

          {/* USA Button */}
          <a
            href="https://cv-dash-usa.vercel.app"
            className={`px-3 py-1 text-base font-semibold rounded-md transition-colors duration-150
              ${country === "US"
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary text-muted-foreground"
              }`}
          >
            USA
          </a>
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