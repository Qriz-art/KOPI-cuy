export default function Loading() {
  return (
    <div className="shell py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Memuat halaman...</span>

      <div className="h-6 w-32 animate-shimmer rounded-full bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />
      <div className="mt-5 h-11 w-3/4 max-w-xl animate-shimmer rounded-2xl bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />
      <div className="mt-4 h-4 w-full max-w-2xl animate-shimmer rounded-full bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />
      <div className="mt-3 h-4 w-2/3 max-w-lg animate-shimmer rounded-full bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-cream"
          >
            <div className="aspect-[4/3] w-full animate-shimmer bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-2/3 rounded-full bg-beige" />
              <div className="h-3 w-full rounded-full bg-beige/70" />
              <div className="h-3 w-1/2 rounded-full bg-beige/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
