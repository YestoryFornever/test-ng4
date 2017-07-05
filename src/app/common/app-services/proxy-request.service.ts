import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';

import { ApiDomain } from 'app.config';
import { UserStatusService } from './user-status.service';

@Injectable()
export class ProxyRequestService {
  constructor(public http:Http, public UserStatusService:UserStatusService) {
 
  }
  _prefix()
  {
    return ApiDomain;
  }
  // get(url, params, header) {
  //   return this.http.get(url, {search: params}).map(result=>result.json());
  // }
  // http.post
  post(url:string, data:Object, header?:any) {
    let headers = header||new Headers({ 
        'Content-Type': 'application/json',
        'lid': this.UserStatusService.lid
    });
    let options = new RequestOptions({ 
      headers: headers 
    });
    let _url = this._prefix() + url;
    return new Promise((resolve, reject)=>{
        this.http.post(_url, data, options)
        .toPromise()
        .then(res => (<Response>res).json())
        .then(function(res){
          console.log(res);
          // debugger
          if(res.status==0){
            resolve(res);
          }else{
            reject(res);
          }
        })
        .catch(function(error){
            console.error(error);
            reject(error);
        });
    });
  }
  /**
   * 上传
   */
  upload(url:string, data:Object, header?:any){
    let headers = header||new Headers({ 
        // 'Content-Type': 'multipart/form-data',
        'lid': this.UserStatusService.lid
    });
    // headers.append('Content-Type', 'multipart/form-data');
    let options = new RequestOptions({ 
      headers: headers 
    });
    var _data = new FormData();
    for (var i in data) {
      _data.append(i, data[i]);
    }
    let _url = this._prefix() + url;
    return new Promise((resolve, reject)=>{
        this.http.post(_url, _data, options)
        .toPromise()
        .then(res => (<Response>res).json())
        .then(function(res){
          console.log(res);
          if(res.status==0){
            resolve(res);
          }else{
            reject(res);
          }
        })
        .catch(function(error){
            console.error(error);
            reject(error);
        });
    });
  }
  
}