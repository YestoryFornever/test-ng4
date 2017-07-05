import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User }           from '../classes/login';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class LoginService {
	private LoginUrl = 'app/loginMsg';

	constructor (private http: Http) {};

	getUser(): Observable<User[]>{
		let url = this.LoginUrl;
		
		return this.http.get(url)
						.map(this.extractData)
						.catch(this.handleError);
		
	}

	private extractData(res: Response) {
    let body = res.json();
    // debugger;
    return body.data || { };
  }
   private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}