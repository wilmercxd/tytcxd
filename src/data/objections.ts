import { ObjectionResponse } from '../types';

export const OBJECTIONS: Record<string, { title: string, icon: string, responses: ObjectionResponse }> = {
  precio: {
    title: "El precio es muy alto",
    icon: "💰",
    responses: {
      r1: "Entiendo que el precio sea un factor, pero déjeme hacerle una pregunta: ¿Qué le sale más caro? ¿Invertir en una herramienta que le ahorra 2 horas diarias de trabajo, o seguir con su equipo actual que le genera frustración? Si dividimos esta inversión en 24 meses, estamos hablando de menos de lo que gasta en café al mes para tener la mejor tecnología del mundo en sus manos.",
      r2: "Alex Hormozi dice que el valor es lo que el cliente obtiene, el precio es lo que paga. Aquí no está pagando por metal y vidrio, está pagando por la velocidad para cerrar sus negocios, la calidad de sus recuerdos y la tranquilidad de tener un cupo preaprobado que hoy es una realidad, pero que mañana podría no estar. ¿Prefiere dejar pasar esta oportunidad por una diferencia mínima mensual?"
    }
  },
  cuotas: {
    title: "¿Muy cara la cuota mensual?",
    icon: "📊",
    responses: {
      r1: "Si dividimos $40.000 entre 30 días, hablamos de $1.333 diarios. Eso es literalmente el valor de un pasaje de transporte público o un snack. ¿No vale su productividad y conectividad lo mismo que un snack diario? La mayoría de nuestros clientes recuperan el valor de la cuota simplemente con la eficiencia extra que les da el nuevo equipo.",
      r2: "Brian Tracy siempre dice que los ganadores invierten en sí mismos. Esta cuota no es un gasto, es el pago por su oficina móvil. Además, recuerde que en CXD la tasa es fija. Mientras todo sube, su cuota se mantiene igual, lo que significa que en un año, en términos reales, su equipo le estará costando menos que hoy."
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
      r2: "Alex Hormozi dice que la diferencia entre una vida mediocre y una extraordinaria es la velocidad de toma de decisiones. Usted ya sabe que necesita el equipo, ya sabe que le gusta y ya sabe que puede pagarlo. ¿Cuál es el beneficio real de esperar 24 horas más? Solo retrasar su satisfacción."
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
