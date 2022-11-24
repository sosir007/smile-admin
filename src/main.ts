import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";

// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

async function bootstrap() {
	const app = createApp(App);

	// 挂载状态管理
	setupStore(app);

	// 挂载路由
	setupRouter(app);

	// 路由准备就绪后挂载APP实例
	await router.isReady();

	app.mount("#app");
}

bootstrap();
