
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, ExternalLink, Globe } from "lucide-react";
import { Link } from "@/hooks/useLinks";

interface LinksStatsProps {
  links: Link[];
}

export const LinksStats = ({ links }: LinksStatsProps) => {
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Cliques</p>
              <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Links Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{activeLinks}</p>
            </div>
            <ExternalLink className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Links</p>
              <p className="text-2xl font-bold text-gray-900">{links.length}</p>
            </div>
            <Globe className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
