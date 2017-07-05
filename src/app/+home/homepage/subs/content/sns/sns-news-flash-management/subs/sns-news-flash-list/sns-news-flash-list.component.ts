import { Component,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { News }  from '../../../classes/sns-management';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';

import {INCONFIG} from '../../../../../../../../../public/in.config';
@Component({
	selector: 'sns-news-flash-management',
	templateUrl: './sns-news-flash-list.component.html',
	styleUrls: ['./sns-news-flash-list.component.scss'],
	providers: [SnsManagementService]
})
export class SnsNewsFlashListComponent implements OnInit{
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	private userId:any = INCONFIG.getUserInfo()
	ngOnInit(){
		this.NFX_Newstype_Source()
		this.getinfoList()
	};
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public resouce:Array<string> = [];
	public typeaheadOnSelect(e:any):void {
    
  }

// 去空格
trim(str:any) { //删除左右两端的空格　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
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
		this.getinfoList()
	}
	public sizeData(Number:any){
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
		
	};
		public pageNumChange(event:any,allcheck:any){
		
		this.default.show_count = this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.cur_page = event.page;
		this.getinfoList();
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
//删除弹窗
// / 获取列表
error:any;
infoList:any=[];
page:any;
new:any;
del:any = 2;
source:any;
category:any;
clust_time:any;
errorMessage:any;
default:any = {
		time_begin:'',
		time_end:'',
		source:'',
		clust_id:'',
		is_quick:1,
		is_del:0,
		cur_page:1,
		show_count:10
   }
// 查询快讯列表
getinfoList(){
		this.hideList = true;
		this.hideLoad = false;
	console.log(this.default)
	if(this.del=='1'){
		this.default.is_del='1'
	}else if(this.del=='0'){
		this.default.is_del='0'
	}else{
		this.default.is_del=''
	}

	this.default.source = this.source
	if(this.default.source==undefined){
		this.default.source=''
	}

	this.default.source = this.trim(this.default.source)
	this.snsManagementService.getinfoList(this.default)
								.subscribe(
								infoList => {  
												console.log(infoList)
												if(infoList.status==0){
													this.infoList = infoList.data.list;
													this.totalItems = infoList.data.page.totalResult;
													this.hideList = false;
													this.hideLoad = true;
												}else if(infoList.status==-5){
													console.log('session已超时')
												}
												else{
													if(infoList.msg){
														alert(infoList.msg)
													}
													
													this.infoList=[];
													this.totalItems = 0 ;
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

del_cause:any
del_note:any
istip:any
// 删除块讯
deletedInfo(window:any){
	var obj = {
		p_type:1,
		p_id:'',
		del_cause:'',
		del_note:'',
		message:'',
		uid:'',
	}
	obj.uid =  this.userId.id
	obj.p_id = this.deleteNew.iid
	obj.del_cause=	this.istip
	console.log(obj)
	this.snsManagementService.snsDel(obj)
								.subscribe(
								deleted => {  
												
												console.log(deleted);
												if(deleted.status==0){
													alert("删除成功");
													this.getinfoList();
													this.istip==""
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
// 获取资讯来源
NFX_Newstype_Source(){
	var obj = {
		businTypeID:'ZNFX_Newstype_Source'
	}

	this.snsManagementService.NFX_Newstype_Source(obj)
								.subscribe(
								source => {  
												
												console.log(source);
													if(source.status==0){												
														this.resouce=source.data
													}else if(source.status==-5){
														console.log('session已超时')
													}
													else{
														if(source.msg){
															alert(source.msg)
														}
														
													}
													// this.infoList=infoList;									
												},

								error => this.errorMessage = error
								);														
}


	//删除资讯弹窗
	 deleteNew:any = {}
	deleteNews(deleted:any,news:any){
		deleted.show();
		this.deleteNew = news;
		if(this.deleteNew.is_tip==1){
			this.istip=="被举报"
		}else{
			this.istip=="无"
		}

	}

// 类管理
// height:any = 352+"px"
	height:any ="440px"
	hideLoad:any = true
	hideList:any =  true
	show:any
		setLoadClasses() {
		  	let classes =  {
		    hide: this.hideLoad,      // true
		    // show: !this.show, // false
	  };
	  return classes;
	}
	setListClasses() {
		  	let classes =  {
		    hide: this.hideList,      // true
		    // show: !this.show, // false
	  };
	  return classes;
	}
toChange(newId:any){
	// console.log(newId);
   this.router.navigate(['../sns-news-flash-details',newId],{relativeTo:this.activatedRoute}); 

}		
 }