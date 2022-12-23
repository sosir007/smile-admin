import { router } from "@/router";
// import { RouteRecordRaw } from "vue-router";
import { notFoundRouter } from "@/router/modules/staticRouter";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
	console.log("modules", modules);
	// 4.最后添加 notFoundRouter
	router.addRoute(notFoundRouter);
};
