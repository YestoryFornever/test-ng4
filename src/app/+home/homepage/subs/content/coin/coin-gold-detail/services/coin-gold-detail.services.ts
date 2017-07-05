import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// import { News }           from  '../classes/sns-management';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../../../../public/in.config';



@Injectable()

export class CoinGoldDetailServices {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	constructor (private http: Http) {}


	// 金币明细
	goldDetailList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/coindetail/query";
		// console.log(Url)
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//   金币收支明细总额
	goldSumCoinDetail (obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/coindetail/sumcoindetail"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//   金币发放记录
	goldRecord(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/record"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//   匹配手机号
	matchPhone(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/matchphone"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//   发放金币
	sendGold(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/send"
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
		//   4.6.8手工扣除金币
	deduct(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/deduct"
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
// 管理员列表
queryUserList():Observable<any>{
		var obj={
			pageNum:1,
			pageSize:1000
		}
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"security/admin/queryUserList"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 获取管理员金币发放数
availablecoin(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/availablecoin"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.12.1金币发放授权列表查询
sendauthList(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/sendauth/list"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.12.新增授权
sendauthAdd(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/sendauth/add"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.12.修改授权
sendauthUpdate(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/sendauth/update"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.12.删除授权
sendauthDelete(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/sendauth/delete"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.12.新增授权管理员
getmanagerlist(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/sendauth/getmanagerlist"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

// 4.7.2金币发放操作人列表
getcreateuserlist(obj:any):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"goldcoin/manualsend/getcreateuserlist"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}
