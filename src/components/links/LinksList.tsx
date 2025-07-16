
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Edit, 
  Trash2, 
  BarChart3, 
  Calendar, 
  Eye,
  EyeOff,
  GripVertical,
  Search,
  ExternalLink
} from "lucide-react";
import { Link } from "@/hooks/useLinks";

interface LinksListProps {
  links: Link[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LinksList = ({ links, onToggleStatus, onDelete }: LinksListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum link ainda
        </h3>
        <p className="text-gray-600 mb-4">
          Comece adicionando seu primeiro link
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar links..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredLinks.map((link) => (
          <div
            key={link.id}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="cursor-grab">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-gray-900">{link.title}</h3>
                <Badge variant={link.isActive ? "default" : "secondary"}>
                  {link.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">{link.url}</p>
              {link.description && (
                <p className="text-sm text-gray-500">{link.description}</p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  {link.clicks} cliques
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Criado em {new Date(link.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleStatus(link.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                {link.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Edit className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(link.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredLinks.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-600">Nenhum link encontrado para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
