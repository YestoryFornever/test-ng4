import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../../../../public/in.config';

@Injectable()

export class UserRechargeLogServices {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	constructor (private http: Http) {}

	// 用户充值列表
	userRechargeList(obj:Object):Observable<any>{

		let data = JSON.stringify(obj);
		let Url = this.IP+"goldcoin/userrecharge/list";
		// console.log(data);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 统计 信息
	totalInfo(obj:Object):Observable<any>{

		let data = JSON.stringify(obj);
		let Url = this.IP+"goldcoin/userrecharge/total";
		// console.log(data);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//导出表格
    exportExcles(obj:Object):Observable<any>{
        let url = this.IP+'goldcoin/userrecharge/export';
        let ser = JSON.stringify(obj);
        console.log(ser)
        console.log(url)
        // debugger;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
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
 // exportExcle(obj:Object):Observable<any>{
 //        let url = this.IP+'goldcoin/userrecharge/export?' + obj ;
 //        let ser = JSON.stringify(obj);
 //        // 
 //        console.log(obj)
 //        console.log(url)
 //        // debugger;

 //        // let headers = new Headers({ 'Content-Type': 'application/json' });
 //        // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
 //        return url;
 //    }


}