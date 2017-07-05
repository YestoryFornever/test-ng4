import { INCONFIG } from '../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class SystemService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.JsonHeaders;
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
	demo(body:any): Observable<any> {
		let url = this.IP+'demo';
		let options = new RequestOptions({ headers: this.JH });
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
}
