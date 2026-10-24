import { useCmsItem } from "@/hooks/useCmsContent";

export type ServicePageData = Record<string, unknown>;

export function useServicePage(slug: string) {
  return useCmsItem("service", slug);
}

export function getServicePageData(content: Record<string, unknown> | undefined) {
  const value = content?.pageData;
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as ServicePageData)
    : undefined;
}

export function serviceText(data: ServicePageData, key: string): string {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

export function serviceArray<T>(data: ServicePageData, key: string): T[] {
  const value = data[key];
  return Array.isArray(value) ? (value as T[]) : [];
}
