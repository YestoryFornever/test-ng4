import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()

export class rdShowLiveStreamingService {
	    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	// private UserMsgeUrl = 'http://11.177.50.137:8080/e_project_manager/authority/register/registerUser';

	constructor (private http: Http) {}
// 直播列表
	liveList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"livemanager/liveList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 添加、修改节目
	editLive(obj:Object):Observable<any>{
		// let data = JSON.stringify(obj);
		let Url =this.IP+"livemanager/editLive"
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		// let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, obj, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//修改节目状态
	setLiveValid(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"livemanager/setLiveValid"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 获取用户
	queryUserList(obj:Object):Observable<any>{
		// debugger;
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"back/authority/queryUserList";
		// console.log(Url)
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//修改节目状态
	liveInfo(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"livemanager/liveInfo"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
//观看列表
	liveUserList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"livemanager/liveUserList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}