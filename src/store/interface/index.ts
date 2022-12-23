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

export interface ConfigProps {
	title: string;
	layout: string;
	primary: string;
	isCollapse: boolean;
}

export interface GlobalState {
	locale: string;
	assemblySize: string;
	config: ConfigProps;
}
