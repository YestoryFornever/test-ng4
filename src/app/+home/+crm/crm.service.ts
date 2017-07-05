import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// import { News }           from  '../classes/sns-management';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../public/in.config';

@Injectable()
export class VideoManagementService {

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
		
//客户经理信息
	queryUserList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"crm/user/queryUserList"
		let headers =  this.JH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//查看已机构分配
	saveVideo(obj:Object):Observable<any>{
		// let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"sns/saveVideo"
		let headers =  this.FDH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, obj, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}