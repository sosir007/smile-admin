<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStoreHook } from "@/store/modules/global";

const globalStore = useGlobalStoreHook();
const isCollapse = computed(() => globalStore.config.isCollapse);
</script>

<template>
	<div class="sidebar-container">
		<el-aside>
			<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
				<div class="logo flex-c">
					<img src="@/assets/images/PokemonBall.png" alt="logo" />
					<span v-show="!isCollapse">{{ globalStore.config.title }}</span>
				</div>
			</div>
		</el-aside>
	</div>
</template>

<style lang="scss" scoped>
.sidebar-container {
	width: 100%;
	height: 100%;

	.el-aside {
		width: auto;
		overflow: inherit;
		background-color: #ffffff;
		border-right: 1px solid #e5e7eb;

		.logo {
			box-sizing: border-box;
			height: 55px;

			span {
				font-size: 21.5px;
				font-weight: bold;
				color: #1890ff;
				white-space: nowrap;
			}

			img {
				width: 28px;
				object-fit: contain;
				margin-right: 6px;
			}
		}

		.menu {
			display: flex;
			flex-direction: column;
			height: 100%;
			transition: all 0.3s ease;

			.el-scrollbar {
				height: calc(100% - 55px);

				.el-menu {
					overflow-x: hidden;
					border-right: none;
				}
			}
		}
	}
}
</style>
