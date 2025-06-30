"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Target, Users, BarChart3 } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  questionsAnalyzed: number;
  premiumAdClicks: number;
  estimatedRevenue: number;
  topCategories: Array<{ category: string; count: number; revenue: number }>;
  revenueMultiplier: number;
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    questionsAnalyzed: 0,
    premiumAdClicks: 0,
    estimatedRevenue: 0,
    topCategories: [],
    revenueMultiplier: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const supabase = createClient();

      // Get total users
      const { data: guests } = await supabase
        .from('guests')
        .select('guest_id');

      // Get questions analyzed
      const { data: profiles } = await supabase
        .from('user_interest_profiles')
        .select('*');

      // Get premium ad performance
      const { data: adEvents } = await supabase
        .from('premium_ad_events')
        .select('*')
        .eq('event_type', 'premium_ad_click');

      // Calculate category statistics
      const categoryStats = (profiles || []).reduce((acc, profile) => {
        const category = profile.primary_category || 'unknown';
        if (!acc[category]) {
          acc[category] = { count: 0, revenue: 0 };
        }
        acc[category].count++;
        acc[category].revenue += profile.commercial_value * 0.1; // Estimated revenue per profile
        return acc;
      }, {} as Record<string, { count: number; revenue: number }>);

      const topCategories = Object.entries(categoryStats)
        .map(([category, stats]) => ({ category, ...stats }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      const totalRevenue = (adEvents || []).reduce((sum, event) => sum + (event.estimated_revenue || 0), 0);
      const revenueMultiplier = totalRevenue > 0 ? totalRevenue / (profiles?.length || 1 * 0.30) : 1;

      setAnalytics({
        totalUsers: guests?.length || 0,
        questionsAnalyzed: profiles?.length || 0,
        premiumAdClicks: adEvents?.length || 0,
        estimatedRevenue: totalRevenue,
        topCategories,
        revenueMultiplier
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <p className="text-purple-200">Cargando analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-2">📊 Analytics Dashboard</h1>
          <p className="text-purple-200">Sistema de Monetización con LLM - Revenue Multiplier</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Total de Usuarios</CardTitle>
              <Users className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">{analytics.totalUsers}</div>
              <p className="text-xs text-purple-400">Guests identificados</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Preguntas Analizadas</CardTitle>
              <Target className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">{analytics.questionsAnalyzed}</div>
              <p className="text-xs text-purple-400">Con análisis LLM</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Clicks Premium</CardTitle>
              <BarChart3 className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">{analytics.premiumAdClicks}</div>
              <p className="text-xs text-purple-400">Ads de alta conversión</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Revenue Estimado</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">${analytics.estimatedRevenue.toFixed(2)}</div>
              <p className="text-xs text-purple-400">vs ${(analytics.questionsAnalyzed * 0.30).toFixed(2)} básico</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Multiplier */}
        <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Multiplier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {analytics.revenueMultiplier.toFixed(1)}x
            </div>
            <p className="text-green-200">
              El análisis LLM está generando <strong>{analytics.revenueMultiplier.toFixed(1)}x</strong> más revenue que los ads básicos
            </p>
            <div className="mt-4 p-3 bg-black/20 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-red-300">Revenue Básico: ${(analytics.questionsAnalyzed * 0.30).toFixed(2)}</span>
                <span className="text-green-300">Revenue Premium: ${analytics.estimatedRevenue.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-200">Top Categorías por Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topCategories.map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-amber-300 font-medium capitalize">{category.category}</p>
                      <p className="text-xs text-purple-400">{category.count} preguntas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">${category.revenue.toFixed(2)}</p>
                    <p className="text-xs text-purple-400">estimado</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
