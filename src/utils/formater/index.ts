"use client";
import { format } from "date-fns";
export function formatedTime(data: any) {
  const date = new Date(data);

  const options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}
