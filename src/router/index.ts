import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import NProgress from "@/config/nprogress";

// /**
//  * @description 动态路由参数配置简介
//  * @param path ==> 菜单路径
//  * @param name ==> 菜单别名
//  * @param redirect ==> 重定向地址
//  * @param component ==> 视图文件路径
//  * @param meta ==> 菜单信息
//  * @param meta.icon ==> 菜单图标
//  * @param meta.title ==> 菜单标题
//  * @param meta.rank ==> 菜单排序
//  * @param meta.isLink ==> 是否外链
//  * @param meta.isHide ==> 是否隐藏
//  * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
//  * @param meta.isAffix ==> 是否固定在 tabs nav
//  * @param meta.isKeepAlive ==> 是否缓存
//  * */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...staticRouter, ...errorRouter],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	// 1.NProgress 开始
	NProgress.start();

	// 6.正常访问页面
	next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

// config router
export function setupRouter(app: App<Element>) {
	app.use(router);
}
