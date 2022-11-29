import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { router } from "@/router";
import { LOGIN_URL } from "@/config";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "@/utils/http/checkStatus";
import { AxiosCanceler } from "@/utils/http/axiosCancel";
import { useUserStoreHook } from "@/store/modules/user";
import { showFullScreenLoading, hideFullScreenLoading } from "@/config/serviceLoading";
import { ElMessage } from "element-plus";
import type { ResultData } from "./types";

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const config: AxiosRequestConfig = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest"
	}
};

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
	// axios 实例
	instance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		// 实例化 axios
		this.instance = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.instance.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const useUserStore = useUserStoreHook();
				// * 将当前请求添加到 pending 中
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = useUserStore.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				const useUserStore = useUserStoreHook();
				// * 在请求结束后，移除本次请求，并关闭请求 loading
				axiosCanceler.removePending(config);
				hideFullScreenLoading();
				// * 登陆失效（code == 599）
				if (data.code == ResultEnum.OVERDUE) {
					ElMessage.error(data.message);
					useUserStore.setToken("");
					router.replace(LOGIN_URL);
					return Promise.reject(data);
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.message);
					return Promise.reject(data);
				}
				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				hideFullScreenLoading();
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace("/500");
				return Promise.reject(error);
			}
		);
	}

	// 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.instance.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.instance.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
