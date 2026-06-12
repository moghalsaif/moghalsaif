type PageSkeletonProps = {
  variant?: "home" | "list" | "projects" | "story" | "books" | "article";
};

function Block({ className = "" }: { className?: string }) {
  return <div className={`skeleton-block rounded-xl ${className}`} />;
}

function DockPlaceholder() {
  return (
    <div
      className="fixed bottom-3 left-1/2 z-[500] h-12 w-[min(25rem,calc(100vw-0.75rem))] -translate-x-1/2 rounded-full sm:bottom-6 sm:h-14"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--site-card) 72%, transparent), color-mix(in srgb, var(--site-bg) 48%, transparent))",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.08)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        backdropFilter: "blur(18px) saturate(160%)",
      }}
      aria-hidden="true"
    />
  );
}

function BooksSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 18 }).map((_, index) => (
        <div key={index}>
          <Block className="aspect-[2/3] w-full" />
          <Block className="mt-4 h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

function RowsSkeleton({ count = 7 }: { count?: number }) {
  return (
    <div className="mt-14 divide-y divide-[var(--site-border)]">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="py-7">
          <Block className="h-8 w-3/4 max-w-xl" />
          <Block className="mt-4 h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

export default function PageSkeleton({ variant = "list" }: PageSkeletonProps) {
  if (variant === "home") {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] text-[var(--site-fg)]" aria-busy="true">
        <section className="flex min-h-screen flex-col items-center justify-center px-6">
          <Block className="h-16 w-44 rounded-2xl" />
          <Block className="mt-12 h-[42vh] w-full max-w-lg rounded-[2rem]" />
        </section>
        <DockPlaceholder />
      </main>
    );
  }

  if (variant === "story") {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] px-6 py-16 pb-28 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24" aria-busy="true">
        <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-28">
          <div>
            <Block className="h-14 w-36" />
            <Block className="mt-6 h-5 w-72 max-w-full" />
            <Block className="mt-12 h-[420px] w-full max-w-[470px] rounded-3xl" />
          </div>
          <div className="space-y-5 pt-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <Block key={index} className={`h-5 ${index % 3 === 0 ? "w-10/12" : "w-full"}`} />
            ))}
          </div>
        </div>
        <DockPlaceholder />
      </main>
    );
  }

  if (variant === "books") {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] px-6 py-14 pb-32 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24" aria-busy="true">
        <div className="mx-auto w-full max-w-6xl">
          <Block className="h-14 w-36" />
          <Block className="mt-6 h-5 w-80 max-w-full" />
          <div className="mt-14">
            <BooksSkeleton />
          </div>
        </div>
        <DockPlaceholder />
      </main>
    );
  }

  if (variant === "article") {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] px-5 py-10 pb-28 text-[var(--site-fg)] sm:px-10 md:py-16" aria-busy="true">
        <article className="mx-auto max-w-[760px]">
          <Block className="h-10 w-36 rounded-full" />
          <Block className="mt-14 h-5 w-28" />
          <Block className="mt-5 h-16 w-full max-w-xl" />
          <div className="mt-12 space-y-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Block key={index} className={`h-5 ${index % 4 === 0 ? "w-9/12" : "w-full"}`} />
            ))}
          </div>
        </article>
        <DockPlaceholder />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--site-bg)] px-6 py-16 pb-28 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24" aria-busy="true">
      <div className="mx-auto w-full max-w-5xl">
        <Block className="h-14 w-48" />
        {variant === "projects" && <Block className="mt-6 h-5 w-full max-w-xl" />}
        <RowsSkeleton count={variant === "projects" ? 6 : 7} />
      </div>
      <DockPlaceholder />
    </main>
  );
}
