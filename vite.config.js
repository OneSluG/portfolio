import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Замените 'portfolio' на точное имя вашего репозитория на GitHub!
  base: "/portfolio/",

  build: {
    rollupOptions: {
      input: {
        // Главная страница
        main: resolve(import.meta.dirname, "index.html"),

        // Ваши лендинги (добавляйте сюда новые по мере появления)
        kroppfitness: resolve(import.meta.dirname, "projects/kroppfitness/index.html"),
        positivus: resolve(import.meta.dirname, "projects/positivus/index.html"),
        veloshop: resolve(import.meta.dirname, "projects/veloshop/index.html"),
        cyberpunk: resolve(import.meta.dirname, "projects/cyberpunk/index.html"),
        mynewproject: resolve(import.meta.dirname, "projects/my-new-project/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
