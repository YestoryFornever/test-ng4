import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserCommunicationService } from '../../services/user-communication-services'

@Component({
	selector: 'user-communication-detial',
	templateUrl: './user-communication-detial.component.html',
	styleUrls: ['./user-communication-detial.component.scss'],
	providers: [UserCommunicationService]
})
export class UserCommunicationDetialComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userCommunicationService:UserCommunicationService,
        		private router:Router) {}
ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id1 = params['id1'];
			let name1 =  params['name1'];
			let id2 = params['id2'];
			let name2 =  params['name2'];
			this.ID1 = id1;
			this.Name1 = name1;
			this.ID2 = id2;
			this.Name2 = name2;
		})
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.startDate = new Date((new Date()).getTime()-3600*24*1000)
		this.endDate = new Date()
		this.turnFirst()
		
	};
	en:any
	ID1:any
	Name1:any
	ID2:any
	Name2:any
	startDate:any
	endDate:any
	returnTo(){
		this.router.navigate(['../../../../../user-communication-relation',this.ID1,this.Name1],{relativeTo:this.activatedRoute}); 
	}
	turnTo(){
		this.router.navigate(['../user-communication-list'],{relativeTo:this.activatedRoute}); 
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
		this.querygpMessgeList()
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
		 this.querygpMessgeList()
	};
	turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.userCon.pageNum = 1
		this.changeDetectorRef.detectChanges();
		this.querygpMessgeList()
	}
	errorMessage:any
	ListFriend:any =[]
	ListNotice:any=[]
	ListBlack:any=[]
	userCon:any={
		userId1:'',
		userId2:'',
		startTime:'',
		endTime:'',
		pageNum:1,
		pageSize:10,
	}
format (format:any) {
	if(format){
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
       format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
	}
   return format;
};
  userLists:any =[]
  querygpMessgeList(){
  	this.userCon.startTime = this.format(this.startDate)
  	this.userCon.endTime = this.format(this.endDate)
  		this.userCon.userId1=this.ID1,
		this.userCon.userId2=this.ID2,
  	 this.userCommunicationService.querygpMessgeList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.userLists=partlist.data.msgList;
                    // for(var index =0;index<this.userLists.length;index++){
                    // 	this.userLists[index].createTime=this.format(new Date(this.userLists[index].createTime))
                    // }
                    this.totalItems = partlist.data.page.totalResult

                    // console.log(this.userLists)
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

}