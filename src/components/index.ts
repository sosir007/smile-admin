import type { App } from "vue";

// 全局注册`@iconify/vue`图标库
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from "./Icon";

export function setupCustomComponents(app: App<Element>) {
	app
		.component("IconifyIconOffline", IconifyIconOffline)
		.component("IconifyIconOnline", IconifyIconOnline)
		.component("FontIcon", FontIcon);
}
