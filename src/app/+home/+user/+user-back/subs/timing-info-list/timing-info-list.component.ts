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
	selector: 'timing-info-list',
	templateUrl: './timing-info-list.component.html',
	styleUrls: ['./timing-info-list.component.scss'],
	providers: [UserBackServices]
})
export class TimingInfoListComponent implements OnInit{

	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userBackServices:UserBackServices,
        		private router:Router) {}
	ngOnInit(){
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
			        this.turnFirst();
	}
	type:any={
		all:true,
		inf:false,
		sys:false,
		stMsg:false,
	}
	clickAll(){
		this.type.all=true
		
		this.type.inf= false
		this.type.sys= false
		this.type.stMsg= false
	}
	clickOther(){
		this.type.all= false
	}
	startDate:any
	endDate:any
	en:any
	// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number=1;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.msgInfoList()
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
		this.userCon.pageCount=this.itemsPerPage;
		// this.color="#fff"
		this.msgInfoList()
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.userCon.pageNum = event.page;	
		this.msgInfoList()
	};
errorMessage:any
infoList:any=[]
userCon={
			timingStar:'',
			timingEnd:'',
			wthrTmgSnd:1,
			pshTpid:'14',
			pageNum:1,
			pageCount:10
		}

// 查询消息列表
// type:any={
// 		all:true,
// 		inf:false,
// 		sys:false,
// 		stMsg:false,
// 	}
	msgInfoList (){
		if(this.type.all == true){
			this.userCon.pshTpid = ''
		}else{
			this.userCon.pshTpid=''
			if(this.type.inf){
				this.userCon.pshTpid+='14,'
			}
			if(this.type.sys){
				this.userCon.pshTpid+='15,'
			}
			if(this.type.stMsg){
				this.userCon.pshTpid+='17,'
			}
		}
		this.userCon.timingStar = this.format(this.startDate)
		this.userCon.timingEnd = this.format(new Date(Date.parse(this.endDate)+1000*24*3600))
		this.userCon.pshTpid=this.userCon.pshTpid.substring(0,this.userCon.pshTpid.length-1) 
		this.userBackServices.msgInfoList (this.userCon) 
        .subscribe(
            partlist => {   
            	
                if(partlist.status==0){
                  this.infoList =  partlist.data.msgInfList
                  this.totalItems = partlist.data.Page.totalResult
                  for(var i=0;i<this.infoList.length;i++){
                  	this.infoList[i].sendTime = this.format(new Date(this.infoList[i].sendTime)) 
                  }
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
    turnTo(id:any,listState:any){
		this.router.navigate(['../send-info-detial',id,listState,'2'],{relativeTo:this.activatedRoute}); 
	}
}