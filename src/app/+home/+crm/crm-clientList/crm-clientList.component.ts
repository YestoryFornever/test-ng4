import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../common/net-services/net-crm.service'
import {INCONFIG} from '../../../../public/in.config';


@Component({
	selector: 'crm-clientList',
	templateUrl: './crm-clientList.component.html',
	styleUrls: [
				'./crm-clientList.component.scss',
				'../../../common/scss/typical-list/table.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/order.scss',
				],
	// providers: [VideoManagementService]
})
export class ClientListComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){
		this.queryUserList()
	}
	errorMessage:any
	hasError:any
	customerList:any=[]
	queryUserList(){
		this.netCrmService.queryUserList(null)
		.then((res:any)=>{
			if(res.status==0){
				// debugger
				this.customerList = res.data
			}else{
				alert(res.msg)
			}
			
		},error => this.errorMessage = error)
	}
// 编辑客户经理弹窗初始化
CustomName:any=''
	editShow(del:any,customer:any){
		this.getPositionList()
		this.getParentUse()
		del.show()
		this.CustomName = customer.userName
		this.editCustomCon.userId = customer.userId
	}
// 获取所有岗位
positionList:any=[]
	getPositionList(){
		this.netCrmService.getPositionList(null)
		.then((res:any)=>{
			if(res.status==0){
				// debugger
				this.positionList = res.data
			}else{
				alert(res.msg)
			}
			
		},error => this.errorMessage = error)
	}
// 获取直属领导数据来源
	parentUseList:any=[]
	getParentUse(){
		this.netCrmService
			.getParentUse(null)
			.then(
				(cates:any) => {
					this.parentUseList = cates.data
				},
				error => this.errorMessage = error
			);
	}
	xxx(yyy:any){
		console.log(this.thisParent);
		// debugger;
	}
parentIsLeaf(havePis:any){
	debugger;
	this.editCustomCon.parentIsLeaf = havePis
	console.log(this.editCustomCon.parentIsLeaf)
}
thisParent:any={}
editCustomCon:any={
	userId:'',
	parentId:'',
	parentIsLeaf:'',
	positionId:'',
	// regions:'',
}
// 编辑客户经理
	editUser(win:any){
		this.editCustomCon.parentId = this.thisParent.parentId
		this.editCustomCon.parentIsLeaf = this.thisParent.parentIsLeaf
		this.netCrmService
		.editUser(this.editCustomCon)
		.then(
			(cates:any) => {
				if(cates.status==0){
				// debugger
				alert('编辑成功');
				win.hide();
				this.queryUserList();
			}else{
				alert(cates.msg);
			}
			},
			error => this.errorMessage = error
		);
	}
// 跳转到详情
	turnToDetial( id:any,name:any ){
		this.router.navigate(['../crm-allocationOrg',id,name],{relativeTo:this.activatedRoute});
	}
// 排序
	Order(ord:any,type:any){
		// this.default.sortType = ord
		// this.default.orderBy = type
		// this.queryUserList()
	}
}