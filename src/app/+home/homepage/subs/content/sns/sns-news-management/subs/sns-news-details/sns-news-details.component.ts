import { Component,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectionStrategy,AfterViewChecked } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
import {INCONFIG} from '../../../../../../../../../public/in.config';
@Component({
	selector: 'sns-news-details',
	templateUrl: './sns-news-details.component.html',
	styleUrls: ['./sns-news-details.component.scss'],
	providers: [SnsManagementService],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnsNewsDetailsComponent implements OnInit,AfterViewChecked{
	// height = '312px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router){}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID.info_id = id;
			this.otherData.info_id = id;
			// console.log(this.ID)
			this.getInfoDetails()
			this.listComment()
			if(this.detial.bond_tags){
				console.log(this.detial.bond_tags.parseJSON())
			}
			
		})

	// this.getHeroes();
	};
	private userId:any = INCONFIG.getUserInfo()


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
	public stateCtrl:FormControl = new FormControl();

	public myForm:FormGroup = new FormGroup({
	state: this.stateCtrl
	});

	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public typeaheadOnSelect(e:any):void {
		console.log(e.item.value)
	}

	// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=100;
	public itemsPerPage:number;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		// this.height = Number*40+120+'px';
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.otherData.show_count = Number
		this.upDateList()
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		//console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		 this.otherData.cur_page = event.page
		 this.upDateList()
	};

	//tab
	listState:any = 1;
	head:any="评论" 
	public get(event:any):void {
		this.head = event.heading
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
		if(event.heading=="站内分享"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
			this.getListRepost();
			this.listState = 4;
		}
		if(event.heading=="站外分享"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
			this.changeDetectorRef.detectChanges();
			this.getListRepostOut();
			this.listState = 5;
		}
		if(event.heading=="举报"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
			this.changeDetectorRef.detectChanges();
			this.getListTip();
			this.listState = 6;
		}
		if(event.heading=="管理员处理"){
			this.currentPage = 1;//无法同时修改当前页和每页总数
			this.changeDetectorRef.detectChanges();
			this.getListManage();
			this.listState = 7;
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
			this.getListRepostOut();
		}
		if(this.listState == 6){
			this.getListTip();
		}
		if(this.listState == 7){
			this.getListManage();
		}
	}


	minganci(txt:any){
	var pattern = /法轮功/g;
	var text = txt.innerHTML;
	text.replace(/(法轮功|自焚)/g,'@@@@@@@@@@@@@@@@@@@')
	console.log(text)
	// var result =  pattern.exec(text);
	// console.log(result)
	// alert('含有一下一个或多个 红色 黑色 浅绿色 等颜色词语 并替换为空字符串'.replace(/(红|黑|浅绿)色/g,''));
	}


	// 获取资讯详情
	getDetial:any
	ID = {
		info_id:0
	};
	
	detial:any={
		// iid: "" ,
		// title:"",
		// source:'',
		// auth:'',
		// content:'',
		// source_path:'',
		// view_cnt:'',
		// comment_cnt:'',
		// like_cnt:'',
		// repost_cnt:'',
		// tip_cnt:'',
		// manage_cnt:'',
		// category:'',
		// source_time:'',
		// create_time:'',
		// is_tip:'',
		// is_del:'',
		// is_source_btn:'',
	};
	errorMessage:any
	bondName:any=[]
	categoryResult:any
	// 获取详情
	// new RegExp("2").test(this.detial.category)
	getInfoDetails(){
		console.log(this.ID)
		this.snsManagementService.getinfoContent(this.ID)
								.subscribe(
								detial => {

									if(detial.status==0){
										
										this.detial=detial.data;
										if(detial.bond_tags!=''){
											this.bondName=eval("(" + this.detial.bond_tags+ ")")
										}
										console.log(this.detial);	
										var reg2 = new RegExp("2");
										var reg4 = new RegExp("4");
										var reg5 = new RegExp("5");
										this.categoryResult=''
										if(reg2.test(this.detial.category)){
											this.categoryResult+='负面,'
										}
										if(reg4.test(this.detial.category)){
											this.categoryResult+='全部,'
										}
										if(reg5.test(this.detial.category)){
											this.categoryResult+='自媒体,'
										}
									}else if(detial.status==-5){
										console.log('session已超时');
									}
									else{
										if(detial.msg){
											alert(detial.msg)
										}
									}
								},

								error => this.errorMessage = error
								);
	
	}

	userMsge:any

 otherData:any={
 		type:1,
		info_id:0,
		cur_page:1,
		show_count:10
	}

// 评论列表
// AllComment:any
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
	// 浏览列表
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
										console.log(comment.msg)
									}
								},
								error => this.errorMessage = error
								);	
	}
// 站外分享列表
ListRepostOut:any=[]
getListRepostOut(){
	var obj={
		info_id:0,
		cur_page:1,
		show_count:10
	}
	obj.info_id=this.otherData.info_id
	obj.cur_page = this.otherData.cur_page
	obj.show_count = this.otherData.show_count
	this.snsManagementService.listRepostOut(obj)
								.subscribe(
								comment => {
									if(comment.status==0){
										this.ListRepostOut = comment.data.list
										console.log(comment);
										this.totalItems = comment.data.page.totalResult
									}else if(comment.status==-5){
										console.log('session已超时')
									}
									else{
										console.log(comment.msg)
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
// 删除资讯
del_cause:any=''
del_note:any=''
istip:any=''
deletedInfo(window:any){
	var obj = {
		p_type:1,
		p_id:0,
		del_cause:'',
		del_note:'',
		message:'',
		uid:'',
	}
		obj.p_id = this.ID.info_id
		obj.uid = this.userId.id
	// obj.p_id = this.deleteNew.iid
	

	obj.del_cause =	this.istip
	obj.del_note = this.del_note
	console.log(obj)
	this.snsManagementService.snsDel(obj)
								.subscribe(
								deleted => {  
												
												console.log(deleted);
												if(deleted.status==0){
													alert("删除成功");
													 this.del_note=''
													this.detial.is_del=1;
													this.getInfoDetails()
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
// 删除评论
del_noteCom:any
commont:any
deletedCom(deletedC:any,commont:any){
	deletedC.show();
	this.commont = commont
	if(this.commont.is_tip==1){
		this.istip +="被举报"
	}
	if(this.commont.special_word!=''){
		this.istip +="  含敏感词"
	}
	if(this.commont.is_tip!=1&&this.commont.special_word==''){
			this.istip ="无"
	}
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
	
	obj.del_cause =	this.istip;
	obj.del_note = this.del_noteCom;
	console.log(obj)
	this.snsManagementService.snsDel(obj)
								.subscribe(
								deleted => {  
												
												console.log(deleted);
												if(deleted.status==0){
													alert("删除成功");
													// this.detial.is_del=1
													this.listComment()	
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
								obj.message=''

}
// 判定无问题
noProb(noProblem:any){
	this.note=''
			noProblem.show()
	}

note:any
setTip(window:any){
	var obj = {
		p_type:1,
		p_id:0,
		note:'',
		uid:'',
	}
	obj.p_id = this.ID.info_id
	obj.note = this.note
	obj.uid = this.userId.id
	console.log(obj)
	this.snsManagementService.setTip(obj)
								.subscribe(
								deleted => {  
												
												console.log(deleted);
												if(deleted.status==0){
													alert("判定成功")
													this.getInfoDetails()
													this.listComment()	
												}else{
													if(deleted.msg){
														alert(deleted.msg)
													}
												}								
											},

								error => this.errorMessage = error
								);
								window.hide();
								// this.getinfoList();
	}

//删除资讯弹窗
 deleteNew:any = {}
deleteNews(deleted:any){
	if(this.detial.is_tip==1){
		this.istip="被举报"
	}else{
		this.istip="无"
	}
	this.del_note='';
	deleted.show();
	this.deleteNew = this.getDetial;
}


// 跳转
	toChange(){
		
	   this.router.navigate(['../../sns-news-change',this.ID.info_id],{relativeTo:this.activatedRoute}); 
	}
	toList(){
		
	   this.router.navigate(['../../sns-news-list'],{relativeTo:this.activatedRoute}); 
	}
	toShare(msg:any){
	   this.router.navigate(['../../../sns-share-management/sns-share-change',msg.rid],{relativeTo:this.activatedRoute}); 
	}
}