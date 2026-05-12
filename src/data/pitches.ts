import { PitchData } from '../types';

export const PITCHES_POR_MARCA: Record<string, PitchData[]> = {
  HONOR: [
    {
      gancho: "¡Felicidades! Por su excelente pago, Claro le autorizó 2x1 en tecnología.",
      beneficios: {
        'Cámara': "Cámara Ultra-Clara de grado profesional, ideal para contenido sin edición.",
        'Batería': "Batería inagotable de 5800mAh, le dura hasta 2 días sin cargador.",
        'Velocidad': "Fluidez total con Honor RAM Turbo, trabaje sin que su celular se congele.",
        'Precio': "Se lleva especificaciones de gama alta pagando como si fuera gama media."
      }
    },
    {
      gancho: "Tengo un regalo aprobado para usted en el sistema si renovamos hoy.",
      beneficios: {
        'Cámara': "Retratos de estudio con IA en su bolsillo.",
        'Batería': "Cárguelo en minutos y úselo todo el día con SuperCharge.",
        'Velocidad': "Procesador optimizado al máximo para juegos y múltiples apps abiertas.",
        'Precio': "Aproveche el subsidio del fabricante válido por esta semana."
      }
    },
    {
      gancho: "Usted es cliente VIP esta semana y tiene prioridad de inventario nuevo.",
      beneficios: {
        'Cámara': "No se pierda ningún detalle nocturno con la visión ultra nítida de Honor.",
        'Batería': "No vuelva a vivir la ansiedad de quedarse sin batería a mitad de tarde.",
        'Velocidad': "Conexión 5G ultra rápida para descargar películas en segundos.",
        'Precio': "La cuota queda congelada; si todo sube, usted sigue pagando lo mismo."
      }
    }
  ],
  XIAOMI: [
    {
      gancho: "Le tengo una noticia: su número fue pre-seleccionado para la Quincena Xiaomi.",
      beneficios: {
        'Cámara': "Lentes co-creados con Leica para fotos que parecen póster de cine.",
        'Batería': "Carga hiper-rápida, 100% en menos de 20 minutos.",
        'Velocidad': "El mejor procesador de su segmento, pura potencia bruta.",
        'Precio': "Xiaomi es el rey calidad-precio, pagas la mitad por la misma tecnología."
      }
    },
    {
      gancho: "¡No pague su equipo de contado! Tengo un cupo rotativo listo para su línea.",
      beneficios: {
        'Cámara': "Fotos vibrantes listas para redes sociales al instante.",
        'Batería': "Optimización inteligente de batería que aprende de su uso.",
        'Velocidad': "Tasa de refresco ultra fluida, navegar es una delicia visual.",
        'Precio': "Llévelo en cuotas que cuestan menos que un combo de hamburguesa."
      }
    },
    {
      gancho: "Le habilitaron un descuento de fidelización oculto en el sistema.",
      beneficios: {
        'Cámara': "Gran angular infinito para que nadie se quede fuera de la foto.",
        'Batería': "Capacidad enorme para aguantar maratones de series en Netflix.",
        'Velocidad': "Memoria expansible masiva para guardar su vida entera sin borrar nada.",
        'Precio': "Promoción flash con cuota súper baja si aparta la unidad ya mismo."
      }
    }
  ],
  SAMSUNG: [
    {
      gancho: "¿Sabía que su línea Clasifica para renovar al ecosistema Galaxy sin cuota inicial?",
      beneficios: {
        'Cámara': "Cámara épica con Space Zoom, acerque lo imposible.",
        'Batería': "Gestión de energía impulsada por inteligencia artificial.",
        'Velocidad': "Soporte de actualizaciones por años: celular rápido hoy y mañana.",
        'Precio': "La marca más confiable de Colombia, con un valor de reventa insuperable."
      }
    },
    {
      gancho: "Llamo con buenas noticias: hay un bono de recompra en sistema a su nombre.",
      beneficios: {
        'Cámara': "Nightography: grabe videos perfectos en medio de la oscuridad.",
        'Batería': "Batería compartida, use su celular como cargador portátil.",
        'Velocidad': "Productividad real nivel PC en la palma de su mano.",
        'Precio': "Financiación tan baja que la pagará con el cambio del pasaje."
      }
    },
    {
      gancho: "Usted fue seleccionado para probar la nueva Inteligencia Artificial de Samsung.",
      beneficios: {
        'Cámara': "Edición mágica: elimine intrusos de sus fotos con un toque.",
        'Batería': "Rendimiento óptimo para aguantar viajes largos sin depender de enchufes.",
        'Velocidad': "Traduzca llamadas en vivo y busque en pantalla al instante con IA.",
        'Precio': "El prestigio de la marca premium por excelencia a cuotas accesibles."
      }
    }
  ],
  MOTOROLA: [
    {
      gancho: "¡Qué más! Veo que usted tiene un perfil excelente con nosotros. Por eso le liberamos un cupo para este Motorola, ideal para trabajo pesado: pura potencia para un [OCUPACION] como usted.",
      beneficios: {
        'Cámara': "Sensor ultra-pixel que atrapa luz de noche, las fotos le van a quedar espectaculares.",
        'Batería': "Carga TurboPower, horas de energía en minutos pa' que no se quede desconectado en la calle.",
        'Velocidad': "Cero lentitud. Este sistema vuela para abrir correos o cualquier tipo de archivos.",
        'Precio': "Queda montado con equipo premium, y lo paga en la factura suavecito sin cuota inicial."
      }
    },
    {
      gancho: "Claro le está tirando la casa por la ventana. Hoy me autorizaron un Motorola con sonido Dolby Atmos de locos para que disfrute al máximo sin gastar un peso de más hoy.",
      beneficios: {
        'Cámara': "Va a sacar los mejores retratos de la familia, colores exactitos a la realidad.",
        'Batería': "Aguanta el trote de todo el día; salga confiado sin andar buscando enchufes.",
        'Velocidad': "Pantalla súper fluida para jugar, ver series o navegar sin interrupción.",
        'Precio': "Aquí le incluimos el cover y cargador rápido en la caja, para que se ahorre ese billetico extra."
      }
    },
    {
      gancho: "¡Esta oportunidad no se ve todos los días! Tengo un stock limitado de Motorola con rebaja en cuota mensual. Es el equipo que más están llevando y lo tengo listo para enviarle.",
      beneficios: {
        'Cámara': "Estabilización óptica incorporada: los videos quedan quietecitos y de nivel profesional.",
        'Batería': "Le puede dar pata todo el día y no se rinde. Es un guerrero en duración.",
        'Velocidad': "Conecte el Motorola a una pantalla externa y se le vuelve un televisor o computador.",
        'Precio': "El salto tecnológico que necesita para brillar como [OCUPACION], cuidando su bolsillo al máximo."
      }
    }
  ],
  VIVO: [
    {
      gancho: "Por su puntualidad, Claro le cubre hoy la cuota inicial del nuevo lanzamiento de VIVO. Especial para un [OCUPACION] que requiere estar conectado con estilo.",
      beneficios: {
        'Cámara': "Trae el aro de luz integrado (Aura Light) para fotos nocturnas, luces como todo un TikToker.",
        'Batería': "Batería guerrera que conserva su vida útil por 4 años facilito.",
        'Velocidad': "Rendimiento optimizado para que salte de una aplicación a otra sin demoras.",
        'Precio': "La marca asiática de mayor crecimiento por su calidad a precios de locura."
      }
    },
    {
      gancho: "Tengo un beneficio exclusivo: equipos potentes de VIVO al precio más bajo del mes. Mejor rendimiento sin endeudarse tanto.",
      beneficios: {
        'Cámara': "Retratos de talla profesional con enfoques dignos de revista.",
        'Batería': "Cárguelo rapidito y vuelva a su rutina sin perder tiempo.",
        'Velocidad': "Diseño delgado pero puro músculo por dentro: navega a toda velocidad.",
        'Precio': "Es inteligente pagar menos por características que valen el doble en otras marcas."
      }
    }
  ],
  ZTE: [
     {
      gancho: "Tengo un beneficio exclusivo: equipos potentes al precio más bajo del mes.",
      beneficios: {
        'Cámara': "Cámara de alta resolución para capturar todos los momentos importantes.",
        'Batería': "Increíble duración, el celular que le sigue el ritmo todo el día.",
        'Velocidad': "Diseñado para los que necesitan potencia a precio imbatible, como pymes o gamers causales.",
        'Precio': "Garantizado: es la opción más económica de la parrilla manteniendo alta calidad."
      }
    }   
  ],
  // Fallback
  TECNOLOGIA: [
    {
      gancho: "¡Renueve su centro de entretenimiento / trabajo con el cupo disponible!",
      beneficios: {
        'Productividad/IA': "Trabaje o estudie como los profesionales, con las últimas herramientas inteligentes.",
        'Velocidad': "Arranque en segundos, sin tiempos de espera frustrantes.",
        'Batería': "Batería de polímero avanzada, olvídese de los cables durante su jornada.",
        'Precio': "Llevese tecnología de punta financiando en cómodas cuotas fijas a largo plazo."
      }
    }
  ],
  DEFAULT: [
    {
      gancho: "¡Tiene un cupo preaprobado por Claro Listo para usarse sin papeleo!",
      beneficios: {
        'Cámara': "Capturas nítidas en cualquier momento.",
        'Batería': "Batería de larga duración para todo el día.",
        'Velocidad': "Procesador optimizado para su día a día.",
        'Precio': "Cuotas súper cómodas con su misma factura."
      }
    }
  ]
};
