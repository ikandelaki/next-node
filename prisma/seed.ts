import { PrismaClient, Prisma } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const menuData: Prisma.MenuCreateInput[] = [
  {
    name: "Cards",
    identifier: "cards",
    menuItems: {
      create: [
        {
          label: "Magic",
          code: "magic",
          link: "/cards/magic",
        },
        {
          label: "Cardistry",
          code: "cardistry",
          link: "/cards/cardistry",
        },
      ],
    },
  },
  {
    name: "Cards 2",
    identifier: "cards-2",
    menuItems: {
      create: [
        {
          label: "Magic 2",
          code: "magic-2",
          link: "/cards/magic-2",
        },
        {
          label: "Cardistry 2",
          code: "cardistry-2",
          link: "/cards/cardistry-2",
        },
      ],
    },
  },
];

export async function main() {
  for (const menu of menuData) {
    await prisma.menu.create({ data: menu });
  }
}

main();
