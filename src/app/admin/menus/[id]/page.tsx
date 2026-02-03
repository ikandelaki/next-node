import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMenuForm from "./_components/EditMenuForm";
import { ERROR_TYPE, SUCCESS_TYPE } from "@/store/useNotificationStore";

export default async function Menu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const menu = await prisma.menu.findUnique({
    where: { id: parseInt(id) },
    include: { menuItems: true },
  });

  if (!menu) {
    notFound();
  }

  const deleteMenu = async () => {
    "use server";

    try {
      const deleteMenuItems = prisma.menuItem.deleteMany({
        where: { parentId: parseInt(id) },
      });

      const deleteMenu = prisma.menu.delete({
        where: { id: parseInt(id) },
      });

      await prisma.$transaction([deleteMenuItems, deleteMenu]);

      return { type: SUCCESS_TYPE, message: "Menu deleted successfully" };
    } catch {
      return { type: ERROR_TYPE, message: "Internal server error" };
    }
  };

  return (
    <section className="Section">
      <h1>Edit Menu</h1>
      <EditMenuForm menu={menu} deleteMenu={deleteMenu} />
    </section>
  );
}
