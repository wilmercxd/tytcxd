import React, { useState, useEffect } from 'react';
import { BarChart2, CheckCircle2, XCircle, X } from 'lucide-react';

export default function MetricsPanel({ onClose }: { onClose: () => void }) {
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('tyt_metrics') || '{}');
    setMetrics(stats);
  }, []);

  const totalSales = metrics.sales || 0;
  const avgTime = metrics.totalCallTime && metrics.calls ? Math.round(metrics.totalCallTime / metrics.calls) : 0;
  
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto text-slate-800 p-8">
        <div className="flex justify-between items-start mb-8 border-b pb-4">
          <h2 className="text-2xl font-black text-brand-blue uppercase tracking-widest flex items-center gap-3">
            <BarChart2 /> Dashboard de OJT & Métricas
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-2">Ventas Completadas</p>
            <p className="text-4xl font-black text-blue-700">{totalSales}</p>
          </div>
          <div className="p-6 bg-magenta-50 rounded-2xl border border-magenta-100">
            <p className="text-[10px] text-brand-magenta font-bold uppercase tracking-widest mb-2">Tiempo Prom. Llamada</p>
            <p className="text-4xl font-black text-brand-magenta">{avgTime}s</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-2">Eq. Más Consultado</p>
            <p className="text-lg font-black text-emerald-700 mt-2 truncate">{metrics.topEquipment || 'N/A'}</p>
          </div>
        </div>

        <h3 className="text-sm font-black uppercase text-slate-700 mb-4 tracking-widest">Checklist de Competencias (OJT)</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-xl">
             {totalSales > 0 ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-400" />}
             <div>
               <p className="font-bold">Cierre Exitoso</p>
               <p className="text-xs text-slate-500">Ha completado al menos 1 venta usando el flujo.</p>
             </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-xl">
             {metrics.calls > 0 ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-400" />}
             <div>
               <p className="font-bold">Uso del Modo Llamada</p>
               <p className="text-xs text-slate-500">Ha activado el modo de llamada para fogueo o gestión.</p>
             </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-xl">
             {metrics.objectionsViewed > 0 ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-400" />}
             <div>
               <p className="font-bold">Manejo de Objeciones</p>
               <p className="text-xs text-slate-500">Ha consultado el panel de objeciones durante el flujo.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
