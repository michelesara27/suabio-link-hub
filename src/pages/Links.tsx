
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  ExternalLink, 
  Edit, 
  Trash2, 
  BarChart3, 
  Calendar, 
  Globe, 
  Eye,
  EyeOff,
  GripVertical,
  Search
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const Links = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    description: ""
  });

  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Instagram",
      url: "https://instagram.com/joaosilva",
      description: "Siga-me no Instagram para conteúdo diário",
      clicks: 1247,
      isActive: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "LinkedIn",
      url: "https://linkedin.com/in/joaosilva",
      description: "Conecte-se comigo profissionalmente",
      clicks: 892,
      isActive: true,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "GitHub",
      url: "https://github.com/joaosilva",
      description: "Veja meus projetos open source",
      clicks: 623,
      isActive: true,
      createdAt: "2024-01-08"
    },
    {
      id: 4,
      title: "Portfólio",
      url: "https://joaosilva.dev",
      description: "Meu site pessoal com todos os projetos",
      clicks: 445,
      isActive: false,
      createdAt: "2024-01-05"
    },
    {
      id: 5,
      title: "YouTube",
      url: "https://youtube.com/@joaosilva",
      description: "Canal com tutoriais de programação",
      clicks: 234,
      isActive: true,
      createdAt: "2024-01-03"
    }
  ]);

  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) {
      toast({
        title: "Erro",
        description: "Título e URL são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const link = {
      id: Date.now(),
      ...newLink,
      clicks: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLinks([link, ...links]);
    setNewLink({ title: "", url: "", description: "" });
    
    toast({
      title: "Link adicionado!",
      description: "Seu novo link foi criado com sucesso",
    });
  };

  const toggleLinkStatus = (id: number) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link removido",
      description: "O link foi excluído permanentemente",
    });
  };

  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gerenciar Links
            </h1>
            <p className="text-gray-600">
              Organize e monitore todos os seus links
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Link</DialogTitle>
                <DialogDescription>
                  Crie um novo link para sua página
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Link</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Meu Instagram"
                    value={newLink.title}
                    onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://exemplo.com"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Input
                    id="description"
                    placeholder="Breve descrição do link"
                    value={newLink.description}
                    onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddLink} className="w-full">
                  Criar Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
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

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Seus Links</CardTitle>
                <CardDescription>
                  Gerencie e organize seus links
                </CardDescription>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar links..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                      onClick={() => toggleLinkStatus(link.id)}
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
                      onClick={() => deleteLink(link.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredLinks.length === 0 && (
                <div className="text-center py-12">
                  <ExternalLink className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {searchTerm ? "Nenhum link encontrado" : "Nenhum link ainda"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm 
                      ? "Tente buscar por outros termos" 
                      : "Comece adicionando seu primeiro link"
                    }
                  </p>
                  {!searchTerm && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Primeiro Link
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Novo Link</DialogTitle>
                          <DialogDescription>
                            Crie um novo link para sua página
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Título do Link</Label>
                            <Input
                              id="title"
                              placeholder="Ex: Meu Instagram"
                              value={newLink.title}
                              onChange={(e) => setNewLink({...newLink, title: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                              id="url"
                              placeholder="https://exemplo.com"
                              value={newLink.url}
                              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Descrição (opcional)</Label>
                            <Input
                              id="description"
                              placeholder="Breve descrição do link"
                              value={newLink.description}
                              onChange={(e) => setNewLink({...newLink, description: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleAddLink} className="w-full">
                            Criar Link
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Links;
