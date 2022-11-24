import { defineStore } from "pinia";
import { store } from "@/store";
import { PermissionState } from "./../interface/index";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const usePermissionStore = defineStore({
	id: "permissionStore",
	state: (): PermissionState => ({
		menuList: [],
		keepAliveComponents: []
	}),
	actions: {
		// getAuthMenuList
		async getAuthMenuList() {
			// const { data } = await getMenuList();
			// this.menuList = data;
		}
	},
	persist: piniaPersistConfig("permissionStore")
});

// Need to be used outside the setup
export function usePermissionStoreHook() {
	return usePermissionStore(store);
}
