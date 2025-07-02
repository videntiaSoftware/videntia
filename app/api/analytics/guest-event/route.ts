import { NextRequest, NextResponse } from 'next/server';

/**
 * ENDPOINT OBSOLETO - Reemplazado por sistema unificado
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'ENDPOINT_OBSOLETO',
      message: 'Este endpoint ha sido reemplazado por el sistema unificado en /api/reading/generate',
      redirect_to: '/api/reading/generate'
    },
    { status: 410 } // Gone - recurso ya no disponible
  );
}
