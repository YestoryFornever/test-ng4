import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {INCONFIG} from '../../../../../../../../public/in.config';

// import {}

@Injectable()

export class BannerManagementService {
	private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	constructor (private http: Http) {}


	// 4.1新增文章
	addArticle(obj:Object):Observable<any>{
		// let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/addArticle"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		// let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		return this.http.post(Url, obj, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.2修改文章
	updateArticle(obj:Object):Observable<any>{
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/updateArticle"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		// let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, obj, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.3获取文章
	getArticle(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/getArticle"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.4删除文章
	deleteArticle(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/deleteArticle"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.5获取文章列表（后台）支持分页
	getArticleListPage(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/getArticleListPage"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	
	// 4.8上架选中资讯
	upShelves(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/upShelves"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.9下架选中资讯
	downShelves(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/downShelves"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	// 4.10置顶
	topArticle(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		// e_project_manager/sns/weiboViewDetail
		let Url = this.IP+"pubnum/article/topArticle"
		// let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}