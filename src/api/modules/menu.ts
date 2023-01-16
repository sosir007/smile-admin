import http from "@/utils/http";
import { HttpPrefixEnum } from "@/enums/httpEnum";

/**
 * @name 菜单模块
 */
const prefix = HttpPrefixEnum.MENU;

export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(prefix + `/list`);
};
