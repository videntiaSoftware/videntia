import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: NextRequest) {
  try {
    // Instantiate MercadoPagoConfig (ESM/TypeScript compatible)
    const mp = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });
    // Instantiate the Preference resource
    const preferenceResource = new Preference(mp);

    const { amount, description } = await req.json();

    const preference = {
      items: [
        {
          title: description || "Donación Videntia",
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(amount),
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/gracias`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pendiente`,
      },
      auto_return: "approved",
    };

    // Debug: log env and preference
    console.log('[MP] ENV:', {
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
      base_url: process.env.NEXT_PUBLIC_BASE_URL
    });
    console.log('[MP] Preference:', preference);

    const response = await preferenceResource.create({ body: preference });
    console.log('[MP] Response:', response);
    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    console.error('Error creating donation:', error);
    if (error && error.response && error.response.body) {
      console.error('MercadoPago error body:', error.response.body);
    }
    return NextResponse.json({ error: 'Error processing donation', details: error?.message || error }, { status: 500 });
  }
}