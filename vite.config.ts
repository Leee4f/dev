import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        game: resolve(__dirname, "src/game/index.html"),
        "game-poe2": resolve(__dirname, "src/game/poe2/index.html"),
        book: resolve(__dirname, "src/book/index.html"),
        dev: resolve(__dirname, "src/dev/index.html"),
      },
    },
  },
});
