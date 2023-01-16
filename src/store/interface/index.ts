export interface UserInfo {
	id: number;
	username: string;
	phone: string;
	gender: string;
	age: number;
	email: string;
	address: string;
	createTime: string;
	avatar: string;
	weibo?: string;
	wechat?: string;
	github?: string;
	qq?: string;
}

export interface UserState {
	token: string;
	userInfo: UserInfo;
	/** 当前登陆用户的角色 */
	roles: Array<string>;
}

export interface PermissionState {
	menuList: Menu.MenuOptions[];
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
