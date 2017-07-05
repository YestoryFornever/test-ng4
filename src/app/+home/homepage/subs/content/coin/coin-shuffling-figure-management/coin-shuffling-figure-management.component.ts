import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import {CalendarModule,PickListModule} from 'primeng/primeng';

import { ShufflingFigureServices } from './services/shuffling-figure.services'

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'coin-shuffling-figure-management',
	templateUrl: './coin-shuffling-figure-management.component.html',
	styleUrls: ['./coin-shuffling-figure-management.component.scss'],
	providers: [
	       ShufflingFigureServices
         // ExcelExportService
	    
	]//注册服务器
})
export class CoinShufflingFigureManagementComponent {
	
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private shufflingFigureServices:ShufflingFigureServices,
		private calendarModule:CalendarModule,
        private sanitizer: DomSanitizer

	){}
	height= '312px';
	color = '#fff';
	page:any;
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}


  ngOnInit(){
		this.getImgList();
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
	//活动图列表
	imageLists:any=[];

	errorMessage:any;

	default:any={
		pageNum:1,
		pageSize:10,
		imageType:'103'
	};
	onSubmit(){
		this.getImgList();
	}
	getImgList(){
		this.maxNum=0;
		this.shufflingFigureServices.configImageList(this.default)
        .subscribe(
            imageList =>{
            	if(imageList.status=="0"){
            		for(let i in imageList.data.list ){
	                    	// this.index=i;
                        if(imageList.data.list[i].isEnabled){
                                this.maxNum++;
                        }
                    }
            		this.page = imageList.data.page;
            		this.totalItems = this.page.totalResult;

            		this.imageLists = imageList.data.list;

            	}else{
            		alert(imageList.msg);
            	}
                console.log(imageList);
            },
            error => this.errorMessage = <any>error
        );
	}
	//活动图开关
	list:any={
		isEnabled:'',
		configImageId:'',
	};
	changeOnOff(list:any){

		let alertInfo ="";
		list.isEnabled = !list.isEnabled;
		this.list.isEnabled = list.isEnabled+"";
		this.list.configImageId = list.configImageId+"";
		console.log(this.list.isEnabled);
		
		if(this.list.isEnabled =="true"){
			this.list.isEnabled = "1";
			alertInfo ="开启";

		}
		if(this.list.isEnabled =="false"){
			this.list.isEnabled = "0";
			alertInfo ="关闭";

		}
		// list.isEnabled = !list.isEnabled;
		console.log(this.list);
		// debugger;
		this.shufflingFigureServices.configOnOff(this.list)
	        .subscribe( 
	            imageList =>{
	            	if(imageList.status=="0"){
	            		alert(imageList.msg);
	            		if(alertInfo =="开启"){
	            			// this.getImgList();//刷新页面
	            			this.maxNum++;
	                		console.log(imageList);

	            		}
	            		if(alertInfo =="关闭"){
	            			this.maxNum--;
	            		}
	            		// debugger;
	            		this.getImgList();//刷新页面
	            	}else{
	            		alert(imageList.msg);
	            		list.isEnabled = !list.isEnabled;

	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	maxNum:any=0;
	// 活动图排序
	orderList:any={
		configImageId : "",
		displayOrder : "",
		title : "",
		imageType:'101'
	};
	// 排序弹框出现
	goodsOrder(orderShow:any,list:any){
		this.orderList.imageType = this.default.imageType;
		this.orderList.displayOrder="";
		orderShow.show();
		// console.log(list)
		for (var i in list) {
			if(i=="configImageId"){
				this.orderList.configImageId = list[i];
			}
			if(i=="title") {
				this.orderList.title = list[i];
			}
		}
	};
	// 排序弹框关闭  发送 排序请求
	order(close:any){
		if(this.orderList.displayOrder >this.maxNum){
			alert("输入序列号有误");
			return false;
		}
		if(this.orderList.displayOrder <0){
			alert("输入序列号有误");
			return false;
		}
		this.shufflingFigureServices.configImageSort(this.orderList)
	        .subscribe(
	            orderList => {
	            	if(orderList.status=="0"){
	            		// alert("排序成功");
	            		close.hide();
	                  	this.getImgList();//刷新页面
	            	}else{
	            		// close.hide();
	            	}
	            	alert(orderList.msg);
	            },
	            error => this.errorMessage = <any>error
	    	)
	}
	// 去空格
	trim(str:any) { //删除左右两端的空格　　
	  return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	// 添加 活动图
	// 需要穿的参数
	configImageInfo:any={
	      title:'',
	      linkUrl:'',
	      linkType:'',
	      imageType:'101',
	      validdateStart:'',
	      validdateEnd:'',
	      configImageId:'',

	};
	myStartTime:any='';
	myEndTime:any='';
	configImagePicture:any ;
	//弹框出现
	addOrChange:Boolean = true;

	onShow(name:any,myshow:any,list:any,input:any){
		this.warning = false
		if(input){
			input.value="";
		}
		if(name.innerHTML=="添加活动图") {
			this.addOrChange = true;
		}
		if(name.innerHTML=="修改") {
			this.addOrChange = false;
		}
		if(list){
			for(let i in this.configImageInfo){
				this.configImageInfo[i] = list[i];
			}
			if(list.validdate){
				let start:any = list.validdate.split("至")[0];
				let end :any = list.validdate.split("至")[1];
				this.myStartTime = new Date(start+'');
				this.myEndTime = new Date(end+'');;
			}
			if(this.configImageInfo.linkType =="无"){
				this.configImageInfo.linkType ='';
			}
			if(this.configImageInfo.linkType =="金币商城页面"){
				this.configImageInfo.linkType ='101';
			}
			if(this.configImageInfo.linkType =="H5页面"){
				this.configImageInfo.linkType ='102';
			}
			this.PictureShow = list.imageUrl;
			this.configImageInfo.imageType = this.default.imageType;

		}
		else{
			this.fileReset();
		}

		myshow.show();
	}
 	onSave(configImageInfo:any,configImagePicture:any,addGift:any){

	    if(this.addOrChange) {// 添加活动图
	      	this.add(configImageInfo,configImagePicture,addGift);
     	}
      	if(!this.addOrChange){//修改活动图
      		this.change(configImageInfo,configImagePicture,addGift);
      	}
}
	// 添加
	add(configImageInfo:any,configImagePicture:any,addGift:any){
		configImageInfo.title = this.trim( configImageInfo.title  );
     	if(configImageInfo.title==""){
 			alert("请填写完整信息");
 			return false;
 		}
 		if(this.myStartTime){
			configImageInfo.validdateStart = Date.parse(this.myStartTime);
		}else{
			alert("请填写时间");
			return false;
		}
		if(this.myEndTime){
			configImageInfo.validdateEnd = Date.parse(this.myEndTime);
		}else{
			alert("请填写时间");
			return false;
		}
		if(configImageInfo.validdateEnd<configImageInfo.validdateStart){
			alert("请确保结束时间大于开始时间");
			return false;
		}
	    if(this.PictureShow==""){
	        alert("请添加图片");
	        return false;
	    }
		this.shufflingFigureServices.configImageAdd(configImageInfo,configImagePicture)
		        .subscribe(
		            msg => {
		                if(msg.status==0){
		                	// console.log(msg)
		                    alert(msg.msg);
		                    addGift.hide();//隐藏弹框
		                    this.fileReset();//清空页面数据
		                    this.getImgList();
		                }else{
		                	alert(msg.msg);
		                    addGift.hide();//隐藏弹框
		                }
		            },
		            error => this.errorMessage = <any>error,
		    	);
	}
	// 修改
	change(configImageInfo:any,configImagePicture:any,addGift:any ){
		if(this.myStartTime){
			configImageInfo.validdateStart = Date.parse(this.myStartTime);
		}else{
			alert("请填写时间");
			return false;
		}
		if(this.myEndTime){
			configImageInfo.validdateEnd = Date.parse(this.myEndTime);
		}else{
			alert("请填写时间");
			return false;
		}
		if(configImageInfo.validdateEnd<configImageInfo.validdateStart){
			alert("请确保结束时间大于开始时间");
			return false;
		}
		this.shufflingFigureServices.configImageUpdate(configImageInfo,configImagePicture)
			        .subscribe(
			            msg => {
			                if(msg.status==0){
			                	console.log(msg)
			                    alert(msg.msg);
			                    addGift.hide();//隐藏弹框
			                    this.fileReset();//清空页面数据
			                    this.getImgList();
			                }else{
			                	alert(msg.msg);
			                    // addGift.hide();//隐藏弹框
			                }
			            },
			            error => this.errorMessage = <any>error,
			    	);
	}

/******LOGO上传************/
//LOGO上传
  PictureShow:any;
  picValue:any;
  fileChange(input:any,thumbnail:any,event:any){
    this.picValue= input;
    console.log(event.currentTarget.value)
    // this.configImageInfo.logourl = '';
    if(input.files[0]){
      this.PictureShow = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(input.files[0]));
      this.configImagePicture = input.files[0];
    }
  }
//清空LOGO
  cancelLogo(change:any){
    this.fileReset();
    change.hide();
  }
  fileReset(){
    this.configImagePicture="";
    this.configImageInfo = {

	      title:'',
	      linkUrl:'',
	      linkType:'',
	      imageType:"101",
	      validdateStart:'',
	      validdateEnd:'',
	      configImageId:'',

    }
	this.configImageInfo.imageType = this.default.imageType;
    this.myStartTime ="";
    this.myEndTime ="";
    this.PictureShow="";
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
		this.getImgList();
		
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
		this.getImgList();
	};
	deleted(id:any){
		var obj={
			configImageId:id
		}
		this.shufflingFigureServices.deleted(obj)
			        .subscribe(
			            msg => {
			                if(msg.status==0){
			                	alert('删除成功')
			                	this.getImgList()
			                }else{
			                	alert(msg.msg);
			                    // addGift.hide();//隐藏弹框
			                }
			            },
			            error => this.errorMessage = <any>error,
			    	);
	}
	warning:any
	dangerInfo:any
approveUrl(){
	var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
	
	 if(!reg.test(this.configImageInfo.linkUrl)){
	 	if(this.configImageInfo.linkUrl){
	 		this.dangerInfo = '这网址不是以http://https://开头，或者不是网址';
	 	}
	 	else{
	 		this.dangerInfo = '请输入跳转链接'
	 	}	
	 		
 		this.warning = true;
 	}else{
 		this.warning = false;
 	}
}

}