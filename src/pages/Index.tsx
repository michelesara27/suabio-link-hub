import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Star, Users, BarChart3, Palette, Globe, Zap, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Designer Intuitivo",
      description: "Crie seu perfil com nosso editor visual drag-and-drop"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Avançado",
      description: "Acompanhe cliques, visualizações e performance em tempo real"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "SEO Otimizado",
      description: "Seu perfil otimizado para mecanismos de busca"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile First",
      description: "Perfeito em qualquer dispositivo e tela"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Carregamento Rápido",
      description: "Páginas ultra-rápidas com tecnologia de ponta"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Seguro e Confiável",
      description: "Seus dados protegidos com segurança bancária"
    }
  ];

  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Perfeito para começar",
      features: [
        "Até 5 links",
        "Templates básicos",
        "Analytics simples",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 29",
      period: "/mês",
      description: "Para profissionais",
      features: [
        "Links ilimitados",
        "Templates premium",
        "Analytics avançado",
        "Domínio personalizado",
        "Suporte prioritário",
        "Integração com redes sociais"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "R$ 99",
      period: "/mês",
      description: "Para empresas",
      features: [
        "Tudo do Pro",
        "Múltiplas páginas",
        "API personalizada",
        "Relatórios avançados",
        "Suporte 24/7",
        "Gerente de conta dedicado"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Suabio
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#recursos" className="text-gray-600 hover:text-green-600 transition-colors">Recursos</a>
            <a href="#precos" className="text-gray-600 hover:text-green-600 transition-colors">Preços</a>
            <a href="#contato" className="text-gray-600 hover:text-green-600 transition-colors">Contato</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Star className="w-4 h-4 mr-1" />
            A Alternativa Brasileira ao Linktree
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-orange-600 bg-clip-text text-transparent">
            Uma bio, infinitas
            <br />
            possibilidades
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie sua página de links personalizada com design brasileiro, 
            analytics avançado e recursos exclusivos para impulsionar sua presença online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg px-8 py-6">
                Criar Minha Página
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-green-200 hover:bg-green-50">
              Ver Exemplo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Cliques por Mês</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Recursos Poderosos para Brasileiros
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especialmente para o mercado brasileiro com recursos que realmente importam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Preços Justos para Todos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades. Sem pegadinhas, sem taxas ocultas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-green-500 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-orange-500">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-green-600 my-4">
                    {plan.price}
                    <span className="text-lg text-gray-500">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    size="lg"
                  >
                    {plan.name === 'Gratuito' ? 'Começar Grátis' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de brasileiros que já transformaram sua presença online com o Suabio
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              Criar Conta Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg"></div>
                <span className="text-2xl font-bold">Suabio</span>
              </div>
              <p className="text-gray-400">
                A plataforma brasileira de bio links que conecta você ao seu público.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Suabio. Todos os direitos reservados. Feito com ❤️ no Brasil.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
