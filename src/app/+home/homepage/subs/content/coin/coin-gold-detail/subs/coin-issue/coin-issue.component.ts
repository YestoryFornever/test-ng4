import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
//import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
//import { VersionManagementService } from './services/version-management.service';
import { CoinGoldDetailServices }  from '../../services/coin-gold-detail.services';
//
@Component({
	selector: 'coin-issue',
	templateUrl: './coin-issue.component.html',
	styleUrls: ['./coin-issue.component.scss',
				'../../../../../../scss/typical-list/header.scss',
				'../../../../../../scss/typical-list/table.scss',
				'../../../../../../scss/typical-list/condition.scss',
				'../../../../../../scss/typical-list/order.scss',],
	providers: [CoinGoldDetailServices]
})
export class CoinIssueComponent {

height= 'auto';
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private coinGoldDetailServices:CoinGoldDetailServices
	){}
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){
		// console.log($('table'))
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.queryUserList()
		this.turnFirst();
	};
	en:any
	
	page:any;
	detailLists:any=[];
	errorMessage :any ;
	pageParams:any={
		maxSize:5,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:30,
		totalPages:NaN,
	}
	default:any={
		userName:'',
		coinSendType:'',
		createUserId:'',
		pageNum:'1',
		pageSize:'30'
	};
	endDate:any = new Date()
	startDate:any = new Date(Date.parse(this.endDate)-6*24*3600*1000)
	 userInfod:any={
		businessCardUrl:'',
		userName:'',
		loginName:'',
		department:'',
		position:''
	}
	getTwHours(date:any){
		var thisDate:any = new Date(new Date(new Date(date).toLocaleDateString()).getTime()+24*60*60*1000-1)
		return Date.parse(thisDate)
	}
	html:any
	getUserInfo(id:any){
		var ID={userId:id+''}
		this.coinGoldDetailServices
			.getUserProfileInfo(ID)
			.subscribe(
				result=>{
					if(!result.data.businessCardUrl){
						result.data.businessCardUrl='../../../../../../../../../public/images/showCard.jpg'
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
	// 获取管理员列表
	managerList:any=[]
	queryUserList(){
		this.coinGoldDetailServices.getcreateuserlist(null)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		this.managerList = userList.data
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 获取 金币发放记录列表
	getDetailList(){
		if(this.startDate){
			this.default.startTime = this.getTwHours(this.startDate)-1000*3600*24+1
		}else{
			this.default.startTime = this.getTwHours(new Date('1970-01-01'))
		}
		if(this.endDate){
			this.default.endTime = this.getTwHours(this.endDate)
		}else{
			this.default.endTime = this.getTwHours(new Date())
		}
		
		this.default.pageNum = this.pageParams.currentPage
		this.default.pageSize = this.pageParams.itemsPerPage
		this.coinGoldDetailServices.goldRecord(this.default)
	        .subscribe(
	            goldList =>{
	            	if(goldList.status == "0"){
	            		this.detailLists = goldList.data.list;
	            		this.page =  goldList.data.page;
	            		this.pageParams.totalItems = goldList.data.page["totalResult"];
	            		// this.totalItems = this.page.totalResult;
	            	}else{
	            		alert(goldList.msg);
	            	}
	                console.log(goldList);
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	phoneObj:any={
		phone:''	
	};
	userInfo:any={
		data:"",
		msg:"",
		status:"",
	};

	// 获取管理员金币发放数
	ableCoinNumber:any
	availableCoinNumber:any
availablecoin(){
	this.coinGoldDetailServices.availablecoin(null)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		this.ableCoinNumber=userList.data.availableCoinNumber
	            		this.availableCoinNumber=userList.data.availableCoinNumber
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
}
	// 匹配手机号
	getPhoneMsg(){
		console.log(this.phoneObj);

		this.coinGoldDetailServices.matchPhone(this.phoneObj)
	        .subscribe(
	            phoneMsg =>{
	            	if(phoneMsg.status ==0){
	            		this.sendGoldsOnOff = true;
	            		this.userInfo = phoneMsg;
	            	}else{
	            		this.sendGoldsOnOff = false;
	            		this.phoneObj.phone = "";
	            		this.userInfo.data ="无结果";
	            	}
	            	// else{
	            	// 	this.userInfo.
	            	// }
	                console.log(phoneMsg);
	            },
	            error => this.errorMessage = <any>error
	        );
	}


	sendInfo:any ={
		phone:"",
		coinNumber:"",
		// messageTitle:""	,
		messageBody:""	,

	};
	changeNum(value:any){
				// debugger
		if(isNaN(this.sendInfo.coinNumber)){
			this.sendInfo.coinNumber = "";
			// alert('输入有误，请重新输入')
			return ;
		}
		this.disabledBtn = true;
		this.sendInfo.coinNumber = this.sendInfo.coinNumber.replace(',','').toString();
		this.sendInfo.coinNumber = parseInt(this.sendInfo.coinNumber);
		
		let reg = /^\+?(\d|[1-9]\d{1,3}|[5-9]\d{1,2})(\.\d*)?$/;
		if(reg.test(this.sendInfo.coinNumber)){
			this.sendInfo.coinNumber = (this.sendInfo.coinNumber ).toString();
			if(this.sendInfo.coinNumber<1000){
				if((this.ableCoinNumber*1 - this.sendInfo.coinNumber*1)<0){
					this.availableCoinNumber=0;
					this.sendInfo.coinNumber = this.ableCoinNumber.toString()
				}else{
					this.availableCoinNumber = this.ableCoinNumber*1 - this.sendInfo.coinNumber*1
				}
			}

			if(this.sendInfo.coinNumber.length==4){
				if(this.ableCoinNumber>5000){
					if(this.sendInfo.coinNumber>5000){
						this.sendInfo.coinNumber = '5,000';
						this.availableCoinNumber = this.ableCoinNumber*1 -5000
						return false;
					}else{
						if(this.sendInfo.coinNumber>this.ableCoinNumber){
							this.sendInfo.coinNumber = this.ableCoinNumber;
							this.availableCoinNumber=0;
							return false;
						} else{
							this.availableCoinNumber = this.ableCoinNumber*1 - this.sendInfo.coinNumber*1
					} 
					}  
				}else{
					if(this.sendInfo.coinNumber>this.ableCoinNumber){
						this.sendInfo.coinNumber = this.ableCoinNumber;
						this.availableCoinNumber=0;
						return false;
					} else{
						this.availableCoinNumber = this.ableCoinNumber*1 - this.sendInfo.coinNumber*1
					} 
				}
				
				this.sendInfo.coinNumber = this.sendInfo.coinNumber.substr(0,1)+ ',' + this.sendInfo.coinNumber.substr(1)
			}
		}else{
			this.sendInfo.coinNumber = "";
			this.availableCoinNumber = this.ableCoinNumber
		}
			
	}
	changeNum2(value:any){
		this.disabledBtn = true;
		this.ReSendInfo.coinNumber = this.ReSendInfo.coinNumber.replace(',','').toString();
		this.ReSendInfo.coinNumber = parseInt(this.ReSendInfo.coinNumber);
		if(isNaN(this.ReSendInfo.coinNumber)){
			this.ReSendInfo.coinNumber = "";
			// alert('输入有误，请重新输入')
			return ;
		}
		let reg = /^\+?(\d|[1-9]\d{1,3}|[5-9]\d{1,2})(\.\d*)?$/;
		// let reg2 = /(^[1-4]\d{4} | 5000)/;
		if(reg.test(this.ReSendInfo.coinNumber)){
			this.ReSendInfo.coinNumber = (this.ReSendInfo.coinNumber ).toString();
			// console.log(this.sendInfo.coinNumber)
			if(this.ReSendInfo.coinNumber.length==4){
				if(this.ReSendInfo.coinNumber>2000){
					this.ReSendInfo.coinNumber = '2,000';
					return false;
				}
				// console.log(this.sendInfo.coinNumber.substr(0,1) + '==='+ this.sendInfo.coinNumber.substr(1))
				this.ReSendInfo.coinNumber = this.ReSendInfo.coinNumber.substr(0,1)+ ',' + this.ReSendInfo.coinNumber.substr(1)

			}
		}
		else{
			this.ReSendInfo.coinNumber = this.ReSendInfo.coinNumber+'';
			if(this.ReSendInfo.coinNumber.length>4){
				this.ReSendInfo.coinNumber = '2,000';
				// this.sendInfo.coinNumber = this.sendInfo.coinNumber.substr(0,1)+ ',' + this.sendInfo.coinNumber.substr(1,3)
			}
			if(this.ReSendInfo.coinNumber>2000){
				this.ReSendInfo.coinNumber = '2,000';
			}
			// console.log(111)
			// this.sendInfo.coinNumber = this.sendInfo.coinNumber.substr(6);
		// console.log(this.sendInfo.coinNumber.substr(6))

		}
	}
	// 发放金币弹窗出现
	alertShow(alertBox:any){
		this.availablecoin()
		this.infoReset();
		alertBox.show();
	}
	disabledBtn:any = true;//禁用提交按钮
	sendGoldsOnOff:boolean=false;//验证是否匹配手机号
	phoneChange(){
		this.sendGoldsOnOff = false
		this.userInfo.data=''
	}
	// 发放金币
	sendGolds(alertHide:any){
		this.sendInfo.phone = this.phoneObj.phone;
		if(this.sendInfo.phone == ""){
			alert("请输入手机号");
			return false;
		}
		if(this.sendInfo.coinNumber == null || this.sendInfo.coinNumber==''){
			alert("请输入正确的金币数量");
			return false;
		}
		if(this.sendInfo.coinNumber <1){
			alert("请输入正确的金币数量");
			return false;
		}
		this.sendInfo.coinNumber = this.sendInfo.coinNumber.split(',').join('');
		if(this.sendInfo.messageBody == ""){
			alert("请输入内容");
			return false;
		}
		console.log(this.sendInfo);

		if(this.sendGoldsOnOff){
			if(this.disabledBtn){
				this.disabledBtn = false;
				console.log(this.disabledBtn)
				this.coinGoldDetailServices.sendGold(this.sendInfo)
		        	.subscribe(
			            sendData =>{

			            	if(sendData.status==0){

			            		alert(sendData.msg);
			            		alertHide.hide();
			            		this.getDetailList();
			            		// this.infoReset();


			            	}else{
			            		// debugger;
			            		alert(sendData.msg);
			            		// alertHide.hide();
			            	}

			            },
			            error => this.errorMessage = <any>error
			        );
			}
		}else{
			alert('请进行匹配');
		}
	}
	unSubmit(alertHide:any){
		this.infoReset();
		alertHide.hide();
	}
	// 重置
	infoReset(){
		for (let i in this.sendInfo){
			this.sendInfo[i]="";
		}
		this.disabledBtn = true;
		this.userInfo.data="";
		this.phoneObj.phone = "";
	}
// 扣除金币弹窗出现
	alertReShow(alertBox:any){

		this.ReinfoReset();
		alertBox.show();
	}
	ReSendInfo:any ={
		phone:"",
		coinNumber:"",
		// messageTitle:""	,
		messageBody:""	,

	};
	// 重置
	ReinfoReset(){
		for (let i in this.ReSendInfo){
			this.ReSendInfo[i]="";
		}
		this.disabledBtn = true;
		this.userInfo.data="";
		this.phoneObj.phone = "";
	}
		// 扣除
	deduct(alertHide:any){
		this.ReSendInfo.phone = this.phoneObj.phone;
		if(this.ReSendInfo.phone == ""){
			alert("请输入手机号");
			return false;
		}
		if(this.ReSendInfo.coinNumber == null || this.ReSendInfo.coinNumber==''){
			alert("请输入正确的金币数量");
			return false;
		}
		if(this.ReSendInfo.coinNumber <1){
			alert("请输入正确的金币数量");
			return false;
		}
		this.ReSendInfo.coinNumber = this.ReSendInfo.coinNumber.split(',').join('');
		if(this.ReSendInfo.messageBody == ""){
			alert("请输入内容");
			return false;
		}
		console.log(this.ReSendInfo);

		if(this.sendGoldsOnOff){
			if(this.disabledBtn){
				this.disabledBtn = false;
				console.log(this.disabledBtn)
				this.coinGoldDetailServices.deduct(this.ReSendInfo)
		        	.subscribe(
			            sendData =>{

			            	if(sendData.status==0){

			            		alert(sendData.msg);
			            		alertHide.hide();
			            		this.getDetailList();
			            		// this.infoReset();


			            	}else{
			            		// debugger;
			            		alert(sendData.msg);
			            		// alertHide.hide();
			            	}

			            },
			            error => this.errorMessage = <any>error
			        );
			}
		}else{
			alert('请进行匹配');
		}
	}

// 分页
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'40'},{Number:'50'}];


	public turnFirst(){
		this.pageParams.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getDetailList();
	}
// 排序
	Order(ord:any,type:any){
		this.default.sortType = ord
		this.default.orderBy = type
		this.turnFirst()
	}
}