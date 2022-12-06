<script setup lang="ts">
import { reactive, computed } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { getBrowserLang } from "@/utils/web";
import { useGlobalStoreHook } from "@/store/modules/global";

// element 语言配置
const globalStore = useGlobalStoreHook();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

const i18nLocale = computed(() => {
	if (globalStore.locale && globalStore.locale == "zh") return zhCn;
	if (globalStore.locale == "en") return en;

	return getBrowserLang() == "zh" ? zhCn : en;
});

// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed((): string => globalStore.assemblySize);
</script>

<template>
	<el-config-provider :locale="i18nLocale" :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<style scoped></style>
