export type CmsItem = {
  id?: number;
  type: string;
  slug: string;
  title: string;
  content: Record<string, unknown>;
  sort_order: number;
  published: boolean;
  updated_at?: string;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }
  return result as T;
}

export function getPublicContent(type: string) {
  return request<CmsItem[]>(`/api/content?type=${encodeURIComponent(type)}`);
}

export function getPublicContentItem(type: string, slug: string) {
  return request<CmsItem | null>(
    `/api/content/${encodeURIComponent(type)}/${encodeURIComponent(slug)}`,
  );
}

export function getAdminSession() {
  return request<{ authenticated: boolean }>("/api/admin/session");
}

export function loginAdmin(username: string, password: string) {
  return request<{ authenticated: boolean }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function logoutAdmin() {
  return request<{ authenticated: boolean }>("/api/admin/logout", {
    method: "POST",
  });
}

export function getAdminContent() {
  return request<CmsItem[]>("/api/admin/content");
}

export function saveAdminContent(item: CmsItem) {
  return request<CmsItem>("/api/admin/content", {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export function deleteAdminContent(id: number) {
  return request<{ deleted: boolean }>(`/api/admin/content/${id}`, {
    method: "DELETE",
  });
}

export async function uploadAdminMedia(file: File) {
  const response = await fetch("/api/admin/media", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": file.type },
    body: file,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `Image upload failed (${response.status})`);
  }
  return result as { url: string };
}
