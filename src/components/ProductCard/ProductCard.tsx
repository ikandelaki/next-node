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
        <Image src={normalizeImageUrl(media_gallery[0].url)} width={240} height={240} alt="Product image" />
      </div>
    );
  };

  const renderPrice = () => {
    const { price, discountPrice } = product;

    if (!discountPrice) {
      return (
        <div className="mt-1">
          <span className="text-md">{formatPrice(price)}</span>
        </div>
      );
    }

    return (
      <div className="mt-1">
        <span className="text-md">{formatPrice(discountPrice)}</span>
        <span className="text-gray-600 line-through ml-2 text-sm">{formatPrice(price)}</span>
        <span className="text-red-600 ml-2 text-sm">{calculateDiscountPercentage(price, discountPrice)}</span>
      </div>
    );
  };

  const renderProductDetails = () => {
    return (
      <div className="mt-4 flex flex-col px-2">
        {renderProductTitle()}
        {renderPrice()}
      </div>
    );
  };

  const renderProductTitle = () => {
    const { name } = product;

    return <h3 className="text-xl">{name}</h3>;
  };

  const renderAddToCart = () => {
    return (
      <div className="hidden bg-gray-100 p-2 absolute bottom-0 left-0 translate-y-4/5 w-full">
        <Button text="Add To Cart" className="w-full" />
      </div>
    );
  };

  return (
    <div className="flex flex-col max-w-max p-2 bg-gray-100 rounded-xl text-dark-gray font-bold relative overflow-hidden hover:overflow-visible hover:[&>div]:block h-max">
      {renderProductImage()}
      {renderProductDetails()}
      {renderAddToCart()}
    </div>
  );
}
