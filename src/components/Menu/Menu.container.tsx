import prisma from "@/lib/prisma";
import MenuComponent from "./Menu.component";

export default async function Menu() {
  const menu = await prisma.menu.findUnique({
    where: {
      identifier: "cards",
    },
    include: {
      menuItems: true,
    },
  });

  if (!menu) {
    return null;
  }

  return <MenuComponent menu={menu} />;
}
