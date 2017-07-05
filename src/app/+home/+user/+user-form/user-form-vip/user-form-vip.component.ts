import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserFormService } from '../services/user-form.service'

@Component({
	selector: 'user-form-vip',
	templateUrl: './user-form-vip.component.html',
	styleUrls: ['./user-form-vip.component.scss'],
	providers: [UserFormService]
})
export class UserFormVipComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userFormService:UserFormService,
        		private router:Router) {}
	ngOnInit(){
		this.selVipServiceList()
		this.getCodeDataList()
		this.getSerStatueList()
	};
	addTo(id:any,name:any){
		this.router.navigate(['../user-form-vipEdit',id,name],{relativeTo:this.activatedRoute}); 
	}


	errorMessage:any
	default:any={
		serviceName:'',
		serviceType:'1',
	}
// 查询服务类别
	sertype:any=[]
	getCodeDataList(){
		var obj={
			codeindexKey:'10001'
		}
		this.userFormService.getCodeDataList(obj)
		.subscribe(
				result =>{  
						if(result.status==0){
							if(result.data){
								this.sertype = result.data.list
							}
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
			)
	}
// 查询服务状态
	serStatue:any=[]
	getSerStatueList(){
		var obj={
			codeindexKey:'10002'
		}
		this.userFormService.getCodeDataList(obj)
		.subscribe(
				result =>{  
						if(result.status==0){
							if(result.data){
								this.serStatue = result.data.list
							}
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
			)
	}
// 查询vip服务列表
	vipList:any=[]
	selVipServiceList(){
		// if(this.default.groupGrpNm==''){
		// 	this.default.groupGrpNm=undefined
		// }
		this.userFormService.selVipServiceList(this.default).subscribe(
			result => {  
						if(result.data){
							if(result.data.list.length!=0){
								this.vipList = result.data.list ;
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
// 新曾服务
	addVip:any={
		serviceName:'',
		serviceType:'',
		status:''
	}
	saveVipService(add:any){
		if(this.addVip.serviceName==''){
			alert("请填写服务名称")
			return false
		}
		if(this.addVip.serviceType==''){
			alert("请选择服务类型")
			return false
		}
		if(this.addVip.status==''){
			alert("请选择服务状态")
			return false
		}
		this.userFormService.saveVipService(this.addVip).subscribe(
			result => {  
							if(result.status==0){
								alert("添加成功！")
								this.selVipServiceList()
								add.hide()
								this.addVip={
									serviceName:'',
									serviceDsc:'',
									serviceTp:'',
									status:''
								}
							}else if(result.status==2){
								alert("名称重复，请修改")
								return false
							}else{
								if(result.msg){
									alert(result.msg);
								}
								
								this.hideList = false;
								this.hideLoad = true;
								this.addVip={
									serviceName:'',
									serviceDsc:'',
									serviceTp:'',
									status:''
								}
							}								
						},

			error => {	this.errorMessage = error;
				alert("服务器连接失败！")
						this.hideLoad = true;
        				this.hideList = false;
						}
			);	
			this.addVip={
									serviceName:'',
									serviceDsc:'',
									serviceTp:'',
									status:''
								}	
	}
// 修改弹窗读取值
	changeVip:any={
		serviceId:'',
		serviceName:'',
		serviceType:'',
		status:''
	}
	changeGp(change:any,gp:any){
		this.changeVip.serviceId = gp.serviceId
		this.changeVip.serviceName = gp.serviceName
		this.changeVip.serviceType = gp.serviceType
		this.changeVip.status = gp.status
		change.show()
	}
	saveChange(changeGroup:any){
		this.userFormService.updateVipService(this.changeVip).subscribe(
			result => {  
							if(result.status==0){
								alert("保存成功！")
								this.selVipServiceList()
								changeGroup.hide()
							}else if(result.status==2){
								alert("名称重复，请修改")
								return false
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
	checkVip:any={
		serviceId:''
	};
	public deleteVipShow = function(userVe:any,gp:any){
		userVe.show()
		this.checkVip.serviceId=gp.serviceId
		
	}
 deleteVip(changeGroup:any){
		this.userFormService.deleteVipService(this.checkVip).subscribe(
			result => {  
							if(result.status==0){
								alert("删除成功！")
								this.selVipServiceList()
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
		this.selVipServiceList()
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
		};
		return classes;
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