import { ElMessage } from "element-plus";

type ElMessageType = "success" | "warning" | "info" | "error";

export function useMessage(type: ElMessageType, message: string) {
	ElMessage({
		message,
		type,
		duration: 2000,
		customClass: "message-box-custom-class"
	});
}
