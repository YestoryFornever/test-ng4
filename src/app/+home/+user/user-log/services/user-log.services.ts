import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// import { News }           from  '../classes/sns-management';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../public/in.config';



@Injectable()

export class UserLogServices {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	constructor (private http: Http) {}
		
	// 用户日志列表
	userLogList(obj:Object):Observable<any>{

		
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"userLog/list";
		console.log(Url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//获取功能模块 列表
	fnModuleList(obj:Object):Observable<any>{

		
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		// let Url = 'http://127.0.0.1:9999/emanager/dict/queryDict.json';
		let Url = this.IP+'dict/queryDict.json';
		// console.log(Url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

// 获取公司
	// getCompany(obj:Object):Observable<any>{
	// 	let data = JSON.stringify(obj);
	// 	// e_project_manager/sns/weiboViewDetail
	// 	let Url = this.IP+"back/authority/getOrganizationList"
	// 	let headers = new Headers({ 'Content-Type': 'application/json' });
	// 	let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
	// 	return this.http.post(Url, data, options)
	// 					.map(this.ExtractResult)
	// 					.catch(this.HandleError);
	// }

}