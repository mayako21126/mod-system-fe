<template>
	<el-form
		:model="formData"
		ref="vForm"
		:rules="rules"
		label-position="left"
		label-width="150px"
		size="default"
		@submit.prevent
		v-loading="loading"
	>
		<el-form-item label="模块名" prop="title" class="required label-right-align">
			<el-input v-model="formData.title" type="text" clearable></el-input>
		</el-form-item>
		<el-form-item label="备注" prop="remark" class="required label-right-align">
			<el-input type="textarea" v-model="formData.remark" rows="3"></el-input>
		</el-form-item>
		<el-form-item label="图片地址" prop="pic" class="required label-right-align">
			<el-input v-model="formData.pic" type="text" clearable></el-input>
		</el-form-item>
		<el-form-item label="命名空间" prop="namespace" class="label-right-align">
			<el-input v-model="formData.namespace" type="text" disabled clearable></el-input>
		</el-form-item>
		<div class="static-content-item">
			<el-divider direction="horizontal"></el-divider>
		</div>
		<div class="static-content-item">
			<el-button type="primary" @click="submitForm">保存</el-button>
			<el-button @click="closeForm">取消</el-button>
		</div>
	</el-form>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, getCurrentInstance, inject, onMounted } from "vue";
export default defineComponent({
	components: {},
	name: "addForm",
	props: {
		formState: {
			type: String,
			required: true,
			default: "create"
		},
		formId: {
			type: Number
		},
		formNs: {
			type: Object,
			required: true
		}
	},
	emits: ["close"],
	setup(props, { emit }) {
		const $service = inject<any>("service");
		const state = reactive({
			loading: true,
			formData: {
				title: "",
				remark: "",
				pic: "",
				namespace: props.formNs.name
			},
			editObject: {} as object,
			rules: {
				title: [
					{
						required: true,
						message: "模块名不可为空"
					}
				],
				remark: [
					{
						required: true,
						message: "备注不可为空"
					}
				],
				pic: [
					{
						required: true,
						message: "图片不可为空"
					}
				]
			}
		});
		const closeForm = () => {
			emit("close", true);
		};
		const instance = getCurrentInstance();
		const resetForm = () => {
			if (instance) {
				const { ctx } = instance as any;
				ctx.$refs["vForm"].resetFields();
			}
		};
		const addGood = async function(data: any) {
			$service.goods
				.add(data)
				.then((res: any) => {
					console.log(res);
					emit("close", true);
					// resetForm();
				})
				.catch((err: string) => {
					console.error(err);
				});
		};
		const editGood = async function(data: any) {
			$service.goods
				.update(data)
				.then((res: any) => {
					console.log(res);
					emit("close", true);
					// resetForm();
				})
				.catch((err: string) => {
					console.error(err);
				});
		};
		const submitForm = () => {
			if (instance) {
				const { ctx } = instance as any;
				ctx.$refs["vForm"].validate((valid: any) => {
					if (!valid) return;
					if (props.formState === "create") {
						const data = {
							title: state.formData.title,
							pic: state.formData.pic,
							namespace: props.formNs.id,
							remark: state.formData.remark
						};
						addGood(data);
					} else {
						const data = {
							title: state.formData.title,
							pic: state.formData.pic,
							namespace: props.formNs.id,
							remark: state.formData.remark,
							id: props.formId
						};
						editGood(data);
					}
				});
			}
		};
		onMounted(async () => {
			if (props.formState !== "create") {
				const data = await $service.goods.list({ id: props.formId });
				state.formData.title = data[0].title;
				state.formData.pic = data[0].pic;
				state.formData.remark = data[0].remark;
				state.loading = false;
			} else {
				state.loading = false;
			}
		});
		return {
			...toRefs(state),
			submitForm,
			closeForm,
			resetForm
		};
	}
});
</script>

<style lang="scss">
.el-input-number.full-width-input,
.el-cascader.full-width-input {
	width: 100% !important;
}

.el-form-item--medium {
	.el-radio {
		line-height: 36px !important;
	}

	.el-rate {
		margin-top: 8px;
	}
}

.el-form-item--small {
	.el-radio {
		line-height: 32px !important;
	}

	.el-rate {
		margin-top: 6px;
	}
}

.el-form-item--mini {
	.el-radio {
		line-height: 28px !important;
	}

	.el-rate {
		margin-top: 4px;
	}
}

.clear-fix:before,
.clear-fix:after {
	display: table;
	content: "";
}

.clear-fix:after {
	clear: both;
}

.float-right {
	float: right;
}
</style>

<style lang="scss" scoped>
div.table-container {
	table.table-layout {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;

		td.table-cell {
			display: table-cell;
			height: 36px;
			border: 1px solid #e1e2e3;
		}
	}
}

div.tab-container {
}

.label-left-align :deep(.el-form-item__label) {
	text-align: left;
}

.label-center-align :deep(.el-form-item__label) {
	text-align: center;
}

.label-right-align :deep(.el-form-item__label) {
	text-align: right;
}

.custom-label {
}

.static-content-item {
	min-height: 20px;
	display: flex;
	align-items: center;

	:deep(.el-divider--horizontal) {
		margin: 0;
	}
}
</style>
