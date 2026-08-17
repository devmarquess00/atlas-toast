import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      insertTypesEntry: true,
      include: ["src/lib"],
      entryRoot: "src/lib",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "AtlasToast",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-icons",
        /^react-icons\/.*/,
        "zustand",
      ],
      output: {
        banner: '"use client";', // Corrigido sem o hífen
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
