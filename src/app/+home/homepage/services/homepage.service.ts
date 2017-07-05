import {INCONFIG} from '../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomepageService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}

	getUser(): Observable<any> {
		let url = this.IP+'security/getLoginUser';
		let body = JSON.stringify({});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}
	updatePwd(oldPwd:string, newPwd:string ): Observable<any> {
		let url = this.IP+'security/updateMyPassword';
		let body = JSON.stringify({
			"oldPassword":oldPwd,
			"newPassword":newPwd
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}