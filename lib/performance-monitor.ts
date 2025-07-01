/**
 * Performance Monitoring & SEO Optimization
 * Monitoreo de Core Web Vitals y métricas de performance críticas para SEO
 */

export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
  tbt: number; // Total Blocking Time
}

export interface SEOPerformanceData {
  coreWebVitals: PerformanceMetrics;
  pageSpeed: number;
  seoScore: number;
  recommendations: string[];
  timestamp: string;
}

/**
 * Performance Monitor Class
 */
export class PerformanceMonitor {
  
  /**
   * Obtener métricas de Core Web Vitals
   */
  static async getCoreWebVitals(): Promise<PerformanceMetrics> {
    if (typeof window === 'undefined') {
      return {
        lcp: 0, fid: 0, cls: 0, fcp: 0, ttfb: 0, tbt: 0
      };
    }

    const metrics: Partial<PerformanceMetrics> = {};

    // Usar web-vitals library si está disponible
    if ('web-vitals' in window) {
      const { getCLS, getFID, getLCP, getFCP, getTTFB } = (window as any)['web-vitals'];
      
      await Promise.all([
        new Promise(resolve => getCLS((metric: any) => {
          metrics.cls = metric.value;
          resolve(metric.value);
        })),
        new Promise(resolve => getFID((metric: any) => {
          metrics.fid = metric.value;
          resolve(metric.value);
        })),
        new Promise(resolve => getLCP((metric: any) => {
          metrics.lcp = metric.value;
          resolve(metric.value);
        })),
        new Promise(resolve => getFCP((metric: any) => {
          metrics.fcp = metric.value;
          resolve(metric.value);
        })),
        new Promise(resolve => getTTFB((metric: any) => {
          metrics.ttfb = metric.value;
          resolve(metric.value);
        }))
      ]);
    }

    return {
      lcp: metrics.lcp || 0,
      fid: metrics.fid || 0,
      cls: metrics.cls || 0,
      fcp: metrics.fcp || 0,
      ttfb: metrics.ttfb || 0,
      tbt: 0 // Calculado por Lighthouse
    };
  }

  /**
   * Evaluar performance vs. thresholds de Google
   */
  static evaluatePerformance(metrics: PerformanceMetrics): {
    score: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let score = 100;

    // LCP (Largest Contentful Paint)
    if (metrics.lcp > 4000) {
      score -= 30;
      recommendations.push('LCP muy alto (>4s): optimizar imágenes, usar CDN, mejorar servidor');
    } else if (metrics.lcp > 2500) {
      score -= 15;
      recommendations.push('LCP moderado (>2.5s): considerar optimizar recursos críticos');
    }

    // FID (First Input Delay)
    if (metrics.fid > 300) {
      score -= 25;
      recommendations.push('FID alto (>300ms): reducir JavaScript, usar web workers');
    } else if (metrics.fid > 100) {
      score -= 10;
      recommendations.push('FID moderado (>100ms): optimizar JavaScript crítico');
    }

    // CLS (Cumulative Layout Shift)
    if (metrics.cls > 0.25) {
      score -= 20;
      recommendations.push('CLS alto (>0.25): fijar dimensiones de imágenes, evitar contenido dinámico');
    } else if (metrics.cls > 0.1) {
      score -= 10;
      recommendations.push('CLS moderado (>0.1): revisar layout shifts');
    }

    // FCP (First Contentful Paint)
    if (metrics.fcp > 3000) {
      score -= 15;
      recommendations.push('FCP lento (>3s): optimizar recursos críticos, usar preload');
    }

    // TTFB (Time to First Byte)
    if (metrics.ttfb > 800) {
      score -= 10;
      recommendations.push('TTFB alto (>800ms): optimizar servidor, usar CDN');
    }

    return { score: Math.max(0, score), recommendations };
  }

  /**
   * Generar reporte completo de performance
   */
  static async generateReport(): Promise<SEOPerformanceData> {
    const metrics = await this.getCoreWebVitals();
    const evaluation = this.evaluatePerformance(metrics);
    
    // Calcular PageSpeed Score basado en Core Web Vitals
    const pageSpeedScore = this.calculatePageSpeedScore(metrics);

    return {
      coreWebVitals: metrics,
      pageSpeed: pageSpeedScore,
      seoScore: evaluation.score,
      recommendations: evaluation.recommendations,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Calcular PageSpeed Score aproximado
   */
  private static calculatePageSpeedScore(metrics: PerformanceMetrics): number {
    let score = 100;

    // Weighted scoring basado en Google PageSpeed Insights
    const lcpScore = metrics.lcp <= 2500 ? 100 : metrics.lcp <= 4000 ? 75 : 25;
    const fidScore = metrics.fid <= 100 ? 100 : metrics.fid <= 300 ? 75 : 25;
    const clsScore = metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 75 : 25;

    // Weighted average (LCP: 25%, FID: 25%, CLS: 15%, FCP: 25%, TTFB: 10%)
    score = (lcpScore * 0.25) + (fidScore * 0.25) + (clsScore * 0.15) + 
            (metrics.fcp <= 1800 ? 25 : 15) + (metrics.ttfb <= 600 ? 10 : 5);

    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * Trackear métricas de performance en Analytics
   */
  static trackPerformanceMetrics(metrics: PerformanceMetrics): void {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track individual metrics
      window.gtag('event', 'core_web_vitals', {
        event_category: 'performance',
        lcp: Math.round(metrics.lcp),
        fid: Math.round(metrics.fid),
        cls: Math.round(metrics.cls * 1000), // Convert to ms for easier analysis
        fcp: Math.round(metrics.fcp),
        ttfb: Math.round(metrics.ttfb)
      });

      // Track performance grade
      const evaluation = this.evaluatePerformance(metrics);
      let grade = 'A';
      if (evaluation.score < 90) grade = 'B';
      if (evaluation.score < 75) grade = 'C';
      if (evaluation.score < 60) grade = 'D';
      if (evaluation.score < 50) grade = 'F';

      window.gtag('event', 'performance_grade', {
        event_category: 'seo',
        performance_grade: grade,
        performance_score: evaluation.score
      });
    }
  }
}

/**
 * Optimizaciones automáticas de performance
 */
export class PerformanceOptimizer {
  
  /**
   * Optimizar imágenes lazy loading
   */
  static optimizeImages(): void {
    if (typeof window === 'undefined') return;

    // Lazy load de imágenes fuera del viewport
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  /**
   * Preload de recursos críticos
   */
  static preloadCriticalResources(): void {
    if (typeof document === 'undefined') return;

    const criticalResources = [
      '/fonts/montserrat.woff2',
      '/fonts/cinzel.woff2',
      '/opengraph-image.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('font') ? 'font' : 'image';
      if (resource.includes('font')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }

  /**
   * Optimizar CSS crítico
   */
  static inlineCriticalCSS(): void {
    // Esta función se implementaría en build time
    // Para inline del CSS crítico above-the-fold
  }
}

// Export performance constants
export const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needs_improvement: 4000 },
  FID: { good: 100, needs_improvement: 300 },
  CLS: { good: 0.1, needs_improvement: 0.25 },
  FCP: { good: 1800, needs_improvement: 3000 },
  TTFB: { good: 600, needs_improvement: 1500 }
};
