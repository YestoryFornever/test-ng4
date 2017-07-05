import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()

export class LookQuotationService {
    private AnotherIp:string = INCONFIG.getIPWithOutE()
    private prod:boolean = INCONFIG.prod
    private UserInfo = INCONFIG.getUserInfo()
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private LH:Headers =  INCONFIG.setLidHeaders();
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

    constructor (private http: Http) {}

   //查询报价列表
     getBondList(obj:Object):Observable<any>{
        // debugger;
        // this.Ip=get();
        let url=this.IP+"bondOfr/queryBondEManager";
        let ser=JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 债券搜索
    searchBond(str:any):Observable<any>{
        // debugger;
        // this.Ip=get();
        var Url=''
        if(!this.prod){
             Url = "http://11.177.15.104/ainas/bond/fuzzyMatchingForBond"
        }else{
            Url =  this.AnotherIp+"/ainas/bond/fuzzyMatchingForBond"
        }
        // let url="http://11.177.15.104/ainas/bond/fuzzyMatchingForBond";
        let ser=JSON.stringify(str);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

// 发行机构的10条信息
//获取公司列表
    OrganizationList(obj:Object):Observable<any>{
         // let urls=this.IP.replace(':8080/emanager','');
        let url=this.IP+'back/authority/getOrgListByShortName';
        // let url = 'http://11.177.15.104/E_project_base/authority/getIssuerListByFullName';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//查询议价记录列表
    getNegtprcDtlList(obj:Object):Observable<any>{
        let url=this.IP+"bondNegtprc/queryNegtprcDtlList";
        let data = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }







    //添加版本信息
    // addVersionInfor(obj:Object):Observable<any>{
        // let url="http://192.168.0.164:8080/emanager/appVersion/add";
  //       let url = this.IP+'appVersion/add';
        // let ser = JSON.stringify(obj);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        // return this.http.post(url, ser, options)
        //                 .map(this.ExtractResult)
        //                 .catch(this.HandleError);
    // }
    //修改版本信息
    // modifyVersionInfor(obj:Object):Observable<{
        // let url="http://192.168.0.164:8080/emanager/appVersion/update";
  //       let url = this.IP+'appVersion/update';
        // let ser = JSON.stringify(obj);
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        // return this.http.post(url, ser, options)
        //                 .map(this.ExtractResult)
        //                 .catch(this.HandleError);
    // }


}