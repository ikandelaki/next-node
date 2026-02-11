import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import prisma from "@/lib/prisma";
import { normalizeImageUrl } from "@/lib/utils/url";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(">> slug", slug);

  const product = await prisma.product.findUnique({
    where: {
      urlKey: slug,
    },
    include: {
      media_gallery: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const renderMediaGallery = () => {
    const { media_gallery } = product;

    if (!media_gallery?.length) {
      return null;
    }

    return (
      <div className="w-full">
        <EmblaCarousel>
          {media_gallery.map((image, key) => (
            <Image
              src={normalizeImageUrl(image?.url)}
              width={520}
              height={520}
              alt="Product images"
              className="w-full"
              key={`${key}-${image.id}`}
            />
          ))}
        </EmblaCarousel>
      </div>
    );
  };

  const renderProductDetails = () => {
    const { name, sku } = product;

    return (
      <div className="w-full">
        <span>{name}</span>
        <span>{sku}</span>
      </div>
    );
  };

  return (
    <div className="flex max-w-7xl mx-auto">
      {renderMediaGallery()}
      {renderProductDetails()}
    </div>
  );
}
