import { notFound } from "next/navigation";
import { AdminWeddingEditor } from "@/components/admin-wedding-editor";
import { getWeddingRecordForAdmin } from "@/lib/production-repositories";

type AdminWeddingEditPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ saved?: string }>;
};

export default async function AdminWeddingEditPage({
  params,
  searchParams
}: AdminWeddingEditPageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : undefined;
  const record = await getWeddingRecordForAdmin(slug);

  if (!record?.contentJson) {
    notFound();
  }

  return <AdminWeddingEditor record={record} saved={query?.saved === "1"} />;
}
