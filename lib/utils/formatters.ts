import { DATE_FORMAT } from "./constants";

export const formatDate = (date: Date): string => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const formatNumber = (number: number): string => {
  return number.toLocaleString("en-US");
};