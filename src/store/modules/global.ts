import { defineStore } from "pinia";
import { store } from "@/store";
import { GlobalState } from "./../interface/index";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
	id: "globalState",
	state: (): GlobalState => ({
		locale: "zh",
		// element组件大小
		assemblySize: "default"
	}),
	actions: {
		// updateLanguage
		updateLanguage(language: string) {
			this.locale = language;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: string) {
			this.assemblySize = assemblySize;
		}
	},
	persist: piniaPersistConfig("globalState")
});

// Need to be used outside the setup
export function useGlobalStoreHook() {
	return useGlobalStore(store);
}
