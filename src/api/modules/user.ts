import http from "@/utils/http";
// import qs from "qs";
import { User } from "@/api/interface";
import { HttpPrefixEnum } from "src/enums/httpEnum";

/**
 * @name 用户模块
 */
const prefix = HttpPrefixEnum.USER;

// 用户登录接口
export const login = (params: User.ReqLoginForm) => {
	return http.post<User.ResLogin>(prefix + `/login`, params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
	// return http.post<User.LoginResult>(prefix + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<User.LoginResult>(prefix + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<User.LoginResult>(prefix + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

export const getUserInfo = () => {
	return http.get<User.ResUserList>(prefix + `/info`);
};
