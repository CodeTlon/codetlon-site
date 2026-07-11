import { Skeleton } from '@/components/ui/skeleton'

// Skeleton genérico de página — imita la forma de PageHero (label/título/subtítulo)
// + un bloque de contenido, para que el loading.tsx de cada ruta top-level
// no salte de un layout vacío a uno lleno. Usado por todos los loading.tsx.
export function PageSkeleton() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 lg:px-8">
      <div className="max-w-4xl space-y-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-14 w-full max-w-2xl md:h-16" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-2/3 max-w-lg" />
      </div>
      <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-3xl" />
        ))}
      </div>
    </div>
  )
}
