import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router ,Params}   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserFormService } from '../services/user-form.service'
@Component({
	selector: 'user-form-addUser',
	templateUrl: './user-form-addUser.component.html',
	styleUrls: ['./user-form-addUser.component.scss'],
	providers: [UserFormService]
})
export class UserFormAddUserComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userFormService:UserFormService,
        		private router:Router) {}
	returnTo(){
		this.router.navigate(['../../../user-form-edit',this.ID,this.Name],{relativeTo:this.activatedRoute}); 
	}
ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let name =  params['name'];
			this.ID = id;
			this.Name = name
		})
		this.postListMsges()
		this.turnFirst()
	};

	ID:any
	Name:any
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
    this.userFormService.OrganizationList(null) 
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
    this.userFormService.DepartmentList(null) 
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
// 失去焦点
	blurCompany(cm:any){
		cm.value =''
		this.default.organizationName=""
		this.default.organizationId=""
	}
	blurDepartment(cm:any){
		cm.value =''
		this.default.departmentName=""
		this.default.departmentId=""
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
	   this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{
	    
	    this.default.departmentId = e.item.departmentId;
	} 
	newsId:number
	toDetial(){
		this.newsId=111;
		// console.log(newId);
	   this.router.navigate(['../user-relation-detial',this.newsId],{relativeTo:this.activatedRoute}); 
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
	// 批量添加
	checkGroup:any=[];
	public AddGp = function(userVe:any){
		this.checkGroup=[]
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.checkGroup.push({groupGrpid:this.ID,userId:this.userLists[i].userId,usrNm:this.userLists[i].userName});
		 			listState[i].parentNode;
				}
			}
			console.log(this.checkGroup)
			if(this.checkGroup.length<=0){
				alert("请先选择添加项")
				return false
			}else{
				userVe.show();	
			}
		
	}
// 添加
	addGroupUser(changeGroup:any){
		this.userFormService.saveGroupUser(this.checkGroup).subscribe(
			result => {  
							if(result.status==0){
								alert("添加成功！")
							}else if(result.status==-5){
								console.log('session已超时')
							}else{
								if(result.msg){
									alert(result.msg);
								}
							}								
						},

			error => {	this.errorMessage = error;
				alert("服务器连接失败！")
						}
			);

		changeGroup.hide()
	}
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
  	 this.userFormService.queryUserList(this.default) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.userLists=partlist.data.list;
                    this.totalItems = partlist.data.page.totalResult
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
		this.default.pageSize = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		this.totalPages = event;
		this.default.pageSize=this.itemsPerPage;
		this.userList()
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
		this.default.pageNum = pageNo
		this.userList()
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNum = event.page;	
		allcheck.checked = false;
		this.userList()
	};
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
}