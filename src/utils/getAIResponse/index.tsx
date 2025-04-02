// export const getAIResponse = (userMessage: string) => {
//     const lowerMsg = userMessage.toLowerCase();

//     // Problemas de funcionamiento general
//     if (lowerMsg.includes("tild") || lowerMsg.includes("congel") ||
//         lowerMsg.includes("no responde") || lowerMsg.includes("funciona mal") ||
//         lowerMsg.includes("se detuvo") || lowerMsg.includes("no anda") ||
//         lowerMsg.includes("falla") || lowerMsg.includes("error")) {
//         return `🔧 **Problemas de funcionamiento detectados**

// Parece que tu bot está experimentando dificultades. Vamos a solucionarlo:

// 1. **Reinicio del servicio**:
//    - Ve al Panel de Control > Servicios
//    - Busca "BotMaster Service"
//    - Haz clic en "Reiniciar"

// 2. **Verificación de conexión**:
//    - Prueba tu conexión a internet
//    - Si usas VPN/proxy, verifica que esté activo
//    - Ping a api.botmaster.com (deberías obtener respuesta)

// 3. **Actualizaciones pendientes**:
//    - Versión actual: ${getCurrentVersion()}
//    - Chequea en "Configuración > Actualizaciones"

// 4. **Logs de error**:
//    - Los encontrarás en /var/log/botmaster/
//    - Errores comunes: 
//      * "API_LIMIT_EXCEEDED" - Reducir frecuencia de acciones
//      * "AUTH_FAILED" - Revisar credenciales

// 📌 *¿El problema ocurre con alguna red social en particular (WhatsApp/Instagram/Facebook)?*`;
//     }

//     // Problemas específicos de WhatsApp
//     else if ((lowerMsg.includes("whatsapp") || lowerMsg.includes("wa")) &&
//         (lowerMsg.includes("problema") || lowerMsg.includes("error"))) {
//         return `📱 **Problemas específicos con WhatsApp**

// Problemas comunes y soluciones:

// 1. **Bot no envía mensajes**:
//    - Verifica que el número esté verificado en WhatsApp Business
//    - Revisa que no haya restricciones en el número
//    - Chequea la conexión con el dispositivo vinculado

// 2. **Mensajes no entregados**:
//    - El usuario podría haber bloqueado tu número
//    - Límite de mensajes no oficial: 30-50/hora por número
//    - Espera 12 horas si recibes muchos errores 429

// 3. **Sesión caducada**:
//    - Reescanea el código QR desde el panel
//    - Asegúrate que el teléfono tenga buena conexión
//    - Activa "Mantener sesión activa" en configuración

// ⚠️ *¿Estás usando números nuevos o números reciclados? Los números nuevos tienen límites más estrictos.*`;
//     }

//     // Problemas específicos de Instagram
//     else if ((lowerMsg.includes("instagram") || lowerMsg.includes("ig")) &&
//         (lowerMsg.includes("problema") || lowerMsg.includes("error"))) {
//         return `📸 **Problemas con Instagram Automation**

// Soluciones para errores frecuentes:

// 1. **Bloqueos temporales**:
//    - Límites recomendados:
//      * Likes: 50-60/hora
//      * Comentarios: 20-30/hora
//      * Follows: 30-40/hora
//    - Usa delays aleatorios entre 30-90 segundos

// 2. **Challenge de seguridad**:
//    - Completa el desafío "Soy un humano" manualmente
//    - Espera 24-48 horas antes de reanudar actividades
//    - Reduce la agresividad de los bots

// 3. **Problemas de API**:
//    - Actualiza a la última versión del cliente
//    - Verifica tus credenciales de desarrollador
//    - Chequea status.api.instagram.com

// 🔍 *¿Podrías compartir el mensaje de error exacto que recibes?*`;
//     }

//     // Recuperación de contraseña y acceso
//     else if (lowerMsg.includes("contraseña") || lowerMsg.includes("password") ||
//         lowerMsg.includes("olvidé") || lowerMsg.includes("recuperar acceso") ||
//         lowerMsg.includes("login") || lowerMsg.includes("iniciar sesión") ||
//         lowerMsg.includes("cuenta bloqueada") || lowerMsg.includes("acceso denegado")) {
//         return `🔐 **Problemas de acceso**

// Solución paso a paso:

// 1. **Recuperación de contraseña**:
//    - Visita https://app.botmaster.com/forgot-password
//    - Ingresa tu email corporativo
//    - Revisa tu bandeja de entrada y spam
//    - El enlace expira en 1 hora

// 2. **Autenticación en dos pasos (2FA)**:
//    - Si activaste 2FA, necesitarás tu app Authy/Google Authenticator
//    - Códigos de respaldo están en tu dashboard
//    - ¿No recibes SMS? Verifica el número asociado

// 3. **Cuenta bloqueada**:
//    - Demasiados intentos fallidos
//    - Espera 15 minutos o contacta a soporte@botmaster.com
//    - Proporciona tu User ID: BM-${Math.random().toString(36).substr(2, 8).toUpperCase()}

// 📲 *¿Tienes acceso al email asociado a tu cuenta?*`;
//     }

//     // Bloqueos de cuenta en redes
//     else if (lowerMsg.includes("bloque") || lowerMsg.includes("bane") ||
//         lowerMsg.includes("suspend") || lowerMsg.includes("restricción") ||
//         lowerMsg.includes("limitación") || lowerMsg.includes("violación") ||
//         lowerMsg.includes("infracción") || lowerMsg.includes("política")) {
//         return `🚨 **Bloqueos de cuenta**

// Análisis detallado:

// 1. **Tipos de bloqueo**:
//    - ⏳ *Temporal*: 24-72 horas (actividad inusual)
//    - ⚠️ *Acciones limitadas*: 7-14 días (violación menor)
//    - ❌ *Permanente*: Violación grave de políticas

// 2. **Causas comunes**:
//    - Comportamiento robótico (acciones muy rápidas)
//    - Uso de palabras prohibidas en mensajes
//    - Demasiados rechazos (unfollows/bloqueos)
//    - Reportes de otros usuarios

// 3. **Proceso de apelación**:
//    - Para Instagram: Configuración > Ayuda > Reportar problema
//    - Para WhatsApp: email a support@whatsapp.com
//    - Incluye detalles y promete ajustar comportamiento

// 📊 *¿Qué porcentaje de tus acciones generan interacción positiva (respuestas/likes)?*`;
//     }

//     // Configuración avanzada
//     else if (lowerMsg.includes("configur") || lowerMsg.includes("program") ||
//         lowerMsg.includes("ajust") || lowerMsg.includes("flujo") ||
//         lowerMsg.includes("script") || lowerMsg.includes("automatiz") ||
//         lowerMsg.includes("secuencia") || lowerMsg.includes("plantilla")) {
//         return `⚙️ **Configuración Avanzada**

// Guía experta para configuración:

// 1. **Flujos de mensajería**:
//    - Usa variables {nombre}, {fecha} para personalización
//    - Ejemplo avanzado:
//      \`\`\`
//      Hola {nombre}, vi tu perfil el {fecha}. 
//      ¿Te interesa conectar? 
//      [Si/No] → Guardar respuesta
//      \`\`\`

// 2. **Lógica condicional**:
//    - IF usuario sigue > 1000 THEN enviar mensaje A
//    - IF perfil tiene foto THEN agregar a lista VIP
//    - ELSE enviar mensaje genérico

// 3. **Integración con APIs**:
//    - Webhooks para conectar con tu CRM
//    - Zapier para automatizar con 500+ apps
//    - Endpoint personalizado: api.botmaster.com/v3/{tu-api-key}

// 💡 *¿Necesitas que te comparta plantillas de configuración para tu caso específico?*`;
//     }

//     // Rendimiento y optimización
//     else if (lowerMsg.includes("lent") || lowerMsg.includes("rápid") ||
//         lowerMsg.includes("optimiz") || lowerMsg.includes("velocidad") ||
//         lowerMsg.includes("performance") || lowerMsg.includes("rendimiento") ||
//         lowerMsg.includes("mejorar") || lowerMsg.includes("eficiencia")) {
//         return `🚀 **Optimización de Performance**

// Técnicas avanzadas:

// 1. **Paralelización**:
//    - Máx. recomendado: 3-5 cuentas por núcleo de CPU
//    - Balancear carga entre múltiples servidores
//    - Usar workers separados para:
//      * Envío de mensajes
//      * Procesamiento de respuestas
//      * Monitoreo de actividad

// 2. **Delay inteligente**:
//    - Fórmula óptima: 
//      \`\`\`
//      delay = (baseDelay ± random(30%)) * factorSeguridad
//      \`\`\`
//    - Ajustar según tasa de éxito

// 3. **Patrones de comportamiento**:
//    - Simular horario humano (9AM-9PM)
//    - Variabilidad geográfica (usar proxies locales)
//    - Patrones de descanso aleatorios

// 📈 *¿Qué volumen de acciones diarias estás manejando actualmente?*`;
//     }

//     // Facturación avanzada
//     else if (lowerMsg.includes("pago") || lowerMsg.includes("factur") ||
//         lowerMsg.includes("suscrip") || lowerMsg.includes("renovar") ||
//         lowerMsg.includes("tarifa") || lowerMsg.includes("precio") ||
//         lowerMsg.includes("plan") || lowerMsg.includes("cobro") ||
//         lowerMsg.includes("reembolso") || lowerMsg.includes("factura")) {
//         return `💳 **Gestión de Facturación**

// Información detallada:

// 1. **Planes disponibles**:
//    - 🟢 Básico ($99/mes): 5 cuentas, 1k acciones/día
//    - 🔵 Pro ($299/mes): 20 cuentas, 10k acciones/día
//    - 🟣 Enterprise (Personalizado): SLA 99.9%

// 2. **Ciclo de facturación**:
//    - Renovación automática cada 30 días
//    - Notificación 72 horas antes
//    - Periodo de gracia: 48 horas

// 3. **Problemas comunes**:
//    - Tarjeta rechazada: Actualizar método de pago
//    - Facturación duplicada: Solicitar merge de cuentas
//    - Historial completo: dashboard.botmaster.com/billing

// ✉️ *¿Necesitas factura con datos fiscales específicos? Proporciona tu RFC/CUIT/NIT.*`;
//     }

//     // Problemas legales y políticas
//     else if (lowerMsg.includes("legal") || lowerMsg.includes("política") ||
//         lowerMsg.includes("tos") || lowerMsg.includes("términos") ||
//         lowerMsg.includes("privacidad") || lowerMsg.includes("gdpr") ||
//         lowerMsg.includes("cumplimiento") || lowerMsg.includes("regulaci")) {
//         return `⚖️ **Asesoría Legal y Cumplimiento**

// Consideraciones clave:

// 1. **Consentimiento explícito**:
//    - Base legal para mensajes: Opt-in verificable
//    - Incluir opción de opt-out en cada mensaje
//    - Mantener registros de consentimiento por 5 años

// 2. **Regulaciones por región**:
//    - UE: GDPR (multas hasta 4% facturación anual)
//    - USA: TCPA ($500-$1500 por mensaje no solicitado)
//    - Latam: Leyes locales de protección de datos

// 3. **Mejores prácticas**:
//    - No automatizar grupos no consentidos
//    - Limitar mensajes promocionales
//    - Auditorías mensuales de listas de contacto

// 📜 *¿Operas en múltiples jurisdicciones? Necesitarás políticas regionalizadas.*`;
//     }

//     // Actualizaciones y nuevas características
//     else if (lowerMsg.includes("actualiz") || lowerMsg.includes("nueva versión") ||
//         lowerMsg.includes("mejora") || lowerMsg.includes("feature") ||
//         lowerMsg.includes("roadmap") || lowerMsg.includes("lanzamiento") ||
//         lowerMsg.includes("beta") || lowerMsg.includes("novedad")) {
//         return `🛠️ **Últimas Actualizaciones**

// Novedades v3.2.1 (Julio 2023):

// 1. **Nuevas integraciones**:
//    - WhatsApp Business API (certificación oficial)
//    - LinkedIn Sales Navigator
//    - Telegram Bots 2.0

// 2. **Mejoras de seguridad**:
//    - Encriptación E2E para todos los mensajes
//    - Autenticación biométrica para acceso
//    - Auditoría de permisos granular

// 3. **Próximos lanzamientos**:
//    - 🟢 Q3: Análisis de sentimiento en tiempo real
//    - 🟡 Q4: Integración con Shopify
//    - 🔴 2024: AI para generación de respuestas

// 🧪 *¿Quieres acceso anticipado al programa beta? Solicítalo en settings > advanced.*`;
//     }

//     // Saludos y conversación inicial
//     else if (lowerMsg.includes("hola") || lowerMsg.includes("buenas") ||
//         lowerMsg.includes("saludos") || lowerMsg.match(/^hi|^hello/) ||
//         lowerMsg.includes("qué tal") || lowerMsg.includes("como estás")) {
//         return `👋 **¡Hola! Soy BotMaster Assistant**  

// Puedo ayudarte con:  

// 🔹 *Problemas técnicos*: bloqueos, errores, configuración  
// 🔹 *Optimización*: rendimiento, estrategias de crecimiento  
// 🔹 *Facturación*: pagos, planes, facturas  
// 🔹 *Legal*: cumplimiento, políticas de redes  

// *¿En qué área necesitas ayuda hoy?*  

// ℹ️ También puedes decir "ejemplos" para ver casos comunes`;
//     }

//     // Despedidas y agradecimientos
//     else if (lowerMsg.includes("adiós") || lowerMsg.includes("chao") ||
//         lowerMsg.includes("gracias") || lowerMsg.includes("bye") ||
//         lowerMsg.includes("suficiente") || lowerMsg.includes("hasta luego")) {
//         return `✨ **¡Gracias por usar BotMaster!**  

// Recuerda que puedes:  

// 📌 Guardar esta conversación desde el menú  
// 🛠️ Acceder a tutoriales en: help.botmaster.com  
// 📞 Contactar soporte humano en: support@botmaster.com  

// *¡Que tengas excelentes resultados con tus automatizaciones!*  

// [Tu equipo BotMaster 🤖]`;
//     }

//     // Solicitud de ejemplos
//     else if (lowerMsg.includes("ejemplo") || lowerMsg.includes("caso") ||
//         lowerMsg.includes("muestra") || lowerMsg.includes("demo")) {
//         return `📂 **Casos de Éxito Reales**  

// 1. **E-commerce** (@ModaFashion):  
//    - ⏱️ 3h diarias ahorradas en atención al cliente  
//    - 📈 +25% conversiones con mensajes personalizados  
//    - 🤖 Flujo automatizado:  
//      \`\`\`
//      [Pedido recibido] → Confirmación + tiempo de entrega  
//      [24h antes] → Recordatorio + opción reprogramar  
//      [Post-entrega] → Solicitud de review + cupón  
//      \`\`\`

// 2. **Agencia Marketing** (@DigitalPros):  
//    - 🔄 200 leads/día procesados automáticamente  
//    - 🏷️ Clasificación por interés usando IA  
//    - 📊 Integración completa con Google Sheets  

// 💼 *¿Qué tipo de negocio tienes? Puedo darte ejemplos más específicos.*`;
//     }
//     // Información sobre el bot asistente
//     else if (lowerMsg.includes("quién eres") || lowerMsg.includes("qué eres") ||
//         lowerMsg.includes("información sobre ti") || lowerMsg.includes("tus capacidades") ||
//         lowerMsg.includes("versión") || lowerMsg.includes("actualización")) {
//         return `🤖 **Sobre Mí - Asistente Virtual de BotMaster**  

// *Datos técnicos:*  
// • Versión: ${getCurrentVersion()}  
// • Última actualización: ${getLastUpdateDate()}  
// • Capacidades: Soporte para WhatsApp, Instagram, Facebook y Telegram  

// *Novedades en mi última actualización (v3.1.2):*  
// ✓ Mejor manejo de errores de conexión  
// ✓ +15 plantillas de respuestas automáticas  
// ✓ Diagnóstico optimizado de bloqueos  
// ✓ Soporte inicial para Threads (Meta)  

// *Estadísticas de hoy:*  
// ✔ ${Math.floor(Math.random() * 50) + 30} consultas resueltas  
// ✔ ${Math.floor(Math.random() * 90) + 10}% tasa de éxito  
// ✔ Tiempo promedio respuesta: 1.2 segundos  

// ¿Quieres conocer algún detalle específico de mi funcionamiento?`;
//     }
//     // Respuesta por defecto avanzada
//     else {
//         return `🤔 **Necesito más información**  

// Para ayudarte mejor, por favor especifica:  

// 1. **Plataforma**: ¿WhatsApp, Instagram, otras?  
// 2. **Tipo de problema**:  
//    - Configuración  
//    - Bloqueos  
//    - Rendimiento  
//    - Facturación  
// 3. **Pasos para reproducir**: ¿Qué hiciste antes del error?  

// 📌 *Ejemplo de consulta clara*:  
// *"Mi bot para Instagram dejó de seguir usuarios después de la actualización de ayer. Recibo error 429."*  

// 🛠️ *¿Podrías compartir estos detalles?*`;
//     }

// };

// // Funciones auxiliares para datos simulados
// const getCurrentVersion = () => {
//     const versions = ["v3.1.2", "v3.1.3-beta", "v3.0.8"];
//     return versions[Math.floor(Math.random() * versions.length)];
// };

// const getLastUpdateDate = () => {
//     const days = ["ayer", "hace 2 días", "esta mañana"];
//     return days[Math.floor(Math.random() * days.length)];
// };


export const getAIResponse = (userMessage: string): string => {
    const normalizedMsg = userMessage
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Normaliza texto (sin acentos ni mayúsculas)

    // Detección mejorada de intenciones
    const intents = {
        isAboutBot: /(quien|que|informacion|funcion|version|actualizacion|capacidad)/.test(normalizedMsg),
        isError: /(error|falla|problema|no funciona|tild|colg)/.test(normalizedMsg),
        isWhatsApp: /(whatsapp|wa)/.test(normalizedMsg),
        isInstagram: /(instagram|ig)/.test(normalizedMsg),
        isAuth: /(contraseña|login|acceso|cuenta)/.test(normalizedMsg),
        isBan: /(ban|bloque|suspension|limitacion)/.test(normalizedMsg),
        isConfig: /(configurar|programar|ajust|flujo|script)/.test(normalizedMsg),
        isBilling: /(pago|factura|suscrip|plan)/.test(normalizedMsg),
        isLegal: /(legal|terminos|privacidad|ley|gdpr)/.test(normalizedMsg),
        isGreeting: /(hola|buenas|saludos|hi|hello)/.test(normalizedMsg),
        isGoodbye: /(adios|gracias|bye|chao)/.test(normalizedMsg),
        isExamples: /(ejemplo|caso|demo|muestra)/.test(normalizedMsg)
    };

    // 1. Sobre el bot
    if (intents.isAboutBot) {
        return `🤖 **Asistente Virtual - BotMaster Pro v3.2**  
        
🔹 **Funcionamiento**:  
• Motor de IA entrenado específicamente para automatización de redes sociales  
• Base de conocimiento actualizada al ${new Date().toLocaleDateString()}  
• Compatibilidad con 9 plataformas principales  

🛠️ **Última actualización**:  
✓ Mejorado: Detección de patrones de baneo (${getLastUpdateDate()})  
✓ Nuevo: Soporte para Telegram Business  
✓ Corrección: Error en gestión de proxies  

📊 **Estadísticas**:  
• ${Math.floor(Math.random() * 200) + 100} consultas atendidas hoy  
• ${Math.floor(Math.random() * 15) + 85}% de precisión  

💡 *¿Quieres que explique cómo procesé tu consulta?*`;
    }

    // 2. Problemas técnicos
    if (intents.isError) {
        const platform = intents.isWhatsApp ? 'WhatsApp' :
            intents.isInstagram ? 'Instagram' :
                'general';

        return `🛠️ **Solución de Problemas ${platform !== 'general' ? 'en ' + platform : ''}**  

1. **Diagnóstico Automático**:  
   • Estado del servicio: ${getServiceStatus()}  
   • Último error registrado: ${getRandomErrorCode()}  

2. **Acciones Recomendadas**:  
   ⚡ Reinicio rápido:  
   \`\`\`bash
   systemctl restart botmaster-${platform.toLowerCase()}
   \`\`\`  
   🔍 Verificar logs:  
   \`\`\`bash
   cat /var/log/botmaster/error.log | grep -i "${getRandomErrorWord()}"
   \`\`\`  

3. **Soporte Técnico**:  
   📌 Código de referencia: #${generateErrorId()}  
   📧 Enviar detalles a: tech@botmaster.com  
   🚨 Urgencias: +1 (555) 123-4567  

*Adjunta captura del error para diagnóstico preciso*`;
    }

    // 3. WhatsApp específico
    if (intents.isWhatsApp && !intents.isError) {
        return `📱 **Soporte WhatsApp Business**  

🔹 **Límites recomendados**:  
• Mensajes: 30-50/hora por número  
• Grupos: 10 acciones/hora  
• Archivos: 15MB máximo  

🛡️ **Evitar baneos**:  
1. Usar delays aleatorios (45-90 segundos)  
2. Rotar números cada 500 mensajes  
3. Evitar enlaces no verificados  

⚙️ **API Key**:  
\`\`\`
${generateApiKey('WA')}
\`\`\`  
*Caduca en 7 días* | [Renovar clave](https://api.botmaster.com/wa/renew)`;
    }

    // 4. Instagram específico
    if (intents.isInstagram && !intents.isError) {
        return `📸 **Soporte Instagram API**  

🔹 **Límites seguros**:  
• Likes: 60/hora  
• Comentarios: 20/hora  
• Follows: 30/hora  

🚨 **Patrones de detección**:  
1. Acciones demasiado rápidas (<30s entre acciones)  
2. Comentarios repetitivos  
3. Uso de proxies no residenciales  

📊 **Optimización**:  
\`\`\`python
bot.configure(
    delay=random.randint(45, 120),
    max_actions=50,
    proxy_type="residential"
)
\`\`\``;
    }

    // 5. Configuración
    if (intents.isConfig) {
        return `⚙️ **Configuración Avanzada**  

**Flujos Recomendados**:  
1. *Engagement Inicial*:  
   \`\`\`javascript
   bot.flow()
     .wait(30) // Segundos
     .send("Hola {nombre}")
     .addQuickReply(["👍 Sí", "👎 No"])
   \`\`\`  

2. *Recuperación de Leads*:  
   \`\`\`python
   if user.status == "inactive":
       send_reactivation_sequence()
       update_database(conversion_rate=0.35)
   \`\`\`  

📚 *Documentación completa*: [docs.botmaster.com/flujos](https://docs.botmaster.com/flujos)`;
    }

    // 6. Autenticación
    if (intents.isAuth) {
        return `🔐 **Gestión de Accesos**  

1. **Recuperar Contraseña**:  
   • Ve a: [botmaster.com/recover](https://botmaster.com/recover)  
   • Ingresa tu email registrado  
   • Revisa spam si no recibes el enlace en 5 min  

2. **Autenticación 2FA**:  
   📱 App Authenticator:  
   \`\`\`
   Código: ${Math.random().toString().substr(2, 6)}
   Expira en: 2 minutos
   \`\`\`  

3. **Cuentas Bloqueadas**:  
   ⏳ Tiempo de espera: 24-48 horas  
   📝 Formulario de desbloqueo: [botmaster.com/unlock](https://botmaster.com/unlock)`;
    }

    // 7. Bloqueos
    if (intents.isBan) {
        return `🚨 **Gestión de Bloqueos**  

🔹 **Tipos**:  
• Temporal (24-72h) - Actividad inusual  
• Limitado (7d) - Violación menor  
• Permanente - Reincidencia grave  

🛠️ **Solución**:  
1. Identificar causa exacta  
2. Esperar periodo completo  
3. Cambiar:  
   - Patrones de uso  
   - Dispositivo/IP  
   - Credenciales API  

📌 *Formulario de apelación*: [botmaster.com/appeal](https://botmaster.com/appeal)`;
    }

    // 8. Facturación
    if (intents.isBilling) {
        return `💳 **Gestión de Pagos**  

📅 **Ciclo de facturación**:  
• Renovación automática cada 30 días  
• Notificación 72h antes  
• Periodo de gracia: 48h  

📝 **Facturación**:  
1. Descargar PDF: [botmaster.com/billing](https://botmaster.com/billing)  
2. Datos fiscales:  
   \`\`\`
   RFC: BMT-${Math.random().toString(36).substr(2, 8).toUpperCase()}
   \`\`\`  

💼 *¿Necesitas cambiar tu plan actual?*`;
    }

    // 9. Legal
    if (intents.isLegal) {
        return `⚖️ **Conformidad Legal**  

📜 **Políticas clave**:  
1. GDPR (UE): Consentimiento explícito  
2. TCPA (EEUU): Prohibición llamadas automáticas  
3. LFPDPPP (México): Protección datos personales  

🛡️ **Recomendaciones**:  
• Almacenar pruebas de consentimiento ×5 años  
• Incluir opción de opt-out en cada mensaje  
• Auditoría trimestral de bases de datos  

📚 *Recursos*: [legal.botmaster.com](https://legal.botmaster.com)`;
    }

    // 10. Ejemplos
    if (intents.isExamples) {
        return `📂 **Casos Reales de Implementación**  

1. **E-commerce (@ModaStyle)**:  
   • +40% conversiones con flujo:  
   \`\`\`
   [Compra] → Agradecimiento + cupón  
   [3 días después] → Solicitud de reseña  
   \`\`\`  

2. **Agencia (@SocialGrowth)**:  
   • 1500 leads/mes automatizados  
   • Taxonomía:  
   \`\`\`python
   if "interesado" in respuesta:
       clasificar("lead_caliente")
   \`\`\`  

💡 *¿Necesitas un flujo para ${getRandomBusinessType()}?*`;
    }

    // 11. Saludos
    if (intents.isGreeting) {
        return `👋 **¡Bienvenido a BotMaster!**  

Soy tu asistente especializado en automatización de redes sociales.  

🔹 ¿Cómo puedo ayudarte hoy?  
1. Solución de problemas técnicos  
2. Configuración de flujos avanzados  
3. Consultas de facturación  
4. Asesoría legal  

*Escribe tu consulta o selecciona una opción*`;
    }

    // 12. Despedidas
    if (intents.isGoodbye) {
        return `✨ **¡Gracias por usar BotMaster!**  

📌 Esta conversación ha sido guardada con ID: #${generateConversationId()}  

📧 *¿Quieres recibir el resumen por email?* Responde "sí" para enviarlo a tu correo registrado.  

🛠️ [Calificar servicio](https://botmaster.com/feedback) | 📚 [Centro de ayuda](https://help.botmaster.com)`;
    }

    // Respuesta por defecto mejorada
    return `❓ **No reconocí tu consulta**  

Para ayudarte mejor:  

1. Especifica la plataforma (WhatsApp/Instagram)  
2. Describe el problema con detalles técnicos  
3. Comparte cualquier mensaje de error  

*Ejemplo válido*:  
_"Recibo error 429 al enviar mensajes en WhatsApp después de actualizar a v3.2"_  

💡 *Prueba con:* "problema con Instagram", "cómo configurar WhatsApp", "facturación"`;
};

// Funciones auxiliares
const getLastUpdateDate = (): string => {
    const days = ["ayer", "hace 2 días", "esta mañana"];
    return `${days[Math.floor(Math.random() * days.length)]} (v3.2.1)`;
};

const getServiceStatus = (): string => {
    return Math.random() > 0.2 ? "✅ Operativo" : "⚠️ Inestable";
};

const getRandomErrorCode = (): string => {
    const codes = ["403 (Forbidden)", "429 (Rate Limit)", "500 (Server Error)"];
    return codes[Math.floor(Math.random() * codes.length)];
};

const generateErrorId = (): string => {
    return `ERR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
};

const generateConversationId = (): string => {
    return `CONV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
};

const generateApiKey = (prefix: string): string => {
    return `${prefix}_${Math.random().toString(36).substr(2, 16).toUpperCase()}`;
};

const getRandomBusinessType = (): string => {
    const types = ["restaurantes", "e-commerce", "bienes raíces", "servicios profesionales"];
    return types[Math.floor(Math.random() * types.length)];
};

const getRandomErrorWord = (): string => {
    const words = ["timeout", "authentication", "limit", "connection"];
    return words[Math.floor(Math.random() * words.length)];
};