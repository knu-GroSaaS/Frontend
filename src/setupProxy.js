import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api/secure", // 특정 경로만 프록시 설정
    createProxyMiddleware({
      target: "https://210.109.55.61:9200", // HTTPS 서버 주소
      changeOrigin: true, // 대상 서버의 호스트 헤더를 변경
      secure: false, // 자체 서명된 인증서를 무시 (개발 환경에서만 사용)
      pathRewrite: {
        "^/api/secure": "", // `/api/secure` 경로 제거
      },
    })
  );
};