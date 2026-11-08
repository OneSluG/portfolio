import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // Замените 'portfolio' на точное имя вашего репозитория на GitHub!
  base: "/portfolio/",

  build: {
    rollupOptions: {
      input: {
        // Главная страница — добавили path. перед resolve
        main: path.resolve(import.meta.dirname, "index.html"),

        // Ваши лендинги — добавили path. перед каждым resolve
        kroppfitness: path.resolve(import.meta.dirname, "projects/kroppfitness/index.html"),
        positivus: path.resolve(import.meta.dirname, "projects/positivus/index.html"),
        veloshop: path.resolve(import.meta.dirname, "projects/veloshop/index.html"),
        cyberpunk: path.resolve(import.meta.dirname, "projects/cyberpunk/index.html"),
        mynewproject: path.resolve(import.meta.dirname, "projects/my-new-project/index.html"),
      },

      // ИСПРАВЛЕНИЕ: Блок output должен находиться строго внутри rollupOptions!
      output: {
        // Аккуратно раскладываем файлы сборки по подпапкам внутри dist/
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
            return "assets/img/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },

    outDir: "dist",
    minify: "true",
    sourcemap: false,
  },

  server: {
    port: 5173,
    open: false,
    cors: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
