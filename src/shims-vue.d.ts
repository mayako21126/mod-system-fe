/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2021-03-30 18:54:58
 * @LastEditors: mayako
 * @LastEditTime: 2022-03-30 16:47:54
 */
/* eslint-disable */
declare module '*.vue' {
import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module 'array.prototype.flat' {
	function Flat(list: any[]): any[];
	export default Flat;
}

declare module 'clone-deep' {
	function CloneDeep(data: any): any;
	export default CloneDeep;
}

declare module '@/core' {
	export function bootstrap(app: any): Promise<void>;
	export class BaseService {
		namespace: string
		request: Function
	}
	export function Service(val: any): any;
	export function Permission(val: string): any;
	export function useRefs(): any;
}

declare module '@/crud' {
	export const ContextMenu: any;
}

declare module '@/store' {
	import { Store } from 'vuex/types/index.d.ts';
	export const $service;
	export default Store;
}

declare module 'store' {
	export function set(key: string, value: any): void;
	export function get(key: string): any;
	export function remove(key: string): void;
	export function clearAll(): void;
	export function each(callback: Function): void;
}

declare module 'quill' {
	const Quill: any;
	export default Quill;
}

declare module 'codemirror' {
	export function fromTextArea(el: any, options?: any): any;
}

declare module 'js-beautify' {
	export default function(text: string): string;
}

declare module 'nprogress' {
	export function configure(options: any): void;
	export function start(): void;
	export function done(): void;
}

declare module 'mockjs' {
	const Mock: any;
	export default Mock;
}

declare module '@/router' {
	const Router: any = {
		$plugin: {
			addViews(list: any[], options?:any) {}
		}
	}

	interface Ignore {
		token: string[]
	}

	export default Router;
	export const ignore: Ignore;
}

declare module '@/assets/css/common.scss' {
	export const colorPrimary: string;
}

interface Promise {
	then(cb: Function): Promise<any>;
	catch(cb: Function): Promise<any>;
	done(cb: Function): void;
}
interface ComponentInternalInstance {
  ctx: any
}