import { normalizeImageUrl } from "@/lib/utils/url";
import { calculateDiscountPercentage, formatPrice } from "@/lib/utils/utils";
import { ProductWithMediaGallery } from "@/types/product";
import Image from "next/image";
import Button from "../Button";

type ProductCardType = {
  product: ProductWithMediaGallery;
};

export default function ProductCard({ product }: ProductCardType) {
  const renderProductImage = () => {
    const { media_gallery } = product;

    if (!media_gallery?.length) {
      return null;
    }

    return (
      <div className="w-max h-max rounded-lg overflow-hidden">
        <Image
          src={normalizeImageUrl(media_gallery[0].url)}
          width={320}
          height={320}
          alt="Product image"
          className="w-full"
        />
      </div>
    );
  };

  const renderPrice = () => {
    const { price, discountPrice } = product;

    if (!discountPrice) {
      return (
        <div>
          <span className="text-lg">{formatPrice(price)}</span>
        </div>
      );
    }

    return (
      <div>
        <span className="text-lg text-red-600">{formatPrice(discountPrice)}</span>
        <span className="text-gray-600 line-through ml-2 text-md font-normal">{formatPrice(price)}</span>
        <span className="ml-2 text-sm font-bold">{calculateDiscountPercentage(price, discountPrice)}</span>
      </div>
    );
  };

  const renderProductDetails = () => {
    return (
      <div className="flex flex-col p-2">
        {renderProductTitle()}
        {renderPrice()}
      </div>
    );
  };

  const renderProductTitle = () => {
    const { name } = product;

    return <h3 className="text-sm font-normal">{name}</h3>;
  };

  const renderAddToCart = () => {
    return (
      <div className="hidden bg-gray-100 p-2 absolute bottom-0 left-0 translate-y-4/5 w-full rounded-b-lg">
        <Button text="Add To Cart" className="w-full" />
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-max p-1 bg-gray-100 rounded-lg text-dark-gray font-bold relative overflow-hidden hover:overflow-visible hover:[&>div]:block h-max">
      {renderProductImage()}
      {renderProductDetails()}
      {renderAddToCart()}
    </div>
  );
}
