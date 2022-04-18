<template>
	<div class="category-ratio">
		<div class="category-ratio__header">
			<span>模块请求占比</span>
		</div>

		<div class="category-ratio__container">
			<v-chart :option="chartOption" autoresize></v-chart>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, onMounted } from "vue";
import qs from "qs";
export default defineComponent({
	setup() {
		const $service = inject<any>("service");
		const chartOption = reactive({
			tooltip: {
				trigger: "item",
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				bottom: 30,
				left: "center",
				data: []
			},
			color: ["#3AA1FF", "#36CBCB", "#F2637B", "#975FE5", "#FBD437"],
			series: [
				{
					name: "请求模块空间",
					type: "pie",
					radius: ["50%", "60%"],
					center: ["50%", "40%"],
					avoidLabelOverlap: false,
					hoverAnimation: false,
					label: {
						show: false,
						position: "center"
					},
					emphasis: {
						label: {
							show: true,
							fontSize: "30",
							fontWeight: "bold"
						}
					},
					labelLine: {
						show: false
					},
					data: [],
					itemStyle: {
						normal: {
							borderColor: "#fff",
							borderWidth: 4
						}
					},
					roundCap: 1
				}
			]
		});
		const load = async function() {
			const list = await $service.namespaces.modLogs();
			const nsl = await $service.namespaces.list();
			const map = new Map();
			nsl.forEach((element: any) => {
				const name = element.name;
				map.set(name, 0);
				list.forEach((i: any) => {
					try {
						const log = qs.parse(
							new URLSearchParams(JSON.parse(i.params)).toString()
						) as {
							remoteList: any;
						};
						if (log.remoteList as Array<Text>) {
							if (log.remoteList.indexOf(name) >= 0) map.set(name, map.get(name) + 1);
						}
					} catch (error) {
						console.error(error);
					}
				});
			});
			map.forEach((value: any, key: any) => {
				chartOption.legend.data.push(key as never);
				chartOption.series[0].data.push({
					value: value,
					name: key
				} as never);
			});
			console.log(chartOption);
		};
		onMounted(() => {
			load();
		});
		return {
			chartOption
		};
	}
});
</script>

<style lang="scss" scoped>
.category-ratio {
	&__header {
		display: flex;
		align-items: center;
		height: 50px;
		font-size: 15px;
		font-weight: bold;
		padding: 0 20px;
	}

	&__container {
		height: 415px;
		padding: 0 20px;
		box-sizing: border-box;

		.echarts {
			width: 100%;
		}
	}
}
</style>
