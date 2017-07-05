import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CoinGoldDetailServices }  from '../../services/coin-gold-detail.services';
@Component({
	selector: 'coin-permissions',
	templateUrl: './coin-permissions.component.html',
	styleUrls: ['./coin-permissions.component.scss',
				'../../../../../../scss/typical-list/header.scss',
				'../../../../../../scss/typical-list/table.scss',
				'../../../../../../scss/typical-list/condition.scss',
				'../../../../../../scss/typical-list/order.scss',],
	providers: [CoinGoldDetailServices]
})
export class CoinPermissionsComponent {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private coinGoldDetailServices:CoinGoldDetailServices
	){}
	ngOnInit(){
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.turnFirst();
	}
	en:any;
	errorMessage:any;
	pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:30,
		totalPages:1,
	}
	default:any={
		pageNum:'',
		pageSize:'',
	}
// 获取管理员列表
	managerList:any=[]
	queryUserList(){
		this.coinGoldDetailServices.getmanagerlist(null)
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
// 授权列表
	userList:any=[]
	sendauthList(){
		this.default.pageNum = this.pageParams.currentPage
		this.default.pageSize = this.pageParams.itemsPerPage
		this.coinGoldDetailServices.sendauthList(this.default)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		this.userList = userList.data.list;
	            		this.pageParams.totalItems = userList.data.page["totalResult"];

	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	public turnFirst(){
		this.pageParams.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.sendauthList();

	}
// 新增、编辑授权弹窗
	perEdit:any={
		managerId:'',
		authCoinNumber:'',
		description:'',
	}
	can:any=0;
	having:any=0
	changeManager:boolean=false
	add:any
	addName:any=''
	thisId:any=''
	showEdit(edit:any,list:any){
		this.queryUserList()
		if(list){
			this.add=''
			this.having = list.coinUsedNumber;
			this.can = list.availableCoinNumber;
			this.changeManager = true;
			this.thisId = list.userId;
			this.perEdit.managerId = list.userId;
			this.perEdit.authCoinNumber = list.authCoinNumber;
			this.perEdit.description = list.description;
			this.addName = list.userName
		}else{
			this.add ='add'
			this.can=0;
			this.having=0;
			this.perEdit.managerId ='';
			this.perEdit.authCoinNumber = 0;
			this.perEdit.description = '';
			this.changeManager =false;
		}
		// debugger
		edit.show();
	}
save(edAd:any){
	if(!this.perEdit.authCoinNumber){
		alert('授权发送上限必须大于等于【1】')
		return false;
	}
	if(this.add=='add'){
		if(this.perEdit.managerId==''){
			alert('请选择管理员！');
			return false;
		}
		this.sendauthAdd(edAd);
		this.add =''
	}else{
		this.sendauthUpdate(edAd);
	}

}
// 添加授权
sendauthAdd(edAd:any){
		this.coinGoldDetailServices.sendauthAdd(this.perEdit)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('添加成功')
	            		edAd.hide()
	            		this.sendauthList();
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
// 修改授权
sendauthUpdate(edAd:any){
		this.coinGoldDetailServices.sendauthUpdate(this.perEdit)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('修改成功')
	            		edAd.hide()
	            		this.sendauthList();
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
// 删除授权
delWin(del:any,id:any){
	del.show()
	this.Deleteobj.coinManualSendAuthId =id
	
}
Deleteobj={
		coinManualSendAuthId:''
	}
sendauthDelete(del:any){
		this.coinGoldDetailServices.sendauthDelete(this.Deleteobj)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('删除成功')
	            		del.hide()
	            		this.sendauthList();
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
// 修改发放权限数量
ischangeing:any=false
changeCan(){
		if(this.perEdit.authCoinNumber==0){
			this.can  = 0;
		}
		if(this.perEdit.authCoinNumber>this.having ){
			this.can  = this.perEdit.authCoinNumber - this.having ;
		}
}
ControlMin(){
	// debugger
	// console.log(this.perEdit.authCoinNumber)
	if(this.perEdit.authCoinNumber>9999999){
		this.perEdit.authCoinNumber=9999999
	}
	if(this.perEdit.authCoinNumber<this.having ){
			this.perEdit.authCoinNumber=this.having ;
			this.can = 0
		}else{
			this.can  = this.perEdit.authCoinNumber - this.having ;
		}
}
// 排序
	Order(ord:any,type:any){
		this.default.sortType = ord;
		this.default.orderBy = type;
		this.turnFirst();
	}

}