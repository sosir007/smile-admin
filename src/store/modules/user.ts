import { defineStore } from "pinia";
import { store } from "@/store";
import { UserState } from "./../interface/index";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useUserStore = defineStore({
	id: "userStore",
	state: (): UserState => ({
		// token
		token: "",
		// 用户名
		username: "",
		// 头像
		avatar: "",
		// 页面级别权限
		roles: []
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserName(username: string) {
			this.username = username;
		},
		setAvatar(avatar: string) {
			this.avatar = avatar;
		},
		setRoles(roles: Array<string>) {
			this.roles = roles;
		}
	},
	persist: piniaPersistConfig("userStore")
});

// Need to be used outside the setup
export function useUserStoreHook() {
	return useUserStore(store);
}
