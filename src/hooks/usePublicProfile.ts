
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PublicLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  clicks: number;
  icon?: string;
}

export interface PublicProfileData {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_twitter?: string;
  social_youtube?: string;
  is_verified: boolean;
  created_at: string;
}

export const usePublicProfile = (username: string) => {
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [links, setLinks] = useState<PublicLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      if (!username) return;

      try {
        // Fetch profile by username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (profileError) {
          throw profileError;
        }

        setProfile(profileData);

        // Fetch active links for this user
        const { data: linksData, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('user_id', profileData.id)
          .eq('is_active', true)
          .order('position', { ascending: true });

        if (linksError) {
          throw linksError;
        }

        const formattedLinks: PublicLink[] = linksData.map(link => ({
          id: link.id,
          title: link.title,
          url: link.url,
          description: link.description || undefined,
          clicks: link.click_count || 0,
          icon: link.icon || undefined
        }));

        setLinks(formattedLinks);
      } catch (err) {
        console.error('Error fetching public profile:', err);
        setError('Perfil não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  const trackLinkClick = async (linkId: string) => {
    try {
      // Get current click count first
      const { data: currentLink, error: fetchError } = await supabase
        .from('links')
        .select('click_count')
        .eq('id', linkId)
        .single();

      if (fetchError) {
        console.error('Error fetching current click count:', fetchError);
        return;
      }

      // Increment click count
      const newClickCount = (currentLink.click_count || 0) + 1;
      
      await supabase
        .from('links')
        .update({ click_count: newClickCount })
        .eq('id', linkId);

      // Track click analytics (optional - could be expanded later)
      await supabase
        .from('link_clicks')
        .insert({
          link_id: linkId,
          user_id: profile?.id || '',
          ip_address: null, // Could be obtained from request
          user_agent: navigator.userAgent,
          referer: document.referrer || null
        });

      // Update local state
      setLinks(prev => prev.map(link => 
        link.id === linkId 
          ? { ...link, clicks: link.clicks + 1 }
          : link
      ));
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  return {
    profile,
    links,
    loading,
    error,
    trackLinkClick
  };
};
