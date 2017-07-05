import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule  } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserBackServices }  from '../../services/user-back.services';
import { ActivatedRoute, Router }   from '@angular/router';

@Component({
	selector: 'user-back-list',
	templateUrl: './user-back-list.component.html',
	styleUrls: ['./user-back-list.component.scss'],
	providers: [UserBackServices]
})
export class UserBackListComponent implements OnInit{ 
	height = '440px';
	
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private userBackServices:UserBackServices,
				private activatedRoute:ActivatedRoute,
        		private router:Router

        		){};

	ngOnInit(){
		this.getUserBackList();
		// this.getShareList();
	};
	myStartTime:any;
	myEndTime:any;
	default={
		pageNum:1,
		pageSize:10,
		loginName:"",
		userName:"",
		feedbackState:"",
		startTime:"",
		endTime:"",
		sortType:"",
		orderBy:"",
		

	};
	onSubmit(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getUserBackList();
	}
	// 获取用户反馈列表
	userBackList:any=[];
	errorMessage: string; 
	page:any;
	tempToTime(temp:any){

        return new Date( temp ).toLocaleString().split("/").join("-"); 
 
    }
    makeTemp(time:any){

        return  (Date.parse(time));
    }
    // 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	getUserBackList(){
		this.default.startTime = "";
		this.default.endTime ="";

		if(this.myStartTime){
			// if(this.myEndTime ){
				this.default.startTime = this.myStartTime.split("-").join("");//处理时间
				// this.default.startTime = this.makeTemp(this.default.startTime);
			// }
			// else{
			// 	alert("请输入正确时间");
			// 	return false;
			// }
			
		}
		if(this.myEndTime){
			// if(this.myStartTime ){
				this.default.endTime = this.myEndTime.split("-").join("");
				// this.default.startTime = this.makeTemp(this.default.startTime);
			// }
			// else{
			// 	alert("请输入正确时间");
			// 	return false;
			// }
			// var end = this.default.endTime;
			//this.default.endTime = this.myEndTime.split("-").join("");

			// this.default.endTime = this.makeTemp (this.default.endTime);
		}
		if(this.default.endTime && this.default.startTime){
			if(( parseInt(this.default.endTime) - parseInt(this.default.startTime) )<0){
				alert("请输入正确时间");
			}	
		}
		
		this.default.loginName = this.trim( this.default.loginName );
        this.default.userName = this.trim( this.default.userName );

		this.userBackServices.userFeedbackList(this.default)
	        .subscribe( 
	            userBackList =>{
	            	if(userBackList.status=="0"){

						for (var i in userBackList.data.list) {
							if(userBackList.data.list[i].feedbackState ==''){
								userBackList.data.list[i].feedbackState = "全部";
							}
							if(userBackList.data.list[i].feedbackState =='1'){
								userBackList.data.list[i].feedbackState = "待处理";
							}
							if(userBackList.data.list[i].feedbackState =='2'){
								userBackList.data.list[i].feedbackState = "已忽略";
							}
							if(userBackList.data.list[i].feedbackState =='3'){
								userBackList.data.list[i].feedbackState = "已采纳";
							}
							
							
						}

	            		this.page = userBackList.data.page;
	            		this.totalItems = this.page.totalResult;
	            		this.userBackList = userBackList.data.list;
	            	}else{
	            		alert("获取信息失败");
	            	}
	                console.log(userBackList);
	                
	                
	            },
	            error => this.errorMessage = <any>error
	        );
	}

	
	// 接受参数 传递到详情页面
	check(backID:any,userID:any){
		
		
	   this.router.navigate(['../user-back-detail',backID,userID],{relativeTo:this.activatedRoute}); 
	};
	//导出excel
	excelInfo:any= {
		userName:"",
		loginName:"",
		feedbackState:"",
		startTime:"",
		endTime:"",

	};
	exportUserLogExcel(query:any){
		for(let key in this.excelInfo){
			this.excelInfo[key] = query[key];
		}
		console.log(this.excelInfo)
	    this.userBackServices.exportExcle(this.excelInfo) 
	        .subscribe(
	            res => {
	            	console.log( res )
	                // this.res= res;
	                if(res.status==0){
	                    // res=this.res;

	                    window.location.href=res.data;
	                    alert(res.msg);
	                }else{
	                    if(res){
	                        alert(res.msg);
	                    }
	                }
	            },
	            error => this.errorMessage = <any>error
	    );
	}
// 分页
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
		this.getUserBackList();
		
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst()
		this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	
	public pageNumChange(event:any,allcheck:any){
		
		this.default.pageSize = this.itemsPerPage;
		// this.getUserBackList();
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		// this.getUserBackList();
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNum = event.page;
		this.getUserBackList();
		
		// this.onSearch();
	}; 




}