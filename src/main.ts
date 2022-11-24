import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router, setupRouter } from "@/router";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

// createApp(App).mount("#app");

async function bootstrap() {
	const app = createApp(App);

	// 挂载路由
	await setupRouter(app);

	// 路由准备就绪后挂载APP实例
	await router.isReady();

	app.mount("#app");
}

bootstrap();
