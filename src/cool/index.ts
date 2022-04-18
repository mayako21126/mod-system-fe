/*
 * @Description:
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2021-03-30 18:54:58
 * @LastEditors: mayako
 * @LastEditTime: 2022-04-02 14:14:39
 */
import Crud from "../crud";

export default {
	modules: [
		// 基础模块
		"base",
		// 文件上传
		{
			name: "upload",
			options: {
				icon: "el-icon-picture",
				text: "选择图片"
			}
		},
		{
			name: "crud",
			value: Crud,
			options: {
				crud: {
					dict: {
						sort: {
							prop: "order",
							order: "sort"
						}
					}
				}
			}
		},
		// 客服聊天
		// "chat",
		// 任务管理
		"task",
		// 复制指令
		"copy",
		// 示例页
		"demo",
		// 主题切换
		"theme"
	]
};
