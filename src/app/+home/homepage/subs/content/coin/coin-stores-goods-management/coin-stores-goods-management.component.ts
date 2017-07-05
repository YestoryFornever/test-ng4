import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';//
import { DomSanitizer } from '@angular/platform-browser';
import {CalendarModule,PickListModule} from 'primeng/primeng';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { StoresGoodsServices } from './services/stores-goods.services'

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'coin-stores-goods-management',
	templateUrl: './coin-stores-goods-management.component.html',
	styleUrls: ['./coin-stores-goods-management.component.scss'],
	providers: [
	       StoresGoodsServices
         // ExcelExportService
	    
	]
})
export class CoinStoresGoodsManagementComponent {
	color = '#fff';
    height = '312px';

    msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private storesGoodsServices:StoresGoodsServices,
        // private excelExportService:ExcelExportService,
        private activatedRoute:ActivatedRoute,
        private sanitizer: DomSanitizer,
        private calendarModule: CalendarModule,
        private router:Router,
        ){}
	//初始化
	ngOnInit(){
	    this.getGoodsOnlineList();
	    this.getGoodsNameList();
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
		this.getGoodsOnlineList();
		
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
		this.getGoodsOnlineList();
		
		// this.onSearch();
	}; 



    // 上架商品列表变量
    storesLists:any=[];
    errorMessage: any;
    msgNumber:any;
    page:any;
    // index:any;

    default:any={
    	pageNum:1,
      	pageSize:10,
		isEnabled:"1",
	

    };
    onSubmit(){
    	this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getGoodsOnlineList();
    }
    // 获取上架商品列表
    getGoodsOnlineList(){
    	console.log(this.default);
    	this.maxNum=0;
    	this.storesGoodsServices.goodsOnlineList(this.default)
	        .subscribe( 
	            storesLists =>{
	                if(storesLists.status==0){
	                    for(let i in storesLists.data.list ){
	                    	// this.index=i;
	                        if(storesLists.data.list[i].isEnabled){
	                                storesLists.data.list[i].isEnabled="正常";
	                                this.maxNum++;
	                        }else{
	                                storesLists.data.list[i].isEnabled="已下架";
	                        }
	                        
	                    }
	                    // console.log(storesLists);
	                    this.page = storesLists.data.page;
	            		this.totalItems = this.page.totalResult;
	                    this.storesLists=storesLists.data.list;
	              
	                }else{
	                	alert(storesLists.msg);
	                }
	            },
	            error => this.errorMessage = <any>error
	        );
	}

	//下架 商品
	goodsDownId:any;
	getGoodsDownId(showBox:any,goodsDownId:any){
	  showBox.show();
	  // console.log(goodsDownId);
	  this.goodsDownId=goodsDownId;//赋值给全局变量
	}
	goodsIdDown(close:any){
	  let oo={
	    goodsOnlineId:this.goodsDownId
	  }
	  console.log(oo)
	 // debugger
	  this.storesGoodsServices.goodsDownlineList(oo)
	        .subscribe(
	            msg => {
	                if(msg.status=="0"){
	                  alert("下架成功");
	                  close.hide();
	                  this.getGoodsOnlineList();//刷新页面
	                }else{
	                	alert(msg.msg);
	                    close.hide();
	                }
	            },
	            error => this.errorMessage = <any>error,

	    );
	}
	//获取商品名称和ID
	goodsNameLists:any;
	getGoodsNameList(){

		 this.storesGoodsServices.goodsNameList(null)
	        .subscribe(
	            goodsName => {
	                if(goodsName.status=="0"){
	                  console.log(goodsName)
	                  this.goodsNameLists=goodsName.data
	                }
	            },
	            error => this.errorMessage = <any>error,
	    );
	};
	// 弹框出现
	showBox(alertShow:any){
		for (var i in this.addGoods) {
			this.addGoods[i]="";
		}
		this.myStartTime="";
		this.myEndTime="";
		alertShow.show();
	}

	// 添加商品
	addGoods:any={
		goodsId:"",
		total:"",
		validdateStart:"",
		validdateEnd:"",
	};
	myStartTime:any;
	myEndTime:any;
	addGoodsNameList(goodsShow:any,addGoods:any){
		if(addGoods.goodsId==""){
			alert("请选择上架商品名称");
			return false;
		}
		if(addGoods.total<0){
			alert("输入数量有误");
			return false;
		}
		if(this.myStartTime){
			addGoods.validdateStart = Date.parse(this.myStartTime);

		}else{
			alert("请填写时间");
			return false;

		}
		if(this.myEndTime){
			addGoods.validdateEnd = Date.parse(this.myEndTime);
		}else{
			alert("请填写时间");
			return false;

		}
		if(addGoods.validdateEnd<addGoods.validdateStart){
			alert("请确保结束时间大于开始时间");
			return false;

		}

		console.log(addGoods);
		this.storesGoodsServices.goodsOnlineAdd(addGoods)
	        .subscribe(
	            addGoods => {
	            	console.log(addGoods)
	                if(addGoods.status=="0"){
	                  alert("商品添加成功");
	                  goodsShow.hide();
	                  this.getGoodsOnlineList();//刷新页面
	                  // this.goodsNameLists=addGoods.data
	                }else{
	                	alert(addGoods.msg);
	                    // goodsShow.hide();
	                  // this.getGoodsOnlineList();//刷新页面

	                }
	            },
	            error => this.errorMessage = <any>error,
	    )
	};

	// 上架商品排序
	orderList:any={
		goodsOnlineId : "",
		displayOrder : "",
		name : "",
	};
	maxNum:any=0;
	// 排序弹框出现
	goodsOrder(orderShow:any,list:any){
		this.orderList.displayOrder ="";
		orderShow.show();
		console.log(list)
		for (var i in list) {
			if(i=="goodsOnlineId"){
				this.orderList.goodsOnlineId = list[i];
			}
			if(i=="name") {
				this.orderList.name = list[i];
			}

		}


		// console.log(this.orderList);
	};
	order(close:any){
		if(this.orderList.displayOrder>this.maxNum){
			alert("输入序号不正确，请重新输入");
			return false;
		}
		console.log(this.orderList);
		this.storesGoodsServices.updateOrder(this.orderList)
	        .subscribe(
	            addGoods => {
	            	if(addGoods.status=="0"){
	            		alert("排序成功");
	            		this.maxNum =0;
	            		close.hide();
	                  	this.getGoodsOnlineList();//刷新页面

	            	}else{
	            		alert(addGoods.msg);
	            		this.maxNum =0;
	            		close.hide();
	            	}
	                // this.storesLists=addGoods.data;

	            },
	            error => this.errorMessage = <any>error,
	    )
	}





}