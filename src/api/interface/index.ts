import { UserInfo } from "@/store/interface";

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
		userInfo: UserInfo;
		roleList: Array<string>;
	}
}
