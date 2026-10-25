import { defineConfig } from "vite";

export default defineConfig({
  server: {
    base: "/new-site-template/",
    port: 5173,
    proxy: {
      // Перенаправляем все запросы к /sendmail.php на ваш домен в Local
      "/sendmail.php": {
        target: "http://cyberpunk.local",
        changeOrigin: true,
        rewrite: (path) => path, // сохраняет путь без изменений
      },
    },
  },
});
