"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BottomDock from "@/components/BottomDock";
import PageChromeControls from "@/components/PageChromeControls";
import { books, type Book } from "@/lib/books";

function BookCover({ book, priority = false }: { book: Book; priority?: boolean }) {
  if (book.cover) {
    return (
      <Image
        src={book.cover}
        alt={`${book.title} cover`}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 170px"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-end p-4"
      style={{ background: `linear-gradient(145deg, ${book.tint}, color-mix(in srgb, ${book.tint} 56%, #050505))` }}
    >
      <p className="line-clamp-5 text-sm font-medium leading-tight text-black">{book.title}</p>
    </div>
  );
}

function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <article className="content-auto min-w-0">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-white/10 shadow-2xl shadow-black/30"
        style={{ aspectRatio: "2 / 3" }}
      >
        <BookCover book={book} priority={index < 4} />
      </div>
      <h3 className="mt-4 line-clamp-3 text-sm leading-snug text-[var(--site-fg)]/82">
        {book.title}
      </h3>
    </article>
  );
}

export default function BooksSection() {
  return (
    <section className="min-h-screen w-full bg-[var(--site-bg)] px-6 py-14 pb-32 text-[var(--site-fg)] sm:px-10 md:px-16 lg:px-24">
      <PageChromeControls backHref="/" closeHref="/" backLabel="Back home" closeLabel="Close books" />

      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h1 className="text-5xl font-medium sm:text-6xl">books</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--site-muted)]">
            A running shelf of books worth returning to.
          </p>
        </motion.header>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>
      </div>

      <BottomDock />
    </section>
  );
}
