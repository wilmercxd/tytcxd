export interface Equipment {
  marca: string;
  categoria: string;
  nombre: string;
  precio: number;
  specs?: string[];
}

export interface ObjectionResponse {
  r1: string;
  r2: string;
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
}
