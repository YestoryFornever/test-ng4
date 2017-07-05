import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()

export class BondDistributionService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractResult = INCONFIG.extractResult();
	private extractData = INCONFIG.extractData();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}
//机构列表
	queryInstList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/queryInstList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
 //4.1.2获取机构下团队列表
	getTeamList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getTeamList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//4.1.3更新机构角色
	updateInstRl(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/updateInstRl';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//4.1.4创建团队
	addTeam(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/addTeam';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

//4.1.5修改团队
	updateTeam(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/updateTeam';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.6获取团队明细
	getTeamDetail(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getTeamDetail';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.1.6获取团队成员
	getAStaffsList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getAStaffsList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	 // 4.1.6更新团队成员
	updateTeamAStaffs(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/updateTeamAStaffs';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	 // 4.1.6获取机构联系人
	getInstAStaffsList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getInstAStaffsList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	  // 移除团队成员
	deleteTeamAStaffs(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/deleteTeamAStaffs';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	   // 4.1.1查询关键词列表
	queryKeyWordList(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/queryKeyWordList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		 // 4.1.2新增关键词
	addAnalysisKeyWord(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/addAnalysisKeyWord';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		// 4.1.3查询报价信息 
	queryQuoteInf(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/queryQuoteInf';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		 //4.1.4查询报价信息列表 
	queryQuoteInfList(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/queryQuoteInfList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		 // 4.1.5更新报价信息所属类型
	updateQuoteInfType(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/updateQuoteInfType';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		 //4.1.6解析报价信息
	analysisQuoteInf(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/analysisQuoteInf';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
		 //4.1.7新增报价信息
	addQuoteInf(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/addQuoteInf';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 删除关键词
	 deleteAnalysisKeyWord(obj:Object):Observable<any>{
		let url = this.IP+'quotrnews/analysis/deleteAnalysisKeyWord';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.1获取分销信息汇总]
	 */
	getDstrSmy(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getDstrSmy.json';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.2获取纬度占比]
	 */
	getLttPct(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getLttPct';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.3查询债券列表]
	 */
	queryBondList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/queryBondList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.4获取债券横条信息(发行信息)*]
	 */
	getBondBarInfo(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getBondBarInfo';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.5获取客户申购统计(主承销商的)*]
	 */
	getCustSbrbStat(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getCustSbrbStat';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.6查询申购详情*]杜立
	 */
	getSbrbInfList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getSbrbInfList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.7导出申购详情*]杜立
	 */
	exportSbrbInfList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/exportSbrbInfList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.8获取债券基本信息]
	 */
	getBondDetail(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getBondDetail';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.9获取债券发行人信息]
	 */
	getIssuerInfo(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getIssuerInfo';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.10获取债券日历]
	*/
	getBondCdr(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getBondCdr';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.11获取分销人员列表]
	 */
	getDstrUserList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getDstrUserList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.12获取客户申购列表*]
	 */
	getCustSbrbList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getCustSbrbList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.13导出他的客户申购列表*]
	 */
	exportCustSbrbList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/exportCustSbrbList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.14获取他的申购列表*]
	 */
	getSbrbList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getSbrbList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.15导出他的申购列表*]
	 */
	exportSbrbList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/exportSbrbInfList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.2.16获取机构承销列表]
	 */
	getInstUwrtList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getInstUwrtList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	/**
	 * [4.1.9获取用户明细*]
	 * @param  {Object}          obj [description]
	 * @return {Observable<any>}     [description]
	 */
	getUserDetail(obj:Object):Observable<any>{
		let url = this.IP+'back/authority/getUserDetail';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	getUwrtGrpList(obj:Object):Observable<any>{
		let url = this.IP+'bonddstr/getUwrtGrpList';
		let ser = JSON.stringify(obj);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, ser, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}