import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContentFields from "@/components/admin/ContentFields";
import {
  CmsItem,
  deleteAdminContent,
  getAdminContent,
  getAdminSession,
  loginAdmin,
  logoutAdmin,
  saveAdminContent,
} from "@/lib/cmsApi";

const contentTypes = [
  { value: "page", label: "Pages" },
  { value: "navigation", label: "Navigation" },
  { value: "product", label: "Products" },
  { value: "service", label: "Services" },
  { value: "blog", label: "Blogs" },
  { value: "testimonial", label: "Testimonials" },
];

const emptyItem = (type: string): CmsItem => ({
  type,
  slug: "",
  title: "",
  content: {},
  sort_order: 0,
  published: true,
});

const Admin = () => {
  const queryClient = useQueryClient();
  const { id: editId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedType = searchParams.get("type");
  const initialType = contentTypes.find((type) => type.value === requestedType)?.value || "page";
  const [activeType, setActiveType] = useState(initialType);
  const [loginError, setLoginError] = useState("");
  const sessionQuery = useQuery({
    queryKey: ["admin-session"],
    queryFn: getAdminSession,
    retry: false,
  });
  const contentQuery = useQuery({
    queryKey: ["admin-content"],
    queryFn: getAdminContent,
    enabled: sessionQuery.data?.authenticated === true,
  });
  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      loginAdmin(username, password),
    onSuccess: () => {
      setLoginError("");
      queryClient.invalidateQueries({ queryKey: ["admin-session"] });
    },
    onError: (error: Error) => setLoginError(error.message),
  });
  const logoutMutation = useMutation({
    mutationFn: logoutAdmin,
    onSuccess: () => {
      queryClient.setQueryData(["admin-session"], { authenticated: false });
      queryClient.removeQueries({ queryKey: ["admin-content"] });
    },
  });

  const items = useMemo(
    () => (contentQuery.data || []).filter((item) => item.type === activeType),
    [activeType, contentQuery.data],
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    loginMutation.mutate({
      username: String(form.get("username") || ""),
      password: String(form.get("password") || ""),
    });
  };

  if (sessionQuery.isPending) {
    return <AdminMessage message="Checking admin session..." />;
  }

  if (sessionQuery.isError) {
    return (
      <AdminMessage message={`Admin API is unavailable: ${(sessionQuery.error as Error).message}`} />
    );
  }

  if (!sessionQuery.data?.authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07111e] px-5 text-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            United Technologies
          </p>
          <h1 className="mt-3 text-3xl font-bold">Admin sign in</h1>
          <p className="mt-2 text-sm text-white/60">Sign in to manage website content.</p>
          <label className="mt-7 block text-sm text-white/80" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400"
          />
          <label className="mt-5 block text-sm text-white/80" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan-400"
          />
          {loginError && <p role="alert" className="mt-4 text-sm text-red-300">{loginError}</p>}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111e] text-white">
      <header className="border-b border-white/10 bg-[#0a1726]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              United Technologies
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              {editId === undefined ? "Website content" : "Edit website content"}
            </h1>
          </div>
          <button
            type="button"
            onClick={() => logoutMutation.mutate()}
            className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      {editId === undefined ? (
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[220px_minmax(260px,0.8fr)]">
          <nav aria-label="Content types" className="space-y-2">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setActiveType(type.value);
                  setSearchParams({ type: type.value });
                }}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${
                  activeType === type.value
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/[0.04] text-white/70 hover:bg-white/10"
                }`}
              >
                {type.label}
              </button>
            ))}
          </nav>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">
                {contentTypes.find((type) => type.value === activeType)?.label}
              </h2>
              <button
                type="button"
                onClick={() => navigate(`/admin/edit/new?type=${encodeURIComponent(activeType)}`)}
                aria-label="Create content"
                className="rounded-lg bg-cyan-400 p-2 text-slate-950 hover:bg-cyan-300"
              >
                <Plus size={18} />
              </button>
            </div>
            {contentQuery.isPending && <p className="text-sm text-white/50">Loading content...</p>}
            {contentQuery.isError && (
              <p role="alert" className="text-sm text-red-300">
                {(contentQuery.error as Error).message}
              </p>
            )}
            <div className="space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/admin/edit/${item.id}`)}
                  className="w-full rounded-xl border border-white/5 bg-black/10 px-3 py-3 text-left hover:bg-white/5"
                >
                  <span className="block truncate text-sm font-medium">{item.title}</span>
                  <span className="mt-1 block truncate text-xs text-white/45">{item.slug}</span>
                  {!item.published && (
                    <span className="mt-2 inline-block rounded bg-amber-300/10 px-2 py-1 text-[10px] uppercase text-amber-200">
                      Draft
                    </span>
                  )}
                </button>
              ))}
              {!contentQuery.isPending && items.length === 0 && (
                <p className="py-5 text-sm text-white/45">No content in this category.</p>
              )}
            </div>
          </section>
        </div>
      ) : (
        <AdminEditor
          key={`${editId}:${searchParams.get("type") || ""}`}
          id={editId}
          type={contentTypes.find((type) => type.value === requestedType)?.value || "page"}
          items={contentQuery.data || []}
          isPending={contentQuery.isPending}
          isError={contentQuery.isError}
          error={contentQuery.error as Error | null}
        />
      )}
    </main>
  );
};

type AdminEditorProps = {
  id: string;
  type: string;
  items: CmsItem[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

const AdminEditor = ({ id, type, items, isPending, isError, error }: AdminEditorProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<CmsItem | null>(() =>
    id === "new" ? emptyItem(type) : items.find((item) => item.id === Number(id)) || null,
  );
  const [editorError, setEditorError] = useState("");
  const backToList = (contentType = type) =>
    navigate(`/admin?type=${encodeURIComponent(contentType)}`);

  useEffect(() => {
    if (!draft && id !== "new") {
      const item = items.find((candidate) => candidate.id === Number(id));
      if (item) setDraft(item);
    }
  }, [draft, id, items]);

  const saveMutation = useMutation({
    mutationFn: saveAdminContent,
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      backToList(saved.type);
    },
    onError: (mutationError: Error) => setEditorError(mutationError.message),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAdminContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      backToList(draft?.type);
    },
    onError: (mutationError: Error) => setEditorError(mutationError.message),
  });

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft) return;
    saveMutation.mutate({
      ...draft,
      sort_order: Number(draft.sort_order),
    });
  };

  if (isPending && !draft) {
    return <AdminMessage message="Loading content..." />;
  }
  if (isError) {
    return <AdminMessage message={`Unable to load content: ${error?.message || "Unknown error"}`} />;
  }
  if (!draft) {
    return <AdminMessage message="The requested content could not be found." />;
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => backToList(draft.type)}
          className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
        >
          <ArrowLeft size={16} /> Back to content
        </button>
        {draft.id !== undefined && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete "${draft.title}"?`)) {
                deleteMutation.mutate(draft.id as number);
              }
            }}
            disabled={deleteMutation.isPending}
            className="flex items-center gap-2 rounded-lg border border-red-300/20 px-3 py-2 text-sm text-red-200 hover:bg-red-300/10 disabled:opacity-60"
          >
            <Trash2 size={15} /> Delete
          </button>
        )}
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <form onSubmit={handleSave} className="space-y-5">
          <h2 className="text-lg font-semibold">{draft.id ? "Edit content" : "New content"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-white/70">
              Title
              <input
                required
                maxLength={255}
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-cyan-400"
              />
            </label>
            <label className="text-sm text-white/70">
              Slug (unique within type)
              <input
                required
                pattern="[A-Za-z0-9][A-Za-z0-9_-]{0,179}"
                value={draft.slug}
                onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-cyan-400"
              />
            </label>
            <label className="text-sm text-white/70">
              Display order
              <input
                type="number"
                step="1"
                value={draft.sort_order}
                onChange={(event) =>
                  setDraft({ ...draft, sort_order: Number(event.target.value) })
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-cyan-400"
              />
            </label>
            <label className="flex items-center gap-3 self-end pb-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(event) => setDraft({ ...draft, published: event.target.checked })}
                className="h-4 w-4 accent-cyan-400"
              />
              Published on website
            </label>
          </div>
          <ContentFields
            value={draft.content}
            contentType={draft.type}
            onChange={(content) => setDraft({ ...draft, content })}
          />
          {editorError && <p role="alert" className="text-sm text-red-300">{editorError}</p>}
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60"
          >
            <Save size={17} /> {saveMutation.isPending ? "Saving..." : "Save content"}
          </button>
        </form>
      </section>
    </div>
  );
};

const AdminMessage = ({ message }: { message: string }) => (
  <main className="flex min-h-screen items-center justify-center bg-[#07111e] px-5 text-center text-white">
    <p role="status">{message}</p>
  </main>
);

export default Admin;
