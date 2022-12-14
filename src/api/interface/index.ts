// 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// 用户管理模块
export namespace User {
	export interface ReqLoginForm {
		account: string;
		password: string;
	}
	export interface ResLogin {
		/** `token` */
		accessToken: string;
		/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
		expires: Date;
	}
	export interface ResUserList {
		id: number;
		/** 用户名 */
		username: string;
		/** 当前登陆用户的角色 */
		roleList: Array<string>;
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
}
