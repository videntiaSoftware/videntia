"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Save, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface NotificationSettingsProps {
  user: User;
}

export default function NotificationSettings({ user }: NotificationSettingsProps) {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [dailyNotificationsEnabled, setDailyNotificationsEnabled] = useState(false);

  // Cargar configuración actual
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('user_profiles')
          .select('daily_notifications_enabled')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading profile:', error);
        }

        if (data) {
          setDailyNotificationsEnabled(data.daily_notifications_enabled || false);
        }
      } catch (error) {
        console.error('Error in loadProfile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          daily_notifications_enabled: dailyNotificationsEnabled,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Preferencias guardadas exitosamente' });
    } catch (error) {
      console.error('Error saving preferences:', error);
      setMessage({ type: 'error', text: 'Error al guardar las preferencias' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-amber-300">
            <div className="w-4 h-4 border-2 border-amber-300/30 border-t-amber-300 rounded-full animate-spin" />
            Cargando preferencias...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-amber-300 font-cormorant text-xl flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Carta del Día
        </CardTitle>
        <CardDescription className="text-slate-300">
          Recibe una carta de tarot inspiradora cada mañana en tu email
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Mensaje de estado */}
        {message && (
          <div className={`p-3 rounded-lg text-center ${
            message.type === 'success' 
              ? 'bg-green-900/50 text-green-300 border border-green-500/30' 
              : 'bg-red-900/50 text-red-300 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        {/* Toggle de carta del día */}
        <div className="flex items-start space-x-3 p-4 bg-slate-800/30 rounded-lg border border-amber-500/20">
          <Checkbox
            id="daily_notifications"
            checked={dailyNotificationsEnabled}
            onCheckedChange={(checked) => setDailyNotificationsEnabled(checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="daily_notifications" className="text-amber-200 font-cormorant flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Carta del Día por Email
            </Label>
            <p className="text-sm text-slate-400 mt-1">
              Recibe una carta de tarot inspiradora cada mañana en tu email. 
              El universo seleccionará una carta especial para guiar tu día.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        {dailyNotificationsEnabled && (
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-amber-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">¿Qué recibirás?</span>
            </div>
            <ul className="text-sm text-amber-200 space-y-1">
              <li>• Una carta de tarot cuidadosamente seleccionada</li>
              <li>• Su significado e interpretación</li>
              <li>• Un mensaje inspirador para tu día</li>
              <li>• Enviado cada mañana a las 9:00 AM</li>
            </ul>
          </div>
        )}

        {/* Botón de guardar */}
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-semibold"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Guardando...' : 'Guardar Preferencias'}
        </Button>

        {/* Información sobre privacidad */}
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30">
          <p className="text-xs text-slate-400 text-center">
            🔒 Tu información es privada y segura. Solo enviaremos tu carta del día.
            Puedes desactivar las notificaciones en cualquier momento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
