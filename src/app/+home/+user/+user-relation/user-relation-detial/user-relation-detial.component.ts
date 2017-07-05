import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserRelationService } from '../services/user-relation.service'
@Component({
	selector: 'user-relation-detial',
	templateUrl: './user-relation-detial.component.html',
	styleUrls: ['./user-relation-detial.component.scss'],
	providers: [UserRelationService]
})
export class UserRelationDetailComponent implements OnInit{ 
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
		this.getFriendList()
	};
	ID:any
	Name:any
	returnTo(){
		this.router.navigate(['../../../user-relation-list'],{relativeTo:this.activatedRoute}); 
	}
// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		// this.height = Number*40+120+'px';
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.userCon.pageSize = Number;
		this.upDateList()
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		//console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		 this.userCon.pageNum = event.page
		 this.upDateList()
	};
	turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.userCon.pageNum = 1
		this.changeDetectorRef.detectChanges();
		this.upDateList()
	}
//tab
	listState:any = 1;
	public get(event:any):void {
		if(event.heading=="好友"){
			this.listState = 1;
			this.turnFirst()
		}
		if(event.heading=="关注"){
			this.listState= 2;
			this.turnFirst()
		}
		if(event.heading=="黑名单"){
			this.listState  = 3;
			this.turnFirst()
		}
	};

errorMessage:any
ListFriend:any =[]
ListNotice:any=[]
ListBlack:any=[]
userCon:any={
	userId:'',
	pageNum:'1',
	pageSize:'10'
}
  getFriendList(){
  this.userCon.userId = this.ID
  	 this.userRelationService.getFriendList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                	if(partlist.data.list.length!=0){
                		this.ListFriend=partlist.data.list;
                		this.totalItems=partlist.data.page.totalResult
                    	console.log(this.ListFriend)
                	}
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
  getUserBlackList(){
  this.userCon.userId = this.ID
  	 this.userRelationService.getUserBlackList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.ListBlack=partlist.data.list;
                    this.totalItems=partlist.data.page.totalResult
                    console.log(this.ListBlack)
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
  getConcernList(){
  this.userCon.userId = this.ID
  	 this.userRelationService.getConcernList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.ListNotice=partlist.data.list;
                    this.totalItems=partlist.data.page.totalResult
                    console.log(this.ListNotice)
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
	upDateList(){
		if(this.listState == 1){
			this.getFriendList();
		}
		if(this.listState == 2){
			this.getConcernList()
		}
		if(this.listState == 3){
			this.getUserBlackList();
		}
	}
}