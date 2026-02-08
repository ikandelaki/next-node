import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (!slug?.length) {
    return notFound();
  }

  const lastCategoryUrlKey = slug[slug.length - 1];
  const category = await prisma.category.findUnique({
    where: {
      urlKey: lastCategoryUrlKey,
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <h1>{category.name}</h1>
    </div>
  );
}
