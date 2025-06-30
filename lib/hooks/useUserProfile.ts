// Hook para manejar el perfil de usuario y preferencias de notificaciones
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string;
  phone?: string;
  notifications_enabled: boolean;
  notification_preferences: {
    daily_card: boolean;
    weekly_insights: boolean;
    marketing: boolean;
  };
  timezone: string;
  preferred_notification_time: string;
  last_daily_card_sent?: string;
  created_at: string;
  updated_at: string;
}

export function useUserProfile(user: User | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (!data) {
        // Create default profile if it doesn't exist
        const defaultProfile = {
          user_id: user.id,
          phone: user.user_metadata?.phone || null,
          notifications_enabled: user.user_metadata?.notifications_enabled || false,
          notification_preferences: user.user_metadata?.notification_preferences || {
            daily_card: false,
            weekly_insights: false,
            marketing: false
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
          preferred_notification_time: '09:00:00'
        };

        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert(defaultProfile)
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => {
    if (!user || !profile) return false;

    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
}
