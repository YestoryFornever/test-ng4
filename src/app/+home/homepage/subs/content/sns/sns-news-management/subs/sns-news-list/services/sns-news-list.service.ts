import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { News }           from '../classes/sns-new-list';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()

export class SnsNewsListService {
	private UserMsgeUrl = 'app/news';

	constructor (private http: Http) {}

	getNewlist(): Observable<News[]>{

		return this.http.get(this.UserMsgeUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}


  
	private extractData(res:Response) {
    let body = res.json();
    // debugger;
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