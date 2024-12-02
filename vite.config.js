import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/secure": {
        target: "https://210.109.55.61:9200", // HTTPS 대상 서버
        changeOrigin: true, // Origin 헤더 변경
        secure: false, // 자체 서명된 인증서를 무시
        rewrite: (path) => path.replace(/^\/api\/secure/, ""), // /api/secure 제거
      },
    },
  },
});
