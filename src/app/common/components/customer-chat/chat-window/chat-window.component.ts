import {Component, OnInit, Input, ElementRef, Renderer2, ViewRef, ViewChild, ComponentFactory} from "@angular/core";
import { MsgEntity } from '../msg-entity.class';
import{UserStatusService} from"../../../app-services";

@Component({
    selector: "chat-window",
    templateUrl: "./chat-window.component.html",
    styles: [`
        .chatWindow {
          width: 600px;
          height: 500px;
          overflow: hidden;
          position: absolute;
          z-index: 1999;
          top: 50%;
          left: 50%;
          margin-left: -300px;
          margin-top: -250px;
          .direct-chat-messages {
            height: 300px;
          }
        }
        .item {
          cursor: pointer;
        }
    `],
})
export class ChatWindowComponent implements OnInit {
    @ViewChild('msgListBox') 
    public msgListBox: ElementRef;
    public msgList:any=[];
    public user:any={};
    public zIndex: number=0;

    constructor(
      public userStatusService: UserStatusService,
      private renderer: Renderer2
      ) {}

    ngOnInit() {
      //有新消息是滚动到底部
      
    }
    ngAfterViewInit() {
      
    }
    public addMsg(item:MsgEntity)
    {
      this.msgList.push(item);
      this.scrollToBottom();
    }

    /**
     * ChatWindowService重写此方法发送消息
     */
    sendMsg(msg) {
      let item = new MsgEntity();
      item.content = msg;
      item.formId = this.userStatusService.customsImId;
      item.toId = this.user.userId;
      this.addMsg(item);
    }
    /**
     * ChatWindowService重写此方法删除
     */
    public remove(){}
    /**
     * 滚动到底部
     */
    public scrollToBottom()
    {
      // console.log('滚动到底部',this.renderer, this.msgListBox);
      setTimeout(()=>{
        this.renderer.setProperty(this.msgListBox.nativeElement, 'scrollTop', 999999);
      },100);
    }
}
