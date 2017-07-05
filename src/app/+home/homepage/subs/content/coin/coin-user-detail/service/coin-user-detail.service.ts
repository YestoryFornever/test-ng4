import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
 // import { GoodsList,GoodsInfo }       from '../classes/goods-list';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()

export class UserCoinServices {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();//obj
    private extractData = INCONFIG.extractData();//data 
    private HandleError = INCONFIG.handleError();
    constructor (private http: Http) {}

    // 用户金币统计
    userstatistic(obj:Object):Observable<any>{
        let url = this.IP+"goldcoin/statistic/userstatistic";
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
        // 获取 同户名片
    getUserProfileInfo(obj:Object):Observable<any>{
        let data = JSON.stringify(obj);
        // e_project_manager/sns/weiboViewDetail
        // let Url = 'http://127.0.0.1:9999/emanager/dict/queryDict.json';
        let Url = this.IP+'back/authority/getUserProfileInfor';
        // console.log(Url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, data, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
}