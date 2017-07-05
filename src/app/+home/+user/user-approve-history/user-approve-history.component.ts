import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { any } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserMsge }  from './classes/user-approve-history';
import { UserApproveHistoryService } from './services/user-approve-history.service';

// import './rxjs-operator';
@Component({
	selector: 'alphain-user-approve-history',
	templateUrl: './user-approve-history.component.html',
	styleUrls: ['./user-approve-history.component.scss'],
	providers: [UserApproveHistoryService]
})

export class UserApproveHistoryComponent implements OnInit{	
	phone:any='';
	color = '#fff';
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){
		this.postListMsges();
		this.serch();
	};
	errorMessage:any;
	userMsges:any=[];
	
//http
companylist:any=[];
partlist:any=[];
postListMsges(){
 	//公司列表
    this.UserApproveHistoryService.OrganizationList(null) 
        .subscribe(
            companylist => {
                this.companylist = companylist;//赋值给下拉列表
                if(this.companylist.status==0){
                    this.companylist=this.companylist.data;
                }else if(this.companylist.status==-5){
					console.log('session已超时')
				 }else{
				 	if(this.companylist.msg){
				 		alert(this.companylist.msg);
				 	}  
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
	//部门列表  
    this.UserApproveHistoryService.DepartmentList(null) 
        .subscribe(
            partlist => {
                this.partlist= partlist;
                if(this.partlist.status==0){
                    this.partlist=this.partlist.data;
                }else if(partlist.status==-5){
					console.log('session已超时')
				}else{
					if(this.partlist.msg){
						alert(this.partlist.msg);
					}
                }
               
            },  
            error => this.errorMessage = <any>error
    ); 
      //console.log(JSON.stringify(this.userLists));
  }
// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
// 失去焦点
	blurCompany(cm:any){
		cm.value =''
		this.default.organizationName=""
	}
// 获取审核历史列表
default:any={
				loginName:'',
				userName:'',	
				organizationName:'',
				// organizationId:'',
				// departmentId:'',
				// sortType:'asc',
				pageNum:1,
				pageSize:10,
			}
	organizationName:any;
	departmentName:any	;
serch(){
	this.hideList = true;
		this.hideLoad = false;
	if(this.organizationName==""){
			this.default.organizationName=""
		}
		if(this.departmentName==""){
			this.default.departmentId=""
		}
		this.default.loginName=this.trim(this.default.loginName)
		this.default.userName=this.trim(this.default.userName)
		console.log(this.default)
			this.UserApproveHistoryService.serchHistory(this.default)
							.subscribe(
								userMsges => {
									console.log(userMsges)
									if(userMsges.status=='0'){
										this.userMsges = userMsges.data.list;
												console.log(userMsges);
												// this.changeDetectorRef.detectChanges();
												this.totalItems = userMsges.data.page.totalResult;
												this.hideLoad = true;
				                    			this.hideList = false;
				                    		}else if(userMsges.status==-5){
												console.log('session已超时')
											}else{
												if(userMsges.msg){
													alert(userMsges.msg);
												}
				                    			this.hideLoad = true;
				                    			this.hideList = false;
				                    		}
									
								},
								error => {	this.errorMessage = error;
									alert("服务器连接失败！")
											this.hideLoad = true;
		                    				this.hideList = false;
											}
							);
							
	};
	        
//即时搜索
public stateCtrl:FormControl = new FormControl();
public myForm:FormGroup = new FormGroup({
	state: this.stateCtrl
});
public customSelected:string = '';
// public usernameSelected:string = '';
public dataSource:Observable<any>;
public asyncSelected:string = '';
public typeaheadLoading:boolean = false;
public typeaheadNoResults:boolean = false; 
public companys:Array<string>;
public departments:Array<string>;  
public typeaheadOnCompanys(e:any):void{
   this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
}
public typeaheadOnDepartments(e:any):void{
    
    this.default.departmentId = e.item.departmentId;
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
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.serch()
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 
		
	};
	public pageNumChange(event:any){
		this.default.pageSize=this.itemsPerPage;
		
		console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		console.log(pageNo);
		this.currentPage = pageNo;
		// this.serch()
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNum = event.page;
		this.serch()
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

//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
// 类管理
// height:any = 352+"px"
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
};








