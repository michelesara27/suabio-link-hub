
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  MousePointer, 
  TrendingUp, 
  Plus, 
  ExternalLink,
  Calendar,
  Globe,
  Palette,
  Link as LinkIcon,
  Bell,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Cliques",
      value: "12,847",
      change: "+12.5%",
      icon: <MousePointer className="h-6 w-6" />,
      trend: "up"
    },
    {
      title: "Visualizações da Página",
      value: "8,293",
      change: "+8.2%",
      icon: <Users className="h-6 w-6" />,
      trend: "up"
    },
    {
      title: "Taxa de Conversão",
      value: "3.7%",
      change: "+0.5%",
      icon: <TrendingUp className="h-6 w-6" />,
      trend: "up"
    },
    {
      title: "Links Ativos",
      value: "23",
      change: "+3",
      icon: <LinkIcon className="h-6 w-6" />,
      trend: "up"
    }
  ];

  const recentActivity = [
    {
      action: "Novo link adicionado",
      description: "Instagram - @meuinsta",
      time: "2 horas atrás",
      type: "link"
    },
    {
      action: "Página visualizada",
      description: "47 novas visualizações",
      time: "4 horas atrás",
      type: "view"
    },
    {
      action: "Template alterado",
      description: "Mudou para 'Moderno Verde'",
      time: "1 dia atrás",
      type: "design"
    },
    {
      action: "Meta alcançada",
      description: "10k cliques este mês!",
      time: "2 dias atrás",
      type: "milestone"
    }
  ];

  const quickActions = [
    {
      title: "Adicionar Link",
      description: "Criar novo link rápido",
      icon: <Plus className="h-5 w-5" />,
      href: "/links",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Personalizar",
      description: "Editar aparência",
      icon: <Palette className="h-5 w-5" />,
      href: "/editor",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Ver Analytics",
      description: "Relatórios detalhados",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/analytics",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Página Pública",
      description: "Ver como os outros veem",
      icon: <ExternalLink className="h-5 w-5" />,
      href: "/joaosilva",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, João! 👋
            </h1>
            <p className="text-gray-600">
              Aqui está um resumo da sua atividade hoje
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Badge variant="outline" className="text-green-700 border-green-200">
              <Globe className="w-4 h-4 mr-1" />
              suabio.com/joaosilva
            </Badge>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Página
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                      {stat.change} vs. último mês
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg text-white">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Settings className="w-5 h-5 mr-2" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Acesse rapidamente as funcionalidades mais usadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <div className="p-4 rounded-lg border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-md cursor-pointer group">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Bell className="w-5 h-5 mr-2" />
                Atividade Recente
              </CardTitle>
              <CardDescription>
                Últimas alterações na sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      activity.type === 'link' ? 'bg-green-100 text-green-700' :
                      activity.type === 'view' ? 'bg-blue-100 text-blue-700' :
                      activity.type === 'design' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {activity.type === 'link' ? 'L' :
                       activity.type === 'view' ? 'V' :
                       activity.type === 'design' ? 'D' : 'M'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-green-600 hover:text-green-700 hover:bg-green-50">
                Ver todas as atividades
              </Button>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance desta Semana
              </CardTitle>
              <CardDescription>
                Seus números dos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Cliques</span>
                    <span className="text-sm font-semibold text-gray-900">1,847</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Visualizações</span>
                    <span className="text-sm font-semibold text-gray-900">1,293</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Novos Seguidores</span>
                    <span className="text-sm font-semibold text-gray-900">127</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Meta do mês</p>
                      <p className="text-lg font-bold text-gray-900">15,000 cliques</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">85% completo</p>
                      <p className="text-xs text-gray-500">12,750 / 15,000</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div className="bg-gradient-to-r from-green-500 to-orange-500 h-3 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
