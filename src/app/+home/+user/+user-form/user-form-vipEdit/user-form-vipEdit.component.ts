import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserFormService } from '../services/user-form.service'

@Component({
	selector: 'user-form-vipEdit',
	templateUrl: './user-form-vipEdit.component.html',
	styleUrls: ['./user-form-vipEdit.component.scss'],
	providers: [UserFormService]
})
export class UserFormVipEditComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userFormService:UserFormService,
        		private router:Router) {}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let name =  params['name'];
			this.ID = id;
			this.Name = name
		})
		this.groupList(10)
	};
	ID:any
	Name:any
	returnTo(){
		this.router.navigate(['../../../user-form-vip'],{relativeTo:this.activatedRoute}); 
	}
	addTo(id:any,name:any,statue:any){
		this.router.navigate(['../../../user-form-addForm',id,name,statue],{relativeTo:this.activatedRoute}); 
	}
errorMessage:any
// 推荐

recommend(){
	var obj={
		serviceId:this.ID 
	}
	this.userFormService.addServiceUsersFriend(obj).subscribe(
				result => {  
						if(result.status==0){
							alert('推荐成功')
						}
						else{
							if(result.msg){
								alert(result.msg);
							}
						}								
					},

			error => {	this.errorMessage = error;
				alert("服务器连接失败！")
						this.hideLoad = true;
        				this.hideList = false;
						}
			);
	
}
serviceType:any
//查询组成员
group:any=[]
default:any={
	serviceId:'',
	role:10
}
	groupList(X:any){
		// debugger
		this.default.serviceId=this.ID
		this.listState = this.default.role = X
		this.userFormService.serviceGroupList(this.default).subscribe(
			result => {  
						if(result.status==0){
							if(result.data.list.length!=0){
								this.serviceType=result.data.list[0].serviceType
								this.group = result.data.list[1] ;
								// this.totalItems = result.data.page.totalResult;
								this.hideList = false;
								this.hideLoad = true;
							}
						}
						else{
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
	checkVip:any={
		serviceId:'',
		groupId:'',
		role:''
	}

	public deleteVipShow = function(userVe:any,gp:any){
		userVe.show()
		this.checkVip.groupId=gp.groupGrpid;
	}
 deleteVip(changeGroup:any){

		this.checkVip.serviceId =this.ID;
		this.checkVip.role =this.listState
		this.userFormService.deleteServiceGroup([this.checkVip]).subscribe(
			result => {  
							if(result.status==0){
								alert("删除成功！")
								this.groupList(this.listState)
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
		// this.serch()
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
		// this.default.pageSize=this.itemsPerPage;
		// this.color="#fff"
		// this.serch()
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		// this.default.pageNum = event.page;	
		// allcheck.checked = false;
		// this.color="#fff";
		// this.serch()
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
//tab
	listState:any = 0;
	public get(event:any):void {
		if(event.heading=="VIP用户组"){	
			this.listState = 10;
			this.groupList(10)
		}
		if(event.heading=="推荐用户组"){
			this.listState = 11;
			this.groupList(11)
		}
	};
	upDateList(){
		if(this.listState == 10){
			this.groupList(10)
		}
		if(this.listState == 1){
			this.groupList(11)
		}
	}
	format(format:any){
		if(format){
			format = new Date(format)
				 var args = {
	           	   Y: format.getFullYear(),
	               M: format.getMonth() + 1,
	               d: format.getDate(),
	               h: format.getHours(),
	               m: format.getMinutes(),
	               s: format.getSeconds(),
	           	};

	           	if(args.M<10){
	           		args.M=0+''+args.M
	           	}
	           	if(args.d<10){
	           		args.d=0+''+args.d
	           	}
	           	if(args.h<10){
	           		args.h=0+''+args.h
	           	}
	           	if(args.m<10){
	           		args.m=0+''+args.m
	           	}
	           	if(args.s<10){
	           		args.s=0+''+args.s
	           	}
	           
	           	format = args.Y+'-'+ args.M +'-'+args.d
	           
	  }         
	 	return  format        
	}	
}