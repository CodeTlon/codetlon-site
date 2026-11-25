// FOS Method (Factory Operating System) — las 6 fases de cada proyecto.
// Fuente única para el home (FOSMethod), /proceso y el detalle de cada servicio.
// Sin duraciones: el cronograma depende del alcance y se define en la Propuesta.
export interface FosPhase {
  number: string
  title: string
  summary: string
  description: string
  deliverables: string[]
}

export const fosPhases: FosPhase[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    summary:
      'Entendemos tu negocio, tus procesos y tus objetivos para definir qué hay que construir, sin suposiciones.',
    description:
      'Analizamos tu negocio, tus procesos actuales y lo que querés lograr. Revisamos sistemas y herramientas existentes, hacemos las preguntas que importan y definimos el alcance real del proyecto.',
    deliverables: ['Objetivos validados', 'Alcance definido', 'Solución recomendada'],
  },
  {
    number: '02',
    title: 'Propuesta',
    summary:
      'Definimos alcance, tecnología, etapas y costos. Todo claro antes de escribir la primera línea de código.',
    description:
      'Preparamos la propuesta técnica: arquitectura, tecnologías, funcionalidades, etapas de entrega y criterios de aceptación. El cronograma se define acá, según el alcance acordado.',
    deliverables: ['Propuesta técnica', 'Cronograma por etapas', 'Criterios de aceptación'],
  },
  {
    number: '03',
    title: 'Diseño',
    summary:
      'Diseñamos la arquitectura y las interfaces pensando en quienes las van a usar todos los días.',
    description:
      'Diseñamos la arquitectura del sistema, el modelo de datos y las interfaces. Sin plantillas: cada pantalla responde a tu marca y a cómo trabajan tus usuarios.',
    deliverables: ['Arquitectura y modelo de datos', 'Diseño de pantallas clave', 'Aprobación del diseño'],
  },
  {
    number: '04',
    title: 'Desarrollo',
    summary:
      'Construimos por etapas, con entregas parciales que podés revisar y código mantenible.',
    description:
      'Desarrollamos por etapas con código modular, tipado y versionado. Cada funcionalidad va en su propia rama y se integra solo cuando pasa las revisiones.',
    deliverables: ['Repositorio privado', 'Entregas parciales revisables', 'Historial de cambios documentado'],
  },
  {
    number: '05',
    title: 'Revisión',
    summary:
      'Probamos cada entrega con tests automatizados y controles de calidad antes de que llegue a producción.',
    description:
      'Corremos tests automatizados de punta a punta, revisamos rendimiento, seguridad y accesibilidad, y validamos con vos cada funcionalidad. Nada llega a producción sin pasar el filtro.',
    deliverables: ['Tests automatizados en verde', 'Revisión de seguridad y accesibilidad', 'Validación del cliente'],
  },
  {
    number: '06',
    title: 'Lanzamiento',
    summary:
      'Publicamos de forma segura y acompañamos la puesta en marcha y la evolución del proyecto.',
    description:
      'Publicamos en la infraestructura acordada, configuramos dominios, variables y copias de seguridad, y verificamos todo en vivo. Es el inicio de la relación, no el final.',
    deliverables: ['Publicación en producción', 'Accesos y documentación entregados', 'Plan de soporte acordado'],
  },
]
