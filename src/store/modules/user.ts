import { defineStore } from "pinia";
import { store } from "@/store";
import { UserInfo, UserState } from "./../interface/index";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useUserStore = defineStore({
	id: "userStore",
	state: (): UserState => ({
		// token
		token: "",
		// 用户信息
		userInfo: {
			id: 0,
			username: "",
			phone: "",
			gender: "",
			age: 0,
			email: "",
			address: "",
			createTime: "",
			avatar: "",
			weibo: "",
			wechat: "",
			github: "",
			qq: ""
		},
		// 页面级别权限
		roles: []
	}),
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserInfo(userInfo: UserInfo) {
			this.userInfo = userInfo;
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
