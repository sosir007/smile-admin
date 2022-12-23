import { defineStore } from "pinia";
import { store } from "@/store";
import { GlobalState, ConfigProps } from "./../interface/index";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
	id: "globalState",
	state: (): GlobalState => ({
		locale: "zh",
		// element组件大小
		assemblySize: "default",
		config: {
			// 主题
			title: "Smile-Admin",
			// 布局切换
			layout: "vertical",
			// 默认 primary 主题色
			primary: DEFAULT_PRIMARY,
			// 折叠菜单
			isCollapse: false
		}
	}),
	actions: {
		// updateLanguage
		updateLanguage(language: string) {
			this.locale = language;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: string) {
			this.assemblySize = assemblySize;
		},
		// setThemeConfig
		setThemeConfig(config: ConfigProps) {
			this.config = config;
		}
	},
	persist: piniaPersistConfig("globalState")
});

// Need to be used outside the setup
export function useGlobalStoreHook() {
	return useGlobalStore(store);
}
