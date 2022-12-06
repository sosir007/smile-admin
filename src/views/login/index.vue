<script setup lang="ts">
import { ref } from "vue";
import http from "@/utils/http";
import Check from "@iconify-icons/ep/check";
import Check1 from "@iconify-icons/mdi/check";
import Search from "@iconify-icons/ep/search";
import { useRenderIcon } from "@/components/Icon/src/hooks";

interface TestType {
	text: string;
}
const getAuthMenuListApi = () => {
	return http.get<TestType>("/api/test", {}, { headers: { noLoading: true } });
};

let text = ref<string>("");

const testFn = async () => {
	const { data } = await getAuthMenuListApi();
	text.value = data.text;
};

testFn();
</script>

<template>
	<div class="mt-4 flex-c">
		<el-button>{{ $t("global.loginForm.button.login") }}</el-button>
		<div class="mx-4 text-red-400 w-200">{{ text }}</div>
		<IconifyIconOffline :icon="Check" class="text-sky-200" />
		<IconifyIconOffline :icon="Check1" class="text-xl text-sky-400" />
		<IconifyIconOnline icon="carbon:game-console" class="text-2xl text-sky-600" />
		<FontIcon class="!text-3xl iconfont icon-error-403 text-sky-800"></FontIcon>
		<FontIcon icon="iconfont icon-error-500" style="font-size: 40px; color: blueviolet"></FontIcon>
	</div>
	<div class="mt-4 flex-c">
		<el-button type="primary" :icon="useRenderIcon(Search)"> 搜索 </el-button>
		<el-button type="primary" :icon="useRenderIcon('icon-view')"> 搜索 </el-button>
		<component :is="useRenderIcon('icon-view')" style="font-size: 30px; color: goldenrod" />
	</div>
</template>

<style lang="scss" scoped></style>
