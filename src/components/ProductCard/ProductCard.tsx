import { normalizeImageUrl } from "@/lib/utils/url";
import { ProductWithMediaGallery } from "@/types/product";
import Image from "next/image";

type ProductCardType = {
  product: ProductWithMediaGallery;
};

export default function ProductCard({ product }: ProductCardType) {
  const renderProductImage = () => {
    const { media_gallery } = product;

    if (!media_gallery?.length) {
      return null;
    }

    return <Image src={normalizeImageUrl(media_gallery[0].url)} width={240} height={240} alt="Product image" />;
  };

  const renderProductTitle = () => {
    const { name } = product;

    return <h3>{name}</h3>;
  };
  return (
    <div className="flex flex-col max-w-max">
      {renderProductImage()}
      {renderProductTitle()}
    </div>
  );
}
