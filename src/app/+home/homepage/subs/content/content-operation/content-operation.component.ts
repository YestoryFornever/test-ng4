// import {INCONFIG} from '../../../../../../public/in.config';
import {INCONFIG} from '../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from './content-operation.service';
import { CustomEmojiService } from './services/emoji.service';
@Component({
	selector: 'content-operation',
	templateUrl: './content-operation.component.html',
	styleUrls: ['./content-operation.component.scss'],
	providers:[CustomEmojiService]
})
export class ContentOperationComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
		private customEmojiService:CustomEmojiService,
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
		this.userInfo = INCONFIG.getUserInfo();
		console.log(this.userInfo.id);
		// debugger;
		let that = this;
		this.customEmojiService.initCustomEmoji();
		this.option = {
			language: "zh_cn", //配置语言
			placeholderText: "请输入内容",
			charCounterCount: true, // 是否开启统计字数
			// charCounterMax: 200, // 最大输入字数,目前只支持英文字母
			// 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
			toolbarButtons:[
				'html',
				'|',
				'insertImage',
				// '|',
				// 'emoticons',
				// 'alert',
				// '|',
				// 'myButton'
			],
			/*emoticonsStep: 4,
			emoticonsSet: [
				{ code: '12345', desc: 'xxx' },
				{ code: '1f600', desc: 'Grinning face' },
				{ code: '1f601', desc: 'Grinning face with smiling eyes' },
				{ code: '1f602', desc: 'Face with tears of joy' },
				{ code: '1f603', desc: 'Smiling face with open mouth' },
				{ code: '1f604', desc: 'Smiling face with open mouth and smiling eyes' },
				{ code: '1f605', desc: 'Smiling face with open mouth and cold sweat' },
				{ code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes' },
				{ code: '1f607', desc: 'Smiling face with halo' }
			],*/
			codeMirrorOptions: {
				tabSize: 4
			},
			height:200,
			pluginsEnabled:[
				'charCounter', 
				'codeView', 
				'entities', 
				// 'file', 
				// 'fontFamily', 
				// 'fontSize', 
				// 'fullscreen', 
				'image', 
				'inlineStyle', 
				'lineBreaker', 
				'link', 
				'lists', 
				'paragraphFormat', 
				'paragraphStyle', 
				'quote', 
				'save', 
				// 'table', 
				'url', 
				'video', 
				'wordPaste',
				// 'emoticons',
				// 'customPlugin'
			],
			imageUploadURL:INCONFIG.getIP()+"sns/uploadPhoto",//INCONFIG.getIP()+接口名称,
			//imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//刘琦本地路径
			imageUploadParams:{uid:this.userInfo.id},//接口其他传参,默认为空对象{},
			imageUploadMethod:"POST",//POST/GET,
			events : {
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
				'froalaEditor.image.error':function(e:any, editor:any, error:any, response:any) {
					console.log(error);
				},
			}
		}
		this.optionComment = {
			language: "zh_cn", //配置语言
			placeholderText: "请输入内容",
			toolbarButtons:[
				// 'emoticons',
			],
			codeMirrorOptions: {
				tabSize: 4
			},
			height:100,
			pluginsEnabled:[
				'charCounter', 
				'codeView', 
				'entities', 
				'image', 
				'inlineStyle', 
				'lineBreaker', 
				'link', 
				'lists', 
				'paragraphFormat', 
				'paragraphStyle', 
				'quote', 
				'save', 
				'url', 
				'video', 
				'wordPaste',
				// 'emoticons',
			],
		}
		/*setTimeout(()=>{
			this.toggleRightTable()
		},3000);*/
		this.listContentByType();
		this.queryOperateUserList();//回调中调用该方法
	}
	contentType:string="2";
	contentTitle:string="asdf";
	timeBegin:any=new Date();
	isTip:any=false;

	option: Object;
	optionComment: Object;
	froalaDialogText:any;

	/*UI*/
	praiseBtnActived:boolean=false;
	togglePraiseBtn(){
		this.praiseBtnActived = !this.praiseBtnActived;
	}
	rightTabActived:boolean=true;
	toggleRightTable(){
		this.rightTabActived =! this.rightTabActived;
	}

	changeContentType(){
		this.listContentByType();
	}

	list:any=[
		/*{
			did:'',//数据ID
			title:'1',//标题
			category:'2',//分类
			comment_cnt:'3',//评论量
			like_cnt:'4',//点赞量
		},
		{
			did:'',//数据ID
			title:'2',//标题
			category:'3',//分类
			comment_cnt:'4',//评论量
			like_cnt:'5',//点赞量
		},
		{
			did:'',//数据ID
			title:'d',//标题
			category:'5',//分类
			comment_cnt:'g',//评论量
			like_cnt:'s',//点赞量
		},*/
	];
	/*查询列表*/
	listContentByType(){
		let param = {
			obj_type:this.contentType,//	点赞类型
			// time_begin:this.timeBegin||null,//	发布开始时间
			// time_end:this.timeBegin||null,//	发布结束时间
			time_begin:this.timeBegin?this.timeBegin.getTime():null,//	发布开始时间
			time_end:this.timeBegin?this.timeBegin.getTime():null,//	发布结束时间
			is_tip:(this.isTip?'1':'0'),//	是否被举报
			cur_page:this.pageParams.currentPage,//	取第几页数据
			show_count:this.pageParams.itemsPerPage,//	每页条数
		};
		console.info(param);
		this.contentOperationService
			.listContentByType(param).subscribe(
				rslt => {
					if(rslt.status==0){
						this.list  = rslt.data.list;
						//this.showDetail(this.list[0]);
						this.pageParams.totalItems = rslt.data.page["totalResult"];
						this.changeDetectorRef.detectChanges();
					}else{
						alert(rslt.msg);
						this.list = [];
					}
				},
				error => this.errorMsg = error
			);
	}
	pageParams:any={
		maxSize:2,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:30,
		totalPages:NaN,
	}
	
	/*详情*/
	detail:any={
		id:'',
		title:'',
		content:'',
		tipCnt:'0'//举报数
	}
	showDetail(item:any){
		switch(this.contentType){
			case '1':
				this.infoContent(item);
				break;
			case '2':
				this.listQuestion(item);
				break;
			case '3':
				this.weiboViewDetail(item);
				break;
			case '9':
				this.videoItem(item);
				break;
		}
		this.list.forEach((item:any)=>{
			item.actived = false;
		});
		item.actived = true;
		this.detail.id = item.did;
	}
	listQuestion(item:any){
		let param = {
			quest_id:item.did,//视频id
			cur_page:1,
			show_count:1
		};
		console.info(param);
		this.contentOperationService
			.listQuestion(param).subscribe(
				rslt => {
					if(rslt.status==0){
						let item = rslt.data.list[0];
						this.detail.title = item.title;
						this.detail.content = item.content;
						this.detail.tipCnt = item.tip_cnt;
						this.changeDetectorRef.detectChanges();
						this.listAnswer();
					}
				},
				error => this.errorMsg = error
			);
	}
	videoItem(item:any){
		let param = {
			video_id:item.did,//视频id
			cur_page:1,
			show_count:1
		};
		console.info(param);
		this.contentOperationService
			.listVideo(param).subscribe(
				rslt => {
					let item = rslt.list[0];
					// this.detail.id = item.video_id;
					this.detail.title = item.title;
					this.detail.content = item.note;
					this.detail.tipCnt = item.tip_cnt;
					this.changeDetectorRef.detectChanges();
					this.listComment();
				},
				error => this.errorMsg = error
			);
	}
	infoContent(item:any){
		let param = {
			info_id:item.did,//	点赞类型
		};
		console.info(param);
		this.contentOperationService
			.infoContent(param).subscribe(
				rslt => {
					// this.detail.id = rslt.iid;
					this.detail.title = rslt.title;
					this.detail.content = rslt.content;
					this.detail.tipCnt = rslt.tip_cnt;
					this.changeDetectorRef.detectChanges();
					this.listComment();
				},
				error => this.errorMsg = error
			);
	}
	weiboViewDetail(item:any){
		let param = {
			wid:item.did,
		};
		console.info(param);
		this.contentOperationService
			.weiboViewDetail(param).subscribe(
				rslt => {
					this.detail.id = rslt.wid;
					this.detail.title = "";
					this.detail.content = rslt.html_content?rslt.html_content:rslt.content;
					this.detail.tipCnt = rslt.tip_cnt;
					this.changeDetectorRef.detectChanges();
					this.listComment();
				},
				error => this.errorMsg = error
			);
	}
	/*新增*/
	detailNew:any={
		id:'0',
		title:'',
		content:''
	}
	saveDetail(dialog:any){
		switch(this.contentType){
			case '1':break;
			case '2':
				this.questionPublish(dialog);
				break;
			case '3':
				this.publishweibo(dialog);
				break;
			case '9':break;
		}
	}
	infoUpdate(dialog:any){};
	weiboAdding = false;
	addWeibo(dialog:any){
		// if(this.userIds.length==1){
			this.weiboAdding = true;
			dialog.show();
		/*}else{
			alert('请选择一位用户');
		}*/
	}
	questionPublish(dialog:any){
		let param = {
			quest_id:this.detail.id,//	动态ID，0为新增
			title:this.detail.title,
			content:this.detail.content,//	内容，含<img src=“实际路径”></img>
		};
		this.contentOperationService
			.questionPublish(param).subscribe(
				rslt => {
					dialog.hide();
					this.listContentByType();
					this.detail.title="";
					this.detail.content="";
				},
				error => this.errorMsg = error
			);
	}
	/*编辑*/
	publishweibo(dialog:any){
		let param = {
			wid:this.weiboAdding?this.detailNew.id:this.detail.id,//	动态ID，0为新增
			content:this.weiboAdding?`${this.detailNew.title}${this.detailNew.content}`:`${this.detail.title}${this.detail.content}`,//	内容，含<img src=“实际路径”></img>
			uid:this.weiboAdding?this.userIds.join(','):null,//用户ID 修改时不用传
		};
		console.info(param);
		this.weiboAdding = false;
		this.contentOperationService
			.publishweibo(param).subscribe(
				rslt => {
					if(rslt.status==0){
						dialog.hide();
						this.listContentByType();
						this.detailNew={
							id:"0",
							title:"",
							content:""
						}
					}else{
						alert(rslt.msg);
					}
				},
				error => this.errorMsg = error
			);
	}
	/*删除*/
	delByType(){
		let tmpType:any;
		switch(this.contentType){
			case '1':tmpType='1';	
				this.snsDel(tmpType);
				break;
			case '2':tmpType='4';
				this.snsDel(tmpType);
				break;
			case '3':tmpType='2';
				this.snsDel(tmpType);
				break;
			case '4':tmpType='';break;
			case '5':tmpType='';break;
			case '6':tmpType='';break;
			case '7':tmpType='';break;
			case '8':tmpType='';break;
			case '9':tmpType='4';
				this.infoDel(tmpType);
				break;
		};
	}
	delSuccess(){
		this.detail.id = '';
		this.detail.content = '';
		this.detail.title = '';
		this.commentList = [];
		this.answerList = [];
	}
	infoDel(tmpType:any){
		let param = {
			data_type:tmpType,//原数据类型 1资讯2动态3评论 4问题 5回答
			data_id:this.detail.id,//原数据ID 
		};
		console.info(param);
		this.contentOperationService
			.infoDel(param).subscribe(
				rslt => {
					alert('删除成功');
					this.listContentByType();
					this.delSuccess();
				},
				error => this.errorMsg = error
			);
	}
	snsDel(tmpType:any){
		let param = {
			p_type:tmpType,//原数据类型 1资讯2动态3评论 4问题 5回答
			p_id:this.detail.id,//原数据ID 
			//del_cause:'',//理由
			//del_note:'',//备注
			//message:'',//提醒消息
			uid:this.userInfo.id,//操作人ID
		};
		console.info(param);
		this.contentOperationService
			.snsDel(param).subscribe(
				rslt => {
					alert('删除成功');
					this.listContentByType();
					this.delSuccess();
				},
				error => this.errorMsg = error
			);
	}
	/*点赞*/
	setLikes(num:number){
		let tmpType:any;
		switch(this.contentType){
			case '1':tmpType='1';break;
			case '2':tmpType='';break;
			case '3':tmpType='2';break;
			case '4':tmpType='';break;
			case '5':tmpType='';break;
			case '6':tmpType='';break;
			case '7':tmpType='';break;
			case '8':tmpType='';break;
			case '9':tmpType='';break;
		};
		let param = {
			obj_type:tmpType,//	1资讯 2微博 3评论 4回答 5视频
			obj_id:this.detail.id,//	被点赞ID
			likes:num,//	点赞数
		};
		console.info(param);
		this.contentOperationService
			.setLikes(param).subscribe(
				rslt => {
					this.listContentByType();
				},
				error => this.errorMsg = error
			);
	}
	/*发布评论-见回复评论*/

	/*转发到动态*/
	transmitWeibo(){
		if(this.userIds.length>0){
			let tmpType:any;
			switch(this.contentType){
				case '1':tmpType='1';break;
				case '2':tmpType='3';break;
				case '3':tmpType='2';break;
				case '4':tmpType='';break;
				case '5':tmpType='';break;
				case '6':tmpType='';break;
				case '7':tmpType='';break;
				case '8':tmpType='';break;
				case '9':tmpType='4';break;
			};
			if(tmpType){
				let param = {
					uids:this.userIds.join(','),//	用户ID串，用逗号分割
					obj_type:tmpType,//	1资讯 2动态 3评论 4回答
					obj_id:this.detail.id,//	对应数据ID
				};
				console.info(param);
				this.contentOperationService
					.transmitWeibo(param).subscribe(
						rslt => {
							if(rslt.status==0)
								alert('转发至动态成功');
						},
						error => this.errorMsg = error
					);
			}
		}else{
			alert('请选择用户');
		}
	}

	/*评论*/
	commentList:any=[
		/*{
			cid:'评论ID',
			content:'评论内容',
			special_word:'敏感词',
			time:'时间',
			source:'来源',
			like_cnt:'点赞量',
			user_phone:'用户手机',
			user_name:'用户名',
			is_tip:'举报标识',
			is_del:'删除标识'
		}*/
	];
	commentPageParams:any={
		maxSize:2,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	}
	//noMoreContent:boolean=false;
	showCount:number = 10;
	commentInfoId:string;
	commentPage:any={
		currentPage:'',
		totalResult:'',
		totalPage:'',
	};
	listComment(){
		let tmpType:any;
		switch(this.contentType){
			case '1':tmpType='1';break;
			case '2':tmpType='3';break;
			case '3':tmpType='2';break;
			case '4':tmpType='';break;
			case '5':tmpType='';break;
			case '6':tmpType='';break;
			case '7':tmpType='';break;
			case '8':tmpType='';break;
			case '9':tmpType='4';break;
		};
		if(tmpType!=''){
			let param = {
				time_begin:this.timeBegin,//	发布开始时间	
				time_end:this.timeBegin,//	发布结束时间	
				auth:'',//	作者	
				type:tmpType,//	评论类型	1资讯 2微博
				is_tip:(this.isTip?'1':'0'),//	是否被举报	1是，0否
				is_del:'0',//	是否删除	1是，0否
				is_special:'',//	是否敏感词	1是，0否
				info_id:this.detail.id,//	被评论信息ID	
				orderby:'',//	排序字段	对应的排序串，如bad_point desc（倒序），asc为正序，不传按release_time DESC
				cur_page:'1',//	取第几页数据	>=1
				show_count:this.showCount,//	每页条数	
			}
			console.log(param);
			this.contentOperationService
				.listComment(param).subscribe(
					rslt => {
						this.commentList = rslt.list;
						this.commentPage = rslt.page;
					},
					error => this.errorMsg = error
				);
		}
	}
	checkMoreList(item:any){
		this.showCount+=10;
		this.listComment();
	}
	/*删除评论*/
	deleteComment(item:any){
		let param = {
			p_type:'3',//原数据类型 1资讯2动态3评论 4问题 5回答
			p_id:item.cid,//原数据ID 
			//del_cause:'',//理由
			//del_note:'',//备注
			//message:'',//提醒消息
			uid:this.userInfo.id,//操作人ID
		};
		console.info(param);
		this.contentOperationService
			.snsDel(param).subscribe(
				rslt => {
					this.commentList.splice(this.commentList.indexOf(item),1);
				},
				error => this.errorMsg = error
			);
	}

	/*回复评论*/
	curCommentItem:any;
	curCommentContent:any;
	publishCommentDialog(dialog:any,item:any){
		// dialog.show();
		if(this.userIds.length>0){
			dialog.show();
			this.curCommentItem = item;
		}else{
			alert('请选择用户');
		}
	}
	commentDialogClose(dialog:any){
		dialog.hide();
		this.curCommentContent='';
	}
	publishComment(dialog:any){
		let tmpType:any;
		switch(this.contentType){
			case '1':tmpType='1';break;
			case '2':tmpType='3';break;//评论回答
			case '3':tmpType='2';break;
			case '4':tmpType='';break;
			case '5':tmpType='';break;
			case '6':tmpType='';break;
			case '7':tmpType='';break;
			case '8':tmpType='';break;
			case '9':tmpType='4';break;
		};
		let param = {
			type:tmpType,//评论类型
			info_id:this.detail.id,//被评论ID
			uids:this.userIds.join(','),//	用户ID串，用逗号分开 user_id??
			content:this.curCommentContent,//	内容
			add_weibo:'',//	是否转发到动态
			comm_id:this.curCommentItem?this.curCommentItem.cid:'',//	回复评论的ID	
		};
		console.info(param);
		this.contentOperationService
			.publishComment(param).subscribe(
				rslt => {
					// debugger;
					dialog.hide();
					this.listComment();
				},
				error => this.errorMsg = error
			);
	}

	/*回答*/
	answerList:any=[
		/*{
			cid:'评论ID',
			content:'评论内容',
			special_word:'敏感词',
			time:'时间',
			source:'来源',
			like_cnt:'点赞量',
			user_phone:'用户手机',
			user_name:'用户名',
			is_tip:'举报标识',
			is_del:'删除标识'
		}*/
	];
	answerPageParams:any={
		maxSize:2,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	}
	//noMoreContent:boolean=false;
	showAnswerCount:number = 10;
	answerInfoId:string;
	answerPage:any={
		currentPage:'',
		totalResult:'',
		totalPage:'',
	};
	listAnswer(){
		// debugger;
		let param = {
			quest_id:this.detail.id,//	被评论信息ID	
			cur_page:'1',//	取第几页数据	>=1
			show_count:this.showAnswerCount,//	每页条数	
		}
		console.log(param);
		this.contentOperationService
			.listAnswer(param).subscribe(
				rslt => {
					if(rslt){
						this.answerList = rslt.list;
						this.answerPage = rslt.page;
					}
				},
				error => this.errorMsg = error
			);
	}
	checkMoreAnswerList(item:any){
		this.showAnswerCount+=10;
		this.listAnswer();
	}
	/*删除回答*/
	deleteAnswer(item:any){
		let param = {
			p_type:'5',//原数据类型 1资讯2动态3评论 4问题 5回答
			p_id:item.answ_id,//原数据ID
			uid:this.userInfo.id,//操作人ID
		};
		console.info(param);
		this.contentOperationService
			.snsDel(param).subscribe(
				rslt => {
					this.answerList.splice(this.answerList.indexOf(item),1);
				},
				error => this.errorMsg = error
			);
	}

	publishAnswer(dialog:any){
		// debugger;
		let param = {
			quest_id:this.detail.id,//被评论ID
			uid:this.userIds.join(','),//	用户ID串，用逗号分开 user_id??
			content:this.curAnswerContent,//	内容
		};
		console.info(param);
		this.contentOperationService
			.answerPublish(param).subscribe(
				rslt => {
					dialog.hide();
					this.listAnswer();
					this.curAnswerContent='';
				},
				error => this.errorMsg = error
			);
	}

	/*评论回答*/
	curAnswerItem:any;
	curAnswerContent:any;
	publishAnswerDialog(dialog:any,item:any){
		if(this.userIds.length==1){
			dialog.show();
			this.curAnswerItem = item;
		}else{
			alert('请选择一位用户');
		}
	}
	answerDialogClose(dialog:any){
		dialog.hide();
		this.curAnswerContent='';
	}
	publishAnswerComment(dialog:any){
		// debugger;
		let param = {
			type:'3',//评论类型
			info_id:this.curAnswerItem?this.curAnswerItem.answ_id:'',//	回复评论的ID	
			uids:this.userIds.join(','),//	用户ID串，用逗号分开 user_id??
			content:this.curAnswerContent,//	内容
			add_weibo:'',//	是否转发到动态
			comm_id:''
		};
		console.info(param);
		this.contentOperationService
			.publishComment(param).subscribe(
				rslt => {
					// debugger;
					dialog.hide();
					this.listComment();
				},
				error => this.errorMsg = error
			);
	}

	/*账号列表*/
	getLoginUser(){
		this.contentOperationService
			.getLoginUser({}).subscribe(
				rslt => {
					if(rslt.status==0){
						if(rslt.data.id)this.userInfo = rslt.data;
						this.queryOperateUserListFn();
					}
				},
				error => this.errorMsg = error
			);
	}
	operateUserList:any=[
		/*{
			userId:'5306',
			userName:'bao',
			nickName:'扣孑',
			checked:false,
		},
		{
			userId:'5308',
			userName:'齐雯',
			nickName:'qw',
			checked:false,
		},*/
	];
	queryOperateUserList(){
		this.getLoginUser();
	}
	queryOperateUserListFn(){
		this.contentOperationService
			.queryOperateUserList({
				securityUserid:this.userInfo.id
			}).subscribe(
				rslt => {
					this.operateUserList = rslt.map((item:any)=>{item.checked=false;return item;});
				},
				error => this.errorMsg = error
			);
	}
	userIds:any=[];
	updateUserIds(e:any,userId:string){
		if(e){
			!this.userIds.includes(userId) && this.userIds.push(userId);
		}else{
			this.userIds.splice(this.userIds.indexOf(userId),1);
		}
	}
}