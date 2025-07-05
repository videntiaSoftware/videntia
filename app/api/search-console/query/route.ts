import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google Search Console API Integration
 * Query search performance data for SEO optimization
 */

const searchConsole = google.searchconsole('v1');

// Initialize Google Auth
function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  
  return auth;
}

export async function POST(req: NextRequest) {
  try {
    const {
      startDate,
      endDate,
      dimensions = ['query'],
      filters = [],
      rowLimit = 1000
    } = await req.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const auth = getAuthClient();
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntiatarot.com';

    const requestBody = {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      dimensionFilterGroups: filters.length > 0 ? [{
        filters: filters.map(filter => ({
          dimension: filter.dimension,
          operator: filter.operator,
          expression: filter.expression
        }))
      }] : undefined
    };

    const response = await searchConsole.searchanalytics.query({
      auth,
      siteUrl,
      requestBody
    });

    const data = response.data.rows || [];

    // Transform the data for easier consumption
    const transformedData = data.map((row: any) => ({
      keys: row.keys,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
      query: dimensions.includes('query') ? row.keys[dimensions.indexOf('query')] : undefined,
      page: dimensions.includes('page') ? row.keys[dimensions.indexOf('page')] : undefined,
      country: dimensions.includes('country') ? row.keys[dimensions.indexOf('country')] : undefined,
      device: dimensions.includes('device') ? row.keys[dimensions.indexOf('device')] : undefined,
    }));

    return NextResponse.json({
      success: true,
      data: transformedData,
      total_rows: data.length,
      request_params: { startDate, endDate, dimensions, filters }
    });

  } catch (error: any) {
    console.error('[SEARCH_CONSOLE] Query error:', error);
    
    return NextResponse.json({
      error: 'Failed to fetch Search Console data',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get('days') || '30');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const auth = getAuthClient();
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntiatarot.com';

    // Get overview data
    const overviewResponse = await searchConsole.searchanalytics.query({
      auth,
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [],
        rowLimit: 1
      }
    });

    // Get top queries
    const queriesResponse = await searchConsole.searchanalytics.query({
      auth,
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50
      }
    });

    // Get top pages
    const pagesResponse = await searchConsole.searchanalytics.query({
      auth,
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 50
      }
    });

    const overview = overviewResponse.data.rows?.[0] || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0
    };

    const topQueries = (queriesResponse.data.rows || []).map((row: any) => ({
      query: row.keys[0],
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0
    }));

    const topPages = (pagesResponse.data.rows || []).map((row: any) => ({
      page: row.keys[0],
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0
    }));

    return NextResponse.json({
      success: true,
      period: { startDate, endDate, days },
      overview,
      topQueries,
      topPages,
      insights: {
        total_queries: topQueries.length,
        avg_position: topQueries.reduce((sum, q) => sum + q.position, 0) / topQueries.length || 0,
        high_performing_queries: topQueries.filter(q => q.position <= 10).length,
        improvement_opportunities: topQueries.filter(q => q.position > 10 && q.impressions > 100).length
      }
    });

  } catch (error: any) {
    console.error('[SEARCH_CONSOLE] Dashboard error:', error);
    
    return NextResponse.json({
      error: 'Failed to fetch Search Console dashboard',
      details: error.message
    }, { status: 500 });
  }
}
