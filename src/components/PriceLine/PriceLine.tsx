import { calculateDiscountPercentage, formatPrice } from "@/lib/utils/utils";

type PriceLineProps = {
  price: number;
  discountPrice?: number;
};

export default function PriceLine({ price, discountPrice }: PriceLineProps) {
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
}
