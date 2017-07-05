import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../../../../public/in.config';



@Injectable()

export class BondDistributionListServices {
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

	/**
	 * 4.2.3	查询债券列表
	 *  @param  {Object}          obj [description]
	 *  @return {Observable<any>}     [description]
	 */
	queryBondList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		// let Url = this.IP+"bonddstr/queryBondList"
		let Url = this.IP + 'bonddstr/queryBondList';
		// if(!this.prod){
		// 	 Url = "http://11.177.15.104/emanager/bonddstr/queryBondList"
		// }else{
		// 	Url = this.AnotherIp+"/emanager/bonddstr/queryBondList"
		// }
		let headers = this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 债券简称查债券
	fuzzyMatchingForBond(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url = ""
		if(!this.prod){
			 Url = "http://11.177.15.104/e-bonddstr/bonddstr/fluzzyEnqrBondList"
		}else{
			Url = this.AnotherIp+"/e-bonddstr/bonddstr/fluzzyEnqrBondList"
		}
		let headers = this.LH;
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

}