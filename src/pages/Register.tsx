
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chrome, Facebook, ArrowLeft, User, Mail, Lock, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao Suabio",
      });
      navigate("/dashboard");
    }, 2000);
  };

  const handleSocialRegister = (provider: string) => {
    toast({
      title: `Registro com ${provider}`,
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const passwordRequirements = [
    { text: "Pelo menos 8 caracteres", met: formData.password.length >= 8 },
    { text: "Uma letra maiúscula", met: /[A-Z]/.test(formData.password) },
    { text: "Uma letra minúscula", met: /[a-z]/.test(formData.password) },
    { text: "Um número", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-green-600 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg"></div>
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Suabio
            </span>
          </div>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Criar sua conta</CardTitle>
            <CardDescription className="text-gray-600">
              Comece gratuitamente hoje mesmo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">Nome de usuário</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm text-gray-400">@</span>
                  <Input
                    id="username"
                    type="text"
                    placeholder="seuusername"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    className="pl-8"
                    required
                  />
                </div>
                {formData.username && (
                  <p className="text-xs text-gray-500">
                    Sua página será: suabio.com/{formData.username}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <Check className={`w-3 h-3 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                        <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" className="mt-1 rounded border-gray-300" required />
                <span className="text-gray-600">
                  Eu concordo com os{" "}
                  <Link to="#" className="text-green-600 hover:text-green-700">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link to="#" className="text-green-600 hover:text-green-700">
                    Política de Privacidade
                  </Link>
                </span>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta gratuita"}
              </Button>
            </form>

            <div className="my-6">
              <Separator className="relative">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  ou registre-se com
                </span>
              </Separator>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialRegister("Google")}
                className="w-full"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialRegister("Facebook")}
                className="w-full"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
