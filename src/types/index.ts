export interface Step {
  title: string;
  description: string;
  image?: string;
  video?: string;
  subSteps?: string[];
  note?: string;
  warning?: string;
}

export interface Procedure {
  id: string;
  title: string;
  category: string;
  tags?: string[];
  estimatedTime?: string;
  steps: Step[];
  flowchart?: string;
}

// Plan de asistencia/seguro
export interface Plan {
  id: string;
  empresa: string;
  nombre: string;
  piloto: string;
  guionEntrada?: string;
  servicios: string[];
  coberturas: string;
  tiempoReporte: string;
  observaciones?: string;
  gestion: string;
}

// Extensión interna (piloto de cuenta)
export interface Extension {
  cuenta: string;
  numero: string;
  estado?: string;
}

// Teléfono de atención al cliente externo
export interface Contact {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  notes?: string;
}

// Categoría de preguntas de descarte
export interface CategoriaPreguntas {
  id: string;
  titulo: string;
  emoji: string;
  categoria: string;
  preguntas: string[];
  notas?: string;
}

export interface Provider {
  id: string;
  name: string;
  phone: string;
  region: string;
  servicios: string;
}

export interface LinkEntry {
  id: string;
  name: string;
  category: string;
  url?: string;
  username?: string;
  password?: string;
  notes?: string;
}

export type SectionKey =
  | "procedimientos"
  | "cuentas"
  | "pilotos"
  | "links"
  | "proveedores"
  | "preguntas";

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  section: SectionKey;
}
