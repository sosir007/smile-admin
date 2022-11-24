import { RouteRecordRaw } from "vue-router";

export interface UserState {
	token: string;
	username: string;
	avatar: string;
	roles: Array<string>;
}

export interface PermissionState {
	menuList: RouteRecordRaw[];
	keepAliveComponents: string[];
}
