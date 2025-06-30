"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Search, Eye, MousePointer, BarChart3, Globe, RefreshCw } from 'lucide-react';

interface SEOMetrics {
  searchConsole: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries: Array<{
      query: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
    topPages: Array<{
      page: string;
      clicks: number;
      impressions: number;
      ctr: number;
      position: number;
    }>;
  };
  analytics: {
    pageviews: number;
    sessions: number;
    bounceRate: number;
    avgSessionDuration: number;
    topContentGroups: Array<{
      contentGroup: string;
      pageviews: number;
      sessions: number;
    }>;
  };
  seoPages: {
    totalSEOPages: number;
    indexedPages: number;
    avgPosition: number;
    organicTraffic: number;
  };
  performance: {
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    pageSpeed: number;
    mobileUsability: number;
  };
}

export default function SEODashboard() {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState(30);

  useEffect(() => {
    fetchSEOMetrics();
  }, [dateRange]);

  const fetchSEOMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch Search Console data
      const searchConsoleResponse = await fetch(`/api/search-console/query?days=${dateRange}`);
      const searchConsoleData = searchConsoleResponse.ok ? await searchConsoleResponse.json() : null;

      // Fetch internal analytics data
      const supabase = createClient();
      
      // Get SEO pages performance
      const { data: seoEvents } = await supabase
        .from('guest_behavior_events')
        .select('*')
        .eq('event_type', 'page_view')
        .like('page_url', '%/seo/%')
        .gte('created_at', new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString());

      // Get overall traffic metrics
      const { data: allEvents } = await supabase
        .from('guest_behavior_events')
        .select('*')
        .eq('event_type', 'page_view')
        .gte('created_at', new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString());

      // Mock performance data (in real app, fetch from PageSpeed Insights API)
      const performanceData = {
        coreWebVitals: {
          lcp: 2.1,
          fid: 45,
          cls: 0.08
        },
        pageSpeed: 92,
        mobileUsability: 98
      };

      const compiledMetrics: SEOMetrics = {
        searchConsole: {
          clicks: searchConsoleData?.overview?.clicks || 0,
          impressions: searchConsoleData?.overview?.impressions || 0,
          ctr: searchConsoleData?.overview?.ctr || 0,
          position: searchConsoleData?.overview?.position || 0,
          topQueries: searchConsoleData?.topQueries || [],
          topPages: searchConsoleData?.topPages || []
        },
        analytics: {
          pageviews: allEvents?.length || 0,
          sessions: new Set(allEvents?.map(e => e.session_id) || []).size,
          bounceRate: 0.25, // Mock data
          avgSessionDuration: 180, // Mock data
          topContentGroups: [
            { contentGroup: 'SEO Pages', pageviews: seoEvents?.length || 0, sessions: new Set(seoEvents?.map(e => e.session_id) || []).size },
            { contentGroup: 'Homepage', pageviews: allEvents?.filter(e => e.page_url?.endsWith('/'))?.length || 0, sessions: 0 },
            { contentGroup: 'Premium', pageviews: allEvents?.filter(e => e.page_url?.includes('premium'))?.length || 0, sessions: 0 }
          ]
        },
        seoPages: {
          totalSEOPages: 9, // We have 9 SEO categories
          indexedPages: searchConsoleData?.topPages?.filter((p: any) => p.page.includes('/seo/'))?.length || 0,
          avgPosition: searchConsoleData?.topPages?.filter((p: any) => p.page.includes('/seo/'))
            ?.reduce((sum: number, p: any) => sum + p.position, 0) / 
            (searchConsoleData?.topPages?.filter((p: any) => p.page.includes('/seo/'))?.length || 1) || 0,
          organicTraffic: seoEvents?.length || 0
        },
        performance: performanceData
      };

      setMetrics(compiledMetrics);
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshMetrics = async () => {
    setRefreshing(true);
    await fetchSEOMetrics();
  };

  const submitSEOPagesForIndexing = async () => {
    try {
      const seoUrls = [
        '/seo/amor-pareja',
        '/seo/trabajo-carrera',
        '/seo/dinero-finanzas',
        '/seo/salud-bienestar',
        '/seo/familia-relaciones',
        '/seo/crecimiento-espiritual',
        '/seo/viajes-aventuras',
        '/seo/estudios-aprendizaje',
        '/seo/cambios-transformacion'
      ].map(path => `${process.env.NEXT_PUBLIC_BASE_URL}${path}`);

      const response = await fetch('/api/search-console/submit-url', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: seoUrls })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Submitted ${result.successful} URLs for indexing successfully!`);
      } else {
        alert('Failed to submit URLs for indexing');
      }
    } catch (error) {
      console.error('Error submitting URLs:', error);
      alert('Error submitting URLs for indexing');
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <p className="text-purple-200">Cargando métricas SEO...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-amber-300 mb-2">🔍 SEO Dashboard</h1>
            <p className="text-purple-200">Monitoreo integral de optimización para buscadores</p>
          </div>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(Number(e.target.value))}
              className="bg-slate-800 text-amber-100 px-4 py-2 rounded-lg border border-purple-600"
            >
              <option value={7}>Últimos 7 días</option>
              <option value={30}>Últimos 30 días</option>
              <option value={90}>Últimos 90 días</option>
            </select>
            <Button 
              onClick={refreshMetrics}
              disabled={refreshing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button 
              onClick={submitSEOPagesForIndexing}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Globe className="w-4 h-4 mr-2" />
              Indexar SEO Pages
            </Button>
          </div>
        </div>

        {/* Search Console Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Clicks Totales</CardTitle>
              <MousePointer className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {metrics?.searchConsole.clicks?.toLocaleString() || '0'}
              </div>
              <p className="text-xs text-purple-300">
                CTR: {((metrics?.searchConsole.ctr || 0) * 100).toFixed(2)}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Impresiones</CardTitle>
              <Eye className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {metrics?.searchConsole.impressions?.toLocaleString() || '0'}
              </div>
              <p className="text-xs text-purple-300">
                Posición promedio: {metrics?.searchConsole.position?.toFixed(1) || '0'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Páginas SEO</CardTitle>
              <Search className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {metrics?.seoPages.indexedPages || 0}/{metrics?.seoPages.totalSEOPages || 9}
              </div>
              <p className="text-xs text-purple-300">
                Posición promedio: {metrics?.seoPages.avgPosition?.toFixed(1) || '0'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-200">Core Web Vitals</CardTitle>
              <BarChart3 className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-300">
                {metrics?.performance.pageSpeed || 0}
              </div>
              <p className="text-xs text-purple-300">
                LCP: {metrics?.performance.coreWebVitals.lcp}s | CLS: {metrics?.performance.coreWebVitals.cls}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Queries and Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-amber-300">🔍 Top Queries (Search Console)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics?.searchConsole.topQueries?.slice(0, 10).map((query, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-purple-200 font-medium">{query.query}</p>
                      <p className="text-xs text-purple-400">
                        Clicks: {query.clicks} | Impresiones: {query.impressions}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-300 font-bold">#{query.position.toFixed(1)}</p>
                      <p className="text-xs text-purple-300">{(query.ctr * 100).toFixed(2)}% CTR</p>
                    </div>
                  </div>
                )) || <p className="text-purple-400">No hay datos de Search Console disponibles</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-600">
            <CardHeader>
              <CardTitle className="text-amber-300">📄 Top Páginas (Search Console)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics?.searchConsole.topPages?.slice(0, 10).map((page, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-purple-200 font-medium text-sm">
                        {page.page.replace(process.env.NEXT_PUBLIC_BASE_URL || '', '')}
                      </p>
                      <p className="text-xs text-purple-400">
                        Clicks: {page.clicks} | Impresiones: {page.impressions}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-300 font-bold">#{page.position.toFixed(1)}</p>
                      <p className="text-xs text-purple-300">{(page.ctr * 100).toFixed(2)}% CTR</p>
                    </div>
                  </div>
                )) || <p className="text-purple-400">No hay datos de Search Console disponibles</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Performance */}
        <Card className="bg-slate-800/50 border-purple-600">
          <CardHeader>
            <CardTitle className="text-amber-300">📊 Rendimiento por Tipo de Contenido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metrics?.analytics.topContentGroups?.map((group, index) => (
                <div key={index} className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="text-lg font-semibold text-amber-300 mb-2">{group.contentGroup}</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-purple-200">{group.pageviews.toLocaleString()}</p>
                    <p className="text-sm text-purple-400">Pageviews</p>
                    <p className="text-lg font-semibold text-amber-400">{group.sessions.toLocaleString()}</p>
                    <p className="text-sm text-purple-400">Sessions</p>
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
