import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import { ParameterSet } from '../classes/parameter-set'


@Injectable()

export class ParameterSetService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
   //参数设置列表
	applicationSetList(obj:Object):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/list";
        let url = this.IP+'goldcoin/coinconfig/list';
		let ser = JSON.stringify(obj);

		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//恢复默认值
	defaultList(obj:Object):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/list";
        let url = this.IP+'goldcoin/coinconfig/default';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//修改设置
	updateApplicationList(obj:any):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/list";
        let url = this.IP+'goldcoin/coinconfig/update';
        // let ser = JSON.stringify(obj);
        // console.log(obj)
        // // let send:any ;
        // for (let i in obj){
        // 	// console.log(obj[i].activityStart);
        // 	// console.log(obj[i].activityEnd);
        // 	obj[i].activityStart = Date.parse(obj[i].activityStart)
        // 	obj[i].activityEnd = Date.parse(obj[i].activityEnd)

        // }

		let ser = JSON.stringify(obj);
		// console.log(ser);
		// debugger;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	


}