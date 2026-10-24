import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { loadEnv } from "vite";
import { componentTagger } from "lovable-tagger";

function databaseImagePlugin(root: string) {
  const imageExtensions = new Set([".avif", ".gif", ".jfif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

  return {
    name: "database-backed-images",
    enforce: "pre" as const,
    resolveId(source: string, importer?: string) {
      if (!importer || source.startsWith("/") || source.startsWith("http")) return null;
      const cleanSource = source.split("?")[0];
      if (!imageExtensions.has(path.extname(cleanSource).toLowerCase())) return null;

      const absolutePath = cleanSource.startsWith("@/")
        ? path.resolve(root, "src", cleanSource.slice(2))
        : path.resolve(path.dirname(importer.split("?")[0]), cleanSource);
      const relativePath = path.relative(root, absolutePath);
      if (
        relativePath.startsWith("..") ||
        (!relativePath.startsWith(`src${path.sep}assets${path.sep}`) &&
          !relativePath.startsWith(`public${path.sep}`))
      ) {
        return null;
      }
      return `\0database-image:${relativePath.split(path.sep).join("/")}`;
    },
    load(id: string) {
      if (!id.startsWith("\0database-image:")) return null;
      const assetPath = id.slice("\0database-image:".length);
      return `export default ${JSON.stringify(`/api/media?path=${encodeURIComponent(assetPath)}`)};`;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const apiPort = loadEnv(mode, process.cwd(), "").PORT || "5000";

  return ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: `http://localhost:${apiPort}`,
        changeOrigin: true,
        secure: false,
      },
      "/images": {
        target: `http://localhost:${apiPort}`,
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    databaseImagePlugin(__dirname),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  });
});
