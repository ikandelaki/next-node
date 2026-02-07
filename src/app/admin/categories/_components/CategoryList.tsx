import Expandable from "@/components/Expandable";
import prisma from "@/lib/prisma";
import Link from "next/link";

type FlatCategory = {
  id: number;
  name: string;
  parentId: number | null;
  path: string;
};

type CategoryNode = FlatCategory & { children: CategoryNode[] };

export default async function CategoryList() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true, parentId: true, path: true /* + any other fields */ },
  });

  // Build tree
  function buildTree(items: FlatCategory[]): CategoryNode[] {
    const map = new Map<number, CategoryNode>();
    items.forEach((i) => map.set(i.id, { ...i, children: [] }));

    const roots: CategoryNode[] = [];
    for (const node of map.values()) {
      if (node.parentId == null) {
        roots.push(node);
      } else {
        const parent = map.get(node.parentId);
        if (parent) parent.children.push(node);
        else roots.push(node); // orphan handling
      }
    }
    return roots;
  }

  const tree = buildTree(categories as FlatCategory[]);

  console.log(">> tree", tree);
  const renderCategoryListItem = (category: CategoryNode) => {
    const { children } = category;
    if (children?.length) {
      return (
        <Expandable
          key={category.id}
          title={
            <li>
              <Link href={`/admin/categories/${category.path}`}>{category.name}</Link>
            </li>
          }
        >
          {renderCategoryList("ml-6", children)}
        </Expandable>
      );
    }

    return (
      <li key={category.id}>
        <Link href={`/admin/categories/${category.path}`}>{category.name}</Link>
      </li>
    );
  };

  const renderCategoryList = (className?: string, categoryList?: CategoryNode[]) => {
    const list = categoryList ?? tree;

    if (!list || !list?.length) {
      return <span>You have no categories...</span>;
    }

    return (
      <ul className={`list-[circle] ${className} flex flex-col gap-2`}>
        {list.map((category) => renderCategoryListItem(category as CategoryNode))}
      </ul>
    );
  };

  return (
    <section className="Section flex flex-col gap-4">
      <h2>Category list</h2>
      {renderCategoryList()}
    </section>
  );
}
