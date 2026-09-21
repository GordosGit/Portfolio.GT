import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/Portfolio.GT/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        playbook: resolve(__dirname, "playbook.html"),
        caseStudies: resolve(__dirname, "case-studies.html"),
        caseStudy: resolve(__dirname, "case-study.html"),
        designSystem: resolve(__dirname, "design-system.html")
      }
    }
  }
});
