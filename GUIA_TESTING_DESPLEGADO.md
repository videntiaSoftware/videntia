# 🚀 GUÍA DE TESTING EN ENTORNO DESPLEGADO

## 📋 PASOS PARA DEBUGGEAR EL SISTEMA UNIFICADO:

### 1. **PREPARAR EL ENTORNO** ⚙️
```bash
# Asegurar que todos los archivos estén actualizados
git add .
git commit -m "🔥 Logs detallados para debugging sistema unificado"
git push

# Esperar que se complete el deployment en Vercel/tu plataforma
```

### 2. **OPCIÓN A: TESTING CON reCAPTCHA (RECOMENDADO)** 🛡️
```bash
# 1. Monitorear logs en tiempo real
./monitor-logs.sh

# 2. En otra terminal, ve a tu sitio web desplegado
# 3. Haz una lectura como GUEST (con pregunta)
# 4. Observa los logs en la primera terminal
# 5. Verifica los datos después:
./verify-after-reading.sh
```

### 3. **OPCIÓN B: TESTING SIN reCAPTCHA (MÁS FÁCIL)** 🚫
```bash
# 1. Agregar variable de entorno en Vercel/tu plataforma:
#    SKIP_RECAPTCHA=true

# 2. Redeploy
git commit --allow-empty -m "Trigger redeploy"
git push

# 3. Hacer testing como en Opción A
./monitor-logs.sh
# Hacer lectura en sitio web
./verify-after-reading.sh
```

### 4. **QUÉ BUSCAR EN LOS LOGS** 🔍

#### ✅ **LOGS EXITOSOS:**
```
🚀 [API_READING] INICIANDO sistema unificado...
🔥 [UNIFIED_TRACKING] INICIANDO - Datos recibidos:
🔥 [UNIFIED_TRACKING] PASO 1: Intentando guardar en tabla readings...
🔥 [READINGS_TABLE] Datos a insertar:
✅ [READINGS_TABLE] Insert exitoso! ID: xxxxx
✅ [UNIFIED_TRACKING] PASO 1: Guardado en readings COMPLETADO
... (más pasos)
🎉 [UNIFIED_TRACKING] *** TRACKING COMPLETADO EXITOSAMENTE ***
```

#### ❌ **LOGS DE ERROR:**
```
💥 [READINGS_TABLE] ERROR en insert:
💥 [UNIFIED_TRACKING] ERROR FATAL:
💥 [API_READING] ERROR en sistema unificado:
```

### 5. **PROBLEMAS COMUNES Y SOLUCIONES** 🔧

#### **Problema 1: No aparecen logs**
- ✅ Verifica que el deployment se haya completado
- ✅ Revisa que `vercel logs` funcione
- ✅ Usa Vercel Dashboard → Functions → Logs

#### **Problema 2: Error de columnas**
- ❌ Ejecuta de nuevo la migración en Supabase
- ❌ Verifica que todas las columnas existan

#### **Problema 3: guest_id null**
- ❌ Revisa que las cookies funcionen
- ❌ Verifica que el frontend envíe fingerprint_id

### 6. **AFTER TESTING** 🧹
```bash
# Deshabilitar skip de reCAPTCHA en producción
# Eliminar SKIP_RECAPTCHA=true de variables de entorno
# Redeploy
```

### 7. **RESULTADO ESPERADO** 🎯
Después de una lectura exitosa, deberías ver:
- ✅ Nueva fila en tabla `readings` con `guest_id`
- ✅ Nueva fila en tabla `guests` 
- ✅ Nueva fila en tabla `guest_reading_patterns`
- ✅ Nueva fila en tabla `user_interest_profiles` (si hay pregunta)
- ✅ Nueva fila en tabla `guest_behavior_events`

### 8. **COMANDOS ÚTILES** 💻
```bash
# Verificar estado actual
./verify-after-reading.sh

# Monitorear logs
./monitor-logs.sh

# Debugging completo
node debug-unified-tracking.js

# Ver logs de Vercel
npx vercel logs --follow
```
