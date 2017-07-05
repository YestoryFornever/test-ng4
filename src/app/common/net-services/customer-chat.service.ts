import {Injectable, OnInit} from "@angular/core";
import {ProxyRequestService} from "../app-services";
import "rxjs/add/operator/map";
@Injectable()
export class UserMsgService implements OnInit {
    public selectUserInfo: Object = {};
    constructor(public prox: ProxyRequestService) {

    }

    ngOnInit() {

    }

    // 获取用户消息列表
    getUserMsgFun(params: Object) {
        return this.prox.post("emanager/imcustomservice/chatlist", params).then(res => {
            return res;
        })
    }
    // 通过id获取用户信息
    selectUsersByIdsFun(params: Object) {
        return this.prox.post("emanager/back/authority/getUserInfoListById", params).then(res => {
            return res;
        })
    }
    // 单机列表发送数据
    sendUserInfo(params: Object) {
        console.log(params);
        return this.selectUserInfo = params;
    }
    // 保存聊天信息
    saveMsgInfo(params: Object) {
        return this.prox.upload("emanager/imcustomservice/savechatmsg", params).then(res=> {
            return res;
        })
    }
    // 获取聊天记录
    chatHistoryList(params?: any) {
        return this.prox.post("emanager/imcustomservice/chatlog", params).then(res=> {
            return res;
        })
    }
}

