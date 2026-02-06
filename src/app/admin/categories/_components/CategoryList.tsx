import { Category } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export default async function CategoryList() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      children: true,
      parentId: true,
    },
  });

  type CategoryListItem = Pick<Category, "id" | "name" | "parentId"> & {
    children: Category[];
  };

  const renderCategoryListItem = (category: CategoryListItem) => {
    return (
      <li key={category.id} className="mt-2 list-disc">
        {category.name}
      </li>
    );
  };

  const renderCategoryList = () => {
    if (!categories || !categories?.length) {
      return <span>You have no categories...</span>;
    }

    return (
      <ul>
        {categories.map((category) =>
          renderCategoryListItem(category as CategoryListItem),
        )}
      </ul>
    );
  };

  return (
    <section className="Section">
      <h2>Category list</h2>
      {renderCategoryList()}
    </section>
  );
}
