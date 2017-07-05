/**
 * 消息对象
 */
import {Injectable} from "@angular/core";

@Injectable()
export class MsgEntity
{
    public formId:number; //发送者ID
    public toId:number; //接收者ID
    public ext: any; //扩展数据
    public msgType: string;//消息类型
    public msgId: string;//消息ID
    public content: any;//消息内容
    public createTime:number;
}