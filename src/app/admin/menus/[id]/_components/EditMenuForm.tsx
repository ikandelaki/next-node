"use client";

import Field from "@/components/Field";
import FieldGroup from "@/components/FieldGroup";
import type { MenuGetPayload } from "@/app/generated/prisma/models/Menu";
import { getFormattedMenuDataFromForm } from "@/app/admin/menus/_lib/utils";
import {
  ERROR_TYPE,
  SUCCESS_TYPE,
  useNotificationStore,
} from "@/store/useNotificationStore";
import { fetchNext } from "@/lib/fetchData";
import { redirect, useRouter } from "next/navigation";
import TrashIcon from "@/components/TrashIcon";
import { useState, useEffect } from "react";

type EditMenuFormProps = {
  menu: MenuGetPayload<{ include: { menuItems: true } }>;
  deleteMenu: () => Promise<{ type: string; message: string }>;
};

export default function EditMenuForm({ menu, deleteMenu }: EditMenuFormProps) {
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications,
  );
  const router = useRouter();
  const { menuItems } = menu || {};
  const [dynamicMenuItems, setDynamicMenuItems] = useState(menuItems);

  useEffect(() => {
    setDynamicMenuItems(menuItems);
  }, [menuItems]);

  const handleDeleteButton = (idx: number) => {
    const newMenuItems = dynamicMenuItems.filter((_, i) => i !== idx);

    setDynamicMenuItems(newMenuItems);
  };

  const renderDeleteButton = (idx: number) => {
    return (
      <TrashIcon
        onClick={() => handleDeleteButton(idx)}
        className="hover:shadow-2xs hover:shadow-white transition-shadow duration-150"
      />
    );
  };

  const handleDeleteMenuClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const response = (await deleteMenu()) || {};

    setNotifications(response);
    if (response.type === SUCCESS_TYPE) {
      redirect("/admin/menus");
    }
  };

  const renderDeleteMenuButton = () => {
    return (
      <button
        className="Button ml-2 bg-notification-error hover:bg-red-light!"
        onClick={handleDeleteMenuClick}
      >
        Delete
      </button>
    );
  };

  const handleAddField = () => {
    setDynamicMenuItems([
      ...dynamicMenuItems,
      {
        id: 0,
        code: "",
        label: "",
        link: "",
        parentId: menu.id,
      },
    ]);
  };

  const renderAddFieldButton = () => {
    return (
      <button
        type="button"
        onClick={handleAddField}
        className="Button block w-full"
      >
        + Add
      </button>
    );
  };

  const renderMenuItems = () => {
    return (
      <div className="mt-6 w-max">
        <h2 className="text-xl">Menu items</h2>
        {dynamicMenuItems.map((menuItem, idx) => (
          <FieldGroup className="mt-2 py-2 border-b border-line" key={idx}>
            {(key) => (
              <>
                <Field
                  type="text"
                  placeholder="title"
                  label="Menu item title"
                  id={`${menuItem.code}-${key}`}
                  name="menu-item-title"
                  isRequired
                  defaultValue={menuItem.label}
                  className="[&>input]:ml-auto"
                />
                <Field
                  type="text"
                  placeholder="link"
                  label="Menu item link"
                  id={`${menuItem.link}-${key}`}
                  name="menu-item-link"
                  isRequired
                  defaultValue={menuItem.link}
                  className="[&>input]:ml-auto"
                />
                <Field
                  type="hidden"
                  name="menu-item-id"
                  defaultValue={menuItem.id || ""}
                  id={`menu-item-id-${key}`}
                />
                {renderDeleteButton(idx)}
              </>
            )}
          </FieldGroup>
        ))}
      </div>
    );
  };

  const editMenu = async (formData: FormData) => {
    const rawFormData = getFormattedMenuDataFromForm(formData);
    const editFormData = {
      ...rawFormData,
      id: menu.id,
    };

    const { name, identifier, menuItems } = editFormData;

    if (!name || !identifier || !menuItems?.length) {
      setNotifications({
        type: ERROR_TYPE,
        message: "Please fill out all the necessary fields",
      });

      return;
    }

    const { type, message } =
      (await fetchNext(
        `menus/edit/${menu.id}`,
        JSON.stringify(editFormData),
      )) || {};

    if (type === SUCCESS_TYPE) {
      setNotifications({ type, message: "Menu updated successfully" });
      router.refresh();

      return;
    }

    setNotifications({ type, message });
    router.refresh();
  };

  return (
    <form action={editMenu} className="w-max">
      <Field
        type="text"
        placeholder="Menu name"
        label="Menu name"
        id="menu-name"
        isRequired
        className="[&>input]:ml-auto"
        defaultValue={menu.name}
      />
      <Field
        type="text"
        placeholder="Menu identifier"
        label="Menu identifier"
        id="menu-identifier"
        isRequired
        className="mt-2 [&>input]:ml-auto"
        defaultValue={menu.identifier}
      />
      {renderMenuItems()}
      {renderAddFieldButton()}
      <button type="submit" className="Button mt-4">
        Save
      </button>
      {renderDeleteMenuButton()}
    </form>
  );
}
