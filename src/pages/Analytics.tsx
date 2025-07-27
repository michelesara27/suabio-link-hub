import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  MousePointer, 
  Globe, 
  Calendar,
  Download,
  Filter
} from "lucide-react";

const Analytics = () => {
  // Sample data for charts
  const clicksData = [
    { name: 'Jan', clicks: 400, views: 240 },
    { name: 'Fev', clicks: 300, views: 139 },
    { name: 'Mar', clicks: 200, views: 980 },
    { name: 'Abr', clicks: 278, views: 390 },
    { name: 'Mai', clicks: 189, views: 480 },
    { name: 'Jun', clicks: 239, views: 380 },
    { name: 'Jul', clicks: 349, views: 430 },
  ];

  const topLinksData = [
    { name: 'Instagram', clicks: 1247, percentage: 35 },
    { name: 'LinkedIn', clicks: 892, percentage: 25 },
    { name: 'GitHub', clicks: 623, percentage: 18 },
    { name: 'Portfólio', clicks: 445, percentage: 12 },
    { name: 'YouTube', clicks: 234, percentage: 7 },
    { name: 'Outros', clicks: 106, percentage: 3 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 68, color: '#10b981' },
    { name: 'Desktop', value: 25, color: '#3b82f6' },
    { name: 'Tablet', value: 7, color: '#f59e0b' },
  ];

  const countryData = [
    { name: 'Brasil', clicks: 2847, flag: '🇧🇷' },
    { name: 'Portugal', clicks: 523, flag: '🇵🇹' },
    { name: 'Estados Unidos', clicks: 234, flag: '🇺🇸' },
    { name: 'Argentina', clicks: 156, flag: '🇦🇷' },
    { name: 'França', clicks: 87, flag: '🇫🇷' },
  ];

  const stats = [
    {
      title: "Total de Cliques",
      value: "12,847",
      change: "+12.5%",
      icon: <MousePointer className="h-6 w-6" />,
      color: "text-green-600"
    },
    {
      title: "Visualizações",
      value: "8,293",
      change: "+8.2%",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600"
    },
    {
      title: "Taxa de Clique",
      value: "3.7%",
      change: "+0.5%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-orange-600"
    },
    {
      title: "Países",
      value: "23",
      change: "+2",
      icon: <Globe className="h-6 w-6" />,
      color: "text-purple-600"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Analytics
            </h1>
            <p className="text-gray-600">
              Insights detalhados sobre o desempenho dos seus links
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Últimos 30 dias
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} mt-1`}>
                      {stat.change} vs. último período
                    </p>
                  </div>
                  <div className={`p-3 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Clicks Over Time */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Cliques ao Longo do Tempo</CardTitle>
              <CardDescription>
                Evolução mensal de cliques e visualizações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Cliques"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Visualizações"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Links */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Links Mais Populares</CardTitle>
              <CardDescription>
                Distribuição de cliques por link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topLinksData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Device Breakdown */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
              <CardDescription>
                Como seus visitantes acessam sua página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: device.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{device.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Data */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Localização dos Visitantes</CardTitle>
              <CardDescription>
                Países de onde vêm seus cliques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {countryData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="font-medium text-gray-900">{country.name}</p>
                        <p className="text-sm text-gray-600">{country.clicks.toLocaleString()} cliques</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {((country.clicks / 3847) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Atividade em Tempo Real</CardTitle>
            <CardDescription>
              Visitantes online agora e atividade recente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Visitantes Online</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">47</div>
                <div className="text-sm text-gray-600">Cliques Hoje</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
                <div className="text-sm text-gray-600">Visualizações Hoje</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900">Atividade Recente</h4>
              <div className="space-y-2">
                {[
                  { action: "Clique no Instagram", time: "há 2 minutos", location: "São Paulo, BR" },
                  { action: "Visualização da página", time: "há 3 minutos", location: "Rio de Janeiro, BR" },
                  { action: "Clique no LinkedIn", time: "há 5 minutos", location: "Lisboa, PT" },
                  { action: "Clique no GitHub", time: "há 8 minutos", location: "Porto Alegre, BR" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-900">{activity.action}</span>
                    </div>
                    <div className="text-gray-500">
                      {activity.time} • {activity.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;
