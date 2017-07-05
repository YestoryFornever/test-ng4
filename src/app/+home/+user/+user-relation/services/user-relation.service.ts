import { INCONFIG } from '../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()

export class UserRelationService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	private UserMsgeUrl = 'app/userMsges';
	// private UserMsgeUrl = 'http://11.177.50.137 :8080/e_project_manager/authority/register/registerUser';

	constructor (private http: Http) {}
//获取公司列表
    OrganizationList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/getOrganizationList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//获取部门列表
    DepartmentList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/getDepartmentList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.3.1查询用户好友信息
    getFriendList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/getFriendList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.3.2查询用户关注信息
    getConcernList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/getConcernList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.3.3查询用户黑名单信息
    getUserBlackList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/getUserBlackList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.5查询用户列表
    queryUserList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/queryUserList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.6查询用户日志
    getUserCalendarList(obj:Object):Observable<any>{
        let url = this.IP+'statistics/getUserCalendarList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.7查询用户模块统计
    getSectorStatisticsList(obj:Object):Observable<any>{
        let url = this.IP+'statistics/getSectorStatisticsList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
}