import { redirect } from "next/navigation";

export default async function LegacyWritingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/writing/${id}`);
}
