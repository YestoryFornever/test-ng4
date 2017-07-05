import { Component,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectionStrategy,AfterViewChecked } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,TabsModule,CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';

import {INCONFIG} from '../../../../../../../../../public/in.config';

@Component({
	selector: 'sns-share-details',
	templateUrl: './sns-share-details.component.html',
	styleUrls: ['./sns-share-details.component.scss'],
	providers: [SnsManagementService],
})
export class SnsShareDetailsComponent implements OnInit,AfterViewChecked{
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(
		
				private snsManagementService:SnsManagementService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router){

		// for (let i = 0; i < this.pic.length; i++) {
  //     		this.addSlide(i);
  //  		 }		
	}
	private userId:any = INCONFIG.getUserInfo()

	ngOnInit(){
		var a:any = document.getElementsByClassName('wrapper')[0]
		a.scrollTop = 0
		window.scrollTo(0,0);
			this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID.wid = id;
			this. otherData.info_id = id;
			this.getShareDetial(this.ID)
			this.listComment();
			
		})
	};
	ngAfterViewChecked(){
		// 填充表情内容
		this.func()
	}

	func(){
		// console.log(document.getElementsByClassName("shareContent").length+''+this.shares[9])
		for(var i = 0;i<document.getElementsByClassName("shareContent").length;i++){
			document.getElementsByClassName("shareContent")[i].innerHTML = this.Comment[i].content
		}
	}
// 获取详情
	id:any
	ID = {
		wid: ''
	};
	detial:any={
		wid:"",
		content:"",
		time:"",
		user_phone:"",
		user_name:"",
		special_word:"",
		visible_status:"",
		refer_type:"",
		refer_id:"",
		view_cnt:"",
		comment_cnt:"",
		like_cnt:"",
		repost_cnt:"",
		tip_cnt:"",
		manage_cnt:"",
		is_tip:"",
		is_del:"",
		photo1:	"",
		photo2:	"",
		photo3:	"",
		photo4:	"",
		photo5:	"",
		photo6:	"",
		photo7:	"",
		photo8:	"",
		photo9:	"",
	}
	errorMessage:any
	content:any
	photo:any = []
	pic:any = []
	special_word:any=[]
	getShareDetial(ID:any){
		console.log(this.ID)
		this.snsManagementService.getShareDetial(ID)
			.subscribe(
			detial => {
				if(detial.status==0){
					this.detial=detial.data;
				
				this.photo.push(this.detial.photo1);this.photo.push(this.detial.photo2);this.photo.push(this.detial.photo3);this.photo.push(this.detial.photo4);this.photo.push(this.detial.photo5);this.photo.push(this.detial.photo6);this.photo.push(this.detial.photo7);this.photo.push(this.detial.photo8);this.photo.push(this.detial.photo9);

				for(i=0;i<this.photo.length;i++){
					if(this.photo[i]!=null){
						this.pic.push(this.photo[i])
					}
				}

				this.addSlide()
							// var newTime = new Date(oldTime)
						console.log(detial);

						if(this.detial.visible_status==1){
							this.detial.visible_status="全网可见动态"
						}else{
							this.detial.visible_status="仅好友可见"
						};
						if(this.detial.refer_type==1){
							this.detial.refer_type="资讯"
						}else{
							this.detial.refer_type="动态"
						}

						if(this.detial.special_word!=''){
								this.special_word=this.detial.special_word.split(',');
								{console.log(this.special_word)
							var n = [this[0]]; //结果数组
							for(var i = 0; i < this.special_word.length; i++) //从第二项开始遍历
								{
							//如果当前数组的第i项在当前数组中第一次出现的位置不是i，
							//那么表示第i项是重复的，忽略掉。否则存入结果数组
									if (this.special_word.indexOf(this.special_word[i]) == i) n.push(this.special_word[i]);
								}
									console.log(n)
									this.special_word = n;

						// 敏感词匹配


						    //遍历敏感词数组  
						    for(var i=0;i<this.special_word.length;i++){  
						        //全局替换  
						        var reg = new RegExp(this.special_word[i],"g");  
						        //判断内容中是否包括敏感词  
						        	if(this.detial.content.indexOf(this.special_word[i])!=-1){  
						            var result = this.detial.content.replace(reg, "<b style="+"color:red"+">" + this.special_word[i] + "</b>");  
						            this.detial.content = result;  
						        	}  
						    	}  
						    	document.getElementById("content").innerHTML= this.detial.content
							}
						}else{
								document.getElementById("content").innerHTML= this.detial.content
						}
					}
				},
			error => this.errorMessage = error
			);
	}
		
	// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		// this.height = Number*40+120+'px';
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		 this.otherData.show_count = Number;
		this.upDateList()
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		console.log(event)
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		console.log(pageNo)
	};
// 翻页
	pageChanged(event:any):void {
		 this.otherData.cur_page = event.page
		 this.upDateList()
		// console.log(event)
	};

	listState:any = 1;
	public get(event:any):void {
		if(event.heading=="评论"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.listComment();
			this.listState = 1;
		}
		if(event.heading=="浏览"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListView();
			this.listState = 2;
		}
		if(event.heading=="点赞"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListLike();
			this.listState = 3;
		}
		if(event.heading=="分享"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListRepost();
			this.listState = 4;
		}
		if(event.heading=="举报"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListTip();
			this.listState = 5;
		}
		if(event.heading=="管理员处理"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListManage();
			this.listState = 6;
		}

	};
	upDateList(){
		if(this.listState == 1){
			this.listComment();
		}
		if(this.listState == 2){
			this.getListView();
		}
		if(this.listState == 3){
			this.getListLike();
		}
		if(this.listState == 4){
			this.getListRepost();
		}
		if(this.listState == 5){
			this.getListTip();
		}
		if(this.listState == 6){
			this.getListManage();
		}
	}

// 图片展示
	public myInterval:number = 3000;
	public noWrapSlides:boolean = false;
	public slides:Array<any> = [];
  	public addSlide():void {
  	console.log(this.pic)
  		for(var i=0;i<this.pic.length;i++){
  		this.slides.push({
      		image: this.pic[i]
    	});
  		}
	}
 // 查看源
	check(refer_type:any,id:any){
	 	if(refer_type=="资讯"){
	 		console.log("资讯"+id)
	 		this.router.navigate(['../../../sns-news-management/sns-news-details',this.detial.refer_id],{relativeTo:this.activatedRoute}); 
	 	}else if(refer_type=="微博"){
	 		console.log("微博"+id);
	 		// this.ID.wid = id
	 		// this.getShareDetial(this.ID)
	 		this.router.navigate(['../../sns-share-change',this.detial.refer_id],{relativeTo:this.activatedRoute}); 
	 	}   
	}
//查看生成的动态
	getInfoDetails(){
		console.log(this.ID)
		this.snsManagementService.getinfoContent(this.ID)
								.subscribe(
								detial => {
									if(detial.status==0){	
									this.detial=detial.data;	
									console.log(this.detial);	
									}else if(detial.status==-5){
										console.log('session已超时');
									}
									else{
										if(detial.msg){
											alert(detial.msg)
										}
										console.log(detial.msg)
									}
								},
								error => this.errorMessage = error
								);
	
	}

	userMsge:any
	otherData:any={
 		type:2,
		info_id:'',
		cur_page:1,
		show_count:10
	}
// {"category":0,"time_begin":"","time_end":"","source_id":"","clust_id":"","is_tip":"","is_del":"","title":"","clust_tag":"","clust_date":"","orderby":"view_cnt desc","cur_page":4,"show_count":10,"clust_time":""}
// 评论列表
	Comment:any=[]
	listComment(){
		console.log(this.otherData)
		this.snsManagementService.getListComment(this.otherData)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.Comment = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											alert(comment.msg)
										}
									}
								},
								error => this.errorMessage = error
								);
	}
	// // 浏览列表
	ListView:any=[]
	getListView(){
		console.log(this.otherData)
		this.snsManagementService.getListView(this.otherData)
								.subscribe(
								comment => {
									
									if(comment.status==0){
										this.ListView = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											alert(comment.msg)
										}

									}
								},
								error => this.errorMessage = error
								);
	}
// 点赞列表
	ListLike:any=[]
	getListLike(){
		console.log(this.otherData)
		this.snsManagementService.getListLike(this.otherData)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.ListLike = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											alert(comment.msg)
										}
									}
								},
								error => this.errorMessage = error
								);	
	}
// 分享列表
	ListRepost:any=[]
	getListRepost(){
		console.log(this.otherData)
		this.snsManagementService.getListRepost(this.otherData)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.ListRepost = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											// alert(comment.msg)
										}
									}
								},
								error => this.errorMessage = error
								);	
	}
	// 举报列表
	ListTip:any=[]
	getListTip(){
		console.log(this.otherData)
		this.snsManagementService.getListTip(this.otherData)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.ListTip = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											alert(comment.msg)
										}
										
									}
								},
								error => this.errorMessage = error
								);	
	}
	// 管理员列表
	ListManage:any=[]
	getListManage(){
		console.log(this.otherData)
		this.snsManagementService.getListManage(this.otherData)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.ListManage = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										if(comment.msg){
											alert(comment.msg)
										}
										
									}
								},
								error => this.errorMessage = error
			
								);	
	}

	del_cause:any
	del_note:any
// 删除资讯
delete_tip:any
deleteShare(deleted:any){
	this.delete_tip =""
	if(this.detial.is_tip!=1&&this.detial.special_word==''){
			this.delete_tip ="无"
		}
	if(this.detial.is_tip==1){
		this.delete_tip +="被举报"
	}
	if(this.detial.special_word!=''){
		this.delete_tip +="  含敏感词"
	}
 deleted.show()

}	
deletedInfo(window:any){
		var obj = {
		p_type:2,
		p_id:'',
		del_cause:'',
		del_note:'',
		message:'',
		uid:'',
		}
	obj.p_id = this.ID.wid
	obj.uid =this.userId.id
	obj.del_cause=	this.delete_tip
	obj.del_note = this.del_note
	console.log(obj)
	this.snsManagementService.snsDel(obj)
								.subscribe(
								deleted => {  	
											console.log(deleted);
											if(deleted.status==0){
												alert("删除成功");
												window.hide();
												this.del_note=''
												this.getShareDetial(this.ID)
											}else{
												if(deleted.msg){
													alert(deleted.msg)
												}
												
											}								
										},

								error => this.errorMessage = error
								);
								window.hide();
								obj.del_cause='',
								obj.del_note='',
								obj.message=''

	}
	//删除评论
	istip:any = ''
	commont:any
	deletedCom(deletedC:any,commont:any){
		this.istip =""
		this.commont = commont
		if(this.commont.is_tip!=1&&this.commont.special_word==''){
			this.istip ="无"
		}
		if(this.commont.is_tip==1){
			this.istip +="被举报"
		}
		if(this.commont.special_word!=''){
			this.istip +="  含敏感词"
		}
		deletedC.show();
	}
	deletedComment(window:any){
		var obj = {
			p_type:3,
			p_id:0,
			del_cause:'',
			del_note:'',
			message:'',
			uid:'',
		}
		obj.uid = this.userId.id
			obj.p_id = this.commont.cid
		// obj.p_id = this.deleteNew.iid
		// if(this.commont.is_tip==1){
		// 	this.istip +="被举报"
		// }
		// if(this.commont.special_word!=''){
		// 	this.istip +="  含敏感词"
		// }
		obj.del_cause=	this.istip;
		obj.del_note = this.del_note;
		console.log(obj)
		this.snsManagementService.snsDel(obj)
									.subscribe(
									deleted => {  	
													console.log(deleted);
													if(deleted.status==0){
														alert("删除成功");
														// this.detial.is_del=1
														this.listComment()	
														this.del_note='';
													}else{
														if(deleted.msg){
															alert(deleted.msg)	
														}		
													}
													// this.infoList=infoList;									
												},
									error => this.errorMessage = error
									);
									window.hide();
									obj.del_cause='',
									obj.del_note='',
									obj.message='',
									this.del_note = ''
	}
// 判定无问题
	note:any
	setTip(window:any){
	var obj = {
		p_type:2,
		p_id:'',
		note:'',
		uid:'',
	}
	obj.uid =this.userId.id
	obj.p_id = this.ID.wid
	obj.note = this.note
	console.log(obj)
	this.snsManagementService.setTip(obj)
								.subscribe(
								deleted => {  
												console.log(deleted);
												if(deleted.status==0){
													alert("判定成功");
													window.hide()
													this.getShareDetial(this.ID)
												}else{
													if(deleted.msg){
														alert(deleted.msg)
													}
												
												}								
											},

								error => this.errorMessage = error
								);
								obj.note=''
								

	}

	toList(){
	   this.router.navigate(['../../sns-share-list'],{relativeTo:this.activatedRoute}); 
	}
	toShare(userMsg:any){
		this.router.navigate(['../../sns-share-change',userMsg.rid],{relativeTo:this.activatedRoute}); 
	}

}
