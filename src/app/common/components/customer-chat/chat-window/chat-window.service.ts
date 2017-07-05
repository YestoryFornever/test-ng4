import {Injectable, OnInit, EventEmitter, ViewContainerRef, ComponentFactoryResolver} from "@angular/core";
import{UserStatusService} from"../../../app-services";
import {EaseMobService} from "../../../net-services/ease-mob.service";
import {UserMsgService} from "../../../net-services/customer-chat.service";
import { MsgEntity } from '../msg-entity.class';
import { ChatWindowComponent } from './chat-window.component';


@Injectable()
export class ChatWindowService implements OnInit {
    public container:ViewContainerRef;
    public containerRefs:any={};
    public maxZIndex = 0;

    constructor(
        public easeMobService: EaseMobService, 
        public userMsgService: UserMsgService,
        public userStatusService:UserStatusService,
        private cfr:ComponentFactoryResolver
    ) {
        
    }

    ngOnInit() {
        this.easeMobService.onTextMessage.subscribe((res:any) => {
            if (res) {
                let item:MsgEntity = new MsgEntity();
                item.formId = res.form;
                item.toId = res.to;
                item.content = res.msg;
                item.msgType = 'txt';
                item.createTime = (new Date()).getTime();
                this.receivedMsg(item);
            }
            console.log(res, "接收到的文本消息");
        });
    }
    public receivedMsg(item:MsgEntity)
    {
        let id = item.formId==this.userStatusService.customsImId?item.toId:item.formId;
        if(this.containerRefs[id]) {
            this.containerRefs[id].instance.addMsg(item);
        }
    }
    /**
     * 设置插入点
     * @param {[type]} container [description]
     */
    public setContainer(container)
    {
        this.container = container;
    }
    /**
     * 展示聊天窗口
     */
    show(user, index)
    {
        var viewRef = this.containerRefs[user.userId];
        if(!viewRef){
            //生成聊天组件
            let imbox = this.cfr.resolveComponentFactory(ChatWindowComponent);
            viewRef = this.container.createComponent(imbox);
            viewRef.instance.user = user;
            //重写删除方法
            viewRef.instance.remove = ()=>{
                if(this.containerRefs[user.userId]) {
                    this.containerRefs[user.userId] = null;
                }
                return viewRef.destroy();
            };
            //重写发送方法
            viewRef.instance.sendMsg = (content)=>{
                let item = this.sendMsg(user, content);
                viewRef.instance.addMsg(item);
            };
            this.containerRefs[user.userId] = viewRef;
            //获取历史记录
            this.readHistoryListFun(user.userId).then((items)=>{
                viewRef.instance.msgList = items;
                viewRef.instance.scrollToBottom();
            });
            console.log(imbox, viewRef);
        }
        this.maxZIndex++;
        viewRef.instance.zIndex = this.maxZIndex;
    }
    /**
     * 获取历史记录
     * @param {[type]} id [description]
     */
    readHistoryListFun(id) {
        let params = {
            userId: id,
            timeStamp: "",
            pageSize: 50
        };
        return this.userMsgService.chatHistoryList(params).then((res:any)=> {
            var items = [];
            res.data.forEach((_item, index)=> {
                let item:MsgEntity = new MsgEntity();
                item.formId = _item.userFrom;
                item.toId = _item.userTo;
                item.content = _item.msg;
                item.msgType = _item.msgType;
                item.createTime = _item.timeStamp;
                items.push(item);
            });
            return items;
        });
    }
    /**
     * 发送消息
     * @param {[type]} user [description]
     * @param {[type]} msg  [description]
     */
    public sendMsg(user, msg)
    {
        let time = (new Date()).getTime();
        // 添加到列表
        let item = new MsgEntity();
        item.formId = this.userStatusService.customsImId;
        item.toId = user.userId;
        item.content = msg;
        //异步发送到环信并保存到服务器
        this.easeMobService.sendMsg(item.toId, item.content, item.ext)
        .then((WebMeId:string) => {
            // 保存消息
            let params = {
                picture: "",
                msg_id: WebMeId,
                timestamp: time,
                direction: "outgoing",
                to: item.toId,
                from: item.formId,
                chat_type: "chat",
                msg: msg,
                msg_type: "txt",
                log_type: 102
            };
            this.userMsgService.saveMsgInfo(params).then((res) => {
                console.log(res, "保存消息");
            });
            item.msgId = WebMeId;
        });
        return item;
    }

}
