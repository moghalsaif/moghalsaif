"use client";

import Image from "next/image";
import { Check, Copy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { books, type Book } from "@/lib/books";
import { haptics } from "@/lib/haptics";

function BookCover({ book }: { book: Book }) {
  if (book.cover) {
    return (
      <Image
        src={book.cover}
        alt={`${book.title} cover`}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 48vw, (max-width: 1024px) 28vw, 180px"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between overflow-hidden px-4 py-5"
      style={{
        background: `linear-gradient(145deg, ${book.tint}, color-mix(in srgb, ${book.tint} 54%, #1A1814))`,
      }}
    >
      <div
        className="absolute inset-y-0 left-0 w-[12%]"
        style={{ background: "rgba(26, 24, 20, 0.18)" }}
      />
      <div className="relative ml-3 h-full border border-[#1A1814]/20" />
      <div className="relative ml-3">
        <p
          className="line-clamp-4 text-base leading-tight"
          style={{ color: "#1A1814", fontFamily: "var(--font-playfair)" }}
        >
          {book.title}
        </p>
        <p
          className="mt-3 text-[9px] uppercase tracking-[0.16em]"
          style={{ color: "rgba(26, 24, 20, 0.62)", fontFamily: "var(--font-inter)" }}
        >
          Reading list
        </p>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (button: HTMLButtonElement) => {
    haptics.medium(button);
    const text = book.title;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  };

  return (
    <article className="group flex min-w-0 flex-col items-center text-center">
      <div className="[perspective:900px]">
        <div
          className="relative w-[142px] overflow-hidden rounded-[6px] border shadow-sm group-hover:animate-[book-cover-museum_6s_linear_infinite] sm:w-[154px] md:w-[168px]"
          style={{
            aspectRatio: "2 / 3",
            borderColor: "var(--site-border)",
            boxShadow: "0 18px 38px rgba(26, 24, 20, 0.14)",
            transformStyle: "preserve-3d",
          }}
        >
          <BookCover book={book} />
        </div>
      </div>

      <div className="mt-4 flex w-full max-w-[260px] items-start justify-center gap-2">
        <div className="min-w-0">
          <h3
            className="line-clamp-3 text-sm leading-snug sm:text-[15px]"
            style={{ color: "var(--site-fg)", fontFamily: "var(--font-playfair)" }}
          >
            {book.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={(e) => handleCopy(e.currentTarget)}
          className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
          style={{
            borderColor: copied ? "var(--site-fg)" : "var(--site-border)",
            color: copied ? "var(--site-bg)" : "var(--site-muted)",
            background: copied ? "var(--site-fg)" : "transparent",
          }}
          aria-label={`Copy ${book.title}`}
        >
          {copied ? <Check size={13} strokeWidth={1.7} /> : <Copy size={13} strokeWidth={1.7} />}
        </button>
      </div>
    </article>
  );
}

export default function BooksSection() {
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen w-full px-5 py-10 sm:px-10 sm:py-14"
      style={{ backgroundColor: "var(--site-bg)" }}
    >
      <button
        type="button"
        onClick={(e) => {
          haptics.medium(e.currentTarget);
          router.push("/");
        }}
        className="fixed right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
        style={{
          borderColor: "var(--site-accent)",
          color: "var(--site-accent)",
          background: "var(--site-bg)",
        }}
        aria-label="Close books"
      >
        <X size={16} strokeWidth={1.8} />
      </button>

      <div
        className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl rounded-[8px] border px-5 py-8 sm:px-8 md:px-12 md:py-12"
        style={{ borderColor: "var(--site-border)" }}
      >
        <div className="mb-12 sm:mb-16">
          <h2
            className="text-5xl font-normal italic md:text-6xl"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--site-fg)",
              borderBottom: "2px solid var(--site-accent)",
              paddingBottom: "8px",
              display: "inline-block",
            }}
          >
            Books
          </h2>
          <p
            className="mt-5 max-w-xl text-sm leading-7 sm:text-[15px]"
            style={{
              color: "var(--site-muted)",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
            }}
          >
            A running shelf of books worth returning to.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-12 max-[720px]:grid-cols-1 lg:gap-y-16">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
