/**
 * Gemini AI Configuration
 * Configuración centralizada para el modelo de Gemini AI
 */

/**
 * Modelo de Gemini AI utilizado en toda la aplicación
 * 
 * Modelos gratuitos disponibles (ordenados por recomendación):
 * - gemini-2.5-flash-lite: Versión 2.5 ligera y rápida (RECOMENDADO - estable desde Jul 2025)
 * - gemini-2.5-flash: Versión 2.5 estándar con más potencia
 * - gemini-2.0-flash-lite: Versión 2.0 ligera (anterior pero estable)
 * 
 * Modelos de pago:
 * - gemini-2.5-pro: Versión premium con máxima calidad
 * 
 * Límites del tier gratuito:
 * - 15 requests/minuto
 * - 1M tokens/día
 * - 1,500 requests/día
 */
export const GEMINI_MODEL = 'gemini-2.5-flash-lite';

/**
 * URL base de la API de Gemini
 */
export const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Construye la URL completa para llamadas a Gemini
 */
export function getGeminiApiUrl(apiKey: string): string {
  return `${GEMINI_API_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
}
