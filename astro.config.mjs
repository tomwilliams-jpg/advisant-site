import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.advisantfinancial.com",
  trailingSlash: "always",
  build: { format: "directory" },
});
