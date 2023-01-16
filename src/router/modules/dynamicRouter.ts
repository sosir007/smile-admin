import { router } from "@/router";
import { isType } from "@/utils/is";
import { LOGIN_URL } from "@/config";
import { ElNotification } from "element-plus";
import { notFoundRouter } from "@/router/modules/staticRouter";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
	const useUserStore = useUserStoreHook();
	const usePermissionStore = usePermissionStoreHook();

	try {
		// 1.获取菜单列表 && 按钮权限（可合并到一个接口获取，根据后端不同可自行改造）
		await usePermissionStore.getAuthMenuList();

		// 2.判断当前用户有没有菜单权限
		if (!usePermissionStore.menuList.length) {
			ElNotification({
				title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员！",
				type: "warning",
				duration: 3000
			});
			useUserStore.setToken("");
			router.replace(LOGIN_URL);
			return Promise.reject("No permission");
		}

		// FIXME:路由扁平化处理component有问题
		// 3.添加动态路由
		usePermissionStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = modules["/src/views" + item.component + ".vue"];
			}
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute("layout", item);
			}
		});

		// 4.最后添加 notFoundRouter
		router.addRoute(notFoundRouter);
	} catch (error) {
		// 💢 当按钮 || 菜单请求出错时，重定向到登陆页
		useUserStore.setToken("");
		router.replace(LOGIN_URL);
		return Promise.reject(error);
	}
};
