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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Link as LinkIcon,
  BarChart3,
  User,
  Palette,
  Crown,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Links", url: "/links", icon: LinkIcon },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Perfil", url: "/profile", icon: User },
    { title: "Editor", url: "/editor", icon: Palette },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg"></div>
            {!isCollapsed && (
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Suabio
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
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
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-auto p-4">
            <div className="bg-gradient-to-r from-green-50 to-orange-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-gray-900">
                  Upgrade para Pro
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Desbloqueie recursos premium e templates exclusivos
              </p>
              <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-orange-600 hover:from-green-700 hover:to-orange-700">
                Upgrade agora
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
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold text-gray-900">
                  Painel de Controle
                </h2>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || ''} />
                      <AvatarFallback>
                        {profile?.username?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.display_name || profile?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        @{profile?.username}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
