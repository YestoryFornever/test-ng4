import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { Order,OrderCondition } from '../../classes/audit-item';
import { OrderListService } from '../../services/coin-commodity-exchange-audit.service';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
//import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
//import { VersionManagementService } from './services/version-management.service';
@Component({
	selector: 'coin-wait-send',
	templateUrl: './audit-details.component.html',
	styleUrls: ['./audit-details.component.scss'],
	providers:[
		OrderListService
	]
//	providers: [VersionManagementService]
})
export class AuditDetailsComponent { 
	
	height= 'auto';
	errorMessage:any ;
	// res:any={};
	info:any={};
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private orderListService:OrderListService,
		private router:Router,
	){}	
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let goodsExchangesId = params['goodsExchangesId'];
			let statusCode = params['statusCode'];
			let userName = params['userName'];
			let phone = params['phone'];
			this.default.goodsExchangesId = goodsExchangesId;
			this.default.status = statusCode;
			this.default.userName = userName;
			this.default.phone = phone;
			// 通过
			this.passInfo.goodsExchangesId =goodsExchangesId;
			// 拒绝
			this.unPassInfo.goodsExchangesId =goodsExchangesId;
			this.complateInfo.goodsExchangesId =goodsExchangesId;
			this.sendInfo.goodsExchangesId = goodsExchangesId;
		})
		this.getInfo();
		this.getOperateLog();
		this.getCompany();

	};
	// userName:any;
	default:any={ 
		goodsExchangesId:"",
		status:"",
		userName:'',
		phone:"",

	};	


	// 确定跳转那个页面
	getInfo(){
		//console.log(this.default);
		this.orderListService.CoodSexChagesInfo(this.default)
	        .subscribe( 
	            successInfo =>{
	            	console.log(successInfo)
	            	if(successInfo['status'] =="0"){
						this.info = successInfo['data'];
						console.log(this.info);
						if(!this.info.logisticName){
							this.info.logisticName = "圆通快递";
						};
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );

	}
	logList:any;
	
	// 获取操作日志记录
	getOperateLog(){
		this.orderListService.operateLog(this.default)
	        .subscribe( 
	            res =>{
	              	if(res['status'] =="0"){

	              		this.logList = res['data'];
	              	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 去list 页面
	// toList(){
	// 	this.router.navigate(['../../../audit-details',{goodsExchangesId:order.goodsExchangeId,statusCode:order.statusCode,userName:order.userName,phone:order.phone}],{relativeTo:this.activatedRoute});
	// }
	// 通过申请
	passInfo:any={
		goodsExchangesId:0,
		receiptName: "",
		goodsType:"",
		receiptAddress:"",
		receiptPhone:"",
		// receiptName: this.info.receiptName,
		// goodsType:this.info.goodsType,
		// receiptAddress:this.info.receiptAddress,
		// receiptPhone:this.info.receiptPhone,

	};
	// 显示弹窗
	showBox(alertBox:any){
		for (var i in this.passInfo) {
			if(i!="goodsExchangesId"){
				this.passInfo[i] = this.info[i];
			}
			
		}
		if(this.passInfo.goodsType =="实体"){
			this.passInfo.goodsType ="101";

		}
		if(this.passInfo.goodsType =="虚拟"){
			this.passInfo.goodsType ="102";
			
		}
		// //console.log(this.passInfo);

		if(!this.passInfo.receiptName  || !this.passInfo.receiptPhone){
			alert("请填写完整信息");
			return false;
		}
		if(this.passInfo.goodsType =="实体" && !this.passInfo.receiptAddress){
			alert("请填写完整信息");
			return false;
		}
		alertBox.show();

	}
	passMsg:any;
	// 通过申请
	passRequest(alertBox:any){
		// //console.log(this.passInfo);
		this.orderListService.passApply(this.passInfo)
	        .subscribe( 
	            res =>{
	              	if(res['status'] =="0"){
	              		this.default.status ="102";
						this.getInfo();
						this.getOperateLog();

	              	}
	              	if(res['msg']){
	              		alert(res['msg']);
	              	}
	              
	              	alertBox.hide();

	            },
	            error => this.errorMessage = <any>error
	        );
	};
	// 拒绝申请的信息
	unPassInfo:any={
		goodsExchangesId:"",	
		reason:"",	

	};

	// 拒绝申请
	unPassAlert(unPass:any){
		
		unPass.show();


	}
	// 拒绝申请请求
	unPassRequest(alertBox:any){
		if(this.unPassInfo.reason == ""){
			alert("请填写正确信息");
			return false;
		}
		this.orderListService.refuse(this.unPassInfo)
	        .subscribe( 
	            res =>{
	              	if(res['status'] =="0"){
	              		this.default.status ="103";
	              		alert("拒绝申请成功");
	              		alertBox.hide();
						this.getInfo();
						this.getOperateLog();

	              	}else{
	              		alert(res['msg']);
	              	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	cancle(alertBox:any){
		alertBox.hide();
		this.unPassInfo.reason="";
	}
	// 返回
	getBack(){
		this.router.navigate(['../coin-commodity-exchange-audit'],{relativeTo:this.activatedRoute});
	}
	// 字典ID
	companyObj:any ={
        businTypeID:'LOGISTICS_COMPANY'
    }
	KuaiDis:any;
	// 获取物流商
	getCompany(){
		this.orderListService.company(this.companyObj)
	        .subscribe( 
	            res =>{
	            	//console.log(res)
	            	if(res['status'] =='0'){
	            		this.KuaiDis = res['data'];
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	sendInfo:any ={
		goodsExchangesId:"",
		receiptName:"",	
		receiptAddress:"",	
		receiptPhone:"",
		logisticName:'',
		logisticCode:"",
		goodsType:"",

	};
	// 确认发货 弹窗
	sureBoxShow(showbox:any ){
		for (var i in this.sendInfo) {
			if(i!="goodsExchangesId"){
				this.sendInfo[i]=this.info[i];
			}
		}
		if(this.sendInfo.goodsType =="实体"){
			this.sendInfo.goodsType ="101";
			for (let i in  this.sendInfo) {

				if( !this.sendInfo[i]){
					alert("请填写完整信息");
					return false;
				}

			}
		}
		if(this.sendInfo.goodsType =="虚拟"){
			this.sendInfo.goodsType ="102";
		}
		console.log(this.sendInfo)
		showbox.show();
	}
	// 确认发货
	sureSend(alertbox:any){
		this.orderListService.confirmSend(this.sendInfo)
	        .subscribe( 
	            res =>{
	            	//console.log(res)
	            	 if(res['status'] =='0'){
	            	 	if(this.sendInfo.goodsType == '102'){
	            	 		this.default.status = "105";
	            	 	}else if(this.sendInfo.goodsType == '101'){
	            	 		this.default.status = "104";
	            	 	}
	            	 	alertbox.hide();
	            	 	this.getInfo();
						this.getOperateLog();

	            	 	// this.KuaiDis = res['data'];
	            	 }
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 更改信息 
	changSendInfo(alertbox:any){
		this.orderListService.changeOrderInfo(this.sendInfo)
	        .subscribe( 
	            res =>{
	            	//console.log(res)
	            	 if(res['status'] =='0'){

	            	 	alert(res['msg']);
	            	 	alertbox.hide();
	            	 	this.getInfo();
						this.getOperateLog();

	            	 	// this.KuaiDis = res['data'];
	            	 }
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	complateInfo:any={
		goodsExchangesId:'',
		receiptName:'',
		receiptAddress:'',
		receiptPhone:'',
		logisticName:'',
		logisticCode:'',
		goodsType:'',

	}
	// 确认完成
	sureComplateBox(alertbox:any){
		for (var i in this.complateInfo) {
			if(i!="goodsExchangesId"){
				this.complateInfo[i]=this.info[i];
			}
		}
		if(this.complateInfo.goodsType =="实体"){
			this.complateInfo.goodsType ="101";
		}
		if(this.complateInfo.goodsType =="虚拟"){
			this.complateInfo.goodsType ="102";
		}
		alertbox.show();
		console.log(this.complateInfo)
	}
	sureComplate(alertbox:any){
		this.orderListService.confirmFinish(this.complateInfo)
	        .subscribe(
	            res =>{
	            	//console.log(res)
	            	 if(res['status'] =='0'){
	            	 	this.default.status = "105";
	            	 	alert(res['msg']);
	            	 	alertbox.hide();
	            	 	this.getInfo();
						this.getOperateLog();

	            	 	// this.KuaiDis = res['data'];
	            	 }
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	showTable(table:any){
		this.getCompanyInfo();
		setTimeout(function () {
			// body...
			let tableList= <HTMLInputElement[]><any>document.getElementsByName("wuLiuShang");
			// console.log(table)
			tableList[0].hidden = !tableList[0].hidden;
		},10)

	}
	companyInfo:any ={
		logisticName:'',
		logisticCode:""

	}
	companyList:any=[];
	// 获取物流信息
	getCompanyInfo(){
		// this.companyInfo.logisticName = this.info.logisticName;
		this.companyInfo.logisticName = this.info.logisticName;
		this.companyInfo.logisticCode = this.info.logisticCode;
		// this.companyInfo.logisticCode = '807873890660';
		console.log(this.companyInfo)
		this.orderListService.companyInfo(this.companyInfo)
	        .subscribe(
	            res =>{
	            	console.log(res)
	            	 if(res['status'] =='0'){
	            	 	this.companyList = res['data']['traces'];
	            	 	if(this.companyList.length==0){
	            	 		alert(res['data']['reason']);
	            	 	}
	            	 }else{
	            	 	alert(res['msg'])
	            	 }
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 跳转 金币 详情页面
	toCoinDetail(phoneNum:any){
		// //console.log(phoneNum);
		this.router.navigate(['../../../../../coin-gold-detail/coin-list',phoneNum],{relativeTo:this.activatedRoute});
	};
	setLogName(){
	}
}