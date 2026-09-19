import { Plan } from "@/types";

export const planes: Plan[] = [
  // ── FALABELLA ──────────────────────────────────────────────────────────────
  {
    id: "fal-001",
    empresa: "FALABELLA",
    nombre: "Planes 638, 679, 717, 722, 736",
    piloto: "CL_FALABELLA / CL_FALABELLA_CARDIF / CL_METLIFE_HOGAR / CL_ASIST_CARDIF",
    servicios: [
      "Hogar",
      "Pintura y piso (no se pintan cocinas ni baños, solo interior del domicilio)",
      "Streaming NETFLIX o TV (solo aplica al año de haber tenido el seguro activo)",
    ],
    coberturas: "Cobertura por UF. Verificar si es por UF o metros cuadrados según servicio.",
    tiempoReporte: "48 HORAS (pintura: No aplica)",
    observaciones:
      "Si el afiliado no valida en SOA se crea asistencia y se delega a MSANCHEZ (documentar en bitácora).",
    gestion:
      "Verificar si valida activo → si valida, asignar proveedor → si no valida, crear asistencia y delegar a MSANCHEZ.\n\nPintura: Delegar a VVILLARROEL para que sugiera el proveedor correcto. Informar que debe tener el material y que nuestro proveedor hace una primera visita para medir.\n\nStreaming: Asignar a Reintegro. Delegar a PDLOSREYES si valida activo para gestión de parte de filial.",
  },
  {
    id: "fal-002",
    empresa: "FALABELLA / SURA",
    nombre: "RSA FULL COD. 200 FALABELLA - SURA",
    piloto: "CL_RSA_FULL",
    servicios: ["Servicios hogar"],
    coberturas: "Ver condicionado por servicio.",
    tiempoReporte: "48 horas",
    gestion: "Asignación por rotación de proveedores.",
  },

  // ── SURA ───────────────────────────────────────────────────────────────────
  {
    id: "sura-001",
    empresa: "SURA",
    nombre: "669 - Programa Urgencia Dental Al Dolor SURA Los Héroes",
    piloto: "CL_SURA_HEROES",
    guionEntrada: "(No aplica guion especial)",
    servicios: ["Urgencia por dolor", "Limpieza"],
    coberturas: "Titular y beneficiarios (cónyuge e hijos). Una sola limpieza por grupo familiar.",
    tiempoReporte: "No aplica",
    observaciones: "Solamente por dolor.",
    gestion:
      "Sigma Dental (plataforma) — $50.000 en caso de asistir.\nDentimagen (prioridad Santiago).",
  },
  {
    id: "sura-002",
    empresa: "SURA / RIPLEY",
    nombre: "517 - Programa Mascotas Premium Upgrade SURA Ripley",
    piloto: "CL_MASCOTA_RIPLEY / CL_ASIST_SURA_MASCOT",
    servicios: [
      "Gastos de atención veterinaria por accidente o enfermedad",
      "Traslado médico terrestre en caso de accidente traumático",
    ],
    coberturas: "Reembolso por accidente.",
    tiempoReporte: "Comunicarse antes o no pasadas las 72 horas del accidente.",
    observaciones: "Mayormente a reembolso.",
    gestion:
      "Tomar datos y en caso de reembolso asignar a Reintegro económico y delegar a PDELOSREYES.",
  },
  {
    id: "sura-003",
    empresa: "SURA / RIPLEY",
    nombre: "495 - Programa Cesantía SURA Ripley",
    piloto: "CL_RIPLEY_CESANTIA",
    servicios: [
      "Aporte por divorcio",
      "Aporte por matrimonio",
      "Aporte por nacimiento de un hijo",
      "Incentivo por titulación",
    ],
    coberturas: "150.000 pesos",
    tiempoReporte: "No aplica",
    observaciones: "Si no valida, se niega (no mandamos a validar esta cuenta).",
    gestion:
      "Tomar datos y en caso de reembolso asignar a Reintegro BENEFICIOS y delegar a PDELOSREYES.",
  },
  {
    id: "sura-004",
    empresa: "SURA UBER",
    nombre: "Asistencias Robo y Daños Materiales SURA Uber",
    piloto: "CL_ASISTENCIA_UBER",
    guionEntrada: "NO SE MANDA A VALIDAR — se brinda directamente el servicio",
    servicios: ["Reposición de celular y bienes"],
    coberturas: "Por reembolso",
    tiempoReporte: "No aplica",
    observaciones: "No hace falta validarlos.",
    gestion: "Asignar a Reposición bienes Sura Uber, y delegar a PDELOSREYES.",
  },

  // ── SANTANDER CONSUMER ─────────────────────────────────────────────────────
  {
    id: "san-001",
    empresa: "SANTANDER CONSUMER",
    nombre: "Programa Asistencias y Reparaciones Menores Santander COD. 694",
    piloto: "CL_SANTANDER_CONSUMER",
    servicios: [
      "Viales",
      "Desperfectos menores de pintura",
      "Reparación de piquete de parabrisas",
      "Reemplazo de parabrisas por trizadura",
      "Reparaciones y reembolsos",
    ],
    coberturas: "UF 3,5 — 2 eventos",
    tiempoReporte: "",
    observaciones:
      "Normalmente tiene excedente. Por pintura no debe estar abollado.",
    gestion:
      "Debe enviar fotos del desperfecto al teléfono (+56 9 5300 4836).\nRecibidas las fotos se pide presupuesto al taller y se coordina visita.\nSe gestiona a través del WhatsApp autorizado.",
  },

  // ── CARDIF ─────────────────────────────────────────────────────────────────
  {
    id: "car-001",
    empresa: "CARDIF (SERVICIO DE ASISTENCIA)",
    nombre: "COD. 524 - Programa Asistencia Hogar Full CARDIF CENCOSUD",
    piloto: "CL_SERVICIO_ASISTENC",
    guionEntrada: '"Servicio de asistencia, buenos días, le habla _____, ¿en qué le puedo ayudar?"',
    servicios: [
      "Servicios hogar",
      "Reparación de calefón",
      "Detección de fuga de agua",
      "Servicios de mascotas",
    ],
    coberturas: "Variación entre UF, metros o piezas.",
    tiempoReporte: "48 horas",
    observaciones: "Mayormente no validan, se delega a MSANCHEZ.",
    gestion: "Asignación por rotación de proveedores.",
  },

  // ── SOUTHBRIDGE ────────────────────────────────────────────────────────────
  {
    id: "sou-001",
    empresa: "SOUTHBRIDGE",
    nombre: "Programa Plan L Mascotas SOUTHBRIDGE COD. 724",
    piloto: "CL_MASCOTA_SOUTHBRIG / CL_BHP_SOUTHBRIGE",
    guionEntrada: "(Pronunciación: Saudbrich)",
    servicios: ["Urgencia Veterinaria", "Telemedicina Veterinaria"],
    coberturas: "80% del arancel — UF 250 — 15 días — 3 eventos",
    tiempoReporte: "Comunicarse antes o dentro de las 72 horas de la urgencia.",
    observaciones: "Mayormente a reembolso.",
    gestion:
      "Tomar datos y en caso de reembolso asignar a Reintegro económico y delegar a PDELOSREYES.",
  },

  // ── LA POLAR ───────────────────────────────────────────────────────────────
  {
    id: "pol-001",
    empresa: "LA POLAR - SERVICIOS MÉDICOS",
    nombre: "COD. 780 - Programa Asistencia Salud Integral (IMED)",
    piloto: "CL_POLAR_ABC",
    servicios: ["Descuento en servicios médicos presenciales"],
    coberturas: "100% de la consulta mediante plataforma IMED",
    tiempoReporte: "Un día antes del turno médico máximo",
    observaciones:
      "Debe comunicarse con el turno ya solicitado en centro médico de preferencia que tenga IMED. Preguntar si es FONASA o ISAPRE.",
    gestion:
      "Cargar los datos del titular en la plataforma: addiuva.cl/cabina\nUsuario: cabina\nClave: cabina2026",
  },
  {
    id: "pol-002",
    empresa: "LA POLAR / RIPLEY / CARDIF",
    nombre: "776 - Programa Dental RIPLEY CARDIF",
    piloto: "COD 776 CONDICIONADO PROGRAMA DENTAL RIPLEY CARDIF.pdf",
    servicios: ["Ver condicionado"],
    coberturas: "Ver condicionado",
    tiempoReporte: "Ver condicionado",
    gestion: "Ver condicionado adjunto.",
  },
  {
    id: "pol-003",
    empresa: "RIPLEY / CARDIF",
    nombre: "778 - Programa Full Ambulatorio Familiar RIPLEY CARDIF",
    piloto: "COD 778 CONDICIONADO PROGRAMA FULL AMBULATORIO FAMILIAR RIPLEY CARDIF.pdf",
    servicios: ["Ver condicionado"],
    coberturas: "Ver condicionado",
    tiempoReporte: "Ver condicionado",
    gestion: "Ver condicionado adjunto.",
  },
];
