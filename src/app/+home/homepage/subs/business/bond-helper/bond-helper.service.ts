import {INCONFIG} from '../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class BondHelperService {
	private IP:string = INCONFIG.getIP();
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
	queryTeamList(body:any): Observable<any> {
		let url = this.IP+'bondhelp/queryTeamList';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	queryTeamDetail(body:any): Observable<any> {
		let url = this.IP+'bondhelp/queryTeamDetail';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	saveTeam(body:any): Observable<any> {
		let url = this.IP+'bondhelp/saveTeam';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	saveTeamMe(body:any): Observable<any> {
		let url = this.IP+'bondhelp/saveTeamMe';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	refOutQQGrp(body:any): Observable<any> {
		let url = this.IP+'bondhelp/refOutQQGrp';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	delTeamMe(body:any): Observable<any> {
		let url = this.IP+'bondhelp/delTeamMe';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	getUserDetailByLoginName(body:any): Observable<any> {
		let url = this.IP+'back/authority/getUserDetailByLoginName';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
}