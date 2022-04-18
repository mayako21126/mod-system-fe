/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2021-03-30 18:54:58
 * @LastEditors: mayako
 * @LastEditTime: 2022-03-29 14:10:38
 */
import path from "path";
import store from "@/store";

export default function(app: any) {
	const files = require.context("@/service/", true, /\.js$|\.ts$/);
	const ignore = ["./request.js"];
	const modules: any = {};

	files
		.keys()
		.filter(e => !ignore.includes(e))
		.map(e => {
			if (e.includes("--ignore")) {
				return false;
			}

			const list = e.substr(2).split("/");
			const parents = list.slice(0, list.length - 1);
			const name = path.basename(path.basename(e, ".ts"), ".js");

			let curr: any = modules;
			let prev: any = null;
			let key: any = null;

			parents.forEach(k => {
				if (!curr[k]) {
					curr[k] = {};
				}

				prev = curr;
				curr = curr[k];
				key = k;
			});

			const ep = files(e);

			if (ep.default) {
				const service = new ep.default();

				if (name == "index") {
					prev[key] = service;
				} else {
					curr[name] = service;
				}
			} else {
				console.error(`Service must export default in ${e}`);
			}
		});

	// @ts-ignore
	app.config.globalProperties.$service = store.$service = modules;
	app.provide("service", modules);
}
