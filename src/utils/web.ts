import { useI18n } from "vue-i18n";
import { useBreakpoints } from "@vueuse/core";

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	let browserLang = navigator.language || "zh";
	let defaultBrowserLang = "";
	if (
		browserLang.toLowerCase() === "cn" ||
		browserLang.toLowerCase() === "zh" ||
		browserLang.toLowerCase() === "zh-cn"
	) {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}

export function useTimeFix() {
	const { t } = useI18n();
	const time = new Date();
	const hour = time.getHours();

	return hour < 9
		? t("global.welcome.hello_morning_01")
		: hour <= 11
		? t("global.welcome.hello_morning_02")
		: hour <= 13
		? t("global.welcome.hello_afternoon_01")
		: hour < 20
		? t("global.welcome.hello_afternoon_01")
		: t("global.welcome.hello_evening");
}

export function useScreenPixel() {
	const breakpoints = useBreakpoints({
		sm: 640,
		md: 768,
		cmd: 766,
		lg: 1024,
		xl: 1280,
		"2xl": 1536
	});

	const sm = breakpoints.smaller("sm");
	const md = breakpoints.between("sm", "md");
	const cmd = breakpoints.between("sm", "cmd");
	const gtMd = breakpoints.greater("md");
	const lg = breakpoints.between("md", "lg");
	const xl = breakpoints.between("lg", "xl");
	const xxl = breakpoints.between("xl", "2xl");
	const xxxl = breakpoints["2xl"];

	return {
		sm,
		md,
		cmd,
		gtMd,
		lg,
		xl,
		xxl,
		xxxl
	};
}
