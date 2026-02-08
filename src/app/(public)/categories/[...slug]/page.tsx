import prisma from "@/lib/prisma";
import { normalizeImageUrl } from "@/lib/utils/url";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  if (!slug?.length) {
    return notFound();
  }

  const category = await prisma.category.findUnique({
    where: {
      urlPath: slug.join("/"),
    },
  });

  if (!category) {
    return notFound();
  }

  const renderMainCategoryImage = () => {
    const { mainImage } = category;

    if (!mainImage) {
      return null;
    }

    return (
      <div>
        <Image src={normalizeImageUrl(mainImage)} width={240} height={240} alt="Main category image" />
      </div>
    );
  };

  const renderHeaderSection = () => {
    return (
      <header className="Section flex justify-center items-center gap-8 h-[272]">
        <div>
          <h1>{category.name}</h1>
          <h2>{category.description}</h2>
        </div>
        {renderMainCategoryImage()}
      </header>
    );
  };

  return <div>{renderHeaderSection()}</div>;
}
