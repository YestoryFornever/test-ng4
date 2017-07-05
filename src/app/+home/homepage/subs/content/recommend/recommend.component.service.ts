import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// import { News }           from  '../classes/sns-management';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../../public/in.config';



@Injectable()
export class RecommendService {

	private AnotherIp:string = INCONFIG.getIPWithOutE()
	private prod:boolean = INCONFIG.prod
	private UserInfo = INCONFIG.getUserInfo()
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private LH:Headers =  INCONFIG.setLidHeaders();
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	constructor (private http: Http) {}
		
	// 机构Id查债券
	// listHomeRecom(obj:Object):Observable<any>{
	// 	let data = JSON.stringify(obj);

	// 	// e_project_manager/sns/weiboViewDetail
	// 	let Url = ""
	// 	if(!this.prod){
	// 		 Url = "http://11.177.15.104/ainas/institution/bondInfoByIssueId"
	// 	}else{
	// 		Url = this.AnotherIp+"/ainas/institution/bondInfoByIssueId"
	// 	}
	// 	let headers =  this.LH;
	// 	let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
	// 	return this.http.post(Url, data, options)
	// 					.map(this.ExtractResult)
	// 					.catch(this.HandleError);
	// }
	//4.7.1推荐数据源列表
	listHomeRecom(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/listHomeRecom"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.7.2添加到推荐池
	addRecomSource(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/addRecomSource"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//4.7.3从推荐池删除
	delRecomSource(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/delRecomSource"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//4.7.4推荐参数读取
	getRecomParams(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/getRecomParams"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.7.5推荐参数保存
	setRecomParams(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/setRecomParams"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//4.2.5日报、要闻、扫雷的添加
	infoTo(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/infoTo"
		let headers =  this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//4.2.5日报、要闻、扫雷的发布/撤回
	infoRelease(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/infoRelease"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//4.2.7日报、要闻、扫雷 、个债关注池的删除
	infoDel(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/infoDel"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

}