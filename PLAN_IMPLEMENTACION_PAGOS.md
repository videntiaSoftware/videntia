# 💳 PLAN SISTEMA DE PAGOS PREMIUM - VIDENTIA

## 🎯 RECOMENDACIÓN DE PLATAFORMAS:

### OPCIÓN 1: MERCADOPAGO (Argentina - Prioritario)
```bash
npm install mercadopago
```

**Ventajas:**
- ✅ Nativo de Argentina - mayor conversión local
- ✅ Acepta todos los métodos de pago argentinos
- ✅ Tasas competitivas (2.9% + $0.30)
- ✅ Soporte en español
- ✅ Integración con débito automático

**Variables necesarias:**
```env
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
MERCADOPAGO_PUBLIC_KEY=tu_public_key
MERCADOPAGO_WEBHOOK_SECRET=tu_webhook_secret
```

### OPCIÓN 2: STRIPE (Global - Complementario)
```bash
npm install stripe @stripe/stripe-js
```

**Para usuarios internacionales:**
- ✅ Mejor para usuarios de USA, Europa
- ✅ Excelente UX y documentación
- ✅ Webhooks robustos

## 🏗️ ARQUITECTURA PROPUESTA:

### 1. BACKEND - APIs de Pago:
```
/api/payments/
├── mercadopago/
│   ├── create-subscription.ts    # Crear suscripción MP
│   ├── webhook.ts               # Webhooks MP
│   └── cancel-subscription.ts   # Cancelar MP
├── stripe/
│   ├── create-subscription.ts    # Crear suscripción Stripe
│   ├── webhook.ts               # Webhooks Stripe
│   └── cancel-subscription.ts   # Cancelar Stripe
└── subscription-status.ts       # Estado unificado
```

### 2. FRONTEND - Componentes:
```
/components/payments/
├── PaymentMethodSelector.tsx    # Selector MP vs Stripe
├── MercadoPagoCheckout.tsx     # Checkout MP
├── StripeCheckout.tsx          # Checkout Stripe
└── SubscriptionManager.tsx     # Gestión de suscripción
```

### 3. BASE DE DATOS - Nuevas tablas:
```sql
-- Tabla de suscripciones
CREATE TABLE user_subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_type text NOT NULL, -- 'monthly', 'yearly'
    payment_provider text NOT NULL, -- 'mercadopago', 'stripe'
    external_subscription_id text NOT NULL,
    status text NOT NULL, -- 'active', 'canceled', 'past_due'
    current_period_start timestamptz NOT NULL,
    current_period_end timestamptz NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Tabla de transacciones
CREATE TABLE payment_transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id uuid REFERENCES user_subscriptions(id),
    external_transaction_id text NOT NULL,
    amount decimal NOT NULL,
    currency text NOT NULL,
    status text NOT NULL,
    payment_method text,
    processed_at timestamptz DEFAULT now()
);
```

## 📋 PRECIOS SUGERIDOS:

### Plan Mensual:
- **Argentina**: $2,500 ARS/mes (~$2.50 USD)
- **Internacional**: $4.99 USD/mes

### Plan Anual: 
- **Argentina**: $24,000 ARS/año (~$24 USD) - 20% descuento
- **Internacional**: $49.99 USD/año - 17% descuento

## 🚀 IMPLEMENTACIÓN PASO A PASO:

### Fase 1: MercadoPago (Prioritario - Argentina)
1. ✅ Registrarse en MercadoPago Developers
2. ✅ Configurar aplicación y obtener credenciales
3. ✅ Implementar checkout básico
4. ✅ Configurar webhooks para estado de suscripción
5. ✅ Testing con sandbox

### Fase 2: Stripe (Complementario - Global)
1. ✅ Configurar cuenta Stripe
2. ✅ Implementar checkout complementario  
3. ✅ Webhooks para sincronización
4. ✅ Testing internacional

### Fase 3: Integración con Sistema de Usuarios
1. ✅ Modificar `getUserTier()` para verificar suscripción activa
2. ✅ Middleware para rutas premium
3. ✅ UI para gestión de suscripciones

## 💰 PROYECCIÓN DE INGRESOS:

Con base de usuarios de 1,000 activos:
- **Conversión conservadora (2%)**: 20 suscriptores
- **Ingreso mensual**: $50-100 USD/mes
- **Ingreso anual proyectado**: $600-1,200 USD

Con crecimiento a 10,000 usuarios:
- **Conversión (3-5%)**: 300-500 suscriptores  
- **Ingreso mensual**: $1,500-2,500 USD/mes
- **Ingreso anual proyectado**: $18,000-30,000 USD
