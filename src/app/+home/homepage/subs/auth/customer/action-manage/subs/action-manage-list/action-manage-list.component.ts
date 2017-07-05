import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router }   from '@angular/router';
import {CustomerManageService} from '../../../services/customer-manage.service';
@Component({
	selector: 'action-manage-list.component',
	templateUrl: './action-manage-list.component.html',
	styleUrls: ['./action-manage-list.component.scss'],
	providers: [CustomerManageService]
})
export class ActionManageListComponent implements OnInit{
		constructor(private changeDetectorRef:ChangeDetectorRef,
		private customerManageService:CustomerManageService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}
	ngOnInit(){
		this.queryAllStaff()
		this.searchActionList()
		this.en = {
            firstDayOfWeek: 0,
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
    
	}
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
// /即时搜索
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
	   this.default.employmentId = e.item.employmentId ;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{
	    
	    // this.default.departmentId = e.item.departmentId;
	} 
	en: any;
	default:any={
					employmentId:'',
					actionType:'',	
					receiver:'',
					startTime:'',
					endTime:'',
					pageNumber:'1',
					pageSize:'10',
				}
	errorMessage:any
	actionList:any=[]
// 行动列表查询
	searchActionList(){
		
		this.default.startTime = Date.parse(this.startTime)
		this.default.endTime = Date.parse(this.endTime)
		console.log(this.default)
		 this.customerManageService.searchActionList(this.default) 
	        .subscribe(
	            actionList => {
	            	console.log(actionList)
	                if(actionList.status==0){
	                	this.totalItems = actionList.data.total
	                    this.actionList=actionList.data.voList;
	                }else{
	                	if(actionList.msg){
	                		 alert(actionList.msg);
	                	}
	                }
	            }, 
	            error => this.errorMessage = <any>error
	        ); 
	}
	turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.searchActionList()
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
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.default.pageSize = Number;
		this.turnFirst();
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 
		
	};
	public pageNumChange(event:any){
		// this.default.pageSize=this.itemsPerPage;
		
		// console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		console.log(pageNo);
		this.currentPage = pageNo;
		// this.serch()
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNumber = event.page;
		this.searchActionList()
	};
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
// 类管理
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
	startTime:any
	endTime:any
	clickdeded(){
		console.log(this.startTime+'---'+this.endTime)
	}
// 跳转
	toChange(newsId:any){
	   this.router.navigate(['../action-manage-detial',newsId],{relativeTo:this.activatedRoute}); 
	}
// //客户经理列表查询

// 	queryAllEmployment(){
		
// 		 this.customerManageService.queryAllEmployment(null) 
// 	        .subscribe(
// 	            customerList => {
	            	
// 	                if(customerList.status==0){
// 	                	console.log(customerList.data)
// 	                    this.customerList = customerList.data;	                   
// 	                }else{
	             
// 	                }
// 	            }, 
// 	            error => this.errorMessage = <any>error
// 	        ); 
// 	}

//客户经理列表
	customerList:any=[]
	employList:any
	queryAllStaff(){
		this.customerManageService.queryAllStaff(null) 
	        .subscribe(
	            partlist => {
	                if(partlist.status==0){
	                    this.customerList=partlist.data;
	                    
	                }else{
	                	if(partlist.msg){
	                		alert(partlist.msg);
	                	}
	                 
	                }
	               
	            },  
	            error => this.errorMessage = <any>error
			); 
	}

// 失去焦点
	noSection(company:any){
		this.default.employmentId =''
		// this.default.organizationShortName = '' 
		company.value=''
	}
}
