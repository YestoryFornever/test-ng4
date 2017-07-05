import {Injectable, OnInit}     from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {News}           from  '../../sns/classes/sns-management';
import {Observable}     from 'rxjs/Observable';
import "rxjs/add/operator/map";
import {Headers, RequestOptions} from '@angular/http';
import {INCONFIG} from '../../../../../../../public/in.config';

@Injectable()

export class QuestionListService implements OnInit {
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
    questionList(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/listQuestion.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 发布问题
    questionPublish(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/questionPublish.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 发布问题
    questionDelete(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/snsDel.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 发布问题
    answerList(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/listAnswer.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 修改问题
    editQuestion(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/questionPublish.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 修改回答
    editAnswer(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/answerPublish.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 点赞
    setLike(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/setLikes.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 评论
    commentList(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/listComment.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 评论
    sendCommon(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "sns/publishComment.json";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

    // 运营人员
    answerOperateUserList(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "back/usermapping/queryOperateUserList";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }
    // 用户id
    answerGetLoginUser(params: any): Observable<any> {
        // e_project_manager/sns/weiboViewDetail
        let Url = this.IP + "security/getLoginUser";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(Url, params, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }
}