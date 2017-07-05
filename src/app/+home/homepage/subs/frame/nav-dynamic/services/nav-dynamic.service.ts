import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { NavDynamic,Nav } from '../classes/nav-dynamic';
@Injectable()
export class NavDynamicService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private HandleError = INCONFIG.handleError();
	constructor(private http:Http){}

	getNavs():Observable<NavDynamic>{
		let url = this.IP+'back/authority/getMenuList';
		let body = JSON.stringify({
			// "parentMenuId":"1"
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}
	getMockNavs(){
		return {
			items:[
				{
					label:"用户列表",
					router_id:"user-list"
				},
				{
					label:"添加用户",
					router_id:"user-edit"
				},
				{
					label:"用户审核",
					router_id:"user-approve"
				},
				{
					label:"审核历史",
					router_id:"user-approve-history"
				}
			],
			group:'用户管理',
			showNavDynamic:false
		}
	}
	
}
