import { Product } from "@/app/generated/prisma/client";
import ProductCard from "@/components/ProductCard";
import { ProductWithMediaGallery } from "@/types/product";

type ProductListComponentType = {
  products: ProductWithMediaGallery[];
};

export default function ProductListComponent({ products }: ProductListComponentType) {
  const renderNoResults = () => {
    return (
      <section>
        <h2>No products matched your search criteria...</h2>
      </section>
    );
  };

  if (!products) {
    return renderNoResults();
  }

  const renderProductListItem = (product: ProductWithMediaGallery) => {
    return <ProductCard product={product} key={product.id} />;
  };

  const renderProductList = () => {
    return products.map((product: ProductWithMediaGallery) => renderProductListItem(product));
  };

  return (
    <section className="grid grid-cols-3 max-w-7xl mx-auto mt-16 justify-items-center">{renderProductList()}</section>
  );
}
