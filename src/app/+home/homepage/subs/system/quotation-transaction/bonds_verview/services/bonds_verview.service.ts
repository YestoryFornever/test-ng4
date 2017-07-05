import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()

export class BondsVerviewService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
//报价数据
    countView(obj:Object):Observable<any>{
        let data = JSON.stringify(obj);
        let url = this.IP+"sns/countView"
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//查询报价总览列表
    getBondEMAllView(obj:Object):Observable<any>{
        let url=this.IP+"bondOfr/bondEMAllView";
        let data = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//查询报价维度占比列表
    getBondEMRatio(obj:Object):Observable<any>{
        let url=this.IP+"bondOfr/bondEMRatio";
        let data = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//查询报价成交趋势列表
    getBondEMTrend(obj:Object):Observable<any>{
        let url=this.IP+"bondOfr/bondEMTrend";
        let data = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }    
}