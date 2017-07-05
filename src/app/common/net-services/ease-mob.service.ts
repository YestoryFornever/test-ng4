import {Injectable, EventEmitter} from "@angular/core";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/toPromise';
import 'easemob-websdk/websdk';
import {UserStatusService} from '../app-services';
var WebIM:any = (<any>window).WebIM;

export class TextMessage {
    public ext: any;
    public msg_type: string;
}

@Injectable()
export class EaseMobService {
    public conn: any;
    public onTextMessage: EventEmitter<any>;
    public onCmdMessage: EventEmitter<any>;

    constructor(public UserStatusService: UserStatusService) {
        this.onTextMessage = new EventEmitter();
        this.onCmdMessage = new EventEmitter();
        this.conn = new WebIM.connection({
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
            https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
            url: WebIM.config.xmppURL,
            isAutoLogin: true,
            heartBeatWait: WebIM.config.heartBeatWait,
            autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
            autoReconnectInterval: WebIM.config.autoReconnectInterval
        });
        this.listen();
        // console.log('WebIM:', window.WebIM);
        if (UserStatusService.customsImId) {
            this.login(UserStatusService.customsImId);
        }
    }

    register(username, password, nickname) {//注册环信
        let options = {
            username: 'webstar_g',
            password: 'webstar_g',
            nickname: 'nickname',
            appKey: WebIM.config.appkey,
            success: function () {
                console.log('success');
            },
            error: function () {
                console.log('error');
            },
            apiUrl: WebIM.config.apiURL
        };
        this.conn.registerUser(options);
    };

    private is_login = false;

    login(uid) {
        if (this.is_login) return false;
        //登录环信
        let options = {
            apiUrl: WebIM.config.apiURL,
            user: uid,
            pwd: "456123",
            appKey: WebIM.config.appkey,
            success: function () {
                console.log('登录环信成功');
            },
            error: function (e) {
                console.warn('登录环信错误');
            }
        };
        this.conn.open(options);
        this.is_login = true;
    };

    logout() {
        console.log('环信退出');
        try {
            this.conn.close();
        } catch (err) {

        }
    }

    listen() {
        this.conn.listen({
            onOpened: (message) => {
                //连接成功回调，连接成功后才可以发送消息
                //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                //手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
                //所以无需调用conn.setPresence();
                console.log("环信连接成功");
            },
            onClosed: function () {
                exports.is_login = false;
            },
            //onTextMessage:text, //收到文本消息
            onTextMessage: (message) => {
                console.log(message, "文本消息");
                this.onTextMessage.emit(message);
            },
            onEmojiMessage: (message) => {
                //收到表情消息
                // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
                // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
                // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
            },
            onPictureMessage: (message) => {//收到图片消息
                console.log('收到图片消息');
            },
            onCmdMessage: (message) => {
                console.log('收到命令消息', message);
                this.onCmdMessage.emit(message);
            },//收到命令消息
            onAudioMessage: (message) => {//收到音频消息
                console.log("Audio");
            },
            onLocationMessage: (message) => {//收到位置消息
                console.log("Location");
            },
            onFileMessage: (message) => {//收到文件消息
                console.log("File");
            },
            onVideoMessage: (message) => {//收到视频消息

            },
            //收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
            onPresence: (message) => {

            },
            //处理好友申请
            onRoster: (message) => {
                console.log('Roster');
            },
            //处理群组邀请
            onInviteMessage: (message) => {
                console.log('Invite');
            },
            //本机网络连接成功
            onOnline: function () {
                console.log('onLine');
            },
            //本机网络掉线
            onOffline: function () {
                console.log('offline');
                exports.is_login = false;
            },
            //失败回调
            onError: function (error) {
                console.log('Error:', error);
            },
            // 黑名单变动
            onBlacklistUpdate: function (list) {
                //查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
                console.log(list);
            }
        });
    }

    sendMsg(toId, msgText, ext) {
        return new Promise((resolve, reject)=>{
            if (msgText == "") {
                return msgText;
            }else {
                let time = (new Date()).getTime();
                let id = this.conn.getUniqueId();		// 生成本地消息id
                let msg = new WebIM.message('txt', id);	// 创建文本消息
                let option = {
                    msg: msgText,					// 消息内容
                    from: this.UserStatusService.customsImId,
                    //接收消息对象（用户id）
                    to: toId,
                    ext: ext,
                    roomType: false,
                    success(res){
                        console.log('成功发送个人信息:', res);
                        resolve(res);
                    },
                    fail(err) {
                        console.log(err, "错误信息");
                        reject(err);
                    }
                };
                msg.set(option);
                this.conn.send(msg.body);
            }
        });
    };
}
