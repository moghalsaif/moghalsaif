import type { Metadata } from "next";
import BooksSection from "@/components/BooksSection";

export const metadata: Metadata = {
  title: "Books · Moghal Saif",
  description: "Books read and recommended by Moghal Saif.",
};

export default function BooksPage() {
  return <BooksSection />;
}
