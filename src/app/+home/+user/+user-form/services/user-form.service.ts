import {INCONFIG} from '../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()

export class UserFormService {
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
//4.1.1新建组
    saveGroup(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/saveGroup';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.2查看组列表 
    selVipGroupList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/selVipGroupList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.3编辑组信息
    updateMsgGroup(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/updateMsgGroup';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.4删除组
    deleteGroup(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/deleteGroup';
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
//4.1.6查询组成员列表
    groupUserList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/groupUserList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.7增加组成员
    saveGroupUser(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/saveGroupUser';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.1.8删除组成员
    deleteGroupUser(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/deleteGroupUser';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.1新建服务
    saveVipService(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/saveVipService';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.2查询服务列表 
    selVipServiceList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/selVipServiceList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.3编辑服务信息
    updateVipService(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/updateVipService';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.4删除服务
    deleteVipService(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/deleteVipService';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.5增加服务成员
    addServiceGroup(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/addServiceGroup';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.6删除服务成员
    deleteServiceGroup(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/deleteServiceGroup';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.2.8查看服务和组成员列表
    serviceGroupList(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/serviceGroupList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//4.3.1查看服务和组成员列表
    getCodeDataList(obj:Object):Observable<any>{
        let url = this.IP+'codedata/getCodeDataList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//推荐
    addServiceUsersFriend(obj:Object):Observable<any>{
        let url = this.IP+'vipservice/addServiceUsersFriend';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
}