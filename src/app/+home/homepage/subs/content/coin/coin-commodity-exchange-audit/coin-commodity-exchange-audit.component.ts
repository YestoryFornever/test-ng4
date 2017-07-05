import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import {CalendarModule,PickListModule} from 'primeng/primeng';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { Order,OrderCondition } from './classes/audit-item';
import { OrderListService } from './services/coin-commodity-exchange-audit.service';
@Component({
	selector: 'coin-commodity-exchange-audit',
	templateUrl: './coin-commodity-exchange-audit.component.html',
	styleUrls: [
		'./coin-commodity-exchange-audit.component.scss',
		'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/condition.scss',
		'../../../../scss/pagination.scss'
	],
	providers:[
		OrderListService
	]
})
export class CoinCommodityExchangeAuditComponent implements OnInit{
	errorMsg:string;
	order:Order;
	orders:Order[];
	condition:OrderCondition;
	constructor(
		
		private changeDetectorRef:ChangeDetectorRef,
		private orderListService:OrderListService,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){
		this.order = new Order();
		this.condition = new OrderCondition();

	}

	ngOnInit() {
		this.getOrders();
	 	this.mon = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };
    }
    popTemplate:any
    private IP:string = INCONFIG.getIP()
    // public html:string = `
// <span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;
    mon:any={
        monthNames:[]
    };
	//checkbox
	changeStatus(){
		this.condition.statusOthers();
	}
	changeStatusAll(){
		this.condition.statusAll();
	}
	// 
	getOrders(){
		this.orderListService
			.getOrders(this.condition)
			.subscribe(
				data=>{
					// this.changeDetectorRef.detectChanges();
					this.orders = data["list"];
					if(data["page"]){
						this.condition.totalItems = data["page"]["totalResult"]
					}
					// this.condition.totalItems = data["page"]["totalResult"];
				},
				error=>this.errorMsg = error
			);
	}
	userInfo:any={
		businessCardUrl:'',
		userName:'',
		loginName:'',
		department:'',
		position:''
	}
	html:any
	getUserInfo(id:any){
		var ID={userId:id+''}
		this.orderListService
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
				
				this.userInfo=result.data
				this.html=`<div class="card"><img class="imgCard" src="`+this.userInfo.businessCardUrl+`"></div><div><div class="userTitle">`+this.userInfo.userName+' '+this.userInfo.loginName+`</div><div><div class="userInfo">机构：`+this.userInfo.organizationFullName+`</div><div class="userInfo">部门： `+this.userInfo.department+`</div><div class="userInfo">职位： `+this.userInfo.position+`</div></div></div>`
				},
				error=>this.errorMsg = error
			);
	}
	// getUserProfileInfo
	// 查询
	onSubmit(){
		this.condition.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		// this.condition.itemsPerPage = num;
		this.getOrders();
	}
// 导出
	exportExcelList(){
		// debugger
        let param_status:string;
		if(this.condition.status['all']){
			param_status = '';
		}else{
			let status_arr:string[] = new Array();
			for(let item in this.condition.status){
				if(this.condition.status[item]){
					status_arr.push(item.slice(6));
				}
			}
			param_status = status_arr.join();
		}
		let obj:any ={
			'pageNum':this.condition.currentPage,
			'pageSize':this.condition.itemsPerPage,
			'sortType':'',
			'orderType':'',
			'status':param_status,
			'requestTimeStart':(Date.parse(this.condition.requestTimeStart) ),
			'requestTimeEnd':(Date.parse(this.condition.requestTimeEnd)-0 + 1000*24*3600),
			'orderNumber':this.trim(this.condition.orderNumber),
			'phone':this.trim(this.condition.phone),
		}
		
		if(!obj.requestTimeStart){
			obj.requestTimeStart=''
		}
		if(!obj.requestTimeEnd){
			obj.requestTimeEnd=''
		}
        let str:any ='';
		// console.log( this.order)
        for(let i in obj){
            if(obj[i]==""){
                obj[i]= '';
            }
            str += '&' + i + '=' +obj[i];
        }
        str                  = str.substr(1);
        let url              = this.IP + 'goldcoin/coodsexchages/export?'+str;
        window.location.href = url;
        console.log(url)
	}
	// 去空格
	trim(str:any) { //删除左右两端的空格　　
	  return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	//获取审核详情
	getAuditDetail(order:Order){
		//console.log(order);
		this.router.navigate(['../audit-details',order.goodsExchangeId,order.statusCode,order.userName,order.phone],{relativeTo:this.activatedRoute});
	}

	// 分页
	msgNumbers = [10,20,30,50];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public sizeData(num:number){
		this.condition.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.condition.itemsPerPage = num;
		this.getOrders();
	};
	// 翻页
	public pageChanged(event:any):void {
		//console.log(event);
		this.condition.currentPage = event.page;
		this.getOrders();
	};
	public pageNumChange(event:any){
		this.condition.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.condition.itemsPerPage = pageNo;
	};
}