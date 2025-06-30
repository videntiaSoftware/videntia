"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send, Calendar, Sparkles } from "lucide-react";
import DiscreteHomeLink from "@/components/ui/DiscreteHomeLink";

export default function DailyCardTestPage() {
  const [emailLoading, setEmailLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [massLoading, setMassLoading] = useState(false); // Para envío masivo
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [cardData, setCardData] = useState<any>(null);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const date = formData.get('test-date') as string;

    try {
      const response = await fetch('/api/notifications/enhanced-daily-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date: date || undefined }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `¡Email enviado exitosamente! Carta: ${result.reading.card_name} (${result.reading.position})` 
        });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } finally {
      setEmailLoading(false);
    }
  };

  // Función para envío masivo a todos los usuarios
  const handleMassEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMassLoading(true);
    setMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const date = formData.get('mass-date') as string;

    if (!confirm('⚠️ ¿Estás seguro? Esto enviará emails a TODOS los usuarios registrados. Esta acción no se puede deshacer.')) {
      setMassLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/notifications/enhanced-daily-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'send_to_all_users',
          date: date || undefined 
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: `🎉 ¡Envío masivo exitoso! ${result.data.emailsSent} emails enviados de ${result.data.totalUsers} usuarios registrados.` 
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Error en el envío masivo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } finally {
      setMassLoading(false);
    }
  };

  const handleViewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setViewLoading(true);
    setMessage(null);
    setCardData(null);
    
    const formData = new FormData(e.currentTarget);
    const date = formData.get('view-date') as string;
    const email = formData.get('view-email') as string;

    if (!date) {
      setMessage({ type: 'error', text: 'Por favor selecciona una fecha' });
      setViewLoading(false);
      return;
    }

    if (!email) {
      setMessage({ type: 'error', text: 'Por favor ingresa un email para personalizar la lectura' });
      setViewLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/notifications/enhanced-daily-card?date=${date}&test_email=${encodeURIComponent(email)}`);
      const result = await response.json();
      
      if (result.success) {
        setCardData(result.reading);
        setMessage({ type: 'success', text: `Lectura personal generada para ${email}` });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } finally {
      setViewLoading(false);
    }
  };

  const handleViewStats = async () => {
    setViewLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/notifications/enhanced-daily-card?action=stats');
      const result = await response.json();
      
      if (result.success) {
        const stats = result.stats;
        setMessage({ 
          type: 'success', 
          text: `Base de datos: ${stats.total_cards} cartas, ${stats.total_interpretations} interpretaciones, ${stats.total_templates} plantillas, ${stats.total_readings} lecturas generadas` 
        });
      } else {
        setMessage({ type: 'error', text: 'Error obteniendo estadísticas' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Error: ${error}` });
    } finally {
      setViewLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <DiscreteHomeLink />
        
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-cormorant text-amber-300 mb-2">
              🃏 Test de Carta del Día
            </h1>
            <p className="text-slate-300">
              Prueba el sistema de notificaciones de cartas del tarot
            </p>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.type === 'success' 
                ? 'bg-green-900/50 text-green-300 border border-green-500/30' 
                : 'bg-red-900/50 text-red-300 border border-red-500/30'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Test de envío */}
            <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-300 font-cormorant text-xl flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Enviar Lectura de Prueba
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Envía una lectura completa a un email específico
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form className="space-y-4" onSubmit={handleEmailSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-200 font-cormorant flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email de destino
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      required
                      className="bg-slate-800 border-amber-500/30 text-white placeholder-slate-400"
                    />
                    <p className="text-xs text-amber-400">
                      Cada usuario recibe una lectura única y personal
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-date" className="text-amber-200 font-cormorant flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha (opcional)
                    </Label>
                    <Input
                      id="test-date"
                      name="test-date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="bg-slate-800 border-amber-500/30 text-white"
                    />
                    <p className="text-xs text-slate-400">
                      Si no se especifica, se usará la fecha de hoy
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={emailLoading}
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {emailLoading ? 'Enviando...' : 'Enviar Carta de Prueba'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Envío masivo - PELIGROSO */}
            <Card className="bg-red-900/90 border-red-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-300 font-cormorant text-xl flex items-center gap-2">
                  📡 Envío Masivo
                </CardTitle>
                <CardDescription className="text-red-200">
                  ⚠️ Envía a TODOS los usuarios registrados
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form className="space-y-4" onSubmit={handleMassEmailSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="mass-date" className="text-red-200 font-cormorant flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha para cartas masivas
                    </Label>
                    <Input
                      id="mass-date"
                      name="mass-date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="bg-red-950 border-red-500/30 text-white"
                    />
                    <p className="text-xs text-red-300">
                      Cada usuario recibirá SU carta personal única
                    </p>
                  </div>

                  <div className="bg-red-950/50 p-3 rounded border border-red-500/30">
                    <p className="text-red-200 text-xs space-y-1">
                      <span className="font-bold">⚠️ CUIDADO:</span>
                      <br />• Esto envía emails a TODOS los usuarios
                      <br />• Cada uno recibe una carta diferente
                      <br />• Úsalo solo para el envío diario de las 10 AM
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    disabled={massLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold"
                  >
                    📡 {massLoading ? 'Enviando a todos...' : 'Enviar a Todos los Usuarios'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Visualización de carta */}
            <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-300 font-cormorant text-xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generar Lectura Diaria
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Visualiza la lectura completa para una fecha
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form className="space-y-4" onSubmit={handleViewSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="view-email" className="text-amber-200 font-cormorant flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email del usuario (para personalización)
                    </Label>
                    <Input
                      id="view-email"
                      name="view-email"
                      type="email"
                      placeholder="test@ejemplo.com"
                      defaultValue="test@videntia.com"
                      className="bg-slate-800 border-amber-500/30 text-white placeholder-slate-400"
                    />
                    <p className="text-xs text-slate-400">
                      Diferentes usuarios = diferentes cartas para la misma fecha
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="view-date" className="text-amber-200 font-cormorant flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fecha
                    </Label>
                    <Input
                      id="view-date"
                      name="view-date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="bg-slate-800 border-amber-500/30 text-white"
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={viewLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {viewLoading ? 'Generando...' : 'Generar Lectura Personal'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Estadísticas de la base de datos */}
            <Card className="bg-slate-900/90 border-green-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-green-300 font-cormorant text-xl flex items-center gap-2">
                  📊 Estadísticas DB
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Verifica el estado de la base de datos
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={handleViewStats}
                    disabled={viewLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold"
                  >
                    📈 Ver Estadísticas
                  </Button>
                  
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>• Verifica cartas del tarot cargadas</p>
                    <p>• Cuenta interpretaciones disponibles</p>
                    <p>• Revisa plantillas de mensajes</p>
                    <p>• Lecturas diarias generadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mostrar lectura completa si está disponible */}
          {cardData && (
            <Card className="bg-slate-900/90 border-amber-500/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-300 font-cormorant text-2xl flex items-center gap-2">
                  🃏 {cardData.card_name}
                  <span className="text-sm text-slate-400 font-normal">
                    ({cardData.card_position === 'upright' ? 'Normal' : 'Invertida'})
                  </span>
                </CardTitle>
                <CardDescription className="text-amber-200 italic text-lg">
                  {cardData.card_meaning}
                </CardDescription>
                {cardData.personalized && (
                  <div className="bg-purple-900/30 px-3 py-2 rounded-lg border border-purple-500/40">
                    <p className="text-purple-200 text-sm flex items-center gap-2">
                      ✨ <span>Lectura Personal Exclusiva</span>
                    </p>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-slate-800/30 p-4 rounded-lg border border-amber-500/20">
                  <h4 className="text-amber-300 font-medium mb-3">Lectura Personalizada:</h4>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {cardData.full_message}
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-300 font-medium mb-2">Tu Energía Personal:</h4>
                  <p className="text-purple-200 italic">
                    {cardData.energy_focus}
                  </p>
                </div>
                
                <div className="text-sm text-slate-400 text-center space-y-1">
                  <p>Fecha: {cardData.date_for}</p>
                  <p>ID de lectura: {cardData.id}</p>
                  {cardData.personalized && (
                    <p className="text-purple-400">💫 Esta lectura es única para este usuario</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
