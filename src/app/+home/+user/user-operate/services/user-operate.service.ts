import {INCONFIG} from '../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()

export class UserOperateService {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	private UserMsgeUrl = 'app/userMsges';
	// private UserMsgeUrl = 'http://11.177.50.137 :8080/e_project_manager/authority/register/registerUser';

	constructor (private http: Http) {}
    /**
     * 4.1.31    查询运营账号列表
     */
    queryOperateAccountList(obj:Object):Observable<any>{
        let url = this.IP+'back/usermapping/queryOperateAccountList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    /**
     * 4.1.32    更新运营账号状态
     * {
     * userId
     * state
     * }
     */
    updateOperateUserState(obj:Object):Observable<any>{
        let url = this.IP+'back/usermapping/updateOperateUserState';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    /**
     * 4.1.33    分配运营账号
     * securityUserid
     * [{
     *  userId
     *  }]
     *  managerFlag
     */
    distributionOperateUser(obj:Object):Observable<any>{
        let url = this.IP+'back/usermapping/distributionOperateUser';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    /**
     * 4.3.1    查询管理员列表
     */
    queryUserList(obj:Object):Observable<any>{
        let url = this.IP+'security/admin/queryUserList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    /**
     * 4.1.5    解冻用户
     */
    unFrozenUser(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/unFrozenUser';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    /**
     * 4.1.4    冻结用户
     */
    frozenUser(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/frozenUser';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
    //shangchuan
    uploadExecl(obj:Object):Observable<any>{
        // let data = JSON.stringify(obj);
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP+"back/upload/uploadExecl"
        let headers =  this.FDH;
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, obj, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }   

}