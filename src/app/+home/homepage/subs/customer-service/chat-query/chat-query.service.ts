import {INCONFIG} from '../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class ChatQueryService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
	chatlist(body:any): Observable<any> {
		let url = this.IP+'imcustomservicem/chatlist';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	customlist(body:any): Observable<any> {
		let url = this.IP+'imcustomservicem/customlist';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}

	getOrgFullName(val:string):Observable<any>{
		let url = this.IP+'back/authority/getOrganizationListByFullName';
		let body = JSON.stringify({
			'value':val
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}
	getLoginUser(body:any): Observable<any> {
		let url = this.IP+'security/getLoginUser';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
}
