import { defineStore } from "pinia";
import { store } from "@/store";
import { PermissionState } from "./../interface/index";
import { getMenuList } from "@/api/modules/menu";
import { getFlatArr } from "@/utils/router";
// import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const usePermissionStore = defineStore({
	id: "permissionStore",
	state: (): PermissionState => ({
		menuList: [],
		keepAliveComponents: []
	}),
	getters: {
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.menuList)
	},
	actions: {
		// getAuthMenuList
		async getAuthMenuList() {
			const { data } = await getMenuList();
			this.menuList = data;
		}
	}
	// 路由菜单不做持久化处理，这样刷新页面动态添加的路由就没有了
	// persist: piniaPersistConfig("permissionStore")
});

// Need to be used outside the setup
export function usePermissionStoreHook() {
	return usePermissionStore(store);
}
