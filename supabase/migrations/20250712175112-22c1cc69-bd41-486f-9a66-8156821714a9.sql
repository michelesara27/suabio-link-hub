
-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  social_youtube TEXT,
  theme TEXT DEFAULT 'default',
  custom_css TEXT,
  seo_title TEXT,
  seo_description TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de templates
CREATE TABLE public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  preview_image TEXT,
  css_styles JSONB,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de links
CREATE TABLE public.links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  click_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  scheduled_start TIMESTAMP WITH TIME ZONE,
  scheduled_end TIMESTAMP WITH TIME ZONE,
  geo_targeting TEXT[],
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de cliques (analytics)
CREATE TABLE public.link_clicks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  link_id UUID REFERENCES public.links(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de visualizações de página
CREATE TABLE public.page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações do usuário
CREATE TABLE public.user_settings (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  analytics_enabled BOOLEAN DEFAULT true,
  privacy_mode BOOLEAN DEFAULT false,
  custom_domain TEXT,
  google_analytics_id TEXT,
  facebook_pixel_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir templates padrão
INSERT INTO public.templates (name, description, preview_image, css_styles, is_premium) VALUES
('Moderno Verde', 'Template moderno com gradiente verde', '/templates/modern-green.jpg', '{"background": "linear-gradient(135deg, #00B894, #00A085)", "text_color": "#FFFFFF", "button_style": "rounded"}', false),
('Elegante Laranja', 'Design elegante com tons de laranja', '/templates/elegant-orange.jpg', '{"background": "linear-gradient(135deg, #FF6B35, #F7931E)", "text_color": "#FFFFFF", "button_style": "rounded-lg"}', false),
('Profissional Azul', 'Layout profissional em azul', '/templates/professional-blue.jpg', '{"background": "linear-gradient(135deg, #0984e3, #00b894)", "text_color": "#FFFFFF", "button_style": "square"}', false),
('Minimalista', 'Design limpo e minimalista', '/templates/minimal.jpg', '{"background": "#FFFFFF", "text_color": "#2D3748", "button_style": "outline"}', false),
('Neon Premium', 'Estilo neon vibrante (Premium)', '/templates/neon.jpg', '{"background": "linear-gradient(135deg, #8B5CF6, #EC4899)", "text_color": "#FFFFFF", "button_style": "neon"}', true);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Perfis são visíveis publicamente" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem inserir seu próprio perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para links
CREATE POLICY "Links são visíveis publicamente quando ativos" ON public.links
  FOR SELECT USING (is_active = true);

CREATE POLICY "Usuários podem ver todos seus links" ON public.links
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios links" ON public.links
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios links" ON public.links
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios links" ON public.links
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas RLS para cliques de links
CREATE POLICY "Usuários podem ver cliques de seus links" ON public.link_clicks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.links 
      WHERE links.id = link_clicks.link_id 
      AND links.user_id = auth.uid()
    )
  );

CREATE POLICY "Qualquer um pode inserir cliques" ON public.link_clicks
  FOR INSERT WITH CHECK (true);

-- Políticas RLS para visualizações de página
CREATE POLICY "Usuários podem ver visualizações de seu perfil" ON public.page_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = page_views.profile_id 
      AND profiles.id = auth.uid()
    )
  );

CREATE POLICY "Qualquer um pode inserir visualizações" ON public.page_views
  FOR INSERT WITH CHECK (true);

-- Políticas RLS para configurações do usuário
CREATE POLICY "Usuários podem ver suas próprias configurações" ON public.user_settings
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir suas próprias configurações" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar suas próprias configurações" ON public.user_settings
  FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para templates
CREATE POLICY "Templates são visíveis publicamente" ON public.templates
  FOR SELECT USING (true);

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  INSERT INTO public.user_settings (id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_links
  BEFORE UPDATE ON public.links
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_updated_at_user_settings
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Índices para performance
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_links_user_id ON public.links(user_id);
CREATE INDEX idx_links_position ON public.links(position);
CREATE INDEX idx_link_clicks_link_id ON public.link_clicks(link_id);
CREATE INDEX idx_link_clicks_created_at ON public.link_clicks(created_at);
CREATE INDEX idx_page_views_profile_id ON public.page_views(profile_id);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
