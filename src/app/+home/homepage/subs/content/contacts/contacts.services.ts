import {Injectable, OnInit}     from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {News}           from  '../sns/classes/sns-management';
import {Observable}     from 'rxjs/Observable';
import "rxjs/add/operator/map";
import {Headers, RequestOptions} from '@angular/http';
import {INCONFIG} from '../../../../../../public/in.config';
// import {}

@Injectable()

export class contactsServices implements OnInit {
    public IP: string = INCONFIG.getIP();
    private JH: Headers = INCONFIG.setLidHeaders();
    private FDH: Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
    public userInfo = INCONFIG.getUserInfo();

    constructor(private http: Http) {
    }

    ngOnInit() {
    }

    // 获取同业宝列表信息
    getContactsList(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "interbank/queryUserListPage";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 获取同业宝明细
    getContactsDetail(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "interbank/queryUserDetail";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 创建同业宝信息
    createNewUser(params: any): Observable<any> {
        let Url = this.IP + "interbank/saveTybrm";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 查找机构列表和id
    selectUserListId(params: any): Observable<any> {
        let Url = this.IP + "back/authority/getIssuerListByFullName";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 查询客服
    selectClientList(params: any): Observable<any> {
        let Url = this.IP + "customer/customerList";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 修改客服
    editCustomer(params: any): Observable<any> {
        let Url = this.IP + "customer/modifyCustomer";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 添加客服
    addCustomer(params: any): Observable<any> {
        let Url = this.IP + "customer/saveCustomer";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 删除客服
    deleteCustomer(params: any): Observable<any> {
        let Url = this.IP + "customer/delCustomer";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 审核同业宝
    checkMsg(params: any): Observable<any> {
        let Url = this.IP + "interbank/saveTybCheckMsg";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 保存用户信息
    saveUserInfo(params: any): Observable<any> {
        let Url = this.IP + "interbank/saveTybUser";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 模板
    organList(params: any): Observable<any> {
        let Url = this.IP + "back/authority/getListByParentId";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 导入
    importCon(params: any): Observable<any> {
        let Url = this.IP + "interbank/inportConnection";
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }
}