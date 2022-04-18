/*
 * @Description:
 * @Version: 2.0
 * @Autor: mayako
 * @Date: 2022-03-29 13:37:54
 * @LastEditors: mayako
 * @LastEditTime: 2022-04-02 14:56:43
 */
import { BaseService, Service, Permission } from "@/core";

@Service("demo/namespaces")
class Namespaces extends BaseService {
	@Permission("modLogs")
	modLogs() {
		return this.request({
			url: "/modLogs",
			method: "GET"
		});
	}
}

export default Namespaces;
