import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  clicks: number;
  isActive: boolean;
  createdAt: string;
  position: number;
}

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchLinks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true });

      if (error) throw error;

      const formattedLinks = data?.map(link => ({
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description || '',
        clicks: link.click_count || 0,
        isActive: link.is_active || false,
        createdAt: link.created_at,
        position: link.position || 0
      })) || [];

      setLinks(formattedLinks);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os links",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addLink = async (linkData: { title: string; url: string; description?: string }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .insert({
          user_id: user.id,
          title: linkData.title,
          url: linkData.url,
          description: linkData.description,
          position: links.length
        })
        .select()
        .single();

      if (error) throw error;

      const newLink: Link = {
        id: data.id,
        title: data.title,
        url: data.url,
        description: data.description || '',
        clicks: 0,
        isActive: true,
        createdAt: data.created_at,
        position: data.position || 0
      };

      setLinks(prev => [newLink, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Link adicionado com sucesso"
      });

      return true;
    } catch (error) {
      console.error('Error adding link:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o link",
        variant: "destructive"
      });
      return false;
    }
  };

  const toggleLinkStatus = async (id: string) => {
    try {
      const link = links.find(l => l.id === id);
      if (!link) return;

      const { error } = await supabase
        .from('links')
        .update({ is_active: !link.isActive })
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.map(l => 
        l.id === id ? { ...l, isActive: !l.isActive } : l
      ));
    } catch (error) {
      console.error('Error toggling link status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do link",
        variant: "destructive"
      });
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLinks(prev => prev.filter(l => l.id !== id));
      
      toast({
        title: "Link removido",
        description: "O link foi excluído permanentemente"
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o link",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [user]);

  return {
    links,
    loading,
    addLink,
    toggleLinkStatus,
    deleteLink,
    refetch: fetchLinks
  };
};
