export interface Equipment {
  marca: string;
  categoria: string;
  nombre: string;
  precio: number;
  specs?: string[];
  plazosDisponibles?: number[];
}

export interface ClientInfo {
  nombre: string;
  cc: string;
  ocupacion: string;
  prioridades: string[];
  direccion: string;
  presupuestoMensual?: number;
  paraQuien?: string;
  equipoActual?: string;
}

export interface PitchData {
  gancho: string;
  beneficios: Record<string, string>;
}

export interface ObjectionResponse {
  r1: string;
  r2: string;
  personaResponses?: Record<string, { r1: string, r2: string }>;
}

export interface PoliedroData {
  nombre: string;
  apellidos: string;
  cc: string;
  movil: string;
  contrato: string;
  antiguedad: string;
  comportamiento: string;
  cartera: string;
  equipoSimulado?: string;
  cuotaSimulada?: string;
  plazoSimulado?: string;
  saldoADiferir?: string;
  valorTotal?: string;
  valorIVA?: string;
  pagoInicial?: string;
}
