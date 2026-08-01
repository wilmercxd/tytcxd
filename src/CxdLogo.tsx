import React from 'react';

interface CxdLogoProps {
  className?: string;
  light?: boolean;
  showText?: boolean;
}

export const CxdLogo: React.FC<CxdLogoProps> = ({ className = "h-10", light = true, showText = true }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg viewBox="0 0 460 210" className="h-full w-auto object-contain overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cxdBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="100%" stopColor="#0088FF" />
          </linearGradient>
          <linearGradient id="cxdMagentaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E600AA" />
            <stop offset="100%" stopColor="#B300E6" />
          </linearGradient>
          <linearGradient id="cxdCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2D3" />
            <stop offset="100%" stopColor="#54A0FF" />
          </linearGradient>
        </defs>

        {/* LOGO MARK */}
        <g>
          {/* Letter C */}
          <path 
            d="M 125,25 C 75,25 35,62 35,110 C 35,158 75,195 125,195 C 158,195 185,178 198,152 L 158,138 C 150,152 138,160 123,160 C 96,160 72,138 72,110 C 72,82 96,60 123,60 C 138,60 150,68 158,82 L 198,68 C 185,42 158,25 125,25 Z" 
            fill="url(#cxdBlueGrad)" 
          />
          <rect x="20" y="93" width="50" height="34" rx="4" fill="url(#cxdBlueGrad)" />

          {/* Letter X */}
          <path 
            d="M 215,30 L 252,110 L 215,190 L 250,190 L 275,135 L 300,190 L 335,190 L 298,110 L 335,30 L 300,30 L 275,85 L 250,30 Z" 
            fill="url(#cxdMagentaGrad)" 
          />

          {/* Letter D */}
          <path 
            d="M 345,30 L 390,30 C 435,30 465,65 465,110 C 465,155 435,190 390,190 L 345,190 Z" 
            fill="url(#cxdCyanGrad)" 
            opacity="0.3"
          />
          <path 
            d="M 345,30 L 405,110 L 345,190 L 380,190 L 440,110 L 380,30 Z" 
            fill="url(#cxdCyanGrad)" 
          />
          <path 
            d="M 400,30 C 438,30 460,65 460,110 C 460,155 438,190 400,190 C 428,170 442,142 442,110 C 442,78 428,50 400,30 Z" 
            fill="url(#cxdCyanGrad)" 
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`text-[11px] tracking-[0.25em] font-light uppercase ${light ? 'text-white' : 'text-slate-700'}`}>
            Conexiones
          </span>
          <span className={`text-[13px] tracking-[0.2em] font-black uppercase italic ${light ? 'text-white' : 'text-slate-900'}`}>
            Digitales
          </span>
        </div>
      )}
    </div>
  );
};
