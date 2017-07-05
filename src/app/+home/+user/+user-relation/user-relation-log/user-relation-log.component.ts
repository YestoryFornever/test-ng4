import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router ,Params}   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserRelationService } from '../services/user-relation.service'

@Component({
	selector: 'user-relation-log',
	templateUrl: './user-relation-log.component.html',
	styleUrls: ['./user-relation-log.component.scss'],
	providers: [UserRelationService]
})
export class UserRelationLogComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userRelationService:UserRelationService,
        		private router:Router) {}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let name =  params['name'];
			this.ID = id;
			this.Name = name
		})
		  this.userList()
	};
	ID:any
	Name:any
	returnTo(){
		this.router.navigate(['../../../user-relation-list'],{relativeTo:this.activatedRoute}); 
	}
// 查询用户日志
userCon:any={
	userId:'',
	pageNum:'1',
	pageSize:'10',
}
errorMessage:any
userLists:any =[]
  userList(){
  this.userCon.userId = this.ID
  	 this.userRelationService.getUserCalendarList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.userLists=partlist.data.list;
                    this.totalItems = partlist.data.page.totalResult
                    console.log(this.userLists)
                }else if(partlist.status==-5){
					console.log('session已超时')
				}else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
  }
	// addTo(){
	// 	this.router.navigate(['../user-form-vipEdit',"111"],{relativeTo:this.activatedRoute}); 
	// }
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
	public itemsPerPage:number =10;
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
		this.userCon.pageSize=this.itemsPerPage;
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		this.userCon.pageSize=this.itemsPerPage;
		this.totalPages = event;
		// this.turnFirst();
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.userCon.pageNum = event.page;	
		this. userList()
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