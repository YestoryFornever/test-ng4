import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserFormService } from '../services/user-form.service'

@Component({
	selector: 'user-form-list',
	templateUrl: './user-form-list.component.html',
	styleUrls: ['./user-form-list.component.scss'],
	providers: [UserFormService]
})
export class UserFormListComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userFormService:UserFormService,
        		private router:Router) {}
	ngOnInit(){
		this.groupList()
		this.getCodeDataList()
	};

	newsId:number
	toDetial(id:any,name:any){
		this.newsId=111;
		// console.log(newId);
	   this.router.navigate(['../user-form-edit',id,name],{relativeTo:this.activatedRoute}); 
	}

	default:any={
		groupGrpNm:'',
		groupTp:'9',
		pageNum:'1',
		pageSize:'10',
	}
	errorMessage:any
	// 查询用户组类别
	sertype:any=[]
	getCodeDataList(){
		var obj={
			codeindexKey:'10003'
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
	// 查询用户组列表
	group:any=[]
	groupList(){
		// if(this.default.groupGrpNm==''){
		// 	this.default.groupGrpNm=undefined
		// }
		this.userFormService.selVipGroupList(this.default)
		.subscribe(
			result => {  
						if(result.data){
							if(result.data.list){
								this.group = result.data.list ;
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

	// 修改弹窗读取值
	changeCon:any={
		groupGrpid:'',
		groupGrpNm:'',
		groupTp:'',
		groupDsc:''
	}
	changeGp(change:any,gp:any){
		this.changeCon.groupGrpid = gp.groupGrpid
		this.changeCon.groupGrpNm = gp.groupGrpNm
		this.changeCon.groupTp = gp.groupTp
		this.changeCon.groupDsc = gp.groupDsc
		change.show()
	}
	saveChange(changeGroup:any){
		this.userFormService.updateMsgGroup(this.changeCon).subscribe(
			result => {  
							if(result.status==0){
								alert("保存成功！")
								this.groupList()
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
		changeGroup.hide()
	}
	// 新增用户组
	addGroup:any={
		groupGrpNm:'',
		groupDsc:'',
		groupTp:'',
	}
	saveGroup(add:any){
		if(this.addGroup.groupGrpNm==''){
			alert("请填写组名称")
			return false
		}
		if(this.addGroup.groupDsc==''){
			alert("请填写备注")
			return false
		}
		if(this.addGroup.groupTp==''){
			alert("请选择组类型")
			return false
		}
		this.userFormService.saveGroup(this.addGroup).subscribe(
			result => {  
							if(result.status==0){
								alert("添加成功！")
								this.groupList()
								add.hide()
								this.addGroup={
									groupGrpNm:'',
									groupDsc:'',
									groupTp:'',
								}
							}else if(result.status==2){
								alert("名称重复，请修改")
								return false
							}else{
								if(result.msg){
									alert(result.msg);
								}
								this.addGroup={
									groupGrpNm:'',
									groupDsc:'',
									groupTp:'',
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
	// 批量删除
	checkGroup:any=[];
	public deleteGp = function(userVe:any){
		this.checkGroup=[]
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.checkGroup.push({groupGrpid:this.group[i].groupGrpid});
		 			listState[i].parentNode;
				}
			}
			console.log(this.checkGroup)
			if(this.checkGroup.length<=0){
				alert("请先选择删除项")
				return false
			}else{
				userVe.show();	
			}
		
	}
 deleteGroup(changeGroup:any){
 	var obj={
 		groupGrpid:''
 	}
 	obj.groupGrpid = this.checkGroup
		this.userFormService.deleteGroup(this.checkGroup).subscribe(
			result => {  
							if(result.status==0){
								alert("删除成功！")
								this.groupList()
								changeGroup.hide()
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
		this.groupList()
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
}