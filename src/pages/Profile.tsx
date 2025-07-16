import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Shield, 
  CreditCard, 
  Upload,
  Crown,
  Check,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Profile = () => {
  const { toast } = useToast();
  const { profile, loading, updateProfile } = useProfile();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        display_name: formData.get('displayName') as string,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
        website: formData.get('website') as string,
        social_instagram: formData.get('instagram') as string,
        social_linkedin: formData.get('linkedin') as string,
        social_twitter: formData.get('twitter') as string,
        social_youtube: formData.get('youtube') as string,
      };

      await updateProfile(updates);
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div>Carregando perfil...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Configurações do Perfil
            </h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e preferências
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="billing">Cobrança</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Atualize seus dados pessoais e foto de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.display_name || profile?.username || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-orange-500 text-white text-2xl">
                        {profile?.display_name?.[0]?.toUpperCase() || profile?.username?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button type="button" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Alterar Foto
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, GIF ou PNG. Máximo 1MB.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nome de Exibição</Label>
                    <Input 
                      id="displayName" 
                      name="displayName"
                      defaultValue={profile?.display_name || ""} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        suabio.com/
                      </span>
                      <Input
                        id="username"
                        name="username"
                        defaultValue={profile?.username || ""}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografia</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      defaultValue={profile?.bio || ""}
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-gray-500">
                      Máximo 280 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue={user?.email || ""}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-sm text-gray-500">
                      O email não pode ser alterado por aqui
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website"
                      defaultValue={profile?.website || ""} 
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Redes Sociais</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input 
                        id="instagram" 
                        name="instagram"
                        defaultValue={profile?.social_instagram || ""} 
                        placeholder="@seuusuario"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input 
                        id="linkedin" 
                        name="linkedin"
                        defaultValue={profile?.social_linkedin || ""} 
                        placeholder="linkedin.com/in/seuusuario"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter/X</Label>
                      <Input 
                        id="twitter" 
                        name="twitter"
                        defaultValue={profile?.social_twitter || ""} 
                        placeholder="@seuusuario"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input 
                        id="youtube" 
                        name="youtube"
                        defaultValue={profile?.social_youtube || ""} 
                        placeholder="youtube.com/@seucanal"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isUpdating}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    {isUpdating ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Configurações de Notificação
                </CardTitle>
                <CardDescription>
                  Escolha como e quando você quer ser notificado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações por Email</h3>
                      <p className="text-sm text-gray-600">Receber atualizações sobre sua conta por email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Relatórios Semanais</h3>
                      <p className="text-sm text-gray-600">Resumo semanal de analytics e performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Alertas de Metas</h3>
                      <p className="text-sm text-gray-600">Notificar quando atingir marcos importantes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações de Marketing</h3>
                      <p className="text-sm text-gray-600">Dicas, novidades e promoções do Suabio</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Segurança da Conta
                </CardTitle>
                <CardDescription>
                  Mantenha sua conta segura e protegida
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Alterar Senha</h3>
                        <p className="text-sm text-gray-600">Última alteração há 3 meses</p>
                      </div>
                      <Button variant="outline">Alterar</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                        <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                      </div>
                      <Badge variant="outline" className="text-orange-700 border-orange-200">
                        Não Configurado
                      </Badge>
                    </div>
                    <Button variant="outline" className="mt-3">
                      Configurar 2FA
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sessões Ativas</h3>
                        <p className="text-sm text-gray-600">Gerencie dispositivos conectados</p>
                      </div>
                      <Button variant="outline">Ver Sessões</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Cobrança e Assinatura
                </CardTitle>
                <CardDescription>
                  Gerencie sua assinatura e métodos de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-orange-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-6 h-6 text-orange-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">Plano Gratuito</h3>
                        <p className="text-sm text-gray-600">Até 5 links • Analytics básicos</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Ativo
                    </Badge>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600">
                    Fazer Upgrade para Pro
                  </Button>
                </div>

                {/* Usage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Links Criados</span>
                      <span className="text-sm font-semibold">5 / 5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Cliques este Mês</span>
                      <span className="text-sm font-semibold">2,847</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Upgrade Options */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Planos Disponíveis</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Pro</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">R$ 29</div>
                          <div className="text-sm text-gray-600">/mês</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Links ilimitados
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Analytics avançado
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Domínio personalizado
                        </li>
                      </ul>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Escolher Pro
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Business</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">R$ 99</div>
                          <div className="text-sm text-gray-600">/mês</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Tudo do Pro
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Múltiplas páginas
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          API personalizada
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">
                        Escolher Business
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
