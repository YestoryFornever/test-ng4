import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { InvoiceManagementService } from './services/invoice-management.service';

@Component({
	selector: 'invoice-management',
	templateUrl: './invoice-management.component.html',
	styleUrls: ['./invoice-management.component.scss'],
	providers:[
		InvoiceManagementService
	]
})
export class InvoiceManagementComponent implements OnInit{
	errorMessage:any;
	color  = '#fff';
	height = '312px';

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private invoiceManagementService:InvoiceManagementService,
		private router:Router,
	){}

	ngOnInit() {
		this.getInvoiceList();
		this.mon = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };
    }
    mon:any={
        monthNames:[]
    };

	default:any={
		pageNum:"1",
		pageSize:"10",
		orderType:"",
		sortType:"",
		invoiceStatus:"",
		requestTimeStart:"",
		requestTimeEnd:"",
		invoiceOrderNo:"",
		phone:"",

	}
	myStartTime:any;
	myEndTime:any;
	invoiceList:any;
	getInvoiceList(){
		this.default.requestTimeStart ="";
		this.default.requestTimeEnd   ="";
		console.log( this.default )
		if(this.myEndTime){
			this.default.requestTimeEnd = this.makeTemp( this.myEndTime)*1 + 1000*24*3600 ;
		}
		if(this.myStartTime){
			this.default.requestTimeStart = this.makeTemp( this.myStartTime)  ;
		}
		this.invoiceManagementService.invoiceList(this.default)
	        .subscribe(
	            res => {
	            	if(res['status'] == 0){
	            		this.invoiceList = res['data']['list'];
	            		this.totalItems  = res['data']['page']['totalResult'];
	            		for(let obj of this.invoiceList){
	            			if(obj['invoiceStatus'] == 100){
	            				obj['invoiceStatus'] = '等待审核';
	            				// console.log(obj['invoiceStatus'])
	            			}
	            			if(obj['invoiceStatus'] == 101){
	            				obj['invoiceStatus'] = '等待发货';
	            				// console.log(obj['invoiceStatus'])
	            			}
	            			if(obj['invoiceStatus'] == 102){
	            				obj['invoiceStatus'] = '拒绝申请';
	            				// console.log(obj['invoiceStatus'])
	            			}
	            			if(obj['invoiceStatus'] == 103){
	            				obj['invoiceStatus'] = '已发货';
	            				// console.log(obj['invoiceStatus'])
	            			}
	            		}
	            	}
	            	console.log(res)

	            },
	            error => this.errorMessage = <any>error,
	    	)
	}
	makeTemp(time:any){
        // var newTime:any = new Date( time );
         // var  temp = (Date.parse(time)/1000) ;
         // var temp2 = (temp + parseInt('57599'))+ '';
        return  (Date.parse(time) );
    }
	//获取审核详情
	getInvoiceDetail(invoiceId:any){
		console.log(invoiceId);
		this.router.navigate(['../invoice-details',invoiceId],{relativeTo:this.activatedRoute});
	}




	// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string    = '首页';
	public lastText:string     = '末页';
	public previousText:string = '<';
	public nextText:string     = '>';
	public maxSize:number      = 5;
	public totalItems:number;
	public itemsPerPage:number = 10;
	public currentPage:number  = 1;
	public totalPages:number;
    public turnFirst(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.getInvoiceList();
        
        
    }
    public sizeData(Number:any){
        this.height = Number*40+40+'px';
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
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
        this.getInvoiceList();
       
        
        // this.onSearch();
    };
   // 名片
	 userInfod:any={
		businessCardUrl:'',
		userName:'',
		loginName:'',
		department:'',
		position:''
	}
	html:any
	getUserInfo(id:any){
		var ID={userId:id+''}
		this.invoiceManagementService
			.getUserProfileInfo(ID)
			.subscribe(
				result=>{
					if(!result.data.businessCardUrl){
						result.data.businessCardUrl='../../../../../../../public/images/showCard.jpg'
					}
					if(!result.data.userName){
						result.data.userName='暂无姓名'
					}
					if(!result.data.loginName){
						result.data.loginName='暂无'
					}
					if(!result.data.department){
						result.data.department='暂无'
					}
					if(!result.data.position){
						result.data.position='暂无'
					}
				
				this.userInfod=result.data
				},
				error=>this.errorMessage = error
			);
	}
}