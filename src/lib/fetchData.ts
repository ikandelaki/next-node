import { ERROR_TYPE } from "@/store/useNotificationStore";

type SettingsType = {
  [key: string]: unknown;
};

export const fetchNext = async (
  api?: string,
  body?: BodyInit,
  settings?: SettingsType,
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/${api}`, {
      method: "POST",
      body,
      ...settings,
    });

    return await res.json();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong...";
    return { type: ERROR_TYPE, message };
  }
};
