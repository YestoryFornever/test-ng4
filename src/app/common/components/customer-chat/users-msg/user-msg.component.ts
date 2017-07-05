import {Component, OnInit, Output, Input, EventEmitter, ViewContainerRef} from "@angular/core";
import {UserMsgService} from "../../../net-services/customer-chat.service";
import {ChatWindowService} from "../chat-window/chat-window.service";
import { ChatWindowComponent } from '../chat-window/chat-window.component';
@Component({
    selector: "user-msg",
    templateUrl: "./user-msg.component.html"
})
export class UserMsgComponent implements OnInit {
    public userIds: Array<string>;
    public userInfoList: Array<Object>;
    public selectTrStyle: Number = 0;
    @Output() sendUserInfo = new EventEmitter();

    constructor(
        public userMsgService: UserMsgService, 
        public chatWindowService: ChatWindowService
    ) {

    }

    ngOnInit() {
        this.userIds = [];
        this.userInfoList = [];

        this.getUserMsg({});
    }

    // 首先查询聊天ids, 然后通过ids查询用户信息
    getUserMsg(params: Object) {
        this.userMsgService.getUserMsgFun(params).then((res: any) => {
            console.log(res, "在线客服信息列表");
            res.data.forEach((value, index) => {
                this.userIds.push(value.userId);
                let now = new Date(value.cTime);
                value.cTime = now.getFullYear() + "-" + now.getMonth() + 1 + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            });
            console.log(this.userIds, "用户id");
            // 查询用户信息
            let params = {
                userIds: this.userIds
            };
            this.userMsgService.selectUsersByIdsFun(params).then((data:any) => {
                data.data.forEach((value, index) => {
                    value.msg = res.data[index].msg;
                    value.cTime = res.data[index].cTime;
                });
                this.userInfoList = data.data;
                console.log(data, "获取用户信息");
            })
        }).catch((err) => console.log(err))
    }

    // 点击用户列表的时候传递用户信息过去
    userClickFun(user, index) {
        this.chatWindowService.show(user, index);
        // console.log(index);
        this.selectTrStyle = index;
        // this.userMsgService.sendUserInfo(item);
        // this.chatWindowService.readHistoryListFun(item.userId);
    }
}
