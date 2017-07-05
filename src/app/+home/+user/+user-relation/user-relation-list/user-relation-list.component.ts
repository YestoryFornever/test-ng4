import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { any } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserRelationService } from '../services/user-relation.service'

@Component({
	selector: 'user-relation-list',
	templateUrl: './user-relation-list.component.html',
	styleUrls: ['./user-relation-list.component.scss'],
	providers: [UserRelationService]
})
export class UserRelationListComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userRelationService:UserRelationService,
        		private router:Router) {}
	ngOnInit(){
		this.postListMsges()
		this.turnFirst()
	};

default:any={
				loginName:'',
				userName:'',	
				organizationName:'',
				departmentName:'',
				pageNum:1,
				pageSize:10,
			}
companylist:any=[];
partlist:any=[];
errorMessage:any
postListMsges(){
 	//公司列表
    this.userRelationService.OrganizationList(null) 
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
    this.userRelationService.DepartmentList(null) 
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
	}

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
	   this.userCon.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{
	    
	    this.userCon.departmentId = e.item.departmentId;
	} 
	toDetial(newsId:any,newsName:any){
		// console.log(newId);
	   this.router.navigate(['../user-relation-detial',newsId,newsName],{relativeTo:this.activatedRoute}); 
	}
// 失去焦点
	blurCompany(cm:any){
		cm.value =''
		this.userCon.organizationId = ""
	}
	blurDepatrment(dep:any){
		dep.value =''
		this.userCon.departmentId = ""
	}
//list状态切换
	public changeState = function(listState:any,userList:any){
		if(listState.checked==true){
			userList.style.background = 'rgb(255, 255, 150)';
		}else{
			userList.style.background = 'rgb(255, 255, 255)';
		}
	
	}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
// 查询用户列表
userCon:any={
	loginName:'',
	userName:'',
	organizationId:'',
	departmentId:'',
	pageNum:'1',
	pageSize:'10',
}
userLists:any =[]
  userList(){
  	 this.userRelationService.queryUserList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.userLists=partlist.data.list;
                    this.totalItems = partlist.data.page.totalResult
                    // console.log(this.userLists)
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
}



// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
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
		this.userList()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		// allcheck.checked = false;
		this.userCon.pageSize=this.itemsPerPage;
		// this.color="#fff"
		this.userList()
		this.totalPages = event;
	}
	// public setPage(pageNo:number):void {
	// 	this.currentPage = pageNo;
	// 	this.userList()
	// };
// 翻页
	pageChanged(event:any):void {
		this.userCon.pageNum = event.page;	
		// allcheck.checked = false;
		// this.color="#fff";
		this.userList()
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
// 跳转
	detialTo(id:any,name:any){
		this.router.navigate(['../user-relation-detial',id,name],{relativeTo:this.activatedRoute}); 
	}
	logTo(id:any,name:any){
		this.router.navigate(['../user-relation-log',id,name],{relativeTo:this.activatedRoute}); 
	}
	plateTo(id:any,name:any){
		this.router.navigate(['../user-relation-plate',id,name],{relativeTo:this.activatedRoute}); 
	}
}