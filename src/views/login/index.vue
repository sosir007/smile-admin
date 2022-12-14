<script setup lang="ts">
import v from "@/plugins/validate";
import md5 from "js-md5";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { login } from "@/api/modules/user";
import { useMessage } from "@/hooks/useMessage";
import { useUserStoreHook } from "@/store/modules/user";
import VeeValidateError from "@/components/VeeValidateError/index.vue";

const router = useRouter();
const useUserStore = useUserStoreHook();
const { t } = useI18n();
const { yup, useForm, useFields } = v;

const schema = {
	account: yup
		.string()
		.required()
		.matches(/^\d{11}|.+@.+$/, t("global.loginForm.schema.account"))
		.label(t("global.loginForm.label.account")),
	password: yup
		.string()
		.required()
		.min(6, t("global.loginForm.schema.password"))
		.label(t("global.loginForm.label.password"))
};

const { handleSubmit, errors, values } = useForm({
	initialValues: {
		account: "17855827571",
		password: "123456"
	},
	validationSchema: schema
});
useFields(Object.keys(schema));

const onSubmit = handleSubmit(async values => {
	const { data, code, message } = await login({ ...values, password: md5(values.password) });
	if (code !== 200) useMessage("error", message);

	useUserStore.setToken(data.accessToken);
	// 跳转到首页
	router.push(HOME_URL);
	// useMessage("success", `${time}，${useUserStore.username}`);
});
</script>

<template>
	<div class="h-screen font-sans login-container">
		<div class="h-full mx-auto flex-c">
			<div class="relative w-full mx-10 sm:max-w-sm">
				<div class="login-card bg-blue-400 -rotate-6"></div>
				<div class="login-card bg-red-400 rotate-6"></div>
				<div class="relative w-full px-6 py-4 bg-gray-100 shadow-md rounded-3xl">
					<h2 class="mt-3 text-2xl text-center text-gray-700">
						{{ $t("global.loginForm.text.title") }}
					</h2>
					<form class="mt-10" @submit.prevent="onSubmit">
						<!-- 账号 -->
						<div class="relative">
							<input
								v-model="values.account"
								:placeholder="$t('global.loginForm.placeholder.account')"
								class="login-input"
							/>
							<VeeValidateError :error="errors.account" />
						</div>

						<!-- 密码 -->
						<div class="relative mt-10">
							<input
								v-model="values.password"
								type="password"
								:placeholder="$t('global.loginForm.placeholder.password')"
								class="login-input"
							/>
							<VeeValidateError :error="errors.password" />
						</div>

						<!-- 记住密码和忘记密码 -->
						<div class="flex mt-10">
							<label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
								<input
									id="remember_me"
									type="checkbox"
									class="text-indigo-600 border-gray-300 rounded shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									name="remember"
								/>
								<span class="ml-2 text-sm text-gray-600">
									{{ $t("global.loginForm.text.remember") }}
								</span>
							</label>

							<div class="w-full text-right">
								<a class="text-sm text-gray-600 underline hover:text-gray-900" href="#">
									{{ $t("global.loginForm.button.forget") }}
								</a>
							</div>
						</div>

						<!-- 登录按钮 -->
						<div class="mt-7">
							<button class="login-btn hover:-translate-x">
								{{ $t("global.loginForm.text.title") }}
							</button>
						</div>

						<!-- 第三方登录 -->
						<div class="flex-c mt-7 text-center">
							<hr class="border-gray-300 border-1 w-full rounded-md" />
							<label class="block font-medium text-sm text-gray-600 w-full">
								{{ $t("global.loginForm.text.OAuth") }}
							</label>
							<hr class="border-gray-300 border-1 w-full rounded-md" />
						</div>

						<div class="flex mt-7 justify-center w-full">
							<div class="mr-5 flex-x login-oauth-btn bg-sky-500 hover:-translate-x">
								<FontIcon class="!text-lg iconfont icon-github"></FontIcon>
								<span class="ml-1">{{ $t("global.loginForm.button.github") }}</span>
							</div>
							<div class="flex-x login-oauth-btn bg-green-500 hover:-translate-x">
								<FontIcon class="!text-lg iconfont icon-weixin"></FontIcon>
								<span class="ml-1">{{ $t("global.loginForm.button.wechat") }}</span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-container {
	background: url("../../assets/images/background.jpg");
	background-repeat: no-repeat;
	background-size: cover;

	.login-card {
		@apply absolute w-full h-full transform shadow-lg rounded-3xl;
	}

	.login-input {
		@apply mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0;
	}

	.login-btn {
		@apply bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:scale-105;
	}

	.login-oauth-btn {
		@apply border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:scale-105;
	}
}
</style>
