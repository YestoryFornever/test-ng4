import { Component,enableProdMode,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate,AfterViewChecked } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from '../../sns/sns-management-services/sns-management.services';

@Component({
	selector: 'bad-list',
	templateUrl: './bad-list.component.html',
	styleUrls: ['./bad-list.component.scss'],
	providers: [SnsManagementService]
})
export class BadListComponent implements OnInit,AfterViewChecked{
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){	
		this.end_time = this.getDeauftDate('today')
		this.clust_time = this.getDeauftDate('today')
		// console.log(this.clust_time )
		this.getinfoList()
		this.dateToSer = (new Date()).getTime()
	}
	ngAfterViewChecked(){
		this.default.time_begin = this.clust_time+' 00:00'
		this.default.time_end = this.clust_time+' 23:59'
		// this.default.time_end = this.getTomorrowNews(this.clust_time)+' 09:00'
		this.changeDetectorRef.detectChanges();
	}
	change(){
		// this.default.time_begin = this.clust_time+' 08:00'
		// this.default.time_end = this.getTomorrowNews(this.clust_time)+' 09:00'
	}
	// 查询资讯列表
	// 获取列表
	index:number
	error:any;
	infoList:any=[];
	page:any;
	source:any;
	new:any;
	del:any;
	tip:any;
	category:any;
	clust_time:any;
	end_time:any;
	errorMessage:any;
	default:any = {
	   		// category:0,
			time_begin:'',
			time_end:'',
			cur_page:1,
			category:0,
			orderby:'bad_point desc',
			show_count:20
	   }

	getDeauftDate(td:any){
		// debugger
		var day = new Date();
		if(td=='today'){
			 day = new Date();
		}else{
			var today = new Date()
			 day = new Date(Date.parse(today+'')-1000*3600*24);
		} 
	  		 var Year = 0;
	  		 var Month = 0;
	  		 var Day = 0;
			 var CurrentDate = '';
			 var MonthString = '';
			 var DayString = '';
	 	//初始化时间
	  		 Year = day.getFullYear();
	  		 Month = day.getMonth()+1;
	   		 Day = day.getDate();
	   		 if(Month<10){
	   		 	MonthString ='0'+Month
	   		 }else{
	   		 	MonthString =''+Month
	   		 }
	   		 if(Day<10){
				DayString = '0'+ Day
	   		 }else{
	   		 	DayString = ''+ Day
	   		 }
		var dateTime = Year+'-'+MonthString+'-'+DayString
		return dateTime
	}
	getTimeNews(val:any){
		var day =new Date(val);
		 var Year = 0;
	  		 var Month = 0;
	  		 var Day = 0;
			 var CurrentDate = '';
			 var MonthString = '';
			 var DayString = '';
	   //初始化时间
	  		 Year       = day.getFullYear();
	  		 Month      = day.getMonth()+1;
	   		 Day        = day.getDate();
	   		 if(Month<10){
	   		 	MonthString ='0'+Month
	   		 }else{
	   		 	MonthString =''+Month
	   		 }
	   		 if(Day<10){
				DayString = '0'+ Day
	   		 }else{
	   		 	DayString = ''+ Day
	   		 }
	  var  	 dateTime = Year+'-'+MonthString+'-'+DayString
	   return dateTime
	}
	 dateToSer:any
	elary(){
		this.dateToSer = Date.parse(this.clust_time)

		this.dateToSer = this.dateToSer-3600*24*1000
		// this.end_time = this.getTimeNews(this.dateToSer)
		this.clust_time = this.getTimeNews(this.dateToSer)
		this.turnFirst()
	}
	last(){
		this.dateToSer = Date.parse(this.clust_time)

		this.dateToSer = this.dateToSer+3600*24*1000
		// this.end_time = this.getTimeNews(this.dateToSer)
		this.clust_time = this.getTimeNews(this.dateToSer)
		this.turnFirst()
	}
	noData:any=false
	getinfoList(){
			this.default.time_begin = this.clust_time+' 00:00'
			this.default.time_end = this.clust_time+' 23:59'
			var date = ''
			this.hideList = true;
			this.hideLoad = false;
			// console.log(this.default)
			
		// console.log(this.default)
		this.snsManagementService.getinfoList(this.default)
									.subscribe(
									infoList => {  
													// console.log(infoList)
													if(infoList.status==0){
														this.infoList=infoList.data.list;
														 this.totalItems = infoList.data.page.totalResult
														this.hideList = false;
														this.hideLoad = true;
														this.noData = false
													}else if(infoList.status=='010002'){
														this.hideList = false;
														this.hideLoad = true;
														this.noData = true
													}
													else{
														this.infoList=[];
														if(infoList.msg){
															alert(infoList.msg);
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
									this.checkDefult()
	}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
	checkDefult(){
		
	}
// 分页
	msgNumbers = [{Number:'20'},{Number:'10'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number =20;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getinfoList()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.default.show_count=this.itemsPerPage;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		this.default.pageSize=this.itemsPerPage;
		this.totalPages = event;
		// this.turnFirst();
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.default.cur_page = event.page;	
		this. getinfoList()
	};
// 类管理
	height:any = "440px"
	hideLoad:any = true
	hideList:any =  true
	show:any
	setLoadClasses() {
		let classes =  {
		    hide: this.hideLoad,      // true
	  	};
		return classes;
	}
	setListClasses() {
		let classes =  {
		    hide: this.hideList,      
		};
		return classes;
	}

	addTP:any=[]

	addTurnPictures(type:any){
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");			
				for(var i =0;i<listState.length;i++){
			 		if(listState[i].checked == true){
						var obj={
							articleType:'3',
							articleTitle:'111',
							articleUrl:'asdasd'
						}
						obj.articleType = type
						obj.articleTitle =  this.infoList[i].title
						obj.articleUrl = this.infoList[i].source_path
						this.addTP.push(obj)
					}
			
				}
						// console.log(this.addTP)
		if(type == '3'){
			this.snsManagementService.addTurnPictures(this.addTP)
		    						.subscribe(
	           									Article =>{
	           										// console.log(Article)
												          if(Article.status ==0){
												          		alert('添加成功')
												          		this.addTP=[] 
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        );  
		}
		if(type == '1'){
			this.snsManagementService.addNegatives(this.addTP)
		    						.subscribe(
	           									Article =>{
	           										// console.log(Article)
												          if(Article.status ==0){
												          		alert('添加成功')
												          		this.addTP=[] 
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        ); 
		}
		  
	}
}