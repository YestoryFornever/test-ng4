import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Role }           from '../classes/role';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class AuthRoleManageService {
	// private rolesUrl = 'app/auth_roles/';  // URL to web API
//添加部分
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();//摘取数据
	private ExtractResult = INCONFIG.extractResult();//摘取结果
	private HandleError = INCONFIG.handleError();
//添加部分结束
	constructor (private http: Http) {}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}

	private handleError (error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}

//查询角色
	getRoles (obj:Object): Observable<any> {
		//debugger;
		let url = this.IP+'security/role/queryList';
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

//点击添加角色按钮
	addRole(obj:Object):Observable<any>{

		let url = this.IP+'security/role/add';
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

//编辑角色
	editRole(obj:Object):Observable<any>{
		// debugger;
		let url = this.IP+'security/role/update';
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

//删除列表信息
	deleteRole(obj:Object):Observable<any>{
		
		let url=this.IP+"security/role/delete";
		let body=JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url,body,options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
//复制角色
	copyRole(obj:Object){
		// debugger;
		let url=this.IP+"security/role/copy";
		let body=JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url,body,options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
//查看角色授权

	lookRoleApprove(obj:Object):Observable<any>{
		// debugger;
		let url = this.IP+'security/role/getPermissions';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
// 成员维护
	getUsersForRole(obj:Object):Observable<any>{
		// debugger;
		let url = this.IP+'security/admin/getUsersForRole';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
//更新角色成员
	updataRoleList(obj:Object):Observable<any>{
		// debugger;
		let url=this.IP+"security/role/updateMemmbers";
		let body=JSON.stringify(obj);
		// 	{
		// 	'roleId':roleLs.roleId,
		// });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url,body,options)
			.map(this.ExtractResult)
			.catch(this.HandleError);

	}
// 获取分配权限列表
	getPermissionGroups(obj:Object):Observable<any>{
		let url = this.IP+'security/role/getPermissionGroupsForRole';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

// 更新角色的权限分组
	updatePermssionGroups(obj:Object):Observable<any>{
		// debugger;
		let url = this.IP+'security/role/updatePermssionGroups';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}



}








































