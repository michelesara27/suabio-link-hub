
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Youtube, 
  MapPin,
  Calendar
} from "lucide-react";
import { useParams } from "react-router-dom";

const PublicBio = () => {
  const { username } = useParams();

  const profileData = {
    name: "João Silva",
    username: "joaosilva",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Criando soluções digitais que fazem a diferença no mundo.",
    avatar: "/placeholder.svg",
    location: "São Paulo, Brasil",
    joinDate: "Janeiro 2024",
    totalClicks: "12.8K",
    verified: true
  };

  const links = [
    {
      id: 1,
      title: "📱 Instagram",
      description: "Siga-me para conteúdo diário sobre tech",
      url: "https://instagram.com/joaosilva",
      icon: <Instagram className="w-5 h-5" />,
      clicks: 1247,
      gradient: "from-pink-500 to-orange-500"
    },
    {
      id: 2,
      title: "💼 LinkedIn",
      description: "Conecte-se comigo profissionalmente",
      url: "https://linkedin.com/in/joaosilva",
      icon: <Linkedin className="w-5 h-5" />,
      clicks: 892,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      id: 3,
      title: "🚀 GitHub",
      description: "Veja meus projetos open source",
      url: "https://github.com/joaosilva",
      icon: <Github className="w-5 h-5" />,
      clicks: 623,
      gradient: "from-gray-800 to-gray-900"
    },
    {
      id: 4,
      title: "🌐 Portfólio",
      description: "Meu site pessoal com todos os projetos",
      url: "https://joaosilva.dev",
      icon: <ExternalLink className="w-5 h-5" />,
      clicks: 445,
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 5,
      title: "🎥 YouTube",
      description: "Canal com tutoriais de programação",
      url: "https://youtube.com/@joaosilva",
      icon: <Youtube className="w-5 h-5" />,
      clicks: 234,
      gradient: "from-red-500 to-red-600"
    }
  ];

  const handleLinkClick = (link: any) => {
    // Simulate analytics tracking
    console.log(`Click tracked for: ${link.title}`);
    window.open(link.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header with branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-orange-500 rounded"></div>
            <span className="text-sm text-gray-600">Criado com Suabio</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg" alt={profileData.name} />
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-orange-500 text-white text-2xl">
                  JS
                </AvatarFallback>
              </Avatar>
              {profileData.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {profileData.name}
            </h1>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {profileData.bio}
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{profileData.totalClicks}</div>
                <div className="text-xs text-gray-500">Total de Cliques</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{links.length}</div>
                <div className="text-xs text-gray-500">Links Ativos</div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {profileData.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Desde {profileData.joinDate}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            {links.map((link, index) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`w-full p-4 bg-gradient-to-r ${link.gradient} text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      {link.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{link.title}</h3>
                      <p className="text-sm opacity-90">{link.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-75">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              className="border-green-200 text-green-700 hover:bg-green-50"
              onClick={() => window.open('/', '_blank')}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-orange-500 rounded mr-2"></div>
              Crie sua página no Suabio
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 Suabio • Feito com ❤️ no Brasil</p>
        </div>
      </div>

      {/* Floating Share Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 shadow-lg"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${profileData.name} - Suabio`,
                text: profileData.bio,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              // Could add a toast here
            }
          }}
        >
          Compartilhar
        </Button>
      </div>
    </div>
  );
};

export default PublicBio;
