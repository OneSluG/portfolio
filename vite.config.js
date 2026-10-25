import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Замените 'portfolio' на точное имя вашего репозитория на GitHub!
  base: "/portfolio/",

  build: {
    rollupOptions: {
      input: {
        // Главная страница
        main: resolve(__dirname, "index.html"),

        // Ваши лендинги (добавляйте сюда новые по мере появления)
        kroppfitness: resolve(__dirname, "projects/kroppfitness/index.html"),
        positivus: resolve(__dirname, "projects/positivus/index.html"),
        veloshop: resolve(__dirname, "projects/veloshop/index.html"),
        cyberpunk: resolve(__dirname, "projects/cyberpunk/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
