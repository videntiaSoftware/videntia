import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Submit URLs to Google Search Console for indexing
 * Useful for new SEO pages and dynamic content
 */

const indexing = google.indexing('v3');

function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  
  return auth;
}

export async function POST(req: NextRequest) {
  try {
    const { url, type = 'URL_UPDATED' } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL belongs to our domain
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntia.vercel.app';
    if (!url.startsWith(siteUrl)) {
      return NextResponse.json(
        { error: 'URL must belong to the configured domain' },
        { status: 400 }
      );
    }

    const auth = getAuthClient();

    const response = await indexing.urlNotifications.publish({
      auth,
      requestBody: {
        url,
        type // URL_UPDATED or URL_DELETED
      }
    });

    console.log(`[INDEXING] Submitted ${url} for indexing:`, response.data);

    return NextResponse.json({
      success: true,
      url,
      type,
      url_notification_metadata: response.data.urlNotificationMetadata
    });

  } catch (error: any) {
    console.error('[INDEXING] Submission error:', error);
    
    return NextResponse.json({
      error: 'Failed to submit URL for indexing',
      details: error.message
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    const auth = getAuthClient();

    const response = await indexing.urlNotifications.getMetadata({
      auth,
      url: targetUrl
    });

    return NextResponse.json({
      success: true,
      url: targetUrl,
      metadata: response.data
    });

  } catch (error: any) {
    console.error('[INDEXING] Metadata error:', error);
    
    return NextResponse.json({
      error: 'Failed to get URL metadata',
      details: error.message
    }, { status: 500 });
  }
}

/**
 * Batch submit multiple URLs for indexing
 */
export async function PUT(req: NextRequest) {
  try {
    const { urls } = await req.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://videntia.vercel.app';
    const validUrls = urls.filter(url => url.startsWith(siteUrl));

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs found' },
        { status: 400 }
      );
    }

    const auth = getAuthClient();
    const results = [];

    // Process URLs in batches of 5 to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < validUrls.length; i += batchSize) {
      const batch = validUrls.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (url) => {
        try {
          const response = await indexing.urlNotifications.publish({
            auth,
            requestBody: {
              url,
              type: 'URL_UPDATED'
            }
          });
          
          return {
            url,
            success: true,
            data: response.data
          };
        } catch (error: any) {
          return {
            url,
            success: false,
            error: error.message
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Rate limiting: wait 1 second between batches
      if (i + batchSize < validUrls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      total_urls: validUrls.length,
      successful,
      failed,
      results
    });

  } catch (error: any) {
    console.error('[INDEXING] Batch submission error:', error);
    
    return NextResponse.json({
      error: 'Failed to batch submit URLs',
      details: error.message
    }, { status: 500 });
  }
}
