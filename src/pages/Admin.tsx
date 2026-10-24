import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
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
import "./Admin.css";

const contentTypes = [
  { value: "page", label: "Pages", icon: FileText },
  { value: "navigation", label: "Navigation", icon: LayoutDashboard },
  { value: "product", label: "Products", icon: FolderKanban },
  { value: "service", label: "Services", icon: Settings },
  { value: "blog", label: "Blogs", icon: FileText },
  { value: "testimonial", label: "Testimonials", icon: CircleHelp },
];

type ThemePreference = "light" | "dark" | "system";
type View = "content" | "appearance";

const THEME_KEY = "united-admin-theme";
const ACCENT_KEY = "united-admin-accent";
const DEFAULT_ACCENT = "#2563EB";
const EMPTY_ITEMS: CmsItem[] = [];
const accentColors = [
  { name: "Professional blue", value: "#2563EB" },
  { name: "Indigo", value: "#4F46E5" },
  { name: "Teal", value: "#0F766E" },
  { name: "Violet", value: "#7C3AED" },
];

const emptyItem = (type: string): CmsItem => ({
  type,
  slug: "",
  title: "",
  content: {},
  sort_order: 0,
  published: true,
});

function getStoredTheme(): ThemePreference {
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

const Admin = () => {
  const queryClient = useQueryClient();
  const { id: editId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedType = searchParams.get("type");
  const initialType =
    contentTypes.find((type) => type.value === requestedType)?.value || "page";
  const [activeType, setActiveType] = useState(initialType);
  const [loginError, setLoginError] = useState("");
  const [themePreference, setThemePreference] = useState<ThemePreference>(getStoredTheme);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [accent, setAccent] = useState(
    () => window.localStorage.getItem(ACCENT_KEY) || DEFAULT_ACCENT,
  );
  const [view, setView] = useState<View>("content");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, themePreference);
  }, [themePreference]);

  useEffect(() => {
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [accent]);

  const resolvedTheme =
    themePreference === "system"
      ? systemDark
        ? "dark"
        : "light"
      : themePreference;

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

  const allItems = contentQuery.data || EMPTY_ITEMS;
  const items = useMemo(
    () =>
      allItems
        .filter((item) => item.type === activeType)
        .filter((item) =>
          `${item.title} ${item.slug}`.toLowerCase().includes(search.trim().toLowerCase()),
        ),
    [activeType, allItems, search],
  );
  const publishedCount = allItems.filter((item) => item.published).length;
  const draftCount = allItems.length - publishedCount;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    loginMutation.mutate({
      username: String(form.get("username") || ""),
      password: String(form.get("password") || ""),
    });
  };

  const selectContentType = (type: string) => {
    setActiveType(type);
    setView("content");
    setSearch("");
    setMobileNavOpen(false);
    setSearchParams({ type });
    if (editId !== undefined) navigate(`/admin?type=${encodeURIComponent(type)}`);
  };

  if (sessionQuery.isPending) {
    return (
      <AdminMessage
        message="Checking admin session..."
        theme={resolvedTheme}
        accent={accent}
      />
    );
  }

  if (sessionQuery.isError) {
    return (
      <AdminMessage
        message={`Admin API is unavailable: ${(sessionQuery.error as Error).message}`}
        theme={resolvedTheme}
        accent={accent}
      />
    );
  }

  if (!sessionQuery.data?.authenticated) {
    return (
      <main
        className="admin-shell admin-login"
        data-theme={resolvedTheme}
        style={{ "--admin-primary": accent } as CSSProperties}
      >
        <form onSubmit={handleLogin} className="admin-login-card">
          <div className="admin-brand-mark">UT</div>
          <p className="admin-eyebrow">UNITED TECHNOLOGIES</p>
          <h1>Welcome back</h1>
          <p className="admin-login-copy">Sign in to manage your website content.</p>
          <label className="admin-label" htmlFor="username">
            Username
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              className="admin-input"
            />
          </label>
          <label className="admin-label" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="admin-input"
            />
          </label>
          {loginError && (
            <p role="alert" className="admin-alert admin-alert-error">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="admin-button admin-button-primary admin-login-submit"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
          <p className="admin-login-footnote">Secure content management</p>
        </form>
      </main>
    );
  }

  const activeLabel =
    contentTypes.find((type) => type.value === activeType)?.label || "Pages";

  return (
    <main
      className={`admin-shell${collapsed ? " is-collapsed" : ""}`}
      data-theme={resolvedTheme}
      style={{ "--admin-primary": accent } as CSSProperties}
    >
      {mobileNavOpen && (
        <button
          aria-label="Close navigation"
          className="admin-mobile-scrim"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <aside className={`admin-sidebar${mobileNavOpen ? " is-mobile-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-brand-mark">UT</div>
          {!collapsed && (
            <div className="admin-brand-copy">
              <strong>United Technologies</strong>
              <span>Content workspace</span>
            </div>
          )}
        </div>
        <div className="admin-sidebar-scroll">
          <p className="admin-nav-heading">{!collapsed && "WORKSPACE"}</p>
          <nav className="admin-nav" aria-label="Admin workspace">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              const selected = view === "content" && activeType === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  title={collapsed ? type.label : undefined}
                  aria-current={selected ? "page" : undefined}
                  onClick={() => selectContentType(type.value)}
                  className={`admin-nav-item${selected ? " is-active" : ""}`}
                >
                  <Icon size={18} />
                  {!collapsed && <span>{type.label}</span>}
                  {!collapsed && selected && <span className="admin-nav-indicator" />}
                </button>
              );
            })}
          </nav>
          <p className="admin-nav-heading admin-nav-heading-secondary">
            {!collapsed && "PREFERENCES"}
          </p>
          <button
            type="button"
            title={collapsed ? "Appearance" : undefined}
            aria-current={view === "appearance" ? "page" : undefined}
            onClick={() => {
              setView("appearance");
              setMobileNavOpen(false);
            }}
            className={`admin-nav-item${view === "appearance" ? " is-active" : ""}`}
          >
            <Sun size={18} />
            {!collapsed && <span>Appearance</span>}
          </button>
        </div>
        <div className="admin-sidebar-bottom">
          {!collapsed && (
            <div className="admin-sidebar-note">
              <span className="admin-online-dot" />
              <span>Workspace is up to date</span>
            </div>
          )}
          <button
            type="button"
            className="admin-collapse-button"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              aria-label="Open navigation"
              className="admin-icon-button admin-mobile-menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={19} />
            </button>
            <div className="admin-breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={14} />
              <strong>
                {view === "appearance"
                  ? "Appearance"
                  : editId === undefined
                    ? activeLabel
                    : "Edit content"}
              </strong>
            </div>
          </div>
          <div className="admin-topbar-actions">
            <label className="admin-quick-theme" title="Theme preference">
              {resolvedTheme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
              <select
                aria-label="Theme preference"
                value={themePreference}
                onChange={(event) =>
                  setThemePreference(event.target.value as ThemePreference)
                }
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
              <ChevronDown size={13} />
            </label>
            <div className="admin-menu-anchor">
              <button
                type="button"
                className="admin-icon-button admin-notification-button"
                aria-label="Content notifications"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((current) => !current);
                  setProfileOpen(false);
                }}
              >
                <Bell size={18} />
                {draftCount > 0 && <span className="admin-notification-dot" />}
              </button>
              {notificationsOpen && (
                <div className="admin-popover">
                  <strong>Content status</strong>
                  <p>
                    {draftCount === 0
                      ? "All content items are published."
                      : `${draftCount} ${draftCount === 1 ? "item is" : "items are"} currently in draft.`}
                  </p>
                </div>
              )}
            </div>
            <div className="admin-menu-anchor">
              <button
                type="button"
                className="admin-profile-button"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((current) => !current);
                  setNotificationsOpen(false);
                }}
              >
                <span className="admin-avatar">UT</span>
                <span className="admin-profile-copy">
                  <strong>Administrator</strong>
                  <small>Workspace owner</small>
                </span>
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="admin-popover admin-profile-popover">
                  <strong>Administrator</strong>
                  <p>Manage your website content and settings.</p>
                  <button
                    type="button"
                    className="admin-popover-action"
                    disabled={logoutMutation.isPending}
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut size={15} />
                    {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {view === "appearance" ? (
          <AppearanceSettings
            theme={themePreference}
            setTheme={setThemePreference}
            accent={accent}
            setAccent={setAccent}
          />
        ) : editId === undefined ? (
          <div className="admin-content-area">
            <div className="admin-page-heading">
              <div>
                <p className="admin-eyebrow">CONTENT MANAGEMENT</p>
                <h1>{activeLabel}</h1>
                <p className="admin-page-description">
                  Create, update, and publish your website content.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigate(`/admin/edit/new?type=${encodeURIComponent(activeType)}`)
                }
                className="admin-button admin-button-primary"
              >
                <Plus size={17} /> Create {activeLabel.slice(0, -1)}
              </button>
            </div>

            <div className="admin-stat-grid">
              <StatCard label="Total content" value={allItems.length} detail="Across your workspace" />
              <StatCard label="Published" value={publishedCount} detail="Visible on your website" />
              <StatCard label="Drafts" value={draftCount} detail="Not currently published" />
            </div>

            <section className="admin-panel admin-content-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>{activeLabel} library</h2>
                  <p>{items.length} {items.length === 1 ? "item" : "items"} in this view</p>
                </div>
                <label className="admin-search">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={`Search ${activeLabel.toLowerCase()}...`}
                    aria-label={`Search ${activeLabel.toLowerCase()}`}
                  />
                  {search && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      ×
                    </button>
                  )}
                </label>
              </div>
              {contentQuery.isPending && (
                <div className="admin-empty-state">
                  <span className="admin-spinner" />
                  <p>Loading your content...</p>
                </div>
              )}
              {contentQuery.isError && (
                <p role="alert" className="admin-alert admin-alert-error">
                  {(contentQuery.error as Error).message}
                </p>
              )}
              {!contentQuery.isPending && !contentQuery.isError && items.length > 0 && (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Updated</th>
                        <th><span className="sr-only">Edit</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="admin-table-row"
                        >
                          <td>
                            <span className="admin-item-avatar">
                              {(item.title || "C").trim().charAt(0).toUpperCase()}
                            </span>
                            <button
                              type="button"
                              className="admin-table-title"
                              onClick={() =>
                                navigate(`/admin/edit/${item.id}?type=${encodeURIComponent(activeType)}`)
                              }
                            >
                              {item.title || "Untitled"}
                            </button>
                          </td>
                          <td><span className="admin-slug">{item.slug}</span></td>
                          <td>
                            <span className={`admin-status ${item.published ? "is-published" : "is-draft"}`}>
                              <span />
                              {item.published ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="admin-date">
                            {item.updated_at
                              ? new Date(item.updated_at).toLocaleDateString()
                              : "—"}
                          </td>
                          <td className="admin-row-action">
                            <ChevronRight size={17} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!contentQuery.isPending && !contentQuery.isError && items.length === 0 && (
                <div className="admin-empty-state">
                  <div className="admin-empty-icon"><FileText size={22} /></div>
                  <h3>{search ? "No matching content" : "Nothing here yet"}</h3>
                  <p>
                    {search
                      ? "Try a different title or slug."
                      : `Create your first ${activeLabel.toLowerCase().replace(/s$/, "")} to get started.`}
                  </p>
                  {!search && (
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/edit/new?type=${encodeURIComponent(activeType)}`)}
                      className="admin-button admin-button-secondary"
                    >
                      <Plus size={16} /> Create content
                    </button>
                  )}
                </div>
              )}
            </section>
            <footer className="admin-footer">
              <span>United Technologies CMS</span>
              <span>Content changes are saved to your website workspace.</span>
            </footer>
          </div>
        ) : (
          <AdminEditor
            key={`${editId}:${searchParams.get("type") || ""}`}
            id={editId}
            type={contentTypes.find((type) => type.value === requestedType)?.value || "page"}
            items={allItems}
            isPending={contentQuery.isPending}
            isError={contentQuery.isError}
            error={contentQuery.error as Error | null}
          />
        )}
      </section>
    </main>
  );
};

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <article className="admin-stat-card">
      <div className="admin-stat-icon"><FileText size={17} /></div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

function AppearanceSettings({
  theme,
  setTheme,
  accent,
  setAccent,
}: {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  accent: string;
  setAccent: (accent: string) => void;
}) {
  const themeOptions: {
    value: ThemePreference;
    label: string;
    description: string;
    icon: LucideIcon;
  }[] = [
    { value: "light", label: "Light", description: "A bright, clear workspace.", icon: Sun },
    { value: "dark", label: "Dark", description: "Easy on the eyes in low light.", icon: Moon },
    { value: "system", label: "System", description: "Match your device appearance.", icon: Settings },
  ];

  return (
    <div className="admin-content-area admin-appearance-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">PREFERENCES</p>
          <h1>Appearance</h1>
          <p className="admin-page-description">
            Personalize how your content workspace looks and feels.
          </p>
        </div>
      </div>
      <div className="admin-settings-layout">
        <div className="admin-settings-main">
          <section className="admin-panel admin-settings-panel">
            <div className="admin-section-heading">
              <h2>Theme</h2>
              <p>Choose how the admin workspace is displayed.</p>
            </div>
            <div className="admin-theme-options">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const selected = theme === option.value;
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`admin-theme-option${selected ? " is-selected" : ""}`}
                    aria-pressed={selected}
                  >
                    <span className="admin-theme-option-icon"><Icon size={19} /></span>
                    <span className="admin-theme-option-copy">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                    <span className="admin-radio">{selected && <span />}</span>
                  </button>
                );
              })}
            </div>
          </section>
          <section className="admin-panel admin-settings-panel">
            <div className="admin-section-heading">
              <h2>Brand accent</h2>
              <p>Choose a primary accent color for buttons and active controls.</p>
            </div>
            <div className="admin-accent-options">
              {accentColors.map((color) => (
                <button
                  type="button"
                  key={color.value}
                  title={color.name}
                  aria-label={color.name}
                  aria-pressed={accent.toUpperCase() === color.value.toUpperCase()}
                  onClick={() => setAccent(color.value)}
                  className={`admin-accent-swatch${accent.toUpperCase() === color.value.toUpperCase() ? " is-selected" : ""}`}
                  style={{ "--swatch-color": color.value } as CSSProperties}
                >
                  {accent.toUpperCase() === color.value.toUpperCase() && <Check size={17} />}
                </button>
              ))}
              <label className="admin-custom-color">
                <input
                  type="color"
                  value={accent}
                  onChange={(event) => setAccent(event.target.value)}
                  aria-label="Choose a custom accent color"
                />
                <span>Custom color</span>
              </label>
            </div>
          </section>
          <div className="admin-settings-actions">
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={() => {
                setTheme("system");
                setAccent(DEFAULT_ACCENT);
              }}
            >
              Reset to defaults
            </button>
            <p>Your choices are saved automatically on this device.</p>
          </div>
        </div>
        <aside className="admin-panel admin-preview-panel">
          <div className="admin-section-heading">
            <h2>Live preview</h2>
            <p>Preview of your current workspace appearance.</p>
          </div>
          <div className="admin-preview-card">
            <div className="admin-preview-top">
              <span className="admin-preview-dot" />
              <span />
              <span />
            </div>
            <div className="admin-preview-content">
              <span className="admin-preview-label">CONTENT OVERVIEW</span>
              <strong>Welcome back</strong>
              <span className="admin-preview-line" />
              <span className="admin-preview-line short" />
              <button type="button" tabIndex={-1}>Primary action</button>
            </div>
          </div>
          <p className="admin-preview-theme">
            {theme === "system" ? "Following system preference" : `${theme} mode selected`}
          </p>
        </aside>
      </div>
    </div>
  );
}

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

  if (isPending && !draft) return <AdminMessage message="Loading content..." />;
  if (isError) {
    return (
      <AdminMessage
        message={`Unable to load content: ${error?.message || "Unknown error"}`}
      />
    );
  }
  if (!draft) {
    return <AdminMessage message="The requested content could not be found." />;
  }

  return (
    <div className="admin-content-area admin-editor-area">
      <div className="admin-page-heading admin-editor-heading">
        <div>
          <button
            type="button"
            onClick={() => backToList(draft.type)}
            className="admin-back-link"
          >
            <ArrowLeft size={16} /> Back to {contentTypes.find((entry) => entry.value === draft.type)?.label || "content"}
          </button>
          <p className="admin-eyebrow">{draft.id ? "CONTENT ITEM" : "NEW CONTENT"}</p>
          <h1>{draft.id ? "Edit content" : "Create content"}</h1>
          <p className="admin-page-description">
            Update the details and content fields for this item.
          </p>
        </div>
        {draft.id !== undefined && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Delete "${draft.title}"?`)) {
                deleteMutation.mutate(draft.id as number);
              }
            }}
            disabled={deleteMutation.isPending}
            className="admin-button admin-button-danger"
          >
            <Trash2 size={16} />
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
      <section className="admin-panel admin-editor-panel">
        <form onSubmit={handleSave} className="admin-editor-form">
          <div className="admin-section-heading">
            <h2>General information</h2>
            <p>Fields marked as required must be completed before saving.</p>
          </div>
          <div className="admin-form-grid">
            <label className="admin-label">
              Title
              <input
                required
                maxLength={255}
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                className="admin-input"
              />
            </label>
            <label className="admin-label">
              Slug <span className="admin-label-hint">(unique within type)</span>
              <input
                required
                pattern="[A-Za-z0-9][A-Za-z0-9_-]{0,179}"
                value={draft.slug}
                onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                className="admin-input"
              />
            </label>
            <label className="admin-label">
              Display order
              <input
                type="number"
                step="1"
                value={draft.sort_order}
                onChange={(event) =>
                  setDraft({ ...draft, sort_order: Number(event.target.value) })
                }
                className="admin-input"
              />
            </label>
            <label className="admin-publish-toggle">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(event) =>
                  setDraft({ ...draft, published: event.target.checked })
                }
              />
              <span>
                <strong>Publish content</strong>
                <small>This item will be visible on the website.</small>
              </span>
            </label>
          </div>
          <div className="admin-editor-divider" />
          <div className="admin-section-heading">
            <h2>Content fields</h2>
            <p>Manage the content and media associated with this item.</p>
          </div>
          <ContentFields
            value={draft.content}
            contentType={draft.type}
            onChange={(content) => setDraft({ ...draft, content })}
          />
          {editorError && (
            <p role="alert" className="admin-alert admin-alert-error">{editorError}</p>
          )}
          <div className="admin-editor-actions">
            <button
              type="button"
              onClick={() => backToList(draft.type)}
              className="admin-button admin-button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="admin-button admin-button-primary"
            >
              <Check size={17} />
              {saveMutation.isPending ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const AdminMessage = ({
  message,
  theme,
  accent = DEFAULT_ACCENT,
}: {
  message: string;
  theme?: "light" | "dark";
  accent?: string;
}) => (
  <main
    className="admin-shell admin-message"
    data-theme={theme || "light"}
    style={{ "--admin-primary": accent } as CSSProperties}
  >
    <span className="admin-spinner" />
    <p role="status">{message}</p>
  </main>
);

export default Admin;
