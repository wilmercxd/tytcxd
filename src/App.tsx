import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Smartphone, 
  Laptop, 
  HelpCircle, 
  ShieldCheck, 
  Calculator, 
  Search, 
  User, 
  FileText, 
  CheckCircle2, 
  Printer, 
  RotateCcw,
  MessageSquare,
  BadgePercent,
  Clock,
  Briefcase,
  Crown,
  MapPin,
  Star,
  BarChart2
} from 'lucide-react';
import { EQUIPMENT_DATA } from './data/equipment';
import { OBJECTIONS } from './data/objections';
import { PITCHES_POR_MARCA } from './data/pitches';
import { ContractText } from './data/contract';
import { formatCurrency, calculateMonthlyInstallment, downloadTxt, trackMetric, getAvailableTerms, generateSpecs, matchesNecessity } from './lib/utils';
import { Equipment, PoliedroData } from './types';
import ModoLlamada from './ModoLlamada';
import MetricsPanel from './MetricsPanel';
import { PhoneCall } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Bienvenida', icon: User },
  { id: 2, title: 'Cupo Preaprobado', icon: BadgePercent },
  { id: 3, title: 'Sondeo', icon: Search },
  { id: 4, title: 'Catálogo', icon: Smartphone },
  { id: 5, title: 'Calculadora', icon: Calculator },
  { id: 6, title: 'Objeciones', icon: HelpCircle },
  { id: 7, title: 'Claro UP', icon: ShieldCheck },
  { id: 8, title: 'Habeas Data', icon: ShieldCheck },
  { id: 9, title: 'Poliedro', icon: ShieldCheck },
  { id: 10, title: 'Dirección', icon: MapPin },
  { id: 11, title: 'Resumen Verbal', icon: MessageSquare },
  { id: 12, title: 'Contrato', icon: FileText },
  { id: 13, title: 'Resumen', icon: CheckCircle2 },
];

const TECNOLOGIA_OPTIONS = [
  { value: "ACCESORIOS", label: "Accesorios 🎧" },
  { value: "ASISTENTE DE VOZ", label: "Asistente de Voz 🗣️" },
  { value: "ASPIRADORA", label: "Aspiradora 🧹" },
  { value: "AUDIFONOS", label: "Audífonos 🎶" },
  { value: "BARRA SONIDO", label: "Barra Sonido 🔊" },
  { value: "CABLE", label: "Cable 🔌" },
  { value: "CAMARA", label: "Cámara 📷" },
  { value: "CARGADOR", label: "Cargador 🔋" },
  { value: "COMPUTADOR", label: "Computador 💻" },
  { value: "CONSOLA", label: "Consola 🎮" },
  { value: "FREIDORA", label: "Freidora 🍟" },
  { value: "KIT SEGURIDAD", label: "Kit Seguridad 🛡️" },
  { value: "LAMINA", label: "Lamina 📱" },
  { value: "LOCALIZADOR", label: "Localizador 📍" },
  { value: "MESA", label: "Mesa 🪑" },
  { value: "MINICOMPONENTE", label: "Minicomponente 📻" },
  { value: "PARLANTE", label: "Parlante 🔈" },
  { value: "PATINETA", label: "Patineta 🛴" },
  { value: "PORTATIL", label: "Portatil 💻" },
  { value: "POWER BANK", label: "Power Bank 🔋" },
  { value: "SMARTBAND", label: "Smartband ⌚" },
  { value: "SMARTWATCH", label: "Smartwatch ⌚" },
  { value: "SOPORTE", label: "Soporte 🦾" },
  { value: "TABLET", label: "Tablet 📱" },
  { value: "TELEVISOR", label: "Televisor 📺" },
  { value: "TORRE SONIDO", label: "Torre Sonido 🗼" }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isModoLlamada, setIsModoLlamada] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [toastMessage, setToastMessage] = useState<{msg: string, type: 'error' | 'success'} | null>(null);

  const showToast = (msg: string, type: 'error' | 'success' = 'error') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };
  const [clientInfo, setClientInfo] = useState({
    nombre: '',
    cc: '',
    movil: '',
    email: '',
    ocupacion: '',
    marcaPreferida: '',
    prioridades: [],
    direccion: '',
    usos: [] as string[],
    presupuestoMensual: 150000,
    paraQuien: 'Para mí',
    equipoActual: '',
    necesidad: ''
  });
  const [claroUpOfrecido, setClaroUpOfrecido] = useState<boolean | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [term, setTerm] = useState(24);
  const [poliedroRaw, setPoliedroRaw] = useState('');
  const [poliedroData, setPoliedroData] = useState<PoliedroData | null>(null);
  const [selectedObjection, setSelectedObjection] = useState<string | null>(null);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [habeasDataAccepted, setHabeasDataAccepted] = useState(false);
  const [habeasDataRead, setHabeasDataRead] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedBrand, setSelectedBrand] = useState('TODOS');
  const [selectedDevice, setSelectedDevice] = useState('TODOS');

  const asesor = "Asesor TyT Especializado";

  const goToStep = (stepId: number) => {
    if (stepId > 1 && !clientInfo.nombre) {
      showToast("Por favor complete el nombre en Bienvenida.", 'error');
      setCurrentStep(1);
      return;
    }
    if (stepId > 4 && !selectedEquipment) {
      showToast("Por favor seleccione un equipo en el Catálogo.", 'error');
      setCurrentStep(4);
      return;
    }
    if (stepId > 7 && claroUpOfrecido === null) {
      showToast("Debe confirmar si ofreció Claro UP para continuar.", 'error');
      setCurrentStep(7);
      return;
    }
    if (stepId >= 9 && !habeasDataRead) {
      showToast("Debe realizar la lectura completa del guion de Habeas Data.", 'error');
      setCurrentStep(8);
      return;
    }
    if (stepId >= 10 && !poliedroData) {
      showToast("Debe extraer los datos de Poliedro para continuar.", 'error');
      setCurrentStep(9);
      return;
    }
    if (stepId >= 11 && !clientInfo.direccion) {
      showToast("Debe ingresar la dirección de entrega.", 'error');
      setCurrentStep(10);
      return;
    }
    if (stepId === 13 && (!contractAccepted || !habeasDataAccepted)) {
      showToast("Debe aceptar el contrato y el tratamiento de datos.", 'error');
      setCurrentStep(12);
      return;
    }
    setCurrentStep(stepId);
    trackMetric('avgMaxStep', Math.max(stepId, Number(localStorage.getItem('tyt_max_step') || 0)));
    localStorage.setItem('tyt_max_step', stepId.toString());
    window.scrollTo(0, 0);
  };

  const nextStep = () => goToStep(currentStep + 1);

  const prevStep = () => goToStep(currentStep - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === 'ArrowRight') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsModoLlamada(p => !p);
      } else if (e.key === 'Escape') {
        setIsModoLlamada(false);
      } else if (e.altKey && !isNaN(Number(e.key))) {
        const num = Number(e.key);
        if (num >= 1 && num <= 9) goToStep(num);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, clientInfo, selectedEquipment, claroUpOfrecido, habeasDataRead, poliedroData, contractAccepted, habeasDataAccepted]);

  const handlePoliedroExtraction = () => {
    const text = poliedroRaw;
    const extract = (regex: RegExp) => {
      const match = text.match(regex);
      return match ? match[1].trim() : 'No encontrado';
    };

    // Advanced search for the simulated equipment row
    // It usually follows the pattern: [Device Name] $... $... $...
    // We look for a line that starts with something and contains currency symbols
    const lines = text.split('\n');
    let simulatedRow = '';
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('$') && (lines[i].toLowerCase().includes('cuotas') || lines[i].includes('6') || lines[i].includes('12'))) {
            // Check if it's the header line
            if (!lines[i].toLowerCase().includes('valor equipo')) {
                simulatedRow = lines[i];
                break;
            }
        }
    }

    const rowParts = simulatedRow.split('\t').filter(p => p.trim() !== '');
    
    // If not found via tabs, try spaces (multiple)
    const rowPartsFallback = simulatedRow.split(/\s{2,}/).filter(p => p.trim() !== '');
    const parts = rowParts.length > 5 ? rowParts : rowPartsFallback;

    const data: PoliedroData = {
      nombre: extract(/Nombres:\s*([^\n\t]+)/i),
      apellidos: extract(/Apellidos:\s*([^\n\t]+)/i),
      cc: extract(/Identificación:\s*([^\n\t]+)/i),
      movil: extract(/Móvil:\s*([0-9]*)/i),
      contrato: extract(/Contrato:\s*([0-9]*)/i),
      antiguedad: extract(/Antiguedad Línea:\s*([^M\t\s]+)/i).replace(/[^\d]/g, ''),
      comportamiento: extract(/Comportamiento Pago:\s*([^\n\t]+)/i),
      cartera: extract(/Estado Cartera:\s*([^\n\t]+)/i),
      // If we found a row with data, use its parts
      equipoSimulado: parts.length > 0 ? parts[0] : 'No encontrado',
      saldoADiferir: parts.length > 6 ? parts[6] : extract(/Saldo a Diferir\s+([^\n\t]+)/i),
      plazoSimulado: parts.length > 7 ? parts[7].replace(/[^\d]/g, '') : extract(/Cantidad de Cuotas\s+([^\n\t]+)/i),
      cuotaSimulada: parts.length > 8 ? parts[8] : extract(/Valor Cuota equipo mensual\s+([^\n\t]+)/i),
      valorTotal: parts.length > 6 ? parts[6] : extract(/Saldo a Diferir\s+([^\n\t]+)/i),
      valorIVA: parts.length > 2 ? parts[2] : extract(/Valor IVA\s+([^\n\t]+)/i),
      pagoInicial: parts.length > 5 ? parts[5] : extract(/Pago Inicial IVA incluido\s+([^\n\t]+)/i) || '$0',
    };

    // Clean up if it caught multiple numbers in plazo
    if (data.plazoSimulado && data.plazoSimulado.length > 2) {
        // Probably caught all options "6 12 18 24 36"
        // Try to find the one that is likely selected (last one before the quota?)
        // Or if it's "24", it's fine.
        const match = data.plazoSimulado.match(/(\d{1,2})$/);
        if (match) data.plazoSimulado = match[1];
    }

    if (data.nombre === 'No encontrado' && data.cc === 'No encontrado' && !simulatedRow) {
      alert("No se pudieron extraer los datos. Asegúrate de copiar el formato correcto de Poliedro.");
      return;
    }

    setPoliedroData(data);
    setClientInfo(prev => ({
      ...prev,
      nombre: data.nombre !== 'No encontrado' ? `${data.nombre} ${data.apellidos}` : prev.nombre,
      cc: data.cc !== 'No encontrado' ? data.cc : prev.cc,
      movil: data.movil !== 'No encontrado' ? data.movil : prev.movil
    }));
  };

  const realPrice = useMemo(() => {
    if (!selectedEquipment) return 0;
    let price = selectedEquipment.precio;
    if (poliedroData) {
      const seniority = parseInt(poliedroData.antiguedad);
      if (!isNaN(seniority) && seniority >= 24) {
        price = price * 0.92; // 8% discount
      }
    }
    return Math.round(price);
  }, [selectedEquipment, poliedroData]);

  const monthlyQuota = useMemo(() => {
    return Math.round(calculateMonthlyInstallment(realPrice, term));
  }, [realPrice, term]);

  const handleExportTxt = () => {
    trackMetric('sales', 1);
    const code = `TYT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const text = `
=========================================
      ORDEN DE VENTA - ${code}
=========================================
FECHA: ${new Date().toLocaleDateString()}
ASESOR: ${asesor}

DATOS DEL CLIENTE:
-----------------------------------------
NOMBRE: ${clientInfo.nombre}
CÉDULA: ${clientInfo.cc}
MÓVIL: ${clientInfo.movil || 'N/A'}
OCUPACIÓN: ${clientInfo.ocupacion || 'N/A'}

DETALLE DE VENTA:
-----------------------------------------
EQUIPO: ${selectedEquipment?.nombre}
MARCA: ${selectedEquipment?.marca}
CATEGORÍA: ${selectedEquipment?.categoria}
PRECIO BASE: ${formatCurrency(selectedEquipment?.precio || 0)}
DESCUENTO APLICADO: ${realPrice < (selectedEquipment?.precio || 0) ? '8% (Antigüedad > 24 meses)' : '0%'}
PRECIO FINAL: ${formatCurrency(realPrice)}

FINANCIACIÓN:
-----------------------------------------
PLAZO: ${term} MESES
CUOTA MENSUAL: ${formatCurrency(monthlyQuota)}
TASA MV: 2.09% (Fija)

AUTORIZACIONES Y SEGUROS:
-----------------------------------------
SEGURO CLARO UP OFRECIDO: ${claroUpOfrecido ? 'SI' : 'NO'}
CONTRATO ACEPTADO: SI
HABEAS DATA LEY 1581: SI
LECTURA DE GUION: SI

=========================================
VENTAS TECH TYT © 2026
=========================================
    `;
    
    downloadTxt(`Venta_${clientInfo.cc}_${code}.txt`, text.trim());
  };

  const resetAll = () => {
    setCurrentStep(1);
    setClientInfo({
      nombre: '',
      cc: '',
      movil: '',
      email: '',
      ocupacion: '',
      marcaPreferida: '',
      prioridades: [],
      direccion: '',
      usos: [],
      presupuestoMensual: 150000,
      paraQuien: 'Para mí',
      equipoActual: '',
      necesidad: ''
    });
    setClaroUpOfrecido(null);
    setSelectedEquipment(null);
    setTerm(24);
    setPoliedroRaw('');
    setPoliedroData(null);
    setSelectedObjection(null);
    setContractAccepted(false);
    setHabeasDataAccepted(false);
    setHabeasDataRead(false);
    setSearchQuery('');
    setSelectedCategory('TODOS');
    setSelectedBrand('TODOS');
    setSelectedDevice('TODOS');
  };

  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_DATA.filter(eq => {
      const matchesSearch = eq.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           eq.marca.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = selectedCategory === 'TODOS' || eq.categoria === selectedCategory;
      if (selectedCategory === 'TERMINAL') {
        matchesCategory = eq.categoria === 'SMARTPHONE';
      } else if (selectedCategory === 'TECNOLOGIA') {
        matchesCategory = eq.categoria !== 'SMARTPHONE';
      }

      const matchesBrand = selectedBrand === 'TODOS' || eq.marca === selectedBrand;
      const matchesDevice = selectedDevice === 'TODOS' || eq.nombre === selectedDevice;
      return matchesSearch && matchesCategory && matchesBrand && matchesDevice;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedDevice]);

  const brands = useMemo(() => {
    let filteredData = EQUIPMENT_DATA.filter(eq => {
      if (selectedCategory === 'TODOS') return true;
      if (selectedCategory === 'TERMINAL') {
        return eq.categoria === 'SMARTPHONE';
      }
      if (selectedCategory === 'TECNOLOGIA') {
        return eq.categoria !== 'SMARTPHONE' && matchesNecessity(eq.nombre, clientInfo.necesidad || '');
      }
      return eq.categoria === selectedCategory;
    });

    if (selectedCategory === 'TERMINAL') {
      const allowed = ['XIAOMI', 'VIVO', 'OPPO', 'SAMSUNG', 'HONOR', 'HUAWEI', 'MOTOROLA'];
      filteredData = filteredData.filter(eq => allowed.includes(eq.marca.toUpperCase()));
    }

    const bnds = new Set(filteredData.map(e => e.marca));
    return ['TODOS', ...Array.from(bnds).sort()];
  }, [selectedCategory, clientInfo.necesidad]);

  const categories = useMemo(() => {
    const cats = new Set(EQUIPMENT_DATA.filter(e => selectedBrand === 'TODOS' || e.marca === selectedBrand).map(e => e.categoria));
    return ['TODOS', ...Array.from(cats).sort()];
  }, [selectedBrand]);

  const deviceNames = useMemo(() => {
    const names = new Set(EQUIPMENT_DATA.filter(e => {
      const matchesBrand = selectedBrand === 'TODOS' || e.marca === selectedBrand;
      let matchesCategory = selectedCategory === 'TODOS' || e.categoria === selectedCategory;
      if (selectedCategory === 'TERMINAL') {
        matchesCategory = e.categoria === 'SMARTPHONE';
      } else if (selectedCategory === 'TECNOLOGIA') {
        matchesCategory = e.categoria !== 'SMARTPHONE' && matchesNecessity(e.nombre, clientInfo.necesidad || '');
      }
      return matchesBrand && matchesCategory;
    }).map(e => e.nombre));
    return ['TODOS', ...Array.from(names).sort()];
  }, [selectedBrand, selectedCategory, clientInfo.necesidad]);

  const recommendedEquipments = useMemo(() => {
    let baseFiltered = EQUIPMENT_DATA.filter(eq => {
      if (selectedCategory === 'TODOS') return true;
      if (selectedCategory === 'TERMINAL') return eq.categoria === 'SMARTPHONE';
      if (selectedCategory === 'TECNOLOGIA') return eq.categoria !== 'SMARTPHONE' && (clientInfo.necesidad ? matchesNecessity(eq.nombre, clientInfo.necesidad) : true);
      return eq.categoria === selectedCategory;
    });

    const scoredData = baseFiltered.map(eq => {
      let score = 0;
      let reason = '';
      
      const isTV = eq.categoria === 'TECNOLOGIA' && eq.nombre.toLowerCase().includes('tv');
      // Presupuesto por defecto es ahora 150000
      const budgetLimit = clientInfo.presupuestoMensual || 150000;
      const cuotaAprox = eq.precio * 0.06;
      
      if (clientInfo.marcaPreferida && eq.marca === clientInfo.marcaPreferida) score += 30;
      
      if (cuotaAprox <= budgetLimit) {
        score += 25;
        if (eq.precio >= 2000000) score += 40; // Dar más peso a ticket alto por el ARPU
        else if (eq.precio >= 1300000) score += 30;
        else if (eq.precio >= 800000) score += 15;
      } else {
        score -= 50;
      }

      if (clientInfo.prioridades.includes('Cámara') && eq.precio >= 1000000) score += 20;
      if (clientInfo.prioridades.includes('Precio') && eq.precio < 800000) score += 25;
      if (clientInfo.prioridades.includes('Batería') && (eq.marca === 'MOTOROLA' || eq.marca === 'XIAOMI')) score += 15;
      if (clientInfo.prioridades.includes('Velocidad') && eq.precio >= 1300000) score += 20;

      if (isTV) score += 20;

      if (isTV) {
        reason = "📺 Opción Estratégica: Combínalo o gánchatelo por el Día de las Madres / Deportes. Excelente ROI.";
      } else if (cuotaAprox > budgetLimit) {
         reason = "⚠️ Cuota excede el presupuesto actual acordado. Riesgo de objeción.";
      } else if (eq.precio >= 1300000 && clientInfo.prioridades.includes('Cámara')) {
        reason = `📸 Perfecto para ${clientInfo.paraQuien === 'Mi hijo(a)' ? 'su hijo' : 'alguien'} que valora la Cámara y busca estatus Premium.`;
      } else if (clientInfo.prioridades.includes('Precio')) {
        reason = `💸 Best-seller de costo/beneficio. Cuota estimada muy cómoda (~${formatCurrency(cuotaAprox)}/mes).`;
      } else if (clientInfo.marcaPreferida && eq.marca === clientInfo.marcaPreferida) {
        reason = `⚡ El match ideal de ${clientInfo.marcaPreferida} que potencia su ${clientInfo.ocupacion || 'estilo de vida'} con mejor rendimiento.`;
      } else if (eq.precio >= 1300000) {
        reason = `🚀 Equipo de alto rendimiento ideal para un(a) ${clientInfo.ocupacion || 'profesional'} exigente.`;
      } else {
        reason = `✅ Estabilidad y garantía comprobada. Un equipo de batalla confiable.`;
      }

      return { ...eq, score, reason, cuotaAprox };
    }).sort((a, b) => b.score - a.score);

    const distinctEquips = [];
    const seenBaseNames = new Set();
    
    for (const eq of scoredData) {
      if (distinctEquips.length >= 7) break;
      // Extract the first 3 words to determine similarity, this groups different colors of the same model
      const baseNameStr = eq.nombre.split(/[\s,]+/).slice(0, 3).join(' ').toLowerCase();
      if (!seenBaseNames.has(baseNameStr)) {
        seenBaseNames.add(baseNameStr);
        distinctEquips.push(eq);
      }
    }
    
    return distinctEquips;
  }, [clientInfo.presupuestoMensual, clientInfo.marcaPreferida, clientInfo.prioridades, clientInfo.paraQuien, clientInfo.equipoActual, clientInfo.ocupacion, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-20">
      {/* Header */}
      <header className="brand-gradient py-6 sticky top-0 z-50 shadow-lg print:hidden text-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CXD Logo" className="h-10 object-contain" />
            <h1 className="text-xl font-extrabold tracking-tighter italic uppercase">
              Asistente de Ventas TyT <span className="font-light opacity-80 uppercase text-[10px] tracking-widest ml-2 hidden sm:inline">V.Mayo.2026</span>
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowMetrics(true)} className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-all">
              <BarChart2 size={16} />
            </button>
            <div className="hidden md:flex gap-4 text-[10px] font-bold uppercase tracking-wider">
              <span className="bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">Tasa EA: 28.17%</span>
              <span className="bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">664 Equipos Activos</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 print:px-0">
        {/* Step Indicator Mobile */}
        <div className="md:hidden flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200 print:hidden">
          <button onClick={prevStep} disabled={currentStep === 1} className="p-2 text-slate-400 disabled:opacity-30"><ChevronLeft size={24}/></button>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-brand-magenta uppercase tracking-widest">Paso {currentStep} de {STEPS.length}</span>
            <span className="text-sm font-black text-slate-800">{STEPS.find(s => s.id === currentStep)?.title}</span>
          </div>
          <button onClick={nextStep} disabled={currentStep === STEPS.length} className="p-2 text-brand-blue disabled:opacity-30"><ChevronRight size={24}/></button>
        </div>

        {/* Step Indicator Desktop */}
        <div className="mb-12 hidden md:flex justify-between items-center print:hidden overflow-x-auto py-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <button 
                key={step.id} 
                onClick={() => goToStep(step.id)}
                className="flex flex-col items-center relative group min-w-[70px] cursor-pointer outline-none"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-brand-blue text-white ring-4 ring-blue-100' : 
                  isCompleted ? 'bg-brand-magenta text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[10px] mt-2 font-bold uppercase tracking-tighter text-center ${
                  isActive ? 'text-brand-blue' : isCompleted ? 'text-brand-magenta' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white print:shadow-none"
          >
            {/* STEP 1: WELCOME */}
            {currentStep === 1 && (
              <div className="space-y-8" id="step1">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-lg ring-1 ring-brand-blue/5">
                  <h2 className="text-slate-800 font-extrabold text-sm mb-4 uppercase tracking-widest flex items-center gap-2 border-b pb-3">
                     <Crown size={16} className="text-brand-magenta" /> Elevator Pitches de Impacto (Apertura)
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border-l-4 border-brand-blue rounded-r-lg hover:bg-blue-50 transition-colors">
                      <h3 className="text-[10px] uppercase font-bold text-brand-blue mb-2 tracking-wider">FOMO (Sentido de Urgencia)</h3>
                      <p className="text-xs leading-relaxed italic text-slate-700 font-medium">
                        "¡Hola {asesor ? 'le habla ' + asesor : ''}! Le escribo porque el sistema me acaba de arrojar una alerta con su número. Su línea fue seleccionada para una liberación de inventario a precio de bodega y sin cuota inicial. Este beneficio se cierra hoy mismo. ¿Qué marca de celular es su favorita para validarle opciones?"
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 border-l-4 border-brand-magenta rounded-r-lg hover:bg-magenta-50 transition-colors">
                      <h3 className="text-[10px] uppercase font-bold text-brand-magenta mb-2 tracking-wider">Fidelización y Beneficio</h3>
                      <p className="text-xs leading-relaxed italic text-slate-700 font-medium">
                        "¡Qué tal, buenas! {asesor ? 'Mi nombre es ' + asesor : ''}. Llamo a darle buenas noticias. Usted lleva un historial excelente y por eso hoy le damos luz verde para llevarse un equipo potente pagando lo de un equipo básico en su factura, 100% financiado. ¿Para quién sería el equipo, para usted o para alguien más en casa?"
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 border-l-4 border-brand-cyan rounded-r-lg hover:bg-cyan-50 transition-colors">
                      <h3 className="text-[10px] uppercase font-bold text-brand-cyan mb-2 tracking-wider">Dolor y Solución Directa</h3>
                      <p className="text-xs leading-relaxed italic text-slate-700 font-medium">
                        "¡Hola! {asesor ? 'Soy ' + asesor : ''}. Notamos que su línea ya tiene la antigüedad suficiente para el programa VIP. A veces uno se aguanta el celular lento o sin memoria, pero usted ya tiene listo el cupo para estrenar hoy mismo de tajada y sin papeles. ¿Cómo le está funcionando el celular que tiene actualmente?"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-w-md mx-auto">
                  <div className="glass-card p-8 space-y-4 shadow-xl border-t-4 border-t-brand-blue">
                    <div className="flex flex-col items-center mb-4 text-center">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                        <User size={32} className="text-brand-blue" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Registro de Cliente</h3>
                    </div>
                    <label className="input-label">Nombre del Titular</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-gray-50 border border-slate-200 rounded-xl focus:border-brand-blue focus:bg-white outline-none transition-all text-sm font-semibold"
                      placeholder="Ingrese el nombre completo..."
                      value={clientInfo.nombre}
                      onChange={(e) => setClientInfo({...clientInfo, nombre: e.target.value})}
                    />
                    <p className="text-[10px] text-slate-400 text-center italic">Este nombre se usará para la generación de la oferta y contrato.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PIT (Motivo) */}
            {currentStep === 2 && (
              <div className="space-y-8" id="step2">
                <div className="hormozi-box p-6 rounded-r-xl shadow-sm">
                  <p className="text-sm leading-relaxed italic text-slate-700 font-medium font-serif">
                    "No te pregunto tu presupuesto, te pregunto tus ambiciones. Como cliente preferencial, ya tienes autorizado un cupo tecnológico de alto impacto. Mi recomendación es ir por un Combo VIP; son los que mejores beneficios y productividad te entregan. ¿Te gustaría ver las ofertas de vanguardia?"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={() => {
                      setSelectedCategory('TERMINAL');
                      setSelectedBrand('TODOS');
                      setSelectedDevice('TODOS');
                      nextStep();
                    }}
                    className="p-8 glass-card border-none hover:shadow-xl hover:shadow-blue-100 transition-all flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Smartphone size={32} className="text-brand-blue" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-600">Terminales</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCategory('TECNOLOGIA');
                      setSelectedBrand('TODOS');
                      setSelectedDevice('TODOS');
                      nextStep();
                    }}
                    className="p-8 glass-card border-none hover:shadow-xl hover:shadow-magenta-100 transition-all flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-magenta-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Laptop size={32} className="text-brand-magenta" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-600">Tecnología</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedCategory('COMBO VIP');
                      setSelectedBrand('TODOS');
                      setSelectedDevice('TODOS');
                      nextStep();
                    }}
                    className="p-8 glass-card border-none hover:shadow-xl hover:shadow-cyan-100 transition-all flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Crown size={32} className="text-brand-blue" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-slate-600">Combos VIP</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SONDEO */}
            {currentStep === 3 && (
              <div className="space-y-10" id="step3">
                <div className="glass-card p-8 bg-white/90">
                  <h3 className="text-sm font-black mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-widest pb-4 border-b">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> 1. Entendiendo tu Perfil
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {selectedCategory === 'TECNOLOGIA' && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="input-label">¿Qué necesitas?</label>
                        <select 
                          className="w-full p-3 bg-gray-50 border border-slate-200 rounded-lg focus:border-brand-magenta outline-none text-sm font-semibold"
                          value={clientInfo.necesidad || ''}
                          onChange={(e) => setClientInfo({...clientInfo, necesidad: e.target.value})}
                        >
                          <option value="">Seleccionar una categoría...</option>
                          {TECNOLOGIA_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="input-label">¿Cuál es tu rol?</label>
                      <select 
                        className="w-full p-3 bg-gray-50 border border-slate-200 rounded-lg focus:border-brand-blue outline-none text-sm font-semibold"
                        value={clientInfo.ocupacion}
                        onChange={(e) => setClientInfo({...clientInfo, ocupacion: e.target.value})}
                      >
                        <option value="">Seleccionar...</option>
                        <option value="estudiante">👨‍🎓 Estudiante</option>
                        <option value="profesional">💼 Profesional</option>
                        <option value="empresario">🏢 Empresario</option>
                        <option value="creativo">🎬 Creativo</option>
                        <option value="hogar">🏠 Hogar</option>
                        <option value="gamer">🎮 Gamer</option>
                        <option value="jubilado">👴 Jubilado</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="input-label">¿Marca preferida?</label>
                      <select 
                        className="w-full p-3 bg-gray-50 border border-slate-200 rounded-lg focus:border-brand-magenta outline-none text-sm font-semibold"
                        value={clientInfo.marcaPreferida}
                        onChange={(e) => {
                          const val = e.target.value;
                          setClientInfo({...clientInfo, marcaPreferida: val});
                          if (val) setSelectedBrand(val);
                          else setSelectedBrand('TODOS');
                        }}
                      >
                        <option value="">Cualquiera</option>
                        {brands.filter(b => b !== 'TODOS').map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 glass-card p-8 bg-white/90">
                  <h3 className="text-sm font-black mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-widest pb-4 border-b">
                     2. Factor de Decisión
                  </h3>

                  <div className="space-y-4 mb-6">
                    <label className="input-label">¿Qué es lo que MÁS valora el cliente hoy? (Seleccione varias)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Cámara', 'Batería', 'Velocidad', 'Precio', 'Productividad/IA', 'Diseño', 'Memoria'].map(p => (
                        <button
                          key={p}
                          onClick={() => {
                            const exists = clientInfo.prioridades.includes(p);
                            setClientInfo({
                              ...clientInfo, 
                              prioridades: exists 
                                ? clientInfo.prioridades.filter(x => x !== p) 
                                : [...clientInfo.prioridades, p]
                            });
                          }}
                          className={`p-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all border text-center ${
                            clientInfo.prioridades.includes(p) 
                            ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="input-label block">¿Para quién es el equipo?</label>
                        <select 
                          className="w-full form-input"
                          value={clientInfo.paraQuien}
                          onChange={(e) => setClientInfo({...clientInfo, paraQuien: e.target.value})}
                        >
                          <option value="Para mí">Para mí</option>
                          <option value="Mi hijo(a)">Para mi hijo(a)</option>
                          <option value="Mi pareja">Para mi pareja</option>
                          <option value="Familiar cercano">Familiar cercano</option>
                          <option value="Es un regalo">Es un regalo</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="input-label block">¿Qué celular tiene actualmente?</label>
                        <input 
                          type="text"
                          className="w-full form-input bg-white"
                          placeholder="Ej: Samsung A12, iPhone 11..."
                          value={clientInfo.equipoActual}
                          onChange={(e) => setClientInfo({...clientInfo, equipoActual: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-end mb-2">
                        <label className="input-label mb-0">Presupuesto Mensual Acordado</label>
                        <span className="text-brand-magenta font-black text-lg bg-brand-magenta/10 px-3 py-1 rounded">
                          {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(clientInfo.presupuestoMensual!)} / mes
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="15000"
                        max="150000"
                        step="5000"
                        className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-brand-magenta"
                        value={clientInfo.presupuestoMensual}
                        onChange={(e) => setClientInfo({...clientInfo, presupuestoMensual: Number(e.target.value)})}
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
                        <span>$15.000</span>
                        <span>$150.000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CATALOGO */}
            {currentStep === 4 && (
              <div className="space-y-6" id="step4">
                {recommendedEquipments.length > 0 && (
                <div className="bg-brand-magenta/5 border border-brand-magenta/20 p-6 rounded-2xl mb-8">
                  <h3 className="text-brand-magenta font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2 border-b border-brand-magenta/10 pb-3">
                    <Star size={16} /> Recomendador de Inteligencia Artificial: Top 7 Opciones Estratégicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {recommendedEquipments.map((eq, i) => (
                        <div 
                          key={`${eq.nombre}-${i}`}
                          onClick={() => {
                            setSelectedEquipment(eq as Equipment);
                            trackMetric('topEquipment', eq.nombre);
                          }}
                          className={`p-4 rounded-xl shadow-sm cursor-pointer border transition-all flex flex-col justify-between ${
                            i === 0 ? 'bg-gradient-to-br from-brand-magenta/10 to-brand-cyan/10 border-brand-magenta shadow-md ring-1 ring-brand-magenta/30 scale-[1.02]' 
                            : 'bg-white border-slate-200 hover:shadow-md hover:border-brand-magenta/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2 text-slate-400">
                                <Smartphone size={16} />
                                {i === 0 && <span className="bg-brand-magenta text-white text-[8px] font-black px-2 py-0.5 rounded uppercase">#1 Match</span>}
                             </div>
                             <span className="text-slate-900 font-black text-xs text-right whitespace-nowrap">
                               {formatCurrency(eq.precio)}
                             </span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-800 leading-tight mb-2 h-8">{eq.nombre}</p>
                          <div className="mt-auto bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col gap-2">
                            <p className="text-[9px] text-slate-600 italic font-medium leading-relaxed mb-1">
                              {eq.reason}
                            </p>
                            <div className="space-y-1 border-t border-slate-200 pt-1">
                              {generateSpecs(eq).slice(0,3).map((spec, sidx) => (
                                <p key={sidx} className="text-[8px] text-slate-500 leading-tight">
                                  <span className="font-bold text-slate-700">{spec.label}:</span> {spec.value}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                )}

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Search size={14} className="text-brand-blue" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filtrado Inteligente de Portafolio</span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Marca</label>
                      <select 
                        className="w-full p-2.5 border border-slate-200 rounded-lg text-xs bg-gray-50 font-bold text-slate-800"
                        value={selectedBrand}
                        onChange={(e) => {
                          setSelectedBrand(e.target.value);
                          setSelectedCategory('TODOS');
                          setSelectedDevice('TODOS');
                        }}
                      >
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Categoría</label>
                      <select 
                        className="w-full p-2.5 border border-slate-200 rounded-lg text-xs bg-gray-50 font-bold text-slate-800"
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedDevice('TODOS');
                        }}
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Equipos Terminales / Tecnología</label>
                      <select 
                        className="w-full p-2.5 border border-slate-200 rounded-lg text-xs bg-gray-50 font-bold text-slate-800"
                        value={selectedDevice}
                        onChange={(e) => {
                          const deviceName = e.target.value;
                          setSelectedDevice(deviceName);
                          if (deviceName !== 'TODOS') {
                            const eq = EQUIPMENT_DATA.find(x => x.nombre === deviceName);
                            if (eq) {
                              setSelectedEquipment(eq);
                              // Auto-select first available term if current isn't valid
                              const defaultPlazos = [24, 18, 12, 6, 36];
                              const plazos = getAvailableTerms(eq);
                              const firstValid = defaultPlazos.find(p => plazos.includes(p)) || plazos[0];
                              if (!plazos.includes(term)) {
                                setTerm(firstValid);
                              }
                            }
                          }
                        }}
                      >
                        {deviceNames.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <Search className="absolute left-3 top-[calc(50%+4px)] -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text"
                      placeholder="Busqueda rápida por nombre..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Catalog Table Header */}
                <div className="px-6 py-3 bg-slate-100 rounded-t-xl border-b border-slate-200 grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Marca</div>
                  <div className="col-span-3 text-[9px] font-black text-slate-500 uppercase tracking-widest">Categoría</div>
                  <div className="col-span-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">Equipo y Especificaciones</div>
                </div>

                <div className="grid gap-0 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-x border-b border-slate-100 rounded-b-xl shadow-inner bg-slate-50/30">
                  {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((eq, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedEquipment(eq)}
                        className={`grid grid-cols-12 gap-4 p-4 border-b border-slate-100 transition-all group text-left items-center ${
                          selectedEquipment?.nombre === eq.nombre 
                          ? 'ring-2 ring-brand-blue bg-blue-50 z-10' 
                          : 'bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="col-span-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {eq.marca}
                        </div>
                        <div className="col-span-3 text-[10px] font-bold text-slate-600">
                          {eq.categoria}
                        </div>
                        <div className="col-span-6 space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800 text-sm">{eq.nombre}</h4>
                            <p className="text-sm font-black text-slate-900 font-mono ml-2 whitespace-nowrap">{formatCurrency(eq.precio)}</p>
                          </div>
                          {eq.specs && (
                            <div className="flex flex-wrap gap-1.5">
                              {eq.specs.map((spec, idx) => (
                                <span key={idx} className="bg-slate-100 text-slate-500 text-[8px] font-bold uppercase py-0.5 px-2 rounded border border-slate-200/50">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-12 text-center text-slate-400 text-sm italic">
                      No se encontraron equipos con los filtros seleccionados.
                    </div>
                  )}
                </div>

                {selectedEquipment && (() => {
                  const brandPitches = PITCHES_POR_MARCA[selectedEquipment.marca] || PITCHES_POR_MARCA[selectedEquipment.categoria === 'TECNOLOGIA' ? 'TECNOLOGIA' : 'DEFAULT'];
                  const priorities = clientInfo.prioridades.length > 0 ? clientInfo.prioridades : [Object.keys(brandPitches[0].beneficios)[0]];
                  
                  return (
                    <motion.div 
                      key={selectedEquipment.nombre}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 pt-4"
                    >
                      <div className="p-5 brand-gradient rounded-xl text-white shadow-lg flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Equipo Seleccionado:</span>
                          <h3 className="text-2xl font-black">{selectedEquipment.nombre}</h3>
                        </div>
                        <CheckCircle2 size={32} className="opacity-40" />
                      </div>

                      {/* Características más comunes/relevantes */}
                      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
                        <h4 className="text-xs font-black uppercase text-slate-700 mb-4 tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
                          <Star size={16} className="text-yellow-500" /> Características Clave de este equipo
                        </h4>
                        <div className="text-xs text-slate-600 leading-relaxed space-y-4">
                          {generateSpecs(selectedEquipment).map((spec, idx) => (
                            <div key={idx}>
                              <strong className="text-brand-magenta uppercase tracking-wider">{spec.label}:</strong> {spec.value}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Elevator Pitches Sugeridos */}
                      <div className="p-6 bg-white border border-brand-blue/20 rounded-xl shadow-lg ring-1 ring-brand-blue/10">
                         <h4 className="text-sm font-black uppercase text-brand-blue mb-4 tracking-widest flex items-center gap-2">
                           <MessageSquare size={16} /> Elevator Pitches sugeridos (Cierre)
                         </h4>
                         <div className="space-y-3">
                           {brandPitches.map((pitch, idx) => (
                             <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-lg hover:border-brand-magenta/30 transition-colors cursor-default">
                               <p className="text-xs font-semibold italic text-slate-800">
                                 "{pitch.gancho.replace(/\[OCUPACION\]/g, clientInfo.ocupacion || 'cliente')}"
                               </p>
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* Cierre Definitivo */}
                      <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-inner">
                        <h4 className="text-sm font-black uppercase text-green-700 mb-2 tracking-widest">
                          💰 Cierre Comercial Definitivo (Matador)
                        </h4>
                        <p className="text-sm font-bold text-slate-700 italic leading-relaxed">
                          "Señor(a) {clientInfo.nombre || 'Cliente'}, no le estoy ofreciendo un simple celular, le estoy entregando una herramienta perfecta {clientInfo.paraQuien === 'Mi hijo(a)' ? 'para que su hijo(a) tenga lo mejor para estudiar y rendir' : clientInfo.paraQuien === 'Es un regalo' ? 'para que se luzcan con ese regalo espectacular' : 'para lo que usted hace'} como <strong className="text-green-700 uppercase">{clientInfo.ocupacion || 'profesional'}</strong>. Este {selectedEquipment.nombre} resuelve su necesidad de <strong className="uppercase">{priorities.join(' y ')}</strong> de tajo. 
                          {clientInfo.equipoActual && <><br/><br/>Si usted viene de un <strong>{clientInfo.equipoActual}</strong>, la diferencia con este {selectedEquipment.nombre} es como pasar de un Renault a un BMW.</>}
                          <br/><br/>
                          No va a encontrar una tecnología tan completa y pagando menos de {formatCurrency(clientInfo.presupuestoMensual || 150000)} mensuales en otro lado. ¿Lo empacamos en su factura y le valido la dirección de entrega?"
                        </p>
                      </div>
                    </motion.div>
                  );
                })()}
              </div>
            )}

            {/* STEP 5: CALCULADORA */}
            {currentStep === 5 && selectedEquipment && (
              <div className="grid md:grid-cols-2 gap-10" id="step5">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="input-label flex items-center gap-2">
                       <Clock size={12} className="text-brand-blue" /> Plazo de financiación
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[6, 12, 18, 24, 36].map(m => {
                        const plazos = getAvailableTerms(selectedEquipment);
                        const isAvailable = plazos.includes(m);
                        return (
                          <div key={m} className="flex flex-col items-center gap-1">
                            <button
                              disabled={!isAvailable}
                              onClick={() => setTerm(m)}
                              className={`w-full py-3 rounded-lg font-bold text-[10px] uppercase transition-all border ${
                                !isAvailable ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' :
                                term === m ? 'bg-brand-blue text-white border-brand-blue shadow-md' : 'bg-white border-slate-200 text-slate-500'
                              }`}
                            >
                              {m}M
                            </button>
                            {!isAvailable && (
                              <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">No aplica</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {!getAvailableTerms(selectedEquipment).includes(term) && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
                       <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider flex items-center gap-2">
                         <Clock size={10} /> Plazo no disponible
                       </p>
                       <p className="text-xs text-red-500 italic">El plazo de {term}M no aplica para este equipo a su precio actual. Seleccione uno habilitado.</p>
                    </div>
                  )}

                  <div className="hormozi-box p-6 bg-blue-50/30 rounded-xl">
                    <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-widest">Información de Venta</p>
                    <p className="text-sm font-medium text-slate-600 italic">
                      "Para este equipo, el sistema recomienda un plazo de {term} meses para mantener el equilibrio entre tecnología y flujo de caja."
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl flex flex-col justify-between border-t border-white/10">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
                      <span>Precio del Equipo</span>
                      <span className="font-bold text-white font-mono text-sm">{formatCurrency(realPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400 text-[10px] uppercase font-bold">
                      <span>Monto Total Financiado</span>
                      <span className="font-bold text-white font-mono text-sm">{formatCurrency(realPrice)}</span>
                    </div>
                  </div>

                  <div className="text-center pt-8 border-t border-white/5 mt-8">
                    <p className="text-[10px] uppercase text-slate-500 mb-2 font-bold tracking-widest italic">Cuota Mensual Final</p>
                    <p className="text-4xl font-black text-brand-cyan italic font-mono">{formatCurrency(monthlyQuota)}</p>
                    <div className="mt-6 flex flex-col gap-2 items-center">
                      <div className="inline-block bg-white/5 px-4 py-2 rounded-full">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tasa MV: 2.09% • Fija</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                     <ShieldCheck size={14} /> Condiciones Legales y Financieras
                  </p>
                  <ul className="text-[10px] text-slate-600 space-y-2 list-disc pl-5">
                    <li>Los precios anteriores aplican para venta de contado o a crédito.</li>
                    <li>La venta a crédito aplica bajo la modalidad de cuota fija a la tasa de interés del 28,17% Efectiva Anual (E.A.), equivalente al 2,09% Mes Vencido (M.V.).</li>
                    <li>La tasa máxima legal vigente establecida por la Superintendencia Financiera para el periodo del 1 al 31 de mayo es 28,17%.</li>
                    <li>De conformidad con la Ley 2010 de 2019, las patinetas eléctricas aplica exclusión de IVA hasta las 50 UVTs.</li>
                    <li>De acuerdo al equipo, los plazos a diferir a cuotas son 6, 12, 18, 24 y 36 meses.</li>
                    <li>Venta a crédito aplica únicamente para antigüedad mayor a 12 meses y está sujeta a políticas de crédito (excepciones solo por módulo de crédito).</li>
                  </ul>
                </div>
              </div>
            )}

            {/* STEP 6: OBJECIONES */}
            {currentStep === 6 && (
              <div className="space-y-8" id="step6">
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(OBJECTIONS).map(([key, obj]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedObjection(key);
                        trackMetric('objectionsViewed', 1);
                      }}
                      className={`p-4 glass-card border-none text-left transition-all flex items-center gap-4 group ${
                        selectedObjection === key ? 'bg-brand-magenta text-white shadow-lg shadow-magenta-100' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xl p-2 rounded-lg bg-slate-100 transition-colors ${selectedObjection === key ? 'bg-white/20' : ''}`}>{obj.icon}</span>
                      <span className={`font-bold text-[10px] uppercase tracking-wider ${selectedObjection === key ? 'text-white' : 'text-slate-600'}`}>{obj.title}</span>
                    </button>
                  ))}
                </div>

                {selectedObjection && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="hormozi-box p-4 rounded-r-lg">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-black text-[9px] text-brand-blue uppercase tracking-widest italic flex items-center gap-2 underline decoration-2">
                          <CheckCircle2 size={10} /> Reframing Persuasivo
                        </p>
                        {OBJECTIONS[selectedObjection].responses.personaResponses?.[clientInfo.ocupacion] && (
                          <span className="bg-brand-blue/10 text-brand-blue text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-brand-blue/20 animate-pulse">
                            Enfoque {clientInfo.ocupacion}
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-slate-700 font-medium">
                        {(() => {
                          const obj = OBJECTIONS[selectedObjection];
                          const persona = clientInfo.ocupacion;
                          let r1 = obj.responses.personaResponses?.[persona]?.r1 || obj.responses.r1;
                          
                          if (selectedObjection === 'cuotas' && monthlyQuota) {
                             const diario = Math.round(monthlyQuota / 30);
                             let comparacion = "un antojo rápido";
                             if (diario < 1000) comparacion = "un chicle";
                             else if (diario < 2500) comparacion = "un tinto o café";
                             else if (diario <= 5000) comparacion = "un bocadillo o almuerzo corriente";
                             
                             r1 = `Si dividimos el costo mensual, hablamos de solo ${formatCurrency(diario)} pesos diarios. ¡Eso es literalmente menos que lo que cuesta ${comparacion}! ¿No vale su productividad y conectividad hoy en día mucho más que eso? La mayoría de nuestros clientes recuperan el valor de la cuota con la pura eficiencia que les da el nuevo equipo.`;
                          }
                          
                          if (selectedObjection === 'ahora_no' && selectedEquipment && selectedEquipment.precio >= 1000000) {
                            r1 = `Lo entiendo, pero ojo: este ${selectedEquipment.nombre} tiene stock súper limitado en nuestras bodegas por ser gama premium, y el cupo sin cuota inicial que le aprobó el sistema tiene vigencia limitada para el día de hoy. Si lo dejamos pasar, nos arriesgamos a que mañana le pidan dinero por adelantado o se agote.`;
                          }

                          if (selectedObjection === 'otro_operador' && poliedroData?.antiguedad) {
                             r1 = `Usted ya lleva ${poliedroData.antiguedad} construyendo confianza con nosotros. Ese tiempo es el que hoy le abrió las puertas a este cupo VIP sin cuotas iniciales ni trámites. En otro operador, tocaría empezar de cero y hacer fila como cliente nuevo para rogar por un equipo básico. Aquí ya es de la casa.`;
                          }
                          
                          return r1;
                        })()}
                      </p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                      <p className="font-black text-[9px] text-slate-500 uppercase mb-1 tracking-widest italic">Psicología de Inversión</p>
                      <p className="text-xs leading-relaxed text-slate-600">
                        "{(() => {
                           const obj = OBJECTIONS[selectedObjection];
                           const persona = clientInfo.ocupacion;
                           return obj.responses.personaResponses?.[persona]?.r2 || obj.responses.r2;
                        })()}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 7: CLARO UP */}
            {currentStep === 7 && (
              <div className="space-y-8" id="step7">
                <div className="bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-500 p-8 rounded-3xl shadow-2xl text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-500/30 rounded-xl backdrop-blur-md">
                      <ShieldCheck size={28} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider">¡Protege el equipo con Claro UP!</h2>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Guiones & Pitch */}
                    <div className="space-y-4">
                      <div className="bg-red-900/40 p-6 rounded-2xl border border-red-500/50 h-full">
                        <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-red-200">Pitch Ganador 🚀</h3>
                        <p className="text-sm leading-relaxed italic font-medium mb-4">
                          "Sr(a). {clientInfo.nombre}, usted se está llevando un excelente {selectedEquipment?.nombre}, pero no estamos aquí para subir el precio del dispositivo; estamos aquí para bajar el costo del desastre. Por menos del valor de un café a la semana, su equipo queda totalmente protegido contra robo, hurto calificado y daños. ¿Se lo incluyo para que salga protegido desde el primer día?"
                        </p>
                        <h3 className="text-xs font-bold mb-2 uppercase tracking-widest text-red-200 mt-4 border-t border-red-500/30 pt-4">Guion Formal (Aceptación)</h3>
                        <p className="text-xs leading-relaxed italic text-slate-200">
                          "Le comento que Claro UP es un seguro que le cubre en caso de Daño físico, Hurto y/o hurto calificado, y Falla eléctrica (una vez expirada la garantía). En caso de siniestro usted pagará un deducible del 25% para daños y 40% para hurto. La prima es mensual y cargada a su factura. ¿Está de acuerdo?"
                        </p>
                      </div>
                    </div>
                    
                    {/* Infografia Precios y Deducibles */}
                    <div className="space-y-4">
                      <div className="bg-white text-slate-800 p-5 rounded-2xl shadow-lg">
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-600 mb-3 text-center">Tabla de Primas Mensuales</h3>
                        <div className="overflow-hidden rounded-lg border border-slate-200">
                          <table className="w-full text-[10px] text-center">
                            <thead className="bg-red-50 text-red-700 font-bold uppercase">
                              <tr>
                                <th className="p-2">Valor del Equipo</th>
                                <th className="p-2">Prima Mensual</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100">
                                <td className="p-2 font-medium">De $200K a $500K</td>
                                <td className="p-2 font-black">$16.000</td>
                              </tr>
                              <tr className="border-b border-slate-100 bg-slate-50">
                                <td className="p-2 font-medium">De $500K a $1.25M</td>
                                <td className="p-2 font-black">$22.500</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="p-2 font-medium">De $1.25M a $1.75M</td>
                                <td className="p-2 font-black">$32.000</td>
                              </tr>
                              <tr className="bg-slate-50">
                                <td className="p-2 font-medium">Más de $1.75M</td>
                                <td className="p-2 font-black">$38.000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="bg-white text-slate-800 p-5 rounded-2xl shadow-lg">
                         <h3 className="text-xs font-black uppercase tracking-widest text-red-600 mb-3 text-center">Coberturas y Deducibles</h3>
                         <div className="grid grid-cols-2 gap-2 text-[10px]">
                           <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                             <div className="font-bold text-red-700 mb-1">Daño Físico / Falla</div>
                             <div className="text-slate-600">Deducible: <span className="font-black text-slate-800">25%</span></div>
                           </div>
                           <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                             <div className="font-bold text-red-700 mb-1">Hurto / Hurto Calif.</div>
                             <div className="text-slate-600">Deducible: <span className="font-black text-slate-800">40%</span></div>
                           </div>
                         </div>
                         <p className="text-[9px] text-center mt-3 font-semibold text-slate-500 italic">Cubre hasta 2 siniestros en 12 meses. Atención oportuna en 2 a 5 días con envío a domicilio (previo pago de deducible).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white text-slate-800 p-6 rounded-2xl">
                     <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-center border-b pb-4">Cierre de Venta Claro UP</h3>
                     <p className="text-center text-xs font-bold mb-6 italic text-slate-500">Obligatorio registrar si se ofreció al cliente</p>
                     <div className="flex gap-4 max-w-lg mx-auto">
                       <button 
                         onClick={() => setClaroUpOfrecido(true)}
                         className={`flex-1 p-4 rounded-xl border-2 font-black uppercase tracking-widest transition-all ${
                           claroUpOfrecido === true ? 'bg-green-100 border-green-500 text-green-700 shadow-inner' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-green-50'
                         }`}
                       >
                          ✅ Sí Ofrecí y Aceptó
                       </button>
                       <button 
                         onClick={() => setClaroUpOfrecido(false)}
                         className={`flex-1 p-4 rounded-xl border-2 font-black uppercase tracking-widest transition-all ${
                           claroUpOfrecido === false ? 'bg-red-100 border-red-500 text-red-700 shadow-inner' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-red-50'
                         }`}
                       >
                          ❌ No Aceptó
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: HABEAS DATA */}
            {currentStep === 8 && (
              <div className="space-y-8" id="step8">
                <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl shadow-lg border-t-8 border-t-brand-magenta">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-magenta-50 rounded-lg">
                      <MessageSquare size={24} className="text-brand-magenta" />
                    </div>
                    <h2 className="text-lg font-black uppercase tracking-wider text-slate-800">Guion Habeas Data (Lectura Obligatoria)</h2>
                  </div>
                  
                  <div className="space-y-6 font-serif text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-brand-blue flex items-center gap-2">
                        <ShieldCheck size={20} /> HABEAS DATA
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Sr(a) <span className="font-bold underline">{clientInfo.nombre || '________________'}</span> con el fin de continuar con la propuesta comercial de los servicios de <span className="font-bold">T&T</span> informado, hoy <span className="font-bold underline">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>, autoriza a <span className="font-bold text-red-600 uppercase">CLARO</span>, para consultar sus datos personales ante cualquier entidad de información con el fin de validar su comportamiento y crédito comercial, hábito de pago y en general el cumplimiento de sus obligaciones comerciales y pecuniarias, así como el tratamiento de sus datos personales, según lo dispuesto en la <span className="font-bold">Ley 1266 de 2008 y Ley 1581 de 2012</span>.
                      </p>
                      <p className="text-lg font-black text-center py-2 bg-white border rounded shadow-sm">
                        ¿Acepta Ud.? <span className="text-brand-magenta">SI O NO</span>
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-200 space-y-4">
                      <h3 className="text-xl font-black text-brand-magenta flex items-center gap-2">
                        <MessageSquare size={20} /> LEY 2300
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Señor(a), ¿Me autoriza a contactarlo a través de <span className="font-bold">Mensaje de texto, WhatsApp o vía llamada telefónica</span> en caso de que la llamada finalice?
                      </p>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-[10px] font-bold text-yellow-700 italic">
                        (Este guión es de manera obligatoria en todas las llamadas, evite llamados de atención y procesos disciplinarios).
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4 bg-slate-900 text-white p-6 rounded-2xl transform hover:scale-[1.02] transition-all">
                    <input 
                      type="checkbox" 
                      id="habeas_check"
                      checked={habeasDataRead} 
                      onChange={(e) => setHabeasDataRead(e.target.checked)} 
                      className="w-8 h-8 rounded border-white/20 text-brand-magenta focus:ring-brand-magenta"
                    />
                    <label htmlFor="habeas_check" className="text-xs font-black uppercase tracking-[0.2em] cursor-pointer">
                      He realizado la lectura literal y el cliente ACEPTA
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                  <HelpCircle size={20} className="text-brand-blue shrink-0" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase">TIP: Esta grabación es el respaldo legal más importante para evitar reversiones futuras.</p>
                </div>
              </div>
            )}

            {/* STEP 9: POLIEDRO */}
            {currentStep === 9 && (
              <div className="space-y-8" id="step9">
                <div className="bg-slate-900 p-8 rounded-3xl shadow-xl">
                  <h3 className="text-xs font-black uppercase mb-4 text-brand-cyan tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> Inteligencia Poliedro 
                  </h3>
                  <textarea 
                    className="w-full h-40 bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-green-400 outline-none focus:ring-1 ring-brand-cyan transition-all"
                    placeholder="Pega aquí los datos de Poliedro..."
                    value={poliedroRaw}
                    onChange={(e) => setPoliedroRaw(e.target.value)}
                  />
                  <button 
                    onClick={handlePoliedroExtraction}
                    className="w-full mt-4 brand-gradient text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-cyan-900/20 active:scale-95 transition-all"
                  >
                    Realizar Extracción de Datos
                  </button>
                </div>

                {poliedroData && (
                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 glass-card p-6 border-slate-200">
                      <p className="input-label border-b pb-2 mb-4">Información del Sistema</p>
                      <div className="grid grid-cols-2 gap-6 text-[11px] font-semibold text-slate-600">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Nombre</p>
                          <p className="font-mono text-slate-800">{poliedroData.nombre} {poliedroData.apellidos}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Cédula</p>
                          <p className="font-mono text-slate-800">{poliedroData.cc}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Antigüedad</p>
                          <p className="font-mono text-slate-800">{poliedroData.antiguedad} Meses</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Estado de Pago</p>
                          <p className="font-mono text-brand-blue">{poliedroData.comportamiento}</p>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-4 bg-brand-magenta p-6 rounded-3xl text-white flex flex-col items-center justify-center shadow-xl shadow-magenta-100">
                      <p className="text-[8px] font-black uppercase tracking-[0.3em] mb-2 opacity-80">Discount Elite</p>
                      <p className="text-5xl font-black italic font-mono">{parseInt(poliedroData.antiguedad) >= 24 ? '8%' : '0%'}</p>
                      <p className="text-[8px] mt-2 font-bold uppercase opacity-80">Aplicado al precio base</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 10: VALIDACION DIRECCION */}
            {currentStep === 10 && (
              <div className="space-y-8" id="step10">
                <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-brand-blue">
                  <h3 className="text-xl font-black mb-6 text-slate-800 flex items-center gap-2 uppercase tracking-widest border-b pb-4">
                     <MapPin size={24} className="text-brand-blue" /> Validación de Entrega
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <label className="input-label mb-4 block">Dirección de Entrega (Exacta)</label>
                      <input 
                        type="text" 
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:border-brand-blue outline-none transition-all text-sm font-semibold shadow-sm"
                        placeholder="Ej: Calle 123 # 45-67, Apto 890, Conjunto XYZ..."
                        value={clientInfo.direccion}
                        onChange={(e) => setClientInfo({...clientInfo, direccion: e.target.value})}
                      />
                      
                      {clientInfo.direccion && (
                        <div className="mt-6 space-y-4">
                          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                            <iframe 
                              width="100%" 
                              height="300" 
                              style={{border:0}}
                              loading="lazy"
                              allowFullScreen
                              referrerPolicy="no-referrer-when-downgrade" 
                              src={`https://maps.google.com/maps?q=${encodeURIComponent(clientInfo.direccion)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            ></iframe>
                          </div>
                          <div className="flex gap-4">
                            <button 
                              onClick={nextStep}
                              className="flex-1 p-4 rounded-xl bg-green-500 text-white font-black text-[10px] uppercase tracking-widest text-center shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 size={16} /> Dirección Confirmada
                            </button>
                            <button 
                              onClick={() => {
                                setClientInfo({...clientInfo, direccion: ''});
                                showToast("Por favor corrija la dirección", 'error');
                              }}
                              className="flex-1 p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 font-black text-[10px] uppercase tracking-widest text-center shadow-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                            >
                              <RotateCcw size={16} /> Dirección Incorrecta
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 11: RESUMEN VERBAL */}
            {currentStep === 11 && (
              <div className="space-y-8" id="step11">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan"></div>
                  <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="text-brand-cyan" size={18} /> Validación de Cierre (Checklist Verbal)
                  </h3>
                  
                  <div className="bg-cyan-50/50 p-6 rounded-xl border border-cyan-100">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium" id="resumen-verbal-texto">
                      "Señor(a) <strong className="uppercase">{clientInfo.nombre || '[Nombre]'}</strong>, perfecto. Entonces para confirmar lo que acordamos: se lleva el <strong>{poliedroData?.equipoSimulado || selectedEquipment?.nombre || '[Equipo]'}</strong> de <strong>{selectedEquipment?.marca || '[Marca]'}</strong>, financiado a <strong>{term}</strong> meses con una cuota de <strong>{formatCurrency(monthlyQuota)}</strong> mensuales en su factura, sin cuota inicial. {claroUpOfrecido ? 'Con seguro Claro UP incluido para su tranquilidad.' : 'Sin seguro, aunque recuerde que puede activarlo después.'} La entrega será en la dirección <strong>{clientInfo.direccion || '[Dirección]'}</strong>. ¿Todo correcto? Procedemos con la validación legal."
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => {
                        const texto = document.getElementById('resumen-verbal-texto')?.innerText;
                        if(texto) {
                          navigator.clipboard.writeText(texto);
                          showToast("Resumen copiado al portapapeles para pegar en SGA/CRM.", 'success');
                        }
                      }}
                      className="px-6 py-3 bg-white border border-brand-blue text-brand-blue rounded-xl font-black uppercase text-[10px] tracking-widest shadow-sm hover:bg-brand-blue hover:text-white transition-all flex items-center gap-2"
                    >
                      <FileText size={14} /> Copiar para CRM
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 12: CONTRATO */}
            {currentStep === 12 && (
              <div className="space-y-8" id="step12">
                <div className="bg-white border border-slate-200 p-8 rounded-xl max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner">
                  <div className="contract-viewer text-[10px] leading-relaxed text-slate-500 font-serif">
                    <ContractText 
                      data={{
                        nombre: clientInfo.nombre,
                        cc: clientInfo.cc,
                        equipo: poliedroData?.equipoSimulado || selectedEquipment?.nombre || '',
                        marca: selectedEquipment?.marca || '',
                        asesor: asesor
                      }} 
                      poliedroData={poliedroData} 
                    />
                  </div>
                </div>

                <div className="glass-card p-6 space-y-4">
                  <div className="flex gap-4 items-center">
                    <input type="checkbox" checked={contractAccepted} onChange={(e) => setContractAccepted(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue" />
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest cursor-pointer">He leído y explicado plenamente el contrato</label>
                  </div>
                  <div className="flex gap-4 items-center border-t border-slate-100 pt-4">
                    <input type="checkbox" checked={habeasDataAccepted} onChange={(e) => setHabeasDataAccepted(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-brand-magenta focus:ring-brand-magenta" />
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest cursor-pointer">Consentimiento Habeas Data (Ley 1581/2012)</label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 13: RESUMEN */}
            {currentStep === 13 && (
              <div className="space-y-8" id="step13">
                <div className="glass-card overflow-hidden border-2 border-brand-blue translate-y-0 shadow-2xl">
                  <div className="brand-gradient p-6 text-white text-center">
                    <h2 className="text-lg font-black uppercase italic tracking-[0.3em]">Orden de Despacho Digital</h2>
                  </div>
                  <div className="p-10 grid md:grid-cols-2 gap-10 font-bold uppercase">
                    <div className="space-y-6">
                      <div>
                        <p className="text-[8px] text-slate-400 mb-1 tracking-widest">Titular de Operación</p>
                        <p className="text-sm text-slate-800 font-mono tracking-tighter">{clientInfo.nombre}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400 mb-1 tracking-widest">Documento ID</p>
                        <p className="text-sm text-slate-800 font-mono tracking-tighter">{clientInfo.cc}</p>
                      </div>
                      <div className="p-4 bg-magenta-50 rounded-xl border border-magenta-100">
                        <p className="text-[8px] text-brand-magenta mb-1 tracking-widest">Proyección Financiera</p>
                        <p className="text-sm text-brand-magenta font-mono">{term} MESES • {formatCurrency(monthlyQuota)}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-[8px] text-slate-400 mb-1 tracking-widest">Dispositivo Vinculado</p>
                        <p className="text-sm text-slate-800 tracking-tighter">{selectedEquipment?.nombre}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400 mb-1 tracking-widest">ARPU Transacción</p>
                        <p className={`text-sm font-mono ${realPrice >= 1500000 ? 'text-green-600' : 'text-orange-500'}`}>
                          {formatCurrency(realPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[8px] text-slate-400 mb-1 tracking-widest">Validation Code</p>
                        <p className="text-xs font-mono bg-slate-100 p-2 rounded border border-slate-200 uppercase">
                          CXD-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 print:hidden">
                  <button onClick={handleExportTxt} className="flex-1 brand-gradient text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                    <FileText size={16} /> Exportar TXT
                  </button>
                  <button 
                    onClick={() => {
                      const crmText = `Nombre: ${clientInfo.nombre}\nCédula: ${clientInfo.cc}\nEquipo: ${selectedEquipment?.nombre}\nPrecio: ${formatCurrency(realPrice)}\nPlazo: ${term} meses\nCuota: ${formatCurrency(monthlyQuota)}\nDirección: ${clientInfo.direccion}`;
                      navigator.clipboard.writeText(crmText);
                      showToast("Datos copiados para CRM", 'success');
                    }} 
                    className="flex-1 bg-green-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all hover:bg-green-600"
                  >
                    <CheckCircle2 size={16} /> Copiar al CRM
                  </button>
                  <button onClick={resetAll} className="flex-1 bg-slate-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-xs uppercase tracking-widest hover:bg-black active:scale-95 transition-all">
                    <RotateCcw size={16} /> Nueva Venta
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Nav */}
        <div className="text-center mt-12 mb-4 hidden md:block print:hidden">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Atajos: ⬅/➡ Navegar | Ctrl+L Modo Llamada/Panel Frontal | Alt+[1-9] Ir a paso | Esc Cerrar
          </span>
        </div>
        <footer className="pt-4 border-t border-slate-200 flex justify-between items-center print:hidden">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 py-3 px-6 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all border border-slate-200 bg-white shadow-sm ${
              currentStep === 1 ? 'opacity-0' : 'text-slate-400 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          
          {currentStep < 13 && (
            <button 
              onClick={nextStep}
              className="flex items-center gap-3 px-10 py-4 brand-gradient text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all group"
            >
              Continuar <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </footer>
      </main>

      {/* Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-xl shadow-2xl font-bold text-sm text-white flex items-center gap-3 ${
              toastMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {toastMessage.type === 'success' ? <CheckCircle2 size={20} /> : <HelpCircle size={20} />}
            {toastMessage.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Modo Llamada Button */}
      <button 
        onClick={() => setIsModoLlamada(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-magenta text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,0,102,0.3)] hover:scale-110 active:scale-95 transition-all outline-none border border-white/20 print:hidden flex items-center justify-center group"
      >
        <PhoneCall size={24} className="group-hover:animate-pulse" />
      </button>

      {/* Modo Llamada Overlay */}
      {isModoLlamada && (
        <ModoLlamada 
          clientInfo={clientInfo}
          selectedEquipment={selectedEquipment}
          monthlyQuota={monthlyQuota}
          claroUpOfrecido={claroUpOfrecido}
          onClose={() => setIsModoLlamada(false)}
          onCerrarVenta={() => {
            setIsModoLlamada(false);
            if (currentStep < 11) goToStep(11);
          }}
          setSelectedEquipment={setSelectedEquipment}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0066FF20; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0066FF40; }
        @media print { 
          body { background: white; color: black; } 
          .print\\:hidden { display: none !important; } 
          main { max-width: 100%; margin: 0; padding: 0; }
          .glass-card { background: white; border: 1px solid #eee; box-shadow: none; }
        }
      `}</style>
      {showMetrics && <MetricsPanel onClose={() => setShowMetrics(false)} />}
    </div>
  );
}
