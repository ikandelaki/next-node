"use client";

import { MenuItemType } from "@/types/menu";
import Link from "next/link";
import LogoIcon from "../LogoIcon";
import MenuBurgerIcon from "../MenuBurgerIcon/MenuBurgerIcon";
import { Menu } from "@/app/generated/prisma/browser";
import { useState } from "react";
import XIcon from "@/components/XIcon";

export default function MenuComponent({ menu }: { menu: Menu & { menuItems: MenuItemType[] } }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMenuExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderMenuItem = ({ id, label, link }: MenuItemType) => {
    return (
      <div className="hover-underline" key={id}>
        <Link href={link} onClick={handleMenuExpand}>
          {label}
        </Link>
      </div>
    );
  };

  const renderMenuItems = () => {
    return menu.menuItems.map((menuItem) => renderMenuItem(menuItem));
  };

  const renderLogo = () => {
    return (
      <div className="w-8 h-8 transition-all duration-150">
        <Link href="/">
          <LogoIcon />
        </Link>
      </div>
    );
  };

  const renderAdminLink = () => {
    return (
      <Link href="/admin/dashboard" className="text-red-400 hover-underline_red hidden md:block">
        Admin
      </Link>
    );
  };

  const renderAdditionalLinks = () => (
    <div className="md:ml-auto flex items-center gap-8">
      {renderAdminLink()}
      {renderLogo()}
    </div>
  );

  const renderMobileMenuHeader = () => {
    return (
      <div className="max-h-(--mobile-menu-height) [&_svg]:h-(--mobile-menu-height) md:hidden">
        <button onClick={handleMenuExpand} className={`${isExpanded ? "hidden" : "block"}`}>
          <MenuBurgerIcon />
        </button>
        <button onClick={handleMenuExpand} className={`${isExpanded ? "block" : "hidden"}`}>
          <XIcon />
        </button>
      </div>
    );
  };

  return (
    <div>
      {renderMobileMenuHeader()}
      <div
        className={`h-[calc(100dvh-var(--mobile-menu-height))] md:h-full flex flex-col md:flex-row items-center justify-center md:justify-start w-full py-2 px-4 gap-8 bg-navbar absolute md:relative top-12 md:top-0 left-0 -translate-x-full ${isExpanded ? "translate-x-0" : ""} md:translate-x-[unset] transition-translate duration-300`}
      >
        {renderMenuItems()}
        {renderAdditionalLinks()}
      </div>
    </div>
  );
}
