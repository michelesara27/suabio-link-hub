
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chrome, Facebook, ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao Suabio",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Login com ${provider}`,
      description: "Funcionalidade em desenvolvimento",
    });
  };

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
            <CardTitle className="text-2xl text-gray-900">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-gray-600">
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>
                <Link to="#" className="text-sm text-green-600 hover:text-green-700">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="my-6">
              <Separator className="relative">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  ou continue com
                </span>
              </Separator>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Google")}
                className="w-full"
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                Criar conta gratuita
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
