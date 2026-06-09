import React, { useState, useEffect } from 'react';
import { ChevronRight, PhoneCall, CheckCircle2, ShieldCheck, FileText, ChevronLeft, Smartphone } from 'lucide-react';
import { formatCurrency, trackMetric } from './lib/utils';
import { OBJECTIONS } from './data/objections';
import { EQUIPMENT_DATA } from './data/equipment';

export default function ModoLlamada({ 
  clientInfo, 
  selectedEquipment, 
  monthlyQuota, 
  claroUpOfrecido, 
  onClose, 
  onCerrarVenta,
  setSelectedEquipment
}: any) {
  const [activeTab, setActiveTab] = useState<'info' | 'guion' | 'herramientas'>('guion');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [showEquiposModal, setShowEquiposModal] = useState(false);
  const [selectedObjection, setSelectedObjection] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => {
       clearInterval(interval);
       // Track time when closed/unmounted
       setTimer((finalTime) => {
         trackMetric('totalCallTime', finalTime);
         trackMetric('calls', 1);
         return finalTime;
       });
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getScript = () => {
    const hasEq = !!selectedEquipment;
    const eqName = selectedEquipment?.nombre || '[Equipo]';
    const cuota = formatCurrency(monthlyQuota || 45000);
    const nombre = clientInfo.nombre || '[Cliente]';

    return [
      `¡Hola ${nombre}! Le llamo de Claro CXD.`,
      `El motivo de la llamada es que el sistema nos acaba de arrojar una alerta positiva con su número.`,
      `Por su excelente perfil, Claro le liberó un cupo tecnológico prepaprobado de alto impacto sin cuota inicial.`,
      hasEq ? `Tengo aquí separado el ${eqName}.` : `¿Qué marca de celular prefiere usted?`,
      hasEq ? `Este equipo es brutal para lo que usted hace. Resolviendo su necesidad de tajo.` : `Voy a buscarle la mejor opción en bodega hoy.`,
      hasEq ? `Se lo lleva hoy financiado, y le queda en la factura por solo ${cuota} mensuales.` : `Lo podemos diferir hasta en 24 meses en su factura.`,
      hasEq ? `No va a encontrar una tecnología tan completa y pagando menos de ${cuota} en otro lado.` : `Tenemos inventario limitado.`,
      `¿Confirmamos la dirección de entrega para la validación legal?`
    ];
  };

  const script = getScript();
  const eqName = selectedEquipment?.nombre || '[Equipo]';
  const nombre = clientInfo.nombre || '[Cliente]';

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col text-slate-100 overflow-hidden font-sans">
      <div className="flex bg-slate-950 p-4 items-center justify-between border-b border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-brand-magenta font-black uppercase tracking-widest text-sm">
            <PhoneCall size={16} className="animate-pulse" /> Modo Llamada
          </div>
        </div>
        <div className="text-xl font-mono text-brand-cyan">{formatTime(timer)}</div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden flex bg-slate-900 border-b border-slate-800 text-xs font-bold uppercase">
           <button className={`flex-1 p-4 text-center ${activeTab === 'info' ? 'text-brand-cyan border-b-2 border-brand-cyan' : 'text-slate-500'}`} onClick={() => setActiveTab('info')}>Cliente</button>
           <button className={`flex-1 p-4 text-center ${activeTab === 'guion' ? 'text-white border-b-2 border-white' : 'text-slate-500'}`} onClick={() => setActiveTab('guion')}>Guion</button>
           <button className={`flex-1 p-4 text-center ${activeTab === 'herramientas' ? 'text-brand-magenta border-b-2 border-brand-magenta' : 'text-slate-500'}`} onClick={() => setActiveTab('herramientas')}>Herrams</button>
        </div>

        {/* LEFT PANEL */}
        <div className={`w-full md:w-1/4 bg-slate-950 p-6 flex-col gap-6 md:flex ${activeTab !== 'info' && 'hidden md:flex'}`}>
          <div className="space-y-2">
            <h2 className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Cliente / Ocupación</h2>
            <p className="text-2xl font-black text-white">{clientInfo.nombre || 'NO IDENTIFICADO'}</p>
            <p className="text-sm text-brand-cyan font-mono">{clientInfo.cc || 'Sin CC'} / {clientInfo.movil || 'Sin Móvil'}</p>
            <p className="text-xs text-slate-400 font-bold uppercase">{clientInfo.ocupacion || 'Sin Ocupación'} • {clientInfo.paraQuien}</p>
          </div>
          
          <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800 mt-4">
             <h2 className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Equipo Actual / Presupuesto</h2>
             {selectedEquipment ? (
               <>
                 <p className="text-lg font-bold leading-tight">{selectedEquipment.nombre}</p>
                 <p className="text-2xl font-black text-brand-magenta">{formatCurrency(monthlyQuota)}<span className="text-xs text-slate-500 font-normal">/mes</span></p>
               </>
             ) : (
               <p className="text-sm text-slate-400 italic">Ningún equipo seleccionado</p>
             )}
             
             <button onClick={() => setShowEquiposModal(true)} className="w-full mt-4 p-3 border border-slate-700 bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-700 text-white transition">
               Cambiar Equipo Rápido
             </button>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className={`flex-1 bg-slate-900 border-x border-slate-800 flex flex-col p-4 md:p-8 overflow-y-auto ${activeTab !== 'guion' && 'hidden md:flex'}`}>
           <h2 className="text-xs text-slate-500 uppercase font-black tracking-widest mb-8 text-center">Teleprompter de Llamada</h2>
           <div className="space-y-4 max-w-2xl mx-auto w-full pb-20">
             {script.map((line, idx) => {
                const isPast = idx < sentenceIndex;
                const isCurrent = idx === sentenceIndex;
                const isFuture = idx > sentenceIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setSentenceIndex(idx + 1 > script.length - 1 ? script.length - 1 : idx + 1)}
                    className={`w-full text-left p-4 md:p-6 rounded-2xl transition-all duration-300 border-2 block ${
                      isCurrent ? 'bg-slate-800 border-brand-cyan shadow-xl scale-[1.02] opacity-100 ring-4 ring-brand-cyan/20' : 
                      isPast ? 'bg-slate-950 border-slate-800 opacity-40 hover:opacity-70' : 
                      'bg-slate-900 border-slate-800 opacity-30 hover:opacity-50'
                    }`}
                  >
                    <p className={`text-xl md:text-3xl leading-relaxed ${isCurrent ? 'font-black text-white' : 'font-medium text-slate-500'}`}>
                       {(() => {
                         const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                         const safeNombre = escapeRegExp(nombre) || 'XXXX';
                         const safeEqName = escapeRegExp(eqName) || 'YYYY';
                         const parts = line.split(new RegExp(`(${safeNombre}|${safeEqName}|\\$?[0-9.,]{4,})`, 'gi'));
                         return parts.map((part, i) => {
                           if (part.toLowerCase() === nombre.toLowerCase()) return <span key={i} className="text-brand-magenta font-black bg-brand-magenta/20 px-1 rounded">{part}</span>;
                           if (part.toLowerCase() === eqName.toLowerCase()) return <span key={i} className="text-brand-cyan font-black bg-brand-cyan/20 px-1 rounded">{part}</span>;
                           if (part.match(/\$?[0-9.,]{4,}/)) return <span key={i} className="text-green-400 font-mono font-black">{part}</span>;
                           return part;
                         });
                       })()}
                    </p>
                  </button>
                )
             })}
           </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`w-full md:w-[300px] bg-slate-950 p-6 flex flex-col gap-6 ${activeTab !== 'herramientas' && 'hidden md:flex'}`}>
           <div className="space-y-2">
              <h2 className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Manejo de Objeciones</h2>
              <select 
                className="w-full bg-slate-800 text-white border border-slate-700 p-4 rounded-xl font-bold text-sm outline-none focus:border-brand-magenta transition-colors"
                value={selectedObjection}
                onChange={(e) => setSelectedObjection(e.target.value)}
              >
                 <option value="" className="bg-slate-900 text-slate-400">Seleccionar Objeción...</option>
                 {Object.entries(OBJECTIONS).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.title}</option>)}
              </select>

              {selectedObjection && (
                 <div className="mt-4 bg-slate-800 p-4 rounded-xl border-l-4 border-brand-magenta animate-fade-in">
                    <p className="text-sm font-medium leading-relaxed italic text-slate-300">
                       "{OBJECTIONS[selectedObjection].responses.r1}"
                    </p>
                 </div>
              )}
           </div>

           <div className="space-y-2 mt-auto">
             <div className="p-4 bg-red-900/40 border border-red-500/30 rounded-xl mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2 flex items-center gap-2"><ShieldCheck size={14}/> Pitch Claro UP</p>
                <p className="text-xs font-semibold text-slate-300 italic">"Además, le incluimos Seguro Claro UP: Si se le rompe o se lo roban, le reponemos el equipo pagando solo un pequeño deducible."</p>
             </div>

             <button onClick={() => { onClose(); onCerrarVenta(); }} className="w-full p-6 bg-brand-cyan text-slate-900 rounded-xl font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
               <FileText size={18} /> Cerrar Venta
             </button>
           </div>
        </div>
      </div>

      {showEquiposModal && (
         <div className="fixed inset-0 z-[60] flex py-10 px-4 justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 w-full max-w-2xl flex flex-col h-full shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-black uppercase text-white">Cambio Rápido de Equipo</h2>
                 <button onClick={() => setShowEquiposModal(false)} className="text-slate-400 p-2 text-xl hover:text-white">✕</button>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar flex-1 pb-10">
                 {EQUIPMENT_DATA.slice(0, 7).map((eq, i) => (
                    <button 
                      key={eq.nombre + i}
                      onClick={() => { setSelectedEquipment(eq); setShowEquiposModal(false); }}
                      className="text-left bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-brand-cyan hover:bg-slate-700 transition"
                    >
                      <Smartphone className="text-slate-500 mb-2" />
                      <p className="text-xs font-bold text-white mb-1 truncate">{eq.nombre}</p>
                      <p className="text-lg font-black text-brand-cyan">{formatCurrency(eq.precio)}</p>
                    </button>
                 ))}
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
