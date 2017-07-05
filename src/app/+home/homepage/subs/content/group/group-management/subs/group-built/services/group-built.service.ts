import {INCONFIG} from '../../../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { GroupBuiltList}       from '../classes/group-built';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}
 
@Injectable()

export class GroupBuiltService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}

//post数据
//查询所有人
    postcheckMsge(obj:Object):Observable<any>{
        let url = this.IP+'userGroup/getGroupUserList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//新建群接口
    postupdateimgMsge(obj:any):Observable<any>{
        let url = this.IP+'group/saveGroup';    
           let headers = INCONFIG.setLidHeaders();
        headers.delete('Content-Type');
        let options = new RequestOptions({headers: headers});
        return this.http.post(url, obj, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
	
}