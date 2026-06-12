import WritingDetailPage from "@/components/WritingDetailPage";

export default function WritingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <WritingDetailPage params={params} />;
}
