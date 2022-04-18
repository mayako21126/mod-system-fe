<template>
	<cl-crud @load="onLoad">
		<el-row type="flex">
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key />
		</el-row>

		<el-row>
			<cl-table v-bind="table">
				<template #slot-btn="{ scope }">
					<el-button type="text" size="mini" @click="gotoMod(scope)">进入</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<cl-pagination />
		</el-row>

		<cl-upsert v-model="form" v-bind="upsert"></cl-upsert>
	</cl-crud>
</template>

<script lang="ts">
import { CrudLoad, Table, Upsert } from "@/crud/types";
import { defineComponent, inject, reactive } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
	name: "namespaces",

	setup() {
		const $service = inject<any>("service");
		const router = useRouter();
		// 表单值
		const form = reactive<any>({
			relevance: 1
		});

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			width: "800px",

			items: [
				{
					prop: "name",
					label: "命名空间",
					span: 12,
					component: {
						name: "el-input",
						props: {
							placeholder: "请填写命名空间"
						}
					},
					rules: {
						required: true,
						message: "命名空间不能为空"
					}
				},
				{
					prop: "url",
					label: "标识",
					span: 12,
					component: {
						name: "el-input",
						props: {
							placeholder: "请填写服务地址"
						}
					},
					rules: {
						required: true,
						message: "服务地址不能为空"
					}
				},
				{
					prop: "remark",
					label: "备注",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请填写备注",
							type: "textarea",
							rows: 4
						}
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			props: {
				"default-sort": {
					prop: "createTime",
					order: "descending"
				}
			},
			columns: [
				{
					type: "selection",
					width: 60
				},
				{
					prop: "name",
					label: "命名空间",
					minWidth: 150
				},
				{
					prop: "url",
					label: "服务地址",
					minWidth: 120
				},
				{
					prop: "remark",
					label: "备注",
					showOverflowTooltip: true,
					minWidth: 150
				},
				{
					prop: "createTime",
					label: "创建时间",
					sortable: "custom",
					minWidth: 150
				},
				{
					prop: "updateTime",
					label: "更新时间",
					sortable: "custom",
					minWidth: 150
				},
				{
					label: "操作",
					type: "op",
					buttons: ["edit", "delete", "slot-btn"]
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			ctx.service($service.namespaces).done();
			app.refresh();
		}
		const gotoMod = function(scope: any) {
			router.push({ path: "/mod/namespaces/item", query: { name: scope.row.name } });
		};
		return {
			form,
			upsert,
			table,
			onLoad,
			gotoMod
		};
	}
});
</script>
