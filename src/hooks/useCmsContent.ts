import { useQuery } from "@tanstack/react-query";
import { getPublicContent, getPublicContentItem } from "@/lib/cmsApi";

export function useCmsItems(type: string) {
  return useQuery({
    queryKey: ["public-content", type],
    queryFn: async () => {
      try {
        return await getPublicContent(type);
      } catch (error) {
        console.error(`[CMS] Could not load published ${type} content.`, error);
        throw error;
      }
    },
    staleTime: 30_000,
    retry: 1,
  });
}

export function useCmsItem(type: string, slug: string) {
  return useQuery({
    queryKey: ["public-content", type, slug],
    queryFn: async () => {
      try {
        return await getPublicContentItem(type, slug);
      } catch (error) {
        console.error(`[CMS] Could not load published ${type} content.`, error);
        throw error;
      }
    },
    enabled: Boolean(slug),
    staleTime: 30_000,
    retry: 1,
  });
}
