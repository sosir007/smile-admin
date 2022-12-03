<script setup lang="ts">
import { ref } from "vue";
import http from "@/utils/http";
import Check from "@iconify-icons/ep/check";
import Check1 from "@iconify-icons/mdi/check";
import IconifyIconOffline from "@/components/Icon/IconifyIconOffline";

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
		<el-button>{{ $t("button.login") }}</el-button>
		<div class="mx-4 text-red-400 w-200">{{ text }}</div>
		<IconifyIconOffline :icon="Check" class="text-sky-400" />
		<IconifyIconOffline :icon="Check1" class="text-sky-800" />
	</div>
</template>

<style lang="scss" scoped></style>
