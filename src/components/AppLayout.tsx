
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Link as LinkIcon,
  BarChart3,
  Palette,
  Settings,
  User,
  Bell,
  LogOut,
  Crown,
  ExternalLink,
  Menu
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Meus Links", url: "/links", icon: LinkIcon },
    { title: "Editor", url: "/editor", icon: Palette },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Configurações", url: "/profile", icon: Settings },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg"></div>
            {!collapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Suabio
              </span>
            )}
          </div>
        </div>

        <SidebarGroup open>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                        isActive(item.url)
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-green-50 to-orange-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-900">Upgrade para Pro</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Desbloqueie recursos avançados e analytics detalhados
              </p>
              <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600">
                Fazer Upgrade
              </Button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <SidebarProvider collapsedWidth={56}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SidebarTrigger>
                
                <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  suabio.com/joaosilva
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="João Silva" />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-orange-500 text-white">
                          JS
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-900">João Silva</p>
                        <p className="text-xs text-gray-500">@joaosilva</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">João Silva</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          joao@email.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Crown className="mr-2 h-4 w-4" />
                      <span>Upgrade para Pro</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
