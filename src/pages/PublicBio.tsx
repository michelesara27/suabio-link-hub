
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Youtube, 
  MapPin,
  Calendar,
  Loader,
  Twitter
} from "lucide-react";
import { useParams } from "react-router-dom";
import { usePublicProfile } from "@/hooks/usePublicProfile";

const PublicBio = () => {
  const { username } = useParams();
  const { profile, links, loading, error, trackLinkClick } = usePublicProfile(username || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Perfil não encontrado</h1>
          <p className="text-gray-600">Este usuário não existe ou o perfil foi removido.</p>
        </div>
      </div>
    );
  }

  const handleLinkClick = async (link: any) => {
    console.log(`Click tracked for: ${link.title}`);
    await trackLinkClick(link.id);
    window.open(link.url, '_blank');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getSocialIcon = (url: string) => {
    if (url.includes('instagram')) return <Instagram className="w-5 h-5" />;
    if (url.includes('linkedin')) return <Linkedin className="w-5 h-5" />;
    if (url.includes('github')) return <Github className="w-5 h-5" />;
    if (url.includes('youtube')) return <Youtube className="w-5 h-5" />;
    if (url.includes('twitter')) return <Twitter className="w-5 h-5" />;
    return <ExternalLink className="w-5 h-5" />;
  };

  const getLinkGradient = (index: number) => {
    const gradients = [
      "from-pink-500 to-orange-500",
      "from-blue-600 to-blue-700", 
      "from-gray-800 to-gray-900",
      "from-green-500 to-green-600",
      "from-red-500 to-red-600",
      "from-purple-500 to-purple-600",
      "from-yellow-500 to-yellow-600",
      "from-indigo-500 to-indigo-600"
    ];
    return gradients[index % gradients.length];
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

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
                <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.display_name || profile.username} />
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-orange-500 text-white text-2xl">
                  {getInitials(profile.display_name || profile.username)}
                </AvatarFallback>
              </Avatar>
              {profile.is_verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {profile.display_name || profile.username}
            </h1>
            
            {profile.bio && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex justify-center space-x-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{totalClicks.toLocaleString()}</div>
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
                <Calendar className="w-3 h-3 mr-1" />
                Desde {formatDate(profile.created_at)}
              </div>
            </div>
          </div>

          {/* Links */}
          {links.length > 0 ? (
            <div className="space-y-4">
              {links.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`w-full p-4 bg-gradient-to-r ${getLinkGradient(index)} text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        {getSocialIcon(link.url)}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{link.title}</h3>
                        {link.description && (
                          <p className="text-sm opacity-90">{link.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-75">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Nenhum link disponível</p>
            </div>
          )}

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
                title: `${profile.display_name || profile.username} - Suabio`,
                text: profile.bio || `Confira o perfil de ${profile.display_name || profile.username}`,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
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
