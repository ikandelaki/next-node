import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(">> slug", slug);

  const product = await prisma.product.findUnique({
    where: {
      urlKey: slug,
    },
  });

  if (!product) {
    return notFound();
  }

  return <div>{product.name}</div>;
}
