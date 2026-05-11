import { ObjectionResponse } from '../types';

export const OBJECTIONS: Record<string, { title: string, icon: string, responses: ObjectionResponse }> = {
  precio: {
    title: "El precio es muy alto",
    icon: "💰",
    responses: {
      r1: "Entiendo que el precio sea un factor, pero déjeme hacerle una pregunta: ¿Qué le sale más caro? ¿Invertir en una herramienta que le ahorra 2 horas diarias de trabajo, o seguir con su equipo actual que le genera frustración? Si dividimos esta inversión en 24 meses, estamos hablando de menos de lo que gasta en café al mes para tener la mejor tecnología del mundo en sus manos.",
      r2: "Alex Hormozi dice que el valor es lo que el cliente obtiene, el precio es lo que paga. Aquí no está pagando por metal y vidrio, está pagando por la velocidad para cerrar sus negocios, la calidad de sus recuerdos y la tranquilidad de tener un cupo preaprobado que hoy es una realidad, pero que mañana podría no estar. ¿Prefiere dejar pasar esta oportunidad por una diferencia mínima mensual?",
      personaResponses: {
        empresario: {
          r1: "Como empresario, usted sabe que la tecnología no es un gasto, es una inversión en productividad. Este equipo se paga solo con el tiempo que ahorrará en su operación diaria. ¿Cuánto vale para su empresa una hora de su tiempo optimizada?",
          r2: "Usted ya conoce el concepto de ROI. Recuperar la inversión de este equipo es inmediato cuando hablamos de eficiencia corporativa y la imagen que proyecta a sus clientes."
        },
        gamer: {
          r1: "Si lo comparas con armar una PC de última generación, este precio es ridículo por la potencia portátil que te llevas. Estás pagando por cero lag y gráficos ultra en cualquier lugar.",
          r2: "El precio de no tener este equipo es perder esas partidas críticas por culpa del hardware. Juega en la liga de los grandes con tecnología que sí responde."
        },
        estudiante: {
          r1: "Entiendo que como estudiante el presupuesto es clave. Por eso este plan a cuotas bajas es ideal: tienes la mejor herramienta para tu carrera sin sacrificar tus ahorros mensuales.",
          r2: "Tu educación es tu mayor activo. Tener un equipo que no se trabe cuando entregues un proyecto final no tiene precio. Es asegurar tu éxito académico."
        }
      }
    }
  },
  cuotas: {
    title: "¿Muy cara la cuota mensual?",
    icon: "📊",
    responses: {
      r1: "Si dividimos $40.000 entre 30 días, hablamos de $1.333 diarios. Eso es literalmente el valor de un pasaje de transporte público o un snack. ¿No vale su productividad y conectividad lo mismo que un snack diario? La mayoría de nuestros clientes recuperan el valor de la cuota simplemente con la eficiencia extra que les da el nuevo equipo.",
      r2: "Brian Tracy siempre dice que los ganadores invierten en sí mismos. Esta cuota no es un gasto, es el pago por su oficina móvil. Además, recuerde que en CXD la tasa es fija. Mientras todo sube, su cuota se mantiene igual, lo que significa que en un año, en términos reales, su equipo le estará costando menos que hoy.",
      personaResponses: {
        profesional: {
          r1: "Para un profesional de su nivel, esta cuota es equivalente a un almuerzo de trabajo al mes. Es un monto marginal comparado con el estatus y la eficiencia que este equipo le otorga en su campo.",
          r2: "Véalo como una suscripción a su propio éxito. Por una cuota mínima mensual, usted tiene la oficina más moderna en su bolsillo."
        },
        hogar: {
          r1: "En la economía del hogar, buscamos que el dinero rinda. Esta cuota está pensada para que no afecte su presupuesto familiar, permitiendo que todos en casa disfruten de la mejor tecnología.",
          r2: "Es una inversión para la familia. Por el precio de una salida a cine al mes, están renovando el centro tecnológico de su hogar."
        }
      }
    }
  },
  garantia: {
    title: "¿Qué garantía tiene el equipo?",
    icon: "🛡️",
    responses: {
      r1: "Usted tiene 12 meses de garantía directa con nosotros y el fabricante. Pero más allá del papel, tiene el respaldo de CXD y Claro. Si algo falla, no tiene que buscar técnicos de barrio; viene a nosotros y resolvemos. Es la diferencia entre comprar 'barato' en la calle sin respaldo o comprar con la tranquilidad de que su inversión está blindada.",
      r2: "Eliminamos el riesgo por usted. Si el equipo presenta defectos de fábrica, el soporte es inmediato. Piense en esto como un seguro de vida para su comunicación. ¿Vale la pena arriesgar su dinero en lugares sin certificado legal por ahorrarse unos pesos?"
    }
  },
  duda_marca: {
    title: "No conozco esta marca",
    icon: "❓",
    responses: {
      r1: "Le entiendo perfectamente. Hace años nadie conocía a las marcas que hoy dominan el mercado. HONOR u OPPO son gigantes globales que están superando en innovación a los nombres tradicionales. Ofrecen mejores pantallas y baterías por un precio mucho más justo. ¿Prefiere pagar un millón extra solo por un logo, o prefiere llevarse la mejor tecnología disponible hoy?",
      r2: "En el mundo de los negocios, lo que importa son los números. Estas marcas tienen los mejores puntajes en benchmarks internacionales. Yo mismo uso uno de estos y le aseguro que la fluidez es superior. Si no fuera de calidad premium, CXD no pondría su nombre detrás de estos equipos."
    }
  },
  cambio: {
    title: "¿Puedo cambiar el equipo después?",
    icon: "↩️",
    responses: {
      r1: "Lo mejor de este plan es la flexibilidad. Tenemos una política de satisfacción de 5 días. Pero le diré algo: el 98% de quienes eligen este modelo específico quedan tan impactados con el rendimiento que terminan recomendándolo a sus amigos. ¿Qué es exactamente lo que le daría miedo de este equipo?" ,
      r2: "Usted tiene el derecho al retracto legal. Pero mi objetivo como su asesor no es venderle un equipo para que lo cambie, sino encontrar el equipo definitivo para usted. Basado en lo que me contó en el sondeo, este es el 'match' perfecto para sus necesidades de trabajo y estudio."
    }
  },
  entrega: {
    title: "¿Cuánto tarda la entrega?",
    icon: "⏱️",
    responses: {
      r1: "Estamos hablando de 3 a 5 días hábiles. En el gran esquema de las cosas, eso es un parpadeo. Piense que para el próximo fin de semana ya podría estar estrenando su equipo y subiendo sus mejores fotos. La espera de 72 horas es lo que separa a su 'yo de hoy' de su 'yo con mejor tecnología'.",
      r2: "Nuestra logística es de primera. Recibirá un mensaje de WhatsApp para que rastree su pedido en tiempo real. La mayoría de los clientes reciben el equipo antes de lo esperado. ¿Hay alguna dirección específica donde quiera recibirlo para su comodidad?"
    }
  },
  credito: {
    title: "Mi crédito no es bueno",
    icon: "📋",
    responses: {
      r1: "Aquí viene la mejor parte: este proceso es diferente. Valoramos su comportamiento con su factura de Claro actual. Si usted ha sido cumplido aquí, eso pesa más que cualquier reporte externo para nosotros. Déjeme pasar la consulta en Poliedro; es rápido y no pierde nada con intentarlo. ¿Lo intentamos ya?",
      r2: "Todos hemos tenido baches financieros, pero nosotros creemos en el presente. Si su línea tiene antigüedad, su cupo ya está pre-asignado. No es como un banco tradicional. Aquí premiamos su fidelidad como cliente CXD. ¿Me permite su cédula para validar cuánto tiene hoy aprobado?"
    }
  },
  otro_operador: {
    title: "Tengo otro operador",
    icon: "📡",
    responses: {
      r1: "Por eso mismo lo llamamos. Usted merece los beneficios de estar en el operador con mayor cobertura de Colombia. Pasándose a Claro, automáticamente le aprobamos y le entregamos equipo sin cuota inicial. En su operador actual empezar de cero para pedir un equipo es un dolor de cabeza.",
      r2: "Claro le pone la alfombra roja. ¿Para qué quedarse donde no le liberan cupo VIP? Traiga su número y estrena de una vez."
    }
  },
  compara: {
    title: "Debo comparar en otro lado",
    icon: "🔍",
    responses: {
      r1: "Es una decisión inteligente. Pero recuerde comparar manzanas con manzanas: la garantía de 12 meses, el envío a domicilio y, lo más importante, esta tasa de interés preferencial por ser cliente nuestro. En otros lados el precio de contado puede parecer menor, pero el crédito termina costándole el doble. Aquí es transparente. ¿Qué es lo que más le preocupa de no encontrar el mejor trato?",
      r2: "Su tiempo también es dinero. Hoy ya estamos aquí, usted ya tiene el cupo aprobado y el equipo seleccionado. ¿Vale la pena gastar 5 horas de su vida buscando algo que tal vez le ahorre 10 mil pesos, o prefiere cerrar este capítulo hoy mismo y empezar a disfrutar?"
    }
  },
  ahora_no: {
    title: "Ahora no, estoy pensando",
    icon: "⏳",
    responses: {
      r1: "El análisis genera parálisis. Piense en esto: mientras usted lo piensa, otros están aprovechando los inventarios de Mayo. Este precio y este cupo preaprobado tienen fecha de vencimiento. Si vuelve mañana y el cupo expiró o el equipo ya no está, ¿se sentiría frustrado? Si la respuesta es sí, entonces la decisión correcta es hacerlo ahora.",
      r2: "Alex Hormozi dice que la diferencia entre una vida mediocre y una extraordinaria es la velocidad de toma de decisiones. Usted ya sabe que necesita el equipo, ya sabe que le gusta y ya sabe que puede pagarlo. ¿Cuál es el beneficio real de esperar 24 horas más? Solo retrasar su satisfacción.",
      personaResponses: {
        jubilado: {
          r1: "Usted se merece disfrutar lo mejor hoy mismo, sin esperas. Ha trabajado mucho y este equipo es el premio a su puntualidad. ¿Por qué postergar la facilidad de comunicarse con sus seres queridos con la mejor pantalla?",
          r2: "La tecnología avanza rápido, pero hoy tenemos el equipo perfecto y el cupo listo para usted. No deje para mañana la tranquilidad que este equipo le da hoy."
        },
        creativo: {
          r1: "Como creativo, sabes que la inspiración no espera. Cada día que pasas con un equipo lento es una idea que no puedes materializar con fluidez. No dejes que la herramienta limite tu talento un día más.",
          r2: "Hoy el stock está disponible. Mañana podrías estar en medio de un proyecto y arrepentirte de no haber dado el salto cuando tenías el beneficio en la mano."
        }
      }
    }
  },
  celular_bueno: {
    title: "Ya tengo un celular bueno",
    icon: "📱",
    responses: {
      r1: "Lo entiendo, pero los equipos sufren degradación de memoria y batería con el tiempo, además de perder actualizaciones de seguridad. Hoy tiene el cupo y la promoción sin cuota inicial; no espere a que su equipo actual empiece a fallar para salir a buscar a las carreras y más caro.",
      r2: "Es como tener un buen carro de hace 5 años; sigue andando, pero no tiene las ventajas de seguridad y ahorro de uno nuevo. Si no aprovecha el cupo tecnológico hoy, lo perderá."
    }
  },
  mas_cargos: {
    title: "No quiero más cargos en la factura",
    icon: "🧾",
    responses: {
      r1: "Comprendo, pero véalo no como un gasto adicional, sino como un reemplazo de lo que gasta por fuera. Al llevarlo en la factura de Claro le quitamos los intereses altos de tarjetas, se ahorra cuota inicial, y el equipo se vuelve parte de su presupuesto fijo y controlado. Es una inversión garantizada, no una deuda que crece.",
      r2: "A nadie le gusta ver que la factura sube, pero esto es una inversión de trabajo. Está unificando el control de su conectividad y herramienta en un solo lugar y de paso no toca el flujo de caja de su bolsillo hoy."
    }
  },
  otro: {
    title: "Otra objeción/Pregunta",
    icon: "💬",
    responses: {
      r1: "Me encanta que sea detallista. Cuénteme exactamente qué es lo que le impide decir 'sí' ahorita mismo y buscaremos la forma de que sea un 'sí' rotundo para usted.",
      r2: "Dígame una cosa: si el tema del dinero no fuera problema, ¿este sería el equipo que usted elegiría? Si la respuesta es sí, entonces solo tenemos que arreglar la forma de pago. Cuénteme su duda."
    }
  }
};
