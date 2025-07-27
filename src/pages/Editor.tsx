import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Eye, 
  Save, 
  Smartphone, 
  Monitor, 
  Upload,
  Brush,
  Type,
  Image as ImageIcon,
  Zap
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";

const Editor = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "João Silva",
    bio: "Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Criando soluções digitais que fazem a diferença.",
    avatar: "/placeholder.svg",
    theme: "modern-green",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    buttonStyle: "rounded"
  });

  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");

  const themes = [
    { id: "modern-green", name: "Moderno Verde", colors: ["#10b981", "#059669", "#047857"] },
    { id: "vibrant-orange", name: "Laranja Vibrante", colors: ["#f97316", "#ea580c", "#c2410c"] },
    { id: "deep-blue", name: "Azul Profundo", colors: ["#3b82f6", "#2563eb", "#1d4ed8"] },
    { id: "elegant-purple", name: "Roxo Elegante", colors: ["#8b5cf6", "#7c3aed", "#6d28d9"] },
    { id: "sunset", name: "Pôr do Sol", colors: ["#f59e0b", "#d97706", "#b45309"] }
  ];

  const buttonStyles = [
    { id: "rounded", name: "Arredondado", preview: "rounded-full" },
    { id: "square", name: "Quadrado", preview: "rounded-none" },
    { id: "soft", name: "Suave", preview: "rounded-lg" }
  ];

  const handleSave = () => {
    toast({
      title: "Perfil salvo com sucesso!",
      description: "Suas alterações foram aplicadas.",
    });
  };

  const sampleLinks = [
    { title: "Instagram", url: "https://instagram.com/joaosilva", clicks: 1247 },
    { title: "LinkedIn", url: "https://linkedin.com/in/joaosilva", clicks: 892 },
    { title: "GitHub", url: "https://github.com/joaosilva", clicks: 623 },
    { title: "Portfólio", url: "https://joaosilva.dev", clicks: 445 }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Editor de Perfil
            </h1>
            <p className="text-gray-600">
              Personalize sua página e deixe-a com a sua cara
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Button variant="outline" onClick={() => setPreviewMode(previewMode === "mobile" ? "desktop" : "mobile")}>
              {previewMode === "mobile" ? <Monitor className="w-4 h-4 mr-2" /> : <Smartphone className="w-4 h-4 mr-2" />}
              {previewMode === "mobile" ? "Ver Desktop" : "Ver Mobile"}
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="advanced">Avançado</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="w-5 h-5 mr-2" />
                      Informações do Perfil
                    </CardTitle>
                    <CardDescription>
                      Configure suas informações básicas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        placeholder="Seu nome"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        placeholder="Conte um pouco sobre você..."
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-gray-500">
                        {profile.bio.length}/280 caracteres
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Foto de Perfil</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-500" />
                        </div>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar Foto
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="w-5 h-5 mr-2" />
                      Tema e Cores
                    </CardTitle>
                    <CardDescription>
                      Escolha um tema ou personalize as cores
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Temas Predefinidos</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {themes.map((theme) => (
                          <div
                            key={theme.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              profile.theme === theme.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setProfile({...profile, theme: theme.id})}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{theme.name}</span>
                              <div className="flex space-x-1">
                                {theme.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3 block">Estilo dos Botões</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {buttonStyles.map((style) => (
                          <div
                            key={style.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                              profile.buttonStyle === style.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setProfile({...profile, buttonStyle: style.id})}
                          >
                            <div className={`w-full h-8 bg-green-500 ${style.preview} mb-2`}></div>
                            <span className="text-sm">{style.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Configurações Avançadas
                    </CardTitle>
                    <CardDescription>
                      SEO, analytics e outras configurações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título SEO</Label>
                      <Input
                        id="title"
                        defaultValue="João Silva - Desenvolvedor Full Stack"
                        placeholder="Título para mecanismos de busca"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição SEO</Label>
                      <Textarea
                        id="description"
                        defaultValue="Desenvolvedor Full Stack especializado em React, Node.js e tecnologias modernas."
                        placeholder="Descrição para mecanismos de busca"
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Google Analytics</h3>
                        <p className="text-sm text-gray-600">Conectar com Google Analytics</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Conectar
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Facebook Pixel</h3>
                        <p className="text-sm text-gray-600">Rastrear conversões</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <CardTitle>Preview</CardTitle>
                </div>
                <CardDescription>
                  Veja como sua página aparece para os visitantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`mx-auto ${previewMode === "mobile" ? "max-w-sm" : "max-w-md"} border-2 border-gray-300 rounded-2xl p-1 bg-gray-100`}>
                  <div className="bg-white rounded-xl p-6 min-h-[500px]">
                    {/* Profile Header */}
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        JS
                      </div>
                      <h1 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                      <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                      {sampleLinks.map((link, index) => (
                        <div
                          key={index}
                          className={`p-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-center font-medium transition-all hover:from-green-600 hover:to-green-700 cursor-pointer ${
                            profile.buttonStyle === "rounded" ? "rounded-full" :
                            profile.buttonStyle === "square" ? "rounded-none" : "rounded-lg"
                          }`}
                        >
                          {link.title}
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-orange-500 rounded"></div>
                        <span className="text-sm text-gray-600">Criado com Suabio</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Badge variant="outline" className="text-green-700 border-green-200">
                    Visualização {previewMode === "mobile" ? "Mobile" : "Desktop"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Editor;
