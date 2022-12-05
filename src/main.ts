import { createApp } from "vue";
import App from "./App.vue";
import { setupStore } from "@/store";
import { router, setupRouter } from "@/router";
import { setupI18n } from "@/locales";
import { setupCustomComponents } from "@/components";

// 导入公共样式
import "@/styles/index.scss";
// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

async function bootstrap() {
	const app = createApp(App);

	// 挂载状态管理
	setupStore(app);

	// 注册全局自定义组件（包括第三方组件等）
	setupCustomComponents(app);

	// 挂载国际化插件
	setupI18n(app);

	// 挂载路由
	setupRouter(app);

	// 路由准备就绪后挂载APP实例
	await router.isReady();

	app.mount("#app");
}

bootstrap();
