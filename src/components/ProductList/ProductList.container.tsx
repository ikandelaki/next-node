import prisma from "@/lib/prisma";
import ProductListComponent from "./ProductList.component";

type ProductListContainerTypes = {
  categoryId: number;
};

export default async function ProductListContainer({ categoryId }: ProductListContainerTypes) {
  const products = await prisma.categoryOnProducts.findMany({
    where: { categoryId },
    include: {
      product: {
        include: {
          media_gallery: true,
        },
      },
    },
  });

  const getFormattedProducts = () => {
    return products?.map(({ product }) => ({ ...product }));
  };

  return <ProductListComponent products={getFormattedProducts()} />;
}
