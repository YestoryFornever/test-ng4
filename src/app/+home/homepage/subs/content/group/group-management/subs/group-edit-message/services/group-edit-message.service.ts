import {INCONFIG} from '../../../../../../../../../../public/in.config'
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { GroupEditMessageList}       from '../classes/group-edit-message';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}
 
@Injectable()

export class GroupEditMessageService {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

    constructor (private http: Http) {}

//post数据
     posteditListMsge(obj:Object):Observable<any>{
        let url = this.IP+'group/groupList';
        //let url = this.IP+'/back/authority/queryUserList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//编辑群信息 
    postupdateEditMsge(obj:any):Observable<any>{
        let url = this.IP+'group/updateMsgGroup';
        //let ser = JSON.stringify(obj);
       // let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, obj, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }

    
}