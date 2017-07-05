import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { OrderCondition,Order } from '../classes/audit-item';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class OrderListService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}

	getOrders (condition:OrderCondition): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/list';
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let param_status:string;
		if(condition.status['all']){
			param_status = '';
		}else{
			let status_arr:string[] = new Array();
			for(let item in condition.status){
				if(condition.status[item]){
					status_arr.push(item.slice(6));
				}
			}
			param_status = status_arr.join();
		}
		let body = JSON.stringify({
			'pageNum':condition.currentPage,
			'pageSize':condition.itemsPerPage,
			'sortType':'',
			'orderType':'',
			'status':param_status,
			'requestTimeStart':(Date.parse(condition.requestTimeStart) ),
			'requestTimeEnd':(Date.parse(condition.requestTimeEnd)-0 + 1000*24*3600),
			'orderNumber':this.trim(condition.orderNumber),
			'phone':this.trim(condition.phone),
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}
	// 去空格
	trim(str:any) { //删除左右两端的空格　　
	  return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	// 请求  判断去哪个页面
	CoodSexChagesInfo (obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/info';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//订单操作记录
	operateLog(obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/operatelog';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//拒绝申请
	refuse(obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/refuse';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//更改订单信息
	changeOrderInfo(obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/changeorderinfo';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//确认完成
	confirmFinish (obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/confirmfinish  ';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//确认发货
	confirmSend (obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/confirmsend ';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//通过申请
	passApply (obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/coodsexchages/passapply ';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	//获取物流信息
	companyInfo (obj :any): Observable<any[]> {
		let url = this.IP+'goldcoin/logistic/track ';
		// let url = 'http://11.177.15.104:8080/goldcoin-web-server/coin/logistic/track';
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let body = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	// 获取 物流商字典
	company(obj:Object):Observable<any>{
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
	// 测试用户信息
	test(obj:Object):Observable<any>{

		
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		// let Url = 'http://127.0.0.1:9999/emanager/dict/queryDict.json';
		let Url = this.IP+'security/admin/add';
		// console.log(Url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 获取 同户名片
	getUserProfileInfo(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		// let Url = 'http://127.0.0.1:9999/emanager/dict/queryDict.json';
		let Url = this.IP+'back/authority/getUserProfileInfor';
		// console.log(Url);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	

}
