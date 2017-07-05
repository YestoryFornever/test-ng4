import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserRelationService } from '../services/user-relation.service'



@Component({
	selector: 'user-relation-plate',
	templateUrl: './user-relation-plate.component.html',
	styleUrls: ['./user-relation-plate.component.scss'],
	providers: [UserRelationService]
})
export class UserRelationPlateComponent implements OnInit{ 
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
			this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		})
		this.getSectorStatisticsList()
	};
	ID:any;
	Name:any
	en:any
	thisTime:any = new Date()
	elaryTime:any = new Date(0)
	// 查询用户日志
userCon:any={
	userId:'',
	moudleStr:"'社区','人脉','动态','资讯','资金需求'",
	startDate:this.format(this.elaryTime),
	endDate:this.format(this.thisTime),
}


startDate:any
endDate:any
errorMessage:any
userLists:any =[]

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

    commontList:any=[]
	connection:any=[]
	shareList:any=[]
	newsList:any=[]
	moneyList:any=[]
  getSectorStatisticsList(){
  	this.commontList=[]
	this.connection=[]
	this.shareList=[]
	this.newsList=[]
	this.moneyList=[]
  	if(this.startDate){
  			this.userCon.startDate = this.format(this.startDate)
  	}
  	
  	if(this.endDate){
  		var data = this.endDate.getTime()+1000*3600*24
  		var yesterday =new Date(data) 
  			this.userCon.endDate = this.format(yesterday)
  	}

  	if(this.endDate==null){
  		var  date = new Date()
			this.userCon.endDate = this.format(date)
  	}
  	if(this.startDate==null){
			this.userCon.startDate = this.format(this.elaryTime)
  	}
  this.userCon.userId = this.ID
    // this.userCon.userId = '5203'
  	 this.userRelationService.getSectorStatisticsList(this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                    this.userLists=partlist.data.list;
                    console.log(this.userLists)
                    for(var i=0;i<this.userLists.length;i++){
                    	if(this.userLists[i].moduleName=="社区"){
                    		this.commontList.push(this.userLists[i])
                    	}
                    	if(this.userLists[i].moduleName=="人脉"){
                    		this.connection.push(this.userLists[i])
                    	}
                    	if(this.userLists[i].moduleName=="资讯"){
                    		this.newsList.push(this.userLists[i])
                    	}
                    	if(this.userLists[i].moduleName=="资金需求"){
                    		this.moneyList.push(this.userLists[i])
                    	}
                    	if(this.userLists[i].moduleName=="动态"){
                    		this.shareList.push(this.userLists[i])
                    	}
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


	returnTo(){
		this.router.navigate(['../../../user-relation-list'],{relativeTo:this.activatedRoute}); 
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
	hideLoad:any = true;
	hideList:any =  true;
	hideCommon:any = false;
	hideMoney:any = false;
	show:any
	setLoadClasses() {
	  	let classes =  {
	    hide: this.hideLoad,      // true
	    // show: !this.show, // false
  		};
		return classes;
	}
	setCommonClasses() {
	  	let classes =  {
	    hide: this.hideCommon,      // true
		};
		return classes;
	}
	setMoneyClasses() {
	  	let classes =  {
	    hide: this.hideMoney,      // true
		};
		return classes;
	}
	showOrHide(someth:any){
		// debugger
		if(someth==="commont"){
			this.hideCommon=(!this.hideCommon)
		}
		if(someth==="money"){
			console.log(this.hideCommon)
			this.hideMoney=(!this.hideMoney)
		}
	}
}