import { Component, ViewChild,OnInit,ChangeDetectorRef,trigger,state,style,transition,animate,AfterViewChecked } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from './../sns-management-services/sns-management.services';
import { ActivatedRoute, Router }   from '@angular/router';
import {INCONFIG} from '../../../../../../../public/in.config';
@Component({
	selector: 'sns-comments-history',
	templateUrl: './sns-comments-history.component.html',
	styleUrls: ['./sns-comments-history.component.scss'],
	providers: [SnsManagementService]
})
export class SnsCommentsHistoryComponent implements OnInit,AfterViewChecked{ 
	color = '#fff';
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router){}

	ngOnInit(){
		this.listComment()
		console.log(this.userId)
	};
	ngAfterViewChecked(){
		// 填充表情内容
		this.func()
	}

	func(){
		// console.log(document.getElementsByClassName("shareContent").length+''+this.shares[9])
		for(var i = 0;i<document.getElementsByClassName("shareContent").length;i++){
			document.getElementsByClassName("shareContent")[i].innerHTML = this.commentList[i].content
		}
	}
	private userId:any = INCONFIG.getUserInfo()
 	public stateCtrl:FormControl = new FormControl();

	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});

	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public usernames:Array<string> = ["啊","吧","才"];
	public companys:Array<string> = ["的","呃"];
	// public departments:Array<string> = ["飞","个","好"];
	public typeaheadOnSelect(e:any):void {
    console.log(e.item.value)
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
		this.itemsPerPage = Number;
		this.changeFirstPage()
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 

	};
	
	public pageNumChange(event:any,allcheck:any){
		// debugger
		this.default.show_count = this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
		// this.listComment()	
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.cur_page = event.page;
		this.listComment()
	};

//list状态切换
	public changeState = function(listState:any,userList:any){
		if(listState.checked==true){
			userList.style.background = 'rgb(255, 255, 150)'

		}else{
			userList.style.background = 'rgb(255, 255, 255)'
		}
		console.log(userList.style.background)
	}
	// 去空格
trim(str:any) { //删除左右两端的空格　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
// 查询评论列表
	commentList:any
	default:any = {
		time_begin:'',
		time_end:'',
		auth:'',
		type:'0',
		is_tip:'2',
		is_del:'2',
		orderby:'create_time desc',
		is_special:'2',
		info_id:'',
		cur_page:'1',
		show_count:'10',
	}
	tip:any='2'
	del:any='2'
	srouce:any='0'
	special:any='2'
	errorMessage:any
	changeFirstPage(){
		this.currentPage = 1;
		this.changeDetectorRef.detectChanges();
		this.listComment()
	}

	listComment(){
		console.log(this.srouce)
			this.hideList = true;
			this.hideLoad = false;
		if(this.srouce=="0"){
			this.default.type=''
		}else{
			this.default.type=this.srouce;
		}
		if(this.tip=="2"){
			this.default.is_tip=''
		}else{
			this.default.is_tip=this.tip
		}
				;
		if(this.del=="2"){
			this.default.is_del=''
		}else {
			this.default.is_del=this.del
		}
		if(this.special=="2"){
			this.default.is_special=''
		}else{
			this.default.is_special=this.special
		};
		this.default.auth=this.trim(this.default.auth)
		var obj = this.default
		console.log(obj)
		this.snsManagementService.getListComment(obj).subscribe(
			result => {  
							if(result.status==0){
								this.commentList = result.data.list ;
								this.totalItems = result.data.page.totalResult;
								this.hideList = false;
								this.hideLoad = true;
							}else if(result.status==-5){
								console.log('session已超时')
							}else{
								if(result.msg){
									alert(result.msg);
								}
								
								this.hideList = false;
								this.hideLoad = true;
							}								
						},

			error => {	this.errorMessage = error;
				alert("服务器连接失败！")
						this.hideLoad = true;
        				this.hideList = false;
						}
			);
	}
// 删除
	deleteMsg:any={
		p_type:3,
		p_id:'',
		del_cause:'',
		del_note:'',
		message:'',
		uid:'',
	}
	is_tip:any;
	deletedCom(window:any,msg:any){
		window.show()
		this.deleteMsg.p_id=msg.cid;
		if(msg.is_tip==1){
			this.deleteMsg.del_cause+="被举报  "
		}if(msg.special_word!=''){
			this.deleteMsg.del_cause+="有敏感词  "
		}
		if(msg.is_tip!=1&&msg.special_word==''){
			this.deleteMsg.del_cause="无"
		}

		 this.is_tip= this.deleteMsg.del_cause
	}
	deletedInfo(window:any){
		console.log(this.deleteMsg)
		this.deleteMsg.uid = this.userId.id
		this.snsManagementService.snsDel(this.deleteMsg)
			.subscribe(
			deleted => {  												
							console.log(deleted);
							if(deleted.status==0){
								alert("删除成功")
								this.deleteMsg.del_cause==""
								this.listComment();
								this.is_tip=''
							}else{
								alert(deleted.msg)
							}									
						},

			error => this.errorMessage = error
			);
		window.hide();								
		this.deleteMsg.del_cause='',
		this.deleteMsg.del_note='',
		this.deleteMsg.message=''
		this.deleteMsg.del_note=''
	}
// 判定无问题
	nopro:any={
			p_type:3,
			p_id:'',
			note:'',
			uid:'',
	}
	noprob(window:any,msg:any){
		window.show()
		console.log(msg)
		this.nopro.p_id=msg.cid;
		this.nopro.uid =  this.userId.id
	}
	note:any
	setTip(window:any){
		console.log(this.nopro)
		this.snsManagementService.setTip(this.nopro)
			.subscribe(
			deleted => {  
							console.log(deleted);
							if(deleted.status==0){
								alert("判定成功")
								this.listComment();
							}else{
								alert(deleted.msg)
							}									
						},

			error => this.errorMessage = error
			);
			window.hide();
			this.nopro.note=''
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
}