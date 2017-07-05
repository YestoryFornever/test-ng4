import {INCONFIG} from '../../../../../../../../public/in.config';
import {Component, OnInit} from '@angular/core';
import {QuestionListService} from "../sns-question-answer.services";
import {ListParams} from "../questionListParams";
import {ActivatedRoute} from "@angular/router";
@Component({
    selector: 'sns-question-answer-deita',
    templateUrl: './sns-question-answer-list.component.html',
    styleUrls: ['./sns-question-answer-list.component.css'],
})

export class SnsQuestionAnswerList implements OnInit {
    cols: Array<Object>;
    display: boolean = false;
    option: Object;
    searchParams: ListParams;
    listData: Array<Object>;
    aTitle: string;
    aContent: string;
    routerId: string;
    operateUserList: Array<Object>;
    operateUserId: number;
    states: Array<string>;
    clickTr: number;
    totalResult: number;
    totalPage: number;
    userInfo: any;
    btnDis: boolean;

    constructor(public questionListService: QuestionListService, public activeRouter: ActivatedRoute) {
        this.userInfo = INCONFIG.getUserInfo();
        console.log(this.userInfo.id, "获取id");
        this.cols = [
            {field: 'operate', header: '操作'},
            {field: 'title', header: '问答标题'},
            {field: 'dec', header: '问答描述'},
            {field: 'from', header: '来源'},
            {field: 'pUser', header: '提问人'},
            {field: 'pDate', header: '提问日期'},
            {field: 'uDate', header: '更新日期'},
            {field: 'aNum', header: '回答数'},
            {field: 'lNum', header: '关注数'},
            {field: 'count', header: '累计赞'}
        ];
        this.totalResult = 0;
        this.totalPage = 0;

        this.clickTr = 0;
        let dt = new Date();
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        if (m < 10) {
            var ms = "0" + m;
        }
        else {
            ms = m + "";
        }
        let d = dt.getDate();
        if (d < 10) {
            var ds = "0" + d;
        }
        else {
            ds = d + '';
        }

        this.searchParams = {
            time_begin: y + "-" + ms + "-" + ds,
            time_end: "",
            user_name: "",
            title: "",
            is_tip: false,
            cur_page: "1",
            show_count: "20"
        };
        this.aTitle = "";
        this.aContent = "";
        this.operateUserId = -1;
        this.states = [""];
        this.btnDis = true;
    }

    ngOnInit() {
        // 获取列表信息
        this.questionList(this.searchParams);
        // this.operate();
        this.option = {
            language: "zh_cn", //配置语言
            placeholderText: "请输入内容", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', "html", "insertHR", 'insertImage'],
            codeMirror: false, // 高亮显示html代码
            codeMirrorOptions: { // 配置html代码参数
                tabSize: 4
            },
            SpellChecker: false,
            imageUploadURL: this.questionListService.IP + "sns/uploadPhoto",//INCONFIG.getIP()+接口名称,
            //imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//刘琦本地路径
            imageUploadParams: {uid: this.userInfo.id},//接口其他传参,默认为空对象{},
            imageUploadMethod: "POST",//POST/GET,
            events: {
                /*'froalaEditor.image.beforeUpload':function(e:any, editor:any, images:any) {
                 // console.log(e);
                 },
                 'froalaEditor.image.uploaded':function(e:any, editor:any, response:any) {
                 // console.info(response);
                 // console.info(that.weiboImgs);
                 // that.weiboImgs.push({
                 // 	photo:JSON.parse(response).photo,
                 // 	thumb:JSON.parse(response).thumb
                 // })
                 },
                 'froalaEditor.image.inserted':function(e:any, editor:any, $img:any, response:any) {
                 // console.log(e);
                 },
                 'froalaEditor.blur':function(e:any){
                 // debugger;
                 },
                 'froalaEditor.image.removed':function(e:any, editor:any, $img:any) {
                 // debugger;
                 },*/
                'froalaEditor.image.error': function (e: any, editor: any, error: any, response: any) {
                    console.log(error);
                }
            }
        };
        this.getUserId();
    }

    getUserId() {
        this.questionListService.answerGetLoginUser({}).subscribe(res => {
            console.log(res);
            // 运营人员列表
            let params = {
                securityUserid: res.data.id
            };
            console.log(params);
            this.questionListService.answerOperateUserList(params).subscribe(res => {
                console.log(res, "运营人员");
                if (res.data.length > 0) {
                    this.operateUserList = res.data;
                    this.operateUserId = res.data[0].userId;
                    for (let i = 0; i < res.data.length; i++) {
                        this.states.push(res.data[i].userName);
                    }
                }
            });
            console.log(this.states, "提问人列表");
        })
    }

    // 定义函数
    showDialog() {
        this.display = true;
        this.aTitle = "";
        this.aContent = "";
    }

    hideDialog() {
        this.display = false;
    }

    newAnswer() {
        if (this.aTitle.substr(this.aTitle.length - 1, 1) != "？" || this.aTitle.substr(this.aTitle.length - 1, 1) != "?") {
            this.aTitle = this.aTitle + "?";
            this.btnDis = false;
        }
        let params = {
            uid: this.operateUserId,
            title: this.aTitle,
            content: this.aContent
        };
        console.log(params, "提问参数");
        this.questionListService.questionPublish(params).subscribe(res => {
            console.log(res, "提问");
            if (res.status == 0) {
                this.questionList(this.searchParams);
                this.display = false;
                this.btnDis = true;
            }
        })
    }

    // 获取问答列表
    questionList(params: any) {
        console.log(params, "查询参数");
        if (params.is_tip == false) {
            params.is_tip = 0;
        }
        else {
            params.is_tip = 1;
        }
        this.questionListService.questionList(params).subscribe(res => {
            if (res.status == 0) {
                this.listData = res.data.list;
                this.totalResult = res.data.page.totalResult;
                this.totalPage = res.data.page.totalPage;
                console.log(res, "列表信息");
            }
            else {
                this.listData = [];
                this.totalResult = 0;
                this.totalPage = 0;
            }
        })
    }

    // 查询条件
    searchInfo(searchParams: any) {
        this.questionList(searchParams);
    }
    check:any
    ckChange(searchParams: any) {
        if (this.check) {
            searchParams.is_tip = 1;
        }
        else {
            searchParams.is_tip = 0;
        }
        this.questionList(searchParams);
    }


    questionDelete(id: number) {
        let params = {
            p_type: 4,
            p_id: id,
            uid: this.userInfo.id
        };
        console.log(params, "删除参数");
        this.questionListService.questionDelete(params).subscribe(res => {
            if (res.status == 0) {
                this.questionList(this.searchParams);
            }
            console.log(res, "删除");
        })
    }


    trClick(i: number) {
        console.log(i);
        this.clickTr = i;
    }

    pageChangeFun(event: any) {
        console.log(event);
        this.searchParams.show_count = event.rows;
        this.searchParams.cur_page = event.page + 1;
        this.questionList(this.searchParams);
    }
}
