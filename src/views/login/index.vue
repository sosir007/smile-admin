<script setup lang="ts">
import { ref } from "vue";
import http from "@/utils/http";

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
		<div class="ml-4 text-red-400 w-200">{{ text }}</div>
	</div>
</template>

<style lang="scss" scoped></style>
