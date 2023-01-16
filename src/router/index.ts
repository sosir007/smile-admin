import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import { LOGIN_URL, WHITE_LIST } from "@/config";
import { ElNotification } from "element-plus";
import { useUserStoreHook } from "@/store/modules/user";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { usePermissionStoreHook } from "@/store/modules/permission";
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
	const useUserStore = useUserStoreHook();

	// 1.NProgress 开始
	NProgress.start();

	// 2.动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	// 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
	if (to.path === LOGIN_URL) {
		if (useUserStore.token) return next(from.fullPath);
		resetRouter();
		return next();
	}

	// 4.如果是访问白名单页面，直接放行
	if (WHITE_LIST.includes(to.path)) return next();

	// 5.判断是否有 Token，没有重定向到 login
	if (!useUserStore.token) return next({ path: LOGIN_URL, replace: true });

	// 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const permissionStore = usePermissionStoreHook();
	if (!permissionStore.menuList.length) {
		await initDynamicRouter();
		return next({ ...to, replace: true });
	}

	// 6.正常访问页面
	next();
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
	const usePermissionStore = usePermissionStoreHook();
	usePermissionStore.flatMenuListGet.forEach(route => {
		const { name } = route;
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
};

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	ElNotification.error({ title: "路由错误", message: error.message });
});

// config router
export function setupRouter(app: App<Element>) {
	app.use(router);
}
