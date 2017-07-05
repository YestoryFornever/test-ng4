import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserBackServices } from '../../services/user-back.services'
@Component({
	selector: 'send-info-list',
	templateUrl: './send-info-list.component.html',
	styleUrls: ['./send-info-list.component.scss'],
	providers: [UserBackServices]
})
export class SendInfoListComponent implements OnInit{
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userBackServices:UserBackServices,
        		private router:Router) {}
	ngOnInit(){	
		this.turnFirst()
	};
	turnTo(id:any){
		this.router.navigate(['../send-info-detial',id,this.listState,'1'],{relativeTo:this.activatedRoute}); 
	}
	sendTo(){
		this.router.navigate(['../send-info'],{relativeTo:this.activatedRoute}); 
	}
	disabled:any=false
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
		this.userCon.pageCount = Number;
		this.msgInfoList()
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
		 this.msgInfoList()
	};
	turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.userCon.pageNum = 1
		this.changeDetectorRef.detectChanges();
		this.msgInfoList()
	}
//tab
	listState:any = 14;
	public get(event:any):void {
		if(event.heading=="通知栏消息"){
			this.listState = 14;
			this.turnFirst()
		}
		if(event.heading=="系统消息"){
			this.listState= 15;
			this.turnFirst()
		}
		if(event.heading=="短信"){
			this.listState  = 17;
			this.turnFirst()
		}
	};

errorMessage:any
infoList:any=[]
tipList:any=[]
shortmsgList:any=[]
userCon={
			timingStar:'',
			timingEnd:'',
			wthrTmgSnd:0,
			pshTpid:14,
			pageNum:1,
			pageCount:10
		}
// 查询消息列表
	msgInfoList (){
		this.disabled=true
		this.userCon.pshTpid = this.listState
		this.userBackServices.msgInfoList (this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                	
	                if(this.userCon.pshTpid==14){
	                	this.totalItems = partlist.data.Page.totalResult
	                	this.infoList =  partlist.data.msgInfList
	                  for(var i=0;i<this.infoList.length;i++){
	                  	this.infoList[i].sendTime = this.format(new Date(this.infoList[i].sendTime)) 
	                  }
	                }
	                if(this.userCon.pshTpid==15){
	                	this.totalItems = partlist.data.Page.totalResult
	                	this.tipList =  partlist.data.msgInfList
	                  for(var i=0;i<this.tipList.length;i++){
	                  	this.tipList[i].sendTime = this.format(new Date(this.tipList[i].sendTime)) 
	                  }
	                }
	                if(this.userCon.pshTpid==17){
	                	this.totalItems = partlist.data.Page.totalResult
	                	this.shortmsgList =  partlist.data.msgInfList
	                  for(var i=0;i<this.shortmsgList.length;i++){
	                  	this.shortmsgList[i].sendTime = this.format(new Date(this.shortmsgList[i].sendTime)) 
	                  }
	                }
                  this.disabled=false
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
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
	           	// format = args.Y+'-'+ args.M +'-'+args.d
	           format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
}