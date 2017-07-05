import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate,AfterContentChecked,AfterViewChecked, AfterViewInit,AfterContentInit,OnDestroy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
import { ActivatedRoute, Router }   from '@angular/router';

import {INCONFIG} from '../../../../../../../../../public/in.config';

@Component({
	selector: 'sns-share-list',
	templateUrl: './sns-share-list.component.html',
	styleUrls: ['./sns-share-list.component.scss',
				'../../../../../../scss/typical-list/header.scss',
				'../../../../../../scss/typical-list/condition.scss',
				'../../../../../../scss/typical-list/order.scss',
				'../../../../../../scss/typical-list/table.scss'],
	providers: [SnsManagementService]
})
export class SnsShareListComponent implements OnInit,AfterViewChecked,AfterViewInit,AfterContentInit,AfterContentChecked,OnDestroy{ 
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
				private router:Router){}
	ngOnInit(){
		this.getShareList()
	// this.getHeroes();
	};
	private userId:any = INCONFIG.getUserInfo()

	ngAfterViewChecked(){
		// 填充表情内容
		this.func()
	}
	ngAfterViewInit(){
		// this.func()
	}
	ngAfterContentInit(){
		// this.func()
	}
	ngAfterContentChecked(){
		//
	}
	ngOnDestroy(){
		sessionStorage.setItem("cur_page_share", JSON.stringify(this.defult))
	}
// 去空格
	trim(str:any) { //删除左右两端的空格　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
// http
// 请求列表
	defult={
		time_begin: '',
		time_end: '',
		auth: '',
		is_tip: '2',
		is_del: '2',
		is_special: '2',
		account_type:'0',
		orderby:'create_time desc',
		cur_page: 1,
		show_count: 10
	};
	// startTime:any,endTime:any,author:any,tip:any,special:any,del:any
	begin_time:any;
	shareList:any={};
	end_time:any;
	errorMessage:any;
	author:any;
	tip:any='2';
	special:any='2';
	del:any='2';
	page:any
	getShareList(){
		// this.hideList = true;
		this.hideLoad = false;
		if(this.tip=="2"){
			this.defult.is_tip=''
		}else{
			this.defult.is_tip=this.tip
		};
		if(this.del=="2"){
			this.defult.is_del=''
		}else {
			this.defult.is_del=this.del
		}
		if(this.special=="2"){
			this.defult.is_special=''
		}else{
			this.defult.is_special=this.special
		};
		this.defult.auth = this.trim(this.defult.auth)
		this.snsManagementService.getShareList(this.defult)
								.subscribe(
								shareList =>{
												if(shareList.status==0){
													this.shareList=shareList;
													console.log(shareList)
													this.shares=shareList.data.list;
													this.page = shareList.data.page
													this.totalItems = this.page.totalResult
													this.hideList = false;
													this.hideLoad = true;
												}else if(shareList.status==-5){
													console.log('session已超时')
												}
												else{
													if(shareList.msg){
														alert(shareList.msg)
													}
													
													this.hideList = false;
													this.hideLoad = true;
												}
											},
								error => {	this.errorMessage = error;
											alert("服务器连接失败！");
											this.hideLoad = true;
											this.hideList = false;
										}
								);
	}

	getSessionShareList(){
		this.hideLoad = false;
		if(this.tip=="2"){
			this.defult.is_tip=''
		}else{
			this.defult.is_tip=this.tip
		}
			;
		if(this.del=="2"){
			this.defult.is_del=''
		}else {
			this.defult.is_del=this.del
		}
		if(this.special=="2"){
			this.defult.is_special=''
		}else{
			this.defult.is_special=this.special
		};
		this.snsManagementService.getShareList(this.defult)
								.subscribe(
								shareList =>{
												if(shareList.status==0){
													this.shareList=shareList;
													console.log(shareList)
													this.shares=shareList.data.list;
													this.page = shareList.data.page
													this.currentPage = +sessionStorage.getItem("cur_page")
													this.totalItems = this.page.totalResult
													this.changeDetectorRef.detectChanges();
													this.hideList = false;
													this.hideLoad = true;
													// debugger	
												}else if(shareList.status==-5){
													console.log('session已超时')
												}
												else{
													if(shareList.msg){
														alert(shareList.msg)
													}
													
													this.hideList = false;
													this.hideLoad = true;
												}
											},
								error => {	this.errorMessage = error;
											alert("服务器连接失败！");
											this.hideLoad = true;
		                    				this.hideList = false;
										}
								);
	}
// 关联下拉
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public usernames:Array<string> = [];
	// public departments:Array<string> = ["飞","个","好"];
	public typeaheadOnSelect(e:any):void {}
// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 10;
	public currentPage:number = 1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getShareList()
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst()
		this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	
	public pageNumChange(event:any,allcheck:any){
		this.defult.show_count = this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.defult.cur_page = event.page;
		this.getShareList();
	};

	share:any;
	shares:any=[{
				id:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
				},{id:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
	}]


// 列表操作
	is_tip:any = '';
	is_id:any = '';
	is_special:any='';
	check(shareID:any){
	   this.router.navigate(['../sns-share-change',shareID],{relativeTo:this.activatedRoute}); 
	}

	deleteShare(deldeteWindow:any,is_tip:any,is_id:any,special_word:any){
		this.is_tip=''
		is_tip  ==1?this.is_tip+="被举报":this.is_tip+='';
		special_word !=''?this.is_tip+="有敏感词":this.is_tip+='';
		is_tip  !=1 && special_word ==''? this.is_tip="无":this.is_tip+='';
		this.is_id = is_id;

		deldeteWindow.show();
	}
	noProb(noProblem:any,id:any){
			this.is_id= id;
			noProblem.show()
	}

	del_cause:any
	del_note:any
// 删除资讯
	deletedInfo(window:any){
		var obj = {
			p_type:2,
			p_id:'',
			del_cause:'',
			del_note:'',
			message:'',
			uid:'',
		}
	obj.del_note = this.del_note
	obj.uid = this.userId.id
	obj.p_id = this.is_id
	obj.del_cause=	this.is_tip+' '+this.is_special
	console.log(obj)
	this.snsManagementService.snsDel(obj)
								.subscribe(
								deleted => {  
												console.log(deleted);
												if(deleted.status==0){
													alert("删除成功");
													this.getShareList();
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
								obj.del_cause='',
								obj.del_note='',
								this.del_note='',
								obj.message=''
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
		obj.p_id = this.is_id
		obj.note = this.note
		console.log(obj)
		this.snsManagementService
		.setTip(obj)
		.subscribe(
			deleted => {  	
						console.log(deleted);
						if(deleted.status==0){
							alert("判定成功");
							this.getShareList();
						}else{
							if(deleted.msg){
								alert(deleted.msg)
							}
							
						}									
					},

		error => this.errorMessage = error
		);
		window.hide();
		obj.note=''								
	}
	// 类管理
	hideLoad:any = true
	hideList:any =  true
	show:any
	setLoadClasses() {
	  	let classes =  {
	    	hide: this.hideLoad,      // true
		};
		return classes;
	}
	setListClasses() {
		let classes =  {
		    hide: this.hideList,      // true
		};
		return classes;
	}


	func(){
		for(var i = 0;i<document.getElementsByClassName("shareContent").length;i++){
			document.getElementsByClassName("shareContent")[i].innerHTML = this.shares[i].content
		}
	}
 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){

	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
			this.approve()
		};
approveNot:any=[]
approveY:any=[]

sended:any=true
unSended:any=false
canSend:any=false
notSend:any=false
haveOne:any = false
addToSp:any={
			obj_type:6,
			obj_id:'',
			is_special:0
		}
ids:any=[]
approve(){	
		this.ids=[]
		let listState = <HTMLInputElement[]><any>document.getElementsByName("user");
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			    this.ids.push(this.shares[i].wid)
					}
				}
				
		
	}
addToSpecial(){
	if(this.ids.length<=0){
		alert('请先选择动态')
		return false
	}
	this.addToSp.obj_id=this.ids.join(',')
	this.snsManagementService.addRecomSource(this.addToSp)
		.subscribe(
			deleted => {  	
						console.log(deleted);
						if(deleted.status==0){
							alert("添加成功");
							this.router.navigate(['../../recommend-component'],{relativeTo:this.activatedRoute}); 
						}else{
							if(deleted.msg){
								alert(deleted.msg)
							}
							
						}									
					},

		error => this.errorMessage = error
		);
}		
	// 排序
	Order(ord:any,type:any){
		this.defult.orderby = ord+' '+type
			this.getShareList()
	}	
	
}