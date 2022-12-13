import * as veeValidate from "vee-validate";
import rules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import yup, { setLocalLocale } from "./yup";
import zh from "@vee-validate/i18n/dist/locale/zh_CN.json";
import en from "@vee-validate/i18n/dist/locale/en.json";
import { useGlobalStoreHook } from "@/store/modules/global";

veeValidate.configure({
	generateMessage: localize({
		en,
		zh
	})
});

const globalStore = useGlobalStoreHook();
setLocalLocale(globalStore.locale);

Object.keys(rules).forEach(key => {
	veeValidate.defineRule(key, rules[key]);
});

const useFields = (fields: string[]) => {
	fields.forEach(field => veeValidate.useField(field));
};

export default { yup, ...veeValidate, useFields };
