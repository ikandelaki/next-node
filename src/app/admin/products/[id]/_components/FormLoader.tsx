"use client";

import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader/Loader";

export function FormLoader() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return <Loader />;
}
