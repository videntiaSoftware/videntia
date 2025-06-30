// Servicio simplificado para manejar notificaciones de carta del día
import { createClient } from '@/lib/supabase/client';

export interface DailyCard {
  id: string;
  card_name: string;
  card_meaning: string;
  daily_message: string;
  date_for: string;
}

class NotificationService {
  // Obtener carta del día desde la base de datos
  async getDailyCard(date?: string): Promise<DailyCard | null> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('daily_cards')
        .select('*')
        .eq('date_for', targetDate)
        .single();

      if (error) {
        console.log(`No card found for ${targetDate}, getting a random one`);
        // Si no hay carta para hoy, obtener una aleatoria
        const { data: randomCard, error: randomError } = await supabase
          .from('daily_cards')
          .select('*')
          .limit(1);
        
        if (randomError) {
          console.error('Error fetching random card:', randomError);
          return null;
        }
        
        return randomCard?.[0] || null;
      }

      return data;
    } catch (error) {
      console.error('Error in getDailyCard:', error);
      return null;
    }
  }

  // Enviar notificación de carta del día por email
  async sendDailyCardEmail(userEmail: string, userName: string, cardData: DailyCard): Promise<boolean> {
    try {
      const response = await fetch('/api/notifications/daily-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          card_data: cardData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      return true;
    } catch (error) {
      console.error('Error sending daily card email:', error);
      return false;
    }
  }

  // Obtener usuarios que tienen habilitadas las notificaciones diarias
  async getUsersForDailyNotifications(): Promise<Array<{
    user_id: string;
    email: string;
    name?: string;
  }>> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_profiles')
        .select(`
          user_id,
          users:user_id (
            email,
            raw_user_meta_data
          )
        `)
        .eq('daily_notifications_enabled', true);

      if (error) throw error;

      return (data || []).map((profile: any) => ({
        user_id: profile.user_id,
        email: profile.users.email,
        name: profile.users.raw_user_meta_data?.name || 
              profile.users.raw_user_meta_data?.full_name ||
              profile.users.raw_user_meta_data?.display_name
      }));
    } catch (error) {
      console.error('Error getting users for daily notifications:', error);
      return [];
    }
  }

  // Registrar notificación enviada
  async logNotification(userId: string, dailyCardId?: string, status: string = 'sent'): Promise<boolean> {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('notification_logs')
        .insert({
          user_id: userId,
          daily_card_id: dailyCardId,
          email_status: status,
          sent_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error logging notification:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
