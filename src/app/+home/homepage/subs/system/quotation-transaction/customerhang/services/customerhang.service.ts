import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()

export class CustomerHangService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
   //查询版本列表
	
	//添加版本信息
	addVersionInfor(obj:Object):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/add";
        let url = this.IP+'appVersion/add';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	//修改版本信息
	modifyVersionInfor(obj:Object):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/update";
        let url = this.IP+'appVersion/update';
		let ser = JSON.stringify(obj);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}


}