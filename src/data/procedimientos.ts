import { Procedure } from "@/types";

export const procedimientos: Procedure[] = [
  {
    id: "proc-001",
    title: "Protocolo Pintura y Pisos",
    category: "Servicios Hogar",
    tags: ["pintura", "piso", "falabella"],
    steps: [
      {
        title: "Paso 1 — Toma de datos",
        description:
          "Registrar todos los datos del cliente y del servicio solicitado según el flujo de toma de datos.",
        note: "Ver diagrama: https://www.rapidcharts.ai/editor/6b7b8092-cb9d-46f0-a4f5-46dbda1fac12/View",
        subSteps: [
          "¿Qué zonas quiere pintar? (no se pintan cocinas ni baños, solo interior del domicilio)",
          "¿Qué tipo de piso quiere instalar?",
          "¿Tiene el material?",
          "¿Qué disponibilidad tiene?",
        ],
      },
      {
        title: "Paso 2 — Coordinación",
        description:
          "Coordinar con el proveedor según el flujo de coordinación.",
        note: "Ver diagrama: https://www.rapidcharts.ai/editor/557a456d-b6b6-4174-9b27-510801d3fe02/View",
        subSteps: [
          "Delegar a VVILLARROEL para que sugiera el proveedor correcto",
          "Informar al cliente que nuestro proveedor hace una primera visita para medir",
          "Confirmar fecha y disponibilidad con el proveedor",
        ],
        warning:
          "No se pintan cocinas ni baños. Solo interior del domicilio.",
      },
    ],
  },
  {
    id: "proc-002",
    title: "Gestión de Asistencia General",
    category: "Operaciones",
    tags: ["asistencia", "validación", "soa"],
    steps: [
      {
        title: "Recibir llamada e identificar cuenta",
        description:
          "Identificar a qué empresa y plan corresponde la llamada mediante el piloto de validación.",
        note: "Cada cuenta tiene un código piloto específico (CL_FALABELLA, CL_SURA_HEROES, etc.).",
      },
      {
        title: "Validar en SOA",
        description:
          "Ingresar los datos del afiliado en el sistema SOA para verificar si el plan está activo.",
        subSteps: [
          "Solicitar RUT del titular",
          "Ingresar en SOA",
          "Confirmar estado del plan",
        ],
        warning:
          "Si el afiliado no valida en SOA, crear asistencia y delegar a MSANCHEZ (documentar en bitácora).",
      },
      {
        title: "Aplicar preguntas de descarte",
        description:
          "Realizar las preguntas de descarte correspondientes al tipo de servicio solicitado.",
        note: "Ver sección 'Preguntas de Descarte' para el listado completo por categoría.",
      },
      {
        title: "Asignar proveedor",
        description:
          "Si el afiliado valida activo y la solicitud procede, asignar proveedor según rotación.",
        subSteps: [
          "Verificar disponibilidad del proveedor en la región",
          "Asignar según tabla de rotación de proveedores",
          "Informar tiempo estimado de atención",
        ],
      },
      {
        title: "Documentar y cerrar",
        description: "Registrar la gestión en el sistema y cerrar el caso correctamente.",
      },
    ],
    flowchart: `flowchart TD
    A[Llamada Entrante] --> B[Identificar Cuenta/Piloto]
    B --> C[Validar en SOA]
    C --> D{¿Valida activo?}
    D -->|Sí| E[Preguntas de Descarte]
    D -->|No| F[Crear Asistencia]
    F --> G[Delegar a MSANCHEZ]
    E --> H{¿Procede servicio?}
    H -->|Sí| I[Asignar Proveedor]
    H -->|No| J[Informar al cliente]
    I --> K[Documentar y Cerrar]
    J --> K
    G --> K`,
  },
  {
    id: "proc-003",
    title: "Proceso Reintegro / Reembolso",
    category: "Reintegros",
    tags: ["reembolso", "reintegro", "PDELOSREYES"],
    steps: [
      {
        title: "Identificar tipo de reintegro",
        description:
          "Determinar si es reintegro económico (mascotas, accidente) o reintegro de beneficios (divorcio, matrimonio, nacimiento, titulación).",
      },
      {
        title: "Tomar todos los datos necesarios",
        description: "Recopilar la información específica según el tipo de reintegro.",
        subSteps: [
          "Nombre y RUT del titular",
          "Detalle del evento (fecha, documentación)",
          "Correo electrónico",
        ],
        note: "Ver sección de Preguntas de Descarte → Beneficios para el detalle de cada tipo.",
      },
      {
        title: "Asignar a Reintegro y delegar",
        description: "Crear la solicitud en el sistema y derivar al responsable.",
        warning: "Siempre delegar a PDELOSREYES para gestión de reintegros.",
      },
      {
        title: "Informar tiempo de respuesta",
        description:
          "Para Sura Uber: informar que la respuesta es en un máximo de 15 días hábiles.",
      },
    ],
  },
];
