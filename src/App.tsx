import { useState, useMemo } from 'react';
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
  Crown
} from 'lucide-react';
import { EQUIPMENT_DATA } from './data/equipment';
import { OBJECTIONS } from './data/objections';
import { generateContractText } from './data/contract';
import { formatCurrency, calculateMonthlyInstallment } from './lib/utils';
import { Equipment, PoliedroData } from './types';

const STEPS = [
  { id: 1, title: 'Bienvenida', icon: User },
  { id: 2, title: 'Cupo Preaprobado', icon: BadgePercent },
  { id: 3, title: 'Sondeo', icon: Search },
  { id: 4, title: 'Catálogo', icon: Smartphone },
  { id: 5, title: 'Calculadora', icon: Calculator },
  { id: 6, title: 'Objeciones', icon: HelpCircle },
  { id: 7, title: 'Habeas Data', icon: ShieldCheck },
  { id: 8, title: 'Poliedro', icon: ShieldCheck },
  { id: 9, title: 'Contrato', icon: FileText },
  { id: 10, title: 'Resumen', icon: CheckCircle2 },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientInfo, setClientInfo] = useState({
    nombre: '',
    cc: '',
    movil: '',
    email: '',
    ocupacion: '',
    marcaPreferida: '',
    prioridades: [] as string[],
    usos: [] as string[],
  });
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
      alert("Por favor complete el nombre en Bienvenida.");
      setCurrentStep(1);
      return;
    }
    if (stepId > 4 && !selectedEquipment) {
      alert("Por favor seleccione un equipo en el Catálogo.");
      setCurrentStep(4);
      return;
    }
    if (stepId >= 8 && !habeasDataRead) {
      alert("Debe realizar la lectura completa del guion de Habeas Data.");
      return;
    }
    if (stepId >= 9 && !poliedroData) {
      alert("Debe extraer los datos de Poliedro para continuar.");
      return;
    }
    if (stepId === 10 && (!contractAccepted || !habeasDataAccepted)) {
      alert("Debe aceptar el contrato y el tratamiento de datos.");
      return;
    }
    setCurrentStep(stepId);
    window.scrollTo(0, 0);
  };

  const nextStep = () => goToStep(currentStep + 1);

  const prevStep = () => goToStep(currentStep - 1);

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

AUTORIZACIONES:
-----------------------------------------
CONTRATO ACEPTADO: SI
HABEAS DATA LEY 1581: SI
LECTURA DE GUION: SI

=========================================
VENTAS TECH TYT © 2026
=========================================
    `;
    
    import('./lib/utils').then(utils => {
      utils.downloadTxt(`Venta_${clientInfo.cc}_${code}.txt`, text.trim());
    });
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
      usos: [],
    });
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
        matchesCategory = ['SMARTPHONE', 'VOZ'].includes(eq.categoria);
      }

      const matchesBrand = selectedBrand === 'TODOS' || eq.marca === selectedBrand;
      const matchesDevice = selectedDevice === 'TODOS' || eq.nombre === selectedDevice;
      return matchesSearch && matchesCategory && matchesBrand && matchesDevice;
    });
  }, [searchQuery, selectedCategory, selectedBrand, selectedDevice]);

  const brands = useMemo(() => {
    const filteredData = EQUIPMENT_DATA.filter(eq => {
      if (selectedCategory === 'TODOS') return true;
      if (selectedCategory === 'TERMINAL') {
        return ['SMARTPHONE', 'VOZ'].includes(eq.categoria);
      }
      return eq.categoria === selectedCategory;
    });
    const bnds = new Set(filteredData.map(e => e.marca));
    return ['TODOS', ...Array.from(bnds).sort()];
  }, [selectedCategory]);

  const categories = useMemo(() => {
    const cats = new Set(EQUIPMENT_DATA.filter(e => selectedBrand === 'TODOS' || e.marca === selectedBrand).map(e => e.categoria));
    return ['TODOS', ...Array.from(cats).sort()];
  }, [selectedBrand]);

  const deviceNames = useMemo(() => {
    const names = new Set(EQUIPMENT_DATA.filter(e => {
      const matchesBrand = selectedBrand === 'TODOS' || e.marca === selectedBrand;
      let matchesCategory = selectedCategory === 'TODOS' || e.categoria === selectedCategory;
      if (selectedCategory === 'TERMINAL') {
        matchesCategory = ['SMARTPHONE', 'VOZ'].includes(e.categoria);
      }
      return matchesBrand && matchesCategory;
    }).map(e => e.nombre));
    return ['TODOS', ...Array.from(names).sort()];
  }, [selectedBrand, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans pb-20">
      {/* Header */}
      <header className="brand-gradient py-6 sticky top-0 z-50 shadow-lg print:hidden text-white">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <div className="w-5 h-5 brand-gradient rounded-sm"></div>
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter italic uppercase">
              Asistente de Ventas TyT <span className="font-light opacity-80 uppercase text-[10px] tracking-widest ml-2">V.Mayo.2026</span>
            </h1>
          </div>
          <div className="hidden md:flex gap-4 text-[10px] font-bold uppercase tracking-wider">
            <span className="bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">Tasa EA: 28.17%</span>
            <span className="bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">664 Equipos Activos</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 print:px-0">
        {/* Step Indicator */}
        <div className="mb-12 flex justify-between items-center print:hidden overflow-x-auto py-2">
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="hormozi-box p-6 rounded-r-xl shadow-sm bg-white border border-slate-100">
                    <h2 className="text-brand-magenta font-extrabold text-xs mb-3 uppercase tracking-widest flex items-center gap-2">
                       <Crown size={14} /> Guión Gold (Apertura)
                    </h2>
                    <p className="text-xs leading-relaxed italic text-slate-700 font-medium font-serif">
                      "Hola, mi nombre es {asesor}. Me comunico con el titular de la línea porque usted ha sido seleccionado por su excelente comportamiento de pago para recibir un beneficio tecnológico exclusivo. ¿Tengo el gusto de hablar con...?"
                    </p>
                  </div>

                  <div className="hormozi-box p-6 rounded-r-xl shadow-sm bg-white border border-slate-100 border-l-brand-blue">
                    <h2 className="text-brand-blue font-extrabold text-xs mb-3 uppercase tracking-widest flex items-center gap-2">
                       <BadgePercent size={14} /> Guión de Impacto
                    </h2>
                    <p className="text-xs leading-relaxed italic text-slate-700 font-medium font-serif">
                      "¡Felicidades! Usted hace parte del grupo selecto que hoy tiene un cupo preaprobado para renovar su tecnología. Mi misión hoy es que estrene equipo sin trámites complicados. ¿Me confirma su nombre para iniciar?"
                    </p>
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

                <div className="space-y-6 glass-card p-8">
                  <h3 className="input-label">Valores Prioritarios</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cámara', 'Batería', 'Velocidad', 'Diseño', 'Precio', 'Memoria'].map(p => (
                      <button
                        key={p}
                        onClick={() => {
                          const exists = clientInfo.prioridades.includes(p);
                          if (!exists && clientInfo.prioridades.length >= 3) return;
                          setClientInfo({
                            ...clientInfo,
                            prioridades: exists ? clientInfo.prioridades.filter(x => x !== p) : [...clientInfo.prioridades, p]
                          });
                        }}
                        className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all border ${
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
              </div>
            )}

            {/* STEP 4: CATALOGO */}
            {currentStep === 4 && (
              <div className="space-y-6" id="step4">
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
                              const firstValid = defaultPlazos.find(p => eq.plazosDisponibles?.includes(p)) || (eq.plazosDisponibles ? eq.plazosDisponibles[0] : 24);
                              if (!eq.plazosDisponibles?.includes(term)) {
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
                            <p className="text-sm font-black text-brand-magenta font-mono ml-2 whitespace-nowrap">{formatCurrency(eq.precio)}</p>
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

                {selectedEquipment && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 brand-gradient rounded-xl text-white shadow-lg flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opactiy-80">Seleccionado:</span>
                      <h3 className="text-xl font-black">{selectedEquipment.nombre}</h3>
                    </div>
                    <CheckCircle2 size={32} className="opacity-40" />
                  </motion.div>
                )}
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
                        const isAvailable = selectedEquipment.plazosDisponibles?.includes(m);
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

                  {!selectedEquipment.plazosDisponibles?.includes(term) && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 mb-4">
                       <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider flex items-center gap-2">
                         <Clock size={10} /> Plazo no disponible
                       </p>
                       <p className="text-xs text-red-500 italic">El plazo de {term}M no aplica para este producto de tecnología. Por favor seleccione uno válido.</p>
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
                    <div className="mt-6 inline-block bg-white/5 px-4 py-2 rounded-full">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tasa MV: 2.09% • Fija</p>
                    </div>
                  </div>
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
                      onClick={() => setSelectedObjection(key)}
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
                          const personaResp = obj.responses.personaResponses?.[persona];
                          
                          if (selectedObjection === 'cuotas' && !personaResp) {
                            return `Si dividimos ${formatCurrency(monthlyQuota)} entre 30 días, hablamos de ${formatCurrency(Math.round(monthlyQuota / 30))} diarios. Eso es literalmente el valor de un pasaje de transporte público o un snack. ¿No vale su productividad y conectividad lo mismo que un snack diario? La mayoría de nuestros clientes recuperan el valor de la cuota simplemente con la eficiencia extra que les da el nuevo equipo.`;
                          }
                          
                          return personaResp ? personaResp.r1 : obj.responses.r1;
                        })()}
                      </p>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                      <p className="font-black text-[9px] text-slate-500 uppercase mb-1 tracking-widest italic">Psicología de Inversión</p>
                      <p className="text-xs leading-relaxed text-slate-600">
                        "{(() => {
                           const obj = OBJECTIONS[selectedObjection];
                           const persona = clientInfo.ocupacion;
                           const personaResp = obj.responses.personaResponses?.[persona];
                           return personaResp ? personaResp.r2 : obj.responses.r2;
                        })()}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 7: HABEAS DATA */}
            {currentStep === 7 && (
              <div className="space-y-8" id="step7">
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

            {/* STEP 8: POLIEDRO */}
            {currentStep === 8 && (
              <div className="space-y-8" id="step8">
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

            {/* STEP 9: CONTRATO */}
            {currentStep === 9 && (
              <div className="space-y-8" id="step9">
                <div className="bg-white border border-slate-200 p-8 rounded-xl max-h-[500px] overflow-y-auto custom-scrollbar shadow-inner">
                  <div 
                    className="contract-viewer text-[10px] leading-relaxed text-slate-500 font-serif" 
                    dangerouslySetInnerHTML={{ __html: generateContractText({
                      nombre: clientInfo.nombre,
                      cc: clientInfo.cc,
                      equipo: poliedroData?.equipoSimulado || selectedEquipment?.nombre || '',
                      marca: selectedEquipment?.marca || '',
                      precio: poliedroData?.saldoADiferir || formatCurrency(realPrice),
                      cuota: poliedroData?.cuotaSimulada || formatCurrency(monthlyQuota),
                      meses: poliedroData?.plazoSimulado || term.toString(),
                      asesor: asesor
                    }) }}
                  />
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

            {/* STEP 10: RESUMEN */}
            {currentStep === 10 && (
              <div className="space-y-8" id="step10">
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
                    <FileText size={16} /> Finalizar y Generar Documento (.TXT)
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
        <footer className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center print:hidden">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 py-3 px-6 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all border border-slate-200 bg-white shadow-sm ${
              currentStep === 1 ? 'opacity-0' : 'text-slate-400 hover:text-slate-900 active:bg-slate-50'
            }`}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          
          {currentStep < 10 && (
            <button 
              onClick={nextStep}
              className="flex items-center gap-3 px-10 py-4 brand-gradient text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all group"
            >
              Continuar <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </footer>
      </main>

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
    </div>
  );
}
