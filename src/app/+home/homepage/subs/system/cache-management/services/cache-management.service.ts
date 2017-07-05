import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()

export class CacheManagementService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
//用户基本信息
    reLoadUserList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reLoadUserList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//用户登录session
    Login(obj:Object):Observable<any>{
        let url = this.IP+'security/cleanAllSessions';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//用户隐私设置
    reloadUserSettingList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadUserSettingList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//用户认证
    reloadUserAuthenticationList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadUserAuthenticationList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//机构基本信息
    reloadOrganizationList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadOrganizationList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//机构分类
    reloadOrganizationCategoryList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadOrganizationCategoryList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//好友关系
    reloadFriendRelationshipList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadFriendRelationshipList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//关注关系
    reloadConcernRelationshipList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadConcernRelationshipList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//黑名单关系
    reloadBlackRelationshipList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/reloadBlackRelationshipList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//角色基本信息
    reLoadSecurityRoleList(obj:Object):Observable<any>{
        let url = this.IP+'security/role/reLoadSecurityRoleList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//管理员用户与角色关系
   reLoadSecurityUserRoleList(obj:Object):Observable<any>{
        let url = this.IP+'security/role/reLoadSecurityUserRoleList';
        let ser = JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    } 
}