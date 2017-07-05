import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
// import { UserMsge }       from '../classes/user-approve';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()

export class CoinGoldStatistiscsservice {
		private IP:string = INCONFIG.getIP()
		private JH:Headers = INCONFIG.setLidHeaders();
		private FDH:Headers = INCONFIG.FormDataHeaders;
		private ExtractResult = INCONFIG.extractResult();
		private extractData = INCONFIG.extractData();
		private HandleError = INCONFIG.handleError();
		private UserMsgeUrl = 'app/userMsges';
	// private UserMsgeUrl = 'http://11.177.50.137:8080/e_project_manager/authority/register/registerUser';

	constructor (private http: Http) {}
	// UrlId:string="11.177.15.104:8080/emanager";
	// UrlId:string="11.177.50.66:9999/emanager";
	
	// getUserMsge(): Observable<any[]>{
	// 	return this.http.get(this.UserMsgeUrl)
	// 					.map(this.extractData)
	// 					.catch(this.HandleError);
		
	// }
  	//4.7.1金币收支统计
    coinstatistics(obj:Object):Observable<any>{
        let url = this.IP+'goldcoin/coindetail/coinstatistics';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    // 4.7.2今日收支统计
    todaystatistics(obj:Object):Observable<any>{
        let url = this.IP+'goldcoin/coindetail/todaystatistics';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
   

}