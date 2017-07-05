import {INCONFIG} from '../../../../../../../../public/in.config';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionListService} from "../sns-question-answer.services";
import {ListDetail} from "./listDetail";
@Component({
    selector: 'sns-question-answer-deita',
    templateUrl: './sns-question-answer-detial.component.html',
    styleUrls: ['./sns-question-answer-detial.component.css'],
})

export class SnsQuestionAnswerDetial implements OnInit {
    /*
     clicked: 回答列表单机添加样式
     display: 控制回答正文显示
     questionDetail: 问答详情
     answerList: 回答列表
     option: 配置富文本编辑器
     eTitle: 编辑问答标题
     eContent: 编辑问答内容
     */
    clicked: number;
    display: boolean;
    answerState: boolean;
    newAnswerState: boolean;
    commonDialog: boolean;

    answerContent: string;
    newAnswerContent: string;
    answerId: number;
    commonContent: string;
    commonId: number;

    option: Object;
    eTitle: string;
    eContent: string;

    addAnswerMsg: string;
    editAnswerMsg: string;
    editQuestionMsg: string;

    message: string;
    msg: string;

    questionDetail: Array<Object>;
    answerList: Array<Object>;
    commonList: Array<Object>;

    operateUserList: Array<Object>;
    operateUserId: number;
    items: Array<Object>;

    totalResult: number;
    totalPage: number;
    currentPage: number;
    userInfo: any;
    btnDis: boolean;

    constructor(public activeRouter: ActivatedRoute, public questionListService: QuestionListService, public router: Router) {
        this.userInfo = INCONFIG.getUserInfo();
        this.clicked = 0;
        this.display = false;
        this.answerState = false;
        this.newAnswerState = false;
        this.commonDialog = false;
        this.operateUserId = -1;
        this.currentPage = 1;
        this.message = "";
        this.btnDis = true;
        this.items = [
            {
                label: '5',
                command: () => {
                    this.setLikeFun(5);
                }
            },
            {
                label: '20',
                command: () => {
                    this.setLikeFun(20);
                }
            },
            {
                label: '50',
                command: () => {
                    this.setLikeFun(50);
                }
            },
            {
                label: '100',
                command: () => {
                    this.setLikeFun(100);
                }
            }
        ];
    }

    ngOnInit() {
        // 1. 问题详情
        this.questionDetailFun();
        // 2. 回答列表
        this.answerListFun();
        // 4. 运营号
        this.getUserId();

        // this.operate();
        this.option = {
            language: "zh_cn", //配置语言
            placeholderText: "请输入内容", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', "html", "insertHR", 'insertImage'],
            codeMirror: true, // 高亮显示html代码
            // codeMirrorOptions: { // 配置html代码参数
            //     tabSize: 4
            // },
            SpellChecker: false,
            imageUploadURL: this.questionListService.IP + "sns/uploadPhoto",//INCONFIG.getIP()+接口名称,
            //imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//刘琦本地路径
            imageUploadParams: {uid: this.userInfo.id},//接口其他传参,默认为空对象{},
            imageUploadMethod: "POST",//POST/GET,
            events: {
                'froalaEditor.image.error': function (e: any, editor: any, error: any, response: any) {
                    console.log(error);
                }
            }
        };
    }

    getUserId() {
        this.questionListService.answerGetLoginUser({}).subscribe(res => {
            console.log(res);
            // 13. 运营号
            // 运营人员列表
            let params = {
                securityUserid: res.data.id
            };
            this.questionListService.answerOperateUserList(params).subscribe(res => {
                console.log(res, "运营人员");
                if (res.data.length > 0) {
                    this.operateUserList = res.data;
                    this.operateUserId = res.data[0].userId;
                }
            })
        });
    }

    // 1. 问题详情
    questionDetailFun() {
        let params = {
            quest_id: this.activeRouter.snapshot.params["id"],
            cur_page: 1,
            show_count: 10
        };
        this.questionListService.questionList(params).subscribe(res => {
            if (res.status == 0) {
                this.questionDetail = res.data.list;

                // 初始化编辑内容
                this.eTitle = res.data.list[0].title;
                this.eContent = res.data.list[0].content;
            }
            else {
                this.questionDetail = [];
            }
        })
    }

    // 2. 回答列表
    answerListFun() {
        console.log(this.activeRouter.snapshot);
        let params = {
            quest_id: this.activeRouter.snapshot.params["id"],
            cur_page: 1,
            show_count: 10
        };
        console.log(params, "回答列表");
        this.questionListService.answerList(params).subscribe(res => {
            if (res.status == 0) {
                if (res.data.list.length > 0) {
                    this.answerList = res.data.list;
                    this.totalResult = res.data.page.totalResult;
                    this.totalPage = res.data.page.totalPage;
                    this.currentPage = res.data.page.currentPage;
                    // 初始化选中第一条回答的信息
                    this.answerContent = res.data.list[0].content;
                    this.answerId = res.data.list[0].answ_id;
                    this.clicked = 0;
                    // 3. 评论列表
                    this.commonListFun();
                    if (this.answerList.length > 0 && this.answerList.length < 10) {
                        this.msg = "没有更多内容了！";
                    }
                    else {
                        this.msg = "";
                    }
                    this.message = "";
                }
            }
            else {
                this.answerList = [];
                this.answerContent = "";
                this.message = "该问题还没有回答记录";
                this.msg = "";
            }
            console.log(res, "查询问答列表");
        })
    }

    // 16. 加载更多
    loadMoreFun() {
        console.log(this.activeRouter.snapshot);
        let params = {
            quest_id: this.activeRouter.snapshot.params["id"],
            cur_page: this.currentPage + 1,
            show_count: 10
        };
        console.log(params, "回答列表");
        this.questionListService.answerList(params).subscribe(res => {
            if (res.status == 0) {
                for (let i = 0; i < res.data.list.length; i++) {
                    this.answerList.push(res.data.list[i]);
                }
                this.totalResult = res.data.page.totalResult;
                this.totalPage = res.data.page.totalPage;
                this.currentPage = res.data.page.currentPage;
                // 初始化选中第一条回答的信息
                this.clicked = 0;
                // 3. 评论列表
                this.commonListFun();
                this.message = "";
            }
            else {
                this.answerList = [];
                this.answerContent = "";
                this.message = "该问题还没有回答记录"
            }
            console.log(res, "查询问答列表");
        })
    }

    // 3. 单机回答列表一条记录显示详细信息
    answerListClick(content: string, i: number, answId: number) {
        this.clicked = i;
        console.log(content);
        this.answerContent = content;
        this.answerId = answId;

        // 刷新评论列表
        this.commonListFun();
        console.log(this.answerId);
    }

    // 4. 编辑问题详情
    editQuestionFun() {
        if (this.eTitle.substr(this.eTitle.length - 1, 1) != "？" || this.eTitle.substr(this.eTitle.length - 1, 1) != "?") {
            this.eTitle = this.eTitle + "?";
            this.btnDis = false;
        }
        if (this.eContent == "") {
            this.editQuestionMsg = "提问内容不能为空";
        }
        else {
            this.editQuestionMsg = "";
            let params = {
                uid: this.operateUserId,
                quest_id: this.activeRouter.snapshot.params["id"],
                title: this.eTitle,
                content: this.eContent
            };
            this.questionListService.editQuestion(params).subscribe(res => {
                if (res.status == 0) {
                    this.display = false;
                    this.questionDetailFun();
                    this.btnDis = true;
                }
                console.log(res);
            })
        }
    }

    // 5. 删除问题
    deleteQuestionFun() {
        let params = {
            p_type: 4,
            p_id: this.activeRouter.snapshot.params["id"],
            uid: this.userInfo.id
        };
        this.questionListService.questionDelete(params).subscribe(res => {
            console.log(res, "删除问题");
            if (res.status == 0) {
                this.questionDetailFun();
                this.router.navigateByUrl("homepage/sns-question-answer");
            }
        })
    }

    // 6. 删除回答
    deleteAnswerFun(id: number) {
        let params = {
            p_type: 5,
            p_id: id,
            uid: this.userInfo.id
        };
        this.questionListService.questionDelete(params).subscribe(res => {
            console.log(res, "删除回答");
            this.answerListFun();
        })
    }

    // 7. 编辑回答
    editAnswerFun() {
        if (this.answerContent == "") {
            this.editAnswerMsg = "回答内容不能为空";
        }
        else {
            this.editAnswerMsg = "";
            let params = {
                uid: this.operateUserId,
                quest_id: this.activeRouter.snapshot.params["id"],
                answ_id: this.answerId,
                content: this.answerContent
            };
            this.questionListService.editAnswer(params).subscribe(res => {
                this.answerListFun();
                console.log(res, "编辑回答");
                this.answerState = false;
            })
        }
    }

    // 8. 添加回答
    addAnswerFun() {
        if (this.newAnswerContent == "") {
            this.addAnswerMsg = "回答内容不能为空！";
        }
        else {
            this.addAnswerMsg = "";
            let params = {
                uid: this.operateUserId,
                quest_id: this.activeRouter.snapshot.params["id"],
                content: this.newAnswerContent
            };
            console.log(params, "添加回答");
            this.questionListService.editAnswer(params).subscribe(res => {
                this.answerListFun();
                console.log(res, "添加回答");
                this.newAnswerState = false;
            })
        }
    }

    // 9. 点赞
    setLikeFun(likes: number) {
        let params = {
            obj_type: 4,
            obj_id: this.answerId,
            likes: likes
        };
        console.log(params, "点赞参数");
        this.questionListService.setLike(params).subscribe(res => {
            console.log(res, "点赞结果");
            if (res.status == 0) {
                this.answerListFun();
            }
        })
    }

    // 10. 评论列表
    commonListFun() {
        let params = {
            type: 3,
            info_id: this.answerId,
            cur_page: 1,
            show_count: 10
        };
        console.log(params, "评论参数");
        console.log(params, "评论参数");
        this.questionListService.commentList(params).subscribe(res => {
            if (res.data.list.length > 0) {
                console.log(res, "评论列表");
                // 每列添加属性，控制回复的隐藏显示
                for (let i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].commonDialog = false;
                }
                this.commonList = res.data.list;
                this.commonDialog = false;
            }
            else {
                this.commonList = [];
            }
        })
    }

    // 11. 删除评论
    deleteCommonFun(id: number) {
        let params = {
            p_type: 3,
            p_id: id,
            uid: this.userInfo.id
        };
        this.questionListService.questionDelete(params).subscribe(res => {
            console.log(res, "删除评论");
            if (res.status == 0) {
                this.commonListFun();
                this.answerListFun();
            }
        })
    }

    showCommonInputFun(id: number) {
        this.commonId = id;
        this.commonDialog = true;
        // 每次单机先置为空
        this.commonContent = "";
    }

    hideCommonInputFun(commonDialog: boolean) {
        this.commonDialog = false;
    }

    // 12. 回复评论
    sendCommonFun() {
        let params = {
            type: 3,
            info_id: this.answerId,
            content: this.commonContent,
            comm_id: this.commonId,
            uids: this.operateUserId
        };
        this.questionListService.sendCommon(params).subscribe(res => {
            console.log(res, "发布评论");
            if (res.status == 0) {
                this.commonDialog = false;
                this.commonListFun();
            }
        })
    }


    // 定义函数
    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }

    // 编辑回答
    showEditDialog() {
        this.answerState = true;
    }

    hideEditDialog() {
        this.answerState = false;
        this.editAnswerMsg = "";
    }

    // 新增回答
    showNewAnswerDialog() {
        this.newAnswerState = true;
        this.newAnswerContent = "";
    }

    hideNewAnswerDialog() {
        this.newAnswerState = false;
        this.addAnswerMsg = "";
    }
}
