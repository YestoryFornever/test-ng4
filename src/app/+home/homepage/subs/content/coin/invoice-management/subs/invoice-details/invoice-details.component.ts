import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ActivatedRoute, Router,Params }   from '@angular/router';

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { InvoiceManagementService } from '../../services/invoice-management.service';

@Component({
	selector: 'invoice-wait-send',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.scss'],
	providers:[
		InvoiceManagementService
	]

})
export class InvoiceDetailsComponent { 
	
	height= 'auto';
	errorMessage:any ;

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private invoiceManagementService:InvoiceManagementService,
		private router:Router,
	){}	


	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let invoiceId = params['invoiceId'];
			this.default.invoiceId = invoiceId;
			this.passInfo.invoiceId = invoiceId;
			this.sendInfo.invoiceId = invoiceId;
			this.unPassInfo.invoiceId = invoiceId;
		})
		this.getInvoiceInfo();
		this.getCompany();
	};
	default:any={
		invoiceId:'',
	}
	infoList:any={
		companyMail:"",
		contactPhone:"",
		department:"",
		invoiceFee:"",
		invoiceHeader:"",
		invoiceId:"",
		invoiceOrderNo:"",
		invoiceStatus:"",
		logisticFeeType:"",
		organizationName:"",
		logisticName:"圆通快递",
		phone:"",
		position:"",
		receiptAddress:"",
		receiptName:"",
		receiptPhone:"",
		userName:"",
		workAddress:"",
		workPhone:"",
	};
	getInvoiceInfo(){

		this.invoiceManagementService.invoiceInfo(this.default)
	        .subscribe(
	            res => {
	            	if(res['status'] == 0){
	            		this.infoList = res['data'];
	            		// for(let obj in this.infoList){
	            			if(this.infoList['invoiceStatus'] == 100){
	            				this.infoList['invoiceStatus'] = '等待审核';
	            			}
	            			if(this.infoList['invoiceStatus'] == 101){
	            				this.infoList['invoiceStatus'] = '等待发货';
	            			}
	            			if(this.infoList['invoiceStatus'] == 102){
	            				this.infoList['invoiceStatus'] = '拒绝申请';
	            			}
	            			if(this.infoList['invoiceStatus'] == 103){
	            				this.infoList['invoiceStatus'] = '已发货';
	            			}
	            			if(this.infoList['invoiceStatus'] == 104){
	            				this.infoList['invoiceStatus'] = '已完成';
	            			}
	            			this.infoList['logisticName'] = '圆通快递';
	            		// }

	            		this.getOperateLog();

	            	}else{
	            		alert('获取信息失败');
	            	}
	            	console.log(res)

	            },
	            error => this.errorMessage = <any>error,
	    	)
	}
	logList:any;
	// 获取操作日志记录
	getOperateLog(){
		this.invoiceManagementService.operateLog(this.default)
	        .subscribe(
	            res =>{
	              	if(res['status'] =="0"){

	              		this.logList = res['data'];
	              	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 通过申请
	passInfo:any={
		invoiceId:'',
		invoiceHeader : "",
		receiptName:"",
		receiptAddress:"",
		receiptPhone:"",
	};
	showBox(showBox:any){
		this.passInfo.invoiceHeader  = this.trim(this.infoList.invoiceHeader) ;
		this.passInfo.receiptName    = this.trim(this.infoList.receiptName) ;
		this.passInfo.receiptAddress = this.trim(this.infoList.receiptAddress) ;
		this.passInfo.receiptPhone   = this.trim(this.infoList.receiptPhone) ;
		// debugger;

		if(!this.passInfo.receiptPhone ){
			alert('请输入正确的手机号');
			return false;
		}
		if(!this.passInfo.receiptName){
			alert('请输入收件人');
			return false;
		}
		if(!this.passInfo.receiptAddress){
			alert('请输入收件地址');
			return false;
		}
		if(!this.passInfo.invoiceHeader){
			alert('请输入发票抬头');
			return false;
		}
		showBox.show();
	}
	// 通过申请
	passRequest(alertBox:any){
		console.log(this.passInfo)
		this.invoiceManagementService.passApply(this.passInfo)
	        .subscribe(
	            res =>{
	              	if(res['status'] =="0"){
	              		// console.log(res)
						this.infoList.status ="101";//等待发货
						this.getInvoiceInfo();
	              	}
	              	alert(res['msg']);
              		alertBox.hide();

	            },
	            error => this.errorMessage = <any>error
	        );
	};
// 拒绝申请
	unPassInfo:any={
		invoiceId:'',
		reason:'',
	}
	unPassAlert(unPass:any){
		this.unPassInfo.reason = '';
		unPass.show();
	}
	// 拒绝申请请求
	unPassRequest(alertBox:any){
		this.unPassInfo.reason = this.trim(this.unPassInfo.reason);
		if(this.unPassInfo.reason == ""){
			alert("请填写正确信息");
			return false;
		}
		console.log(this.unPassInfo)
		this.invoiceManagementService.refuse(this.unPassInfo)
	        .subscribe(
	            res =>{
	              	if(res['status'] =="0"){
	              		this.infoList.status ="102";
	              		alertBox.hide();
						this.getInvoiceInfo();
	              	}
	              	alert(res['msg']);
	            },
	            error => this.errorMessage = <any>error
	        );
	}

	// 确认发货
	sendInfo:any ={
		invoiceId:"",
		invoiceHeader:"",
		receiptName:"",
		receiptAddress:"",
		receiptPhone:"",
		logisticName:'',
		logisticCode:"",
	};
	// 确认发货 弹窗
	sureBoxShow(showbox:any ){
		for (let i in this.sendInfo) {
			if(i!= 'invoiceId' && i!= 'logisticName'){
				this.sendInfo[i] = this.trim(this.infoList[i]);
				if(this.sendInfo[i]=='' || this.sendInfo[i]=='undefined'){
					alert('请填写完整的信息');
					return false;
				}
			}
		}
		this.sendInfo.logisticName = this.infoList.logisticName;
		// console.log(this.sendInfo)
		showbox.show();
	}
	// 确认发货
	sureSend(alertbox:any){
		this.invoiceManagementService.confirmSend(this.sendInfo)
	        .subscribe(
	            res =>{
	            	if(res['status'] =='0'){
	            	 	this.infoList.status = "103";
	            	 	this.getInvoiceInfo();
	            	}
	            	alert(res['msg']);
	            	alertbox.hide();
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 更改信息
	changSendInfo(alertbox:any){
		this.invoiceManagementService.changeOrderInfo(this.sendInfo)
	        .subscribe(
	            res =>{
	            	 if(res['status'] =='0'){
	            	 	this.getInvoiceInfo();
	            	 }
	            	alert(res['msg']);
	            	alertbox.hide();
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 确认完成
	sureComplate(alertbox:any){
		this.invoiceManagementService.confirmFinish(this.sendInfo)
	        .subscribe(
	            res =>{
	            	//console.log(res)
	            	 if(res['status'] =='0'){
	            	 	this.default.status = "105";
	            	 	this.getInvoiceInfo();
	            	 }
	            	 alert(res['msg']);
	            	 alertbox.hide();
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
		this.companyInfo.logisticName = this.infoList.logisticName;
		this.companyInfo.logisticCode = this.infoList.logisticCode;
		// this.companyInfo.logisticCode = '807873890660';
		console.log(this.companyInfo)
		this.invoiceManagementService.companyInfo(this.companyInfo)
	        .subscribe(
	            res =>{
	            	// console.log(res)
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
	// 去空格
	trim(str:any) { //删除左右两端的空格
		str = str +'';　　
	  return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	// 字典ID
	companyObj:any ={
        businTypeID:'LOGISTICS_COMPANY'
    }
	KuaiDis:any;
	// 获取物流商
	getCompany(){
		this.invoiceManagementService.company(this.companyObj)
	        .subscribe( 
	            res =>{
	            	console.log(res)
	            	if(res['status'] =='0'){
	            		this.KuaiDis = res['data'];
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
}