export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const downloadTxt = (filename: string, text: string) => {
  const element = document.createElement("a");
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const trackMetric = (key: string, value: any = 1) => {
  try {
    const stats = JSON.parse(localStorage.getItem('tyt_metrics') || '{}');
    if (typeof value === 'number') {
      stats[key] = (stats[key] || 0) + value;
    } else {
      stats[key] = value;
    }
    localStorage.setItem('tyt_metrics', JSON.stringify(stats));
  } catch (e) {
    // ignore
  }
};

export const calculateMonthlyInstallment = (principal: number, months: number) => {
  // Using the rate from the footer: 28.17% EA = 2.09% MV
  const monthlyRate = 0.0209;
  if (months === 0) return principal;
  
  // Formula for fixed installment: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return installment;
};

export const generateSpecs = (eq: any): { label: string, value: string }[] => {
  const name = eq.nombre.toLowerCase();
  const specs = [];
  
  if (eq.categoria === 'SMARTPHONE') {
    // RAM y Almacenamiento
    if (eq.precio >= 3000000 || name.includes('pro') || name.includes('ultra')) {
      specs.push({ label: 'Memoria y Almacenamiento', value: '12GB RAM | 256GB/512GB ROM UFS 3.1+' });
      specs.push({ label: 'Procesador', value: 'Procesador tope de gama (rápido y fluido para juegos y apps exigentes)' });
      specs.push({ label: 'Cámaras', value: 'Resolución profesional 50MP+ con IA, grabación 4K/8K' });
      specs.push({ label: 'Batería y Carga', value: '5000mAh con carga súper rápida de 60W+' });
    } else if (eq.precio >= 1000000) {
      specs.push({ label: 'Memoria y Almacenamiento', value: '6GB/8GB RAM | 128GB/256GB ROM' });
      specs.push({ label: 'Pantalla', value: 'Pantalla fluida AMOLED/OLED a 90Hz/120Hz' });
      specs.push({ label: 'Cámara Principal', value: 'Sistema de doble o triple cámara con sensor principal de 48MP o 64MP' });
      specs.push({ label: 'Batería', value: 'Batería duradera y carga rápida para todo el día' });
    } else {
      specs.push({ label: 'Memoria y Almacenamiento', value: '4GB/6GB RAM | 64GB/128GB ROM' });
      specs.push({ label: 'Pantalla', value: 'Pantalla HD+/FHD+ para colores nítidos' });
      specs.push({ label: 'Batería', value: 'Gran autonomía de 5000mAh para no depender del enchufe' });
    }
  } else if (name.includes('tv ') || name.includes('televisor')) {
    specs.push({ label: 'Resolución', value: 'Pantalla 4K UHD con HDR para cine en casa' });
    specs.push({ label: 'Smart TV', value: 'Sistema operativo integrado con acceso a todas las plataformas de streaming' });
    specs.push({ label: 'Sonido', value: 'Dolby Audio/DTS con altavoces enriquecidos' });
    specs.push({ label: 'Conectividad', value: 'Múltiples puertos HDMI, USB y Bluetooth' });
  } else if (name.includes('portatil') || name.includes('portátil') || name.includes('laptop')) {
    specs.push({ label: 'Rendimiento', value: 'Procesador de última generación con alto desempeño' });
    specs.push({ label: 'Memoria', value: '8GB/16GB RAM para multitarea fluida' });
    specs.push({ label: 'Almacenamiento', value: 'SSD rápido para encendido en segundos' });
    specs.push({ label: 'Pantalla', value: 'Resolución FHD con marcos delgados' });
  } else {
    specs.push({ label: 'Tipo', value: 'Tecnología y accesorios inteligentes' });
    specs.push({ label: 'Compatibilidad', value: 'Conexión universal y fácil configuración' });
    specs.push({ label: 'Diseño', value: 'Ergonómico y compacto' });
  }
  
  return specs;
};

export const getAvailableTerms = (eq: any): number[] => {
  if (eq.plazosDisponibles && eq.plazosDisponibles.length > 0) return eq.plazosDisponibles;
  
  if (eq.categoria === 'SMARTPHONE') {
    return [6, 12, 18, 24, 36];
  }
  
  const name = eq.nombre.toLowerCase();
  
  // High ticket items usually got longer terms
  if (name.includes('tv ') || name.includes('televisor') || name.includes('portatil') || name.includes('portátil') || name.includes('consola') || name.includes('ipad') || name.includes('macbook')) {
    return [6, 12, 18, 24, 36];
  }
  
  if (name.includes('reloj') || name.includes('watch') || name.includes('audifonos') || name.includes('buds') || name.includes('parlante') || name.includes('soundbar') || name.includes('barra')) {
    if (eq.precio <= 500000) return [6, 12];
    if (eq.precio <= 1000000) return [6, 12, 18];
    return [6, 12, 18, 24];
  }
  
  if (eq.precio <= 400000) return [6, 12];
  if (eq.precio <= 800000) return [6, 12, 18];
  if (eq.precio <= 1200000) return [6, 12, 18, 24];
  
  return [6, 12, 18, 24, 36];
};

export const matchesNecessity = (eqName: string, necesidad: string): boolean => {
  if (!necesidad || necesidad === 'TODOS' || necesidad === '') return true;
  const n = eqName.toLowerCase();
  switch (necesidad) {
    case 'ACCESORIOS': return true; // generic fallback if they just want accessories
    case 'ASISTENTE DE VOZ': return n.includes('echo') || n.includes('asistente') || n.includes('altavoz intelig');
    case 'ASPIRADORA': return n.includes('aspiradora');
    case 'AUDIFONOS': return n.includes('audifono') || n.includes('airpod') || n.includes('buds') || n.includes('earbud') || n.includes('auricular');
    case 'BARRA SONIDO': return n.includes('barra') || n.includes('soundbar');
    case 'CABLE': return n.includes('cable');
    case 'CAMARA': return n.includes('camara') || n.includes('cámara');
    case 'CARGADOR': return n.includes('cargador') || n.includes('adaptador') || n.includes('cubo');
    case 'COMPUTADOR': case 'PORTATIL': return n.includes('port') || n.includes('pc') || n.includes('macbook') || n.includes('computador');
    case 'CONSOLA': return n.includes('consola') || n.includes('ps5') || n.includes('nintendo') || n.includes('xbox');
    case 'FREIDORA': return n.includes('freidora');
    case 'KIT SEGURIDAD': return n.includes('kit') || n.includes('seguridad') || n.includes('camara');
    case 'LAMINA': return n.includes('lamina') || n.includes('vidrio') || n.includes('protector');
    case 'LOCALIZADOR': return n.includes('localizador') || n.includes('smarttag') || n.includes('airtag');
    case 'MESA': return n.includes('mesa') || n.includes('escritorio');
    case 'MINICOMPONENTE': return n.includes('minicomponente') || n.includes('one box') || n.includes('onebox') || n.includes('onebody');
    case 'PARLANTE': return n.includes('parlante') || n.includes('altavoz');
    case 'PATINETA': return n.includes('patineta') || n.includes('scooter');
    case 'POWER BANK': return n.includes('power bank') || n.includes('bateria');
    case 'SMARTBAND': return n.includes('band') || n.includes('pulsera');
    case 'SMARTWATCH': return n.includes('watch') || n.includes('reloj');
    case 'SOPORTE': return n.includes('soporte');
    case 'TABLET': return n.includes('tablet') || n.includes('ipad');
    case 'TELEVISOR': return n.includes('tv') || n.includes('televisor');
    case 'TORRE SONIDO': return n.includes('torre');
    default: return true;
  }
};
