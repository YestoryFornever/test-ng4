import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Organization }           from '../classes/organizations';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class AuthMenuBtnSettingListService {
	private organizationsUrl = 'app/auth_organizations/';  // URL to web API

	constructor (private http: Http) {}

	getOrganizations (fullname?:string,abbreviation?:string,c1?:string,c2?:string): Observable<Organization[]> {
		let url = this.organizationsUrl;
		if(fullname||abbreviation||c1||c2){
			url+="?"
			if(fullname){url+=`fullname=${fullname}&`}
			if(abbreviation){url+=`abbreviation=${abbreviation}&`}
			if(c1){url+=`c1=${c1}&`}
			if(c2){url+=`c2=${c2}&`}
			url=url.substring(0,url.length-1);
		}
		return this.http.get(url)
						.map(this.extractData)
						.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}

	private handleError (error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}