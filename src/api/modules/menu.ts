import http from "@/utils/http";
import { RouteRecordRaw } from "vue-router";
import { HttpPrefixEnum } from "src/enums/httpEnum";

/**
 * @name 菜单模块
 */
const prefix = HttpPrefixEnum.MENU;

export const getUserInfo = () => {
	return http.get<RouteRecordRaw[]>(prefix + `/list`);
};
