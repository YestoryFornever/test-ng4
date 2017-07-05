import {INCONFIG} from '../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class ContentOperationService {
	public IP: string = INCONFIG.getIP();
    private JH: Headers = INCONFIG.setLidHeaders();
    private FDH: Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private ExtractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
    public userInfo = INCONFIG.getUserInfo();
	private debugging = false;
	constructor (private http: Http) {
		// this.debugging = true;
	}
	/*查询列表+*/
	listContentByType (body:any): Observable<any> {
		let url = this.IP+'sns/listContentByType';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.debugging?this.extractListContentByType:this.ExtractResult).catch(this.HandleError);
	}
	private extractListContentByType(){
		return {
			"list": [{
				"category": 1,
				"title": "【银华基金】交易日报2017-01-17",
				"like_cnt": 160,
				"comment_cnt": 5,
				"did": 1
			},{
				"category": 1,
				"title": "【银华基金】交易日报2017-01-17",
				"like_cnt": 160,
				"comment_cnt": 5,
				"did": 477366
			}, {
				"category": 1,
				"title": "【银华基金】交易日报2016-12-30",
				"like_cnt": 100,
				"comment_cnt": 18,
				"did": 459514
			}, {
				"category": 1,
				"title": "加杠杆做代持看看债券交易员的灰色名利圈",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398132
			}, {
				"category": 1,
				"title": "半年之后川煤集团又有10亿债券违约",
				"like_cnt": 0,
				"comment_cnt": 3,
				"did": 398134
			}, {
				"category": 1,
				"title": "情绪的恢复将暂告段落——华创债券日报2016-12-27",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398087
			}, {
				"category": 1,
				"title": "再融资受阻，信用风险趋升——浅析信用债取消发行潮（海通债券姜超、周霞、朱征星、杜佳）",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398089
			}, {
				"category": 1,
				"title": "“1季度资金面怎么看？”12月26日市场分析及同业报价参考",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398090
			}, {
				"category": 1,
				"title": "高占军：债市格局发生根本性变化，本轮波动有迹可循",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398092
			}, {
				"category": 1,
				"title": "京东+中腾信：场外ABS首创“双资产服务机构”",
				"like_cnt": 0,
				"comment_cnt": 1,
				"did": 398093
			}, {
				"category": 1,
				"title": "为您揭秘，没有市级AA担保，国家级贫困县是怎么发的10亿企业债？",
				"like_cnt": 0,
				"comment_cnt": 0,
				"did": 398095
			}],
			"page": {
				"totalPage": 362,
				"totalResult": 3612,
				"currentPage": 1
			}
		}
	}

	/*查询详情+*/
	infoContent (body:any): Observable<any> {//资讯详情
		let url = this.IP+'sns/infoContent';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*listContentByType (body:any): Observable<any> {//问答
		let url = this.IP+'sns/listContentByType';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}*/
	/*动态详情+*/
	weiboViewDetail (body:any): Observable<any> {
		let url = this.IP+'sns/weiboViewDetail';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*listContentByType (body:any): Observable<any> {视频
		let url = this.IP+'E_project_base/sns/listContentByType';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}*/

	/*修改^*/
	infoUpdate (body:any): Observable<any> {//修改资讯
		let url = this.IP+'sns/infoUpdate';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*修改动态-*/
	publishweibo (body:any): Observable<any> {
		let url = this.IP+'sns/publishweibo';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}

	/*删除(资讯、动态、评论、问答)*/
	snsDel (body:any): Observable<any> {//修改动态
		let url = this.IP+'sns/snsDel';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*删除(日报、要闻、扫雷、视频、个债、关注)*/
	infoDel(body:any): Observable<any> {//修改动态
		let url = this.IP+'sns/infoDel';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}

	/*点赞+*/
	setLikes(body:any): Observable<any> {//修改动态
		let url = this.IP+'sns/setLikes';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}

	/*评论列表+*/
	listComment (body:any): Observable<any> {
		let url = this.IP+'sns/listComment';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*发布评论-*/
	publishComment (body:any): Observable<any> {
		let url = this.IP+'sns/publishComment';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	/*转发到动态*/
	transmitWeibo (body:any): Observable<any> {//评论列表
		let url = this.IP+'sns/transmitWeibo';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}


	queryOperateUserList(body:any): Observable<any> {
		let url = this.IP+'back/usermapping/queryOperateUserList';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}

	getLoginUser(body:any): Observable<any> {
		let url = this.IP+'security/getLoginUser';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}

	listVideo(body:any): Observable<any> {
		let url = this.IP+'sns/listVideo';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	listQuestion(body:any): Observable<any> {
		let url = this.IP+'sns/listQuestion';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	listAnswer(body:any): Observable<any> {
		let url = this.IP+'sns/listAnswer';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractData).catch(this.HandleError);
	}
	answerPublish(body:any): Observable<any> {
		let url = this.IP+'sns/answerPublish';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
	questionPublish(body:any): Observable<any> {
		let url = this.IP+'sns/questionPublish';
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options).map(this.ExtractResult).catch(this.HandleError);
	}
}