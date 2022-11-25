// 多组件库的国际化和本地项目国际化兼容
import { App } from "vue";
import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

function siphonI18n(prefix = "zh") {
	return Object.fromEntries(
		Object.entries(import.meta.glob("./modules/*.ts", { eager: true })).map(([key, value]: any) => {
			const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
			return [matched, value.default];
		})
	)[prefix];
}

export const localesConfigs = {
	zh: {
		...siphonI18n("zh"),
		...zhLocale
	},
	en: {
		...siphonI18n("en"),
		...enLocale
	}
};

export const i18n: I18n = createI18n({
	// 如果要支持 compositionAPI，此项必须设置为 false
	legacy: false,
	// 设置语言类型
	locale: "zh",
	globalInjection: true, // 全局注册$t方法
	messages: localesConfigs
});

export function setupI18n(app: App) {
	app.use(i18n);
}
