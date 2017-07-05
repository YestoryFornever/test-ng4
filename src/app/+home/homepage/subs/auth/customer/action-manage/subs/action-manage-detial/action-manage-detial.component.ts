import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';

import {CustomerManageService} from '../../../services/customer-manage.service';

@Component({
	selector: 'action-manage-detial.component',
	templateUrl: './action-manage-detial.component.html',
	styleUrls: ['./action-manage-detial.component.scss'],
	providers: [CustomerManageService]
})
export class ActionManageDetialComponent implements OnInit{

	constructor(private changeDetectorRef:ChangeDetectorRef,
		private customerManageService:CustomerManageService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}
	
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.id=id
		})
		this.getActionRecordText()
		this.getBaseActionInfo()

	}
	id:any
	listState:any = 1;
	actRecList:any=[];
	actReqList:any=[];
	ProPicList:any=[]
	public get(event:any):void {
		if(event.heading=="行动记录"){
			this.actDetial.recordType = '1';//无法同时修改当前页和每页总数
			this.getActionRecordText()
			this.actRecList=this.actDealList
		}
		if(event.heading=="业务需求"){
			this.actDetial.recordType = '2';//无法同时修改当前页和每页总数
			this.getActionRecordText()
			this.actReqList=this.actDealList
		}
		if(event.heading=="产品需求"){
			this.actDetial.recordType = '3';//无法同时修改当前页和每页总数
			this.getActionRecordText()
			this.ProPicList=this.actDealList
		}
		if(event.heading=="图片记录"){	
			this.getPictureByActionId();
		}
		// if(event.heading=="举报"){
		// 	this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		// 	this.getListTip();
		// 	this.listState = 5;
		// }
		// if(event.heading=="管理员处理"){
		// 	this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		// 	this.getListManage();
		// 	this.listState = 6;
		// }

	};
	errorMessage:any
	actionDetial:any={
		loginName:'',
		userName:'',
		followPersons:'',
		organizationFullName:'',
		deptName:'',
		receiver:'',
		actionType :'',
		startTime:'',
		endTime:'',
	}
// 行动详情-行动记录
	getBaseActionInfo(){
		var obj={
			actionId:''
		}
		obj.actionId = this.id
		 this.customerManageService.getBaseActionInfo(obj) 
	        .subscribe(
	            actionList => {
	            	
	                if(actionList.status==0){
	                    this.actionDetial = actionList.data
	                    // console.log( this.actionDetial )
	                }else{
	                	if(actionList.msg){
	                		 alert(actionList.msg);
	                	}
	                }
	            }, 
	            error => this.errorMessage = <any>error
	        ); 
	}
// 行动详情-文字记录
		actDetial:any={
			actionId:'',
			recordType:'1'
		}
		actDealList:any=[]
	getActionRecordText(){

		this.actDetial.actionId = this.id
		 this.customerManageService.getActionRecordText(this.actDetial) 
	        .subscribe(
	            actionList => {
	            	 console.log(actionList)
	                if(actionList.status==0){
	                    this.actDealList = actionList.data
	                   // this.actRecList=this.actDealList
	                }else{
	                	if(actionList.msg){
	                		 alert(actionList.msg);
	                	}
	                }
	            }, 
	            error => this.errorMessage = <any>error
	        ); 
	}
// 行动详情-图片记录
	picList:any={
		thumbImgPath1:'',
		thumbImgPath2:'',
		thumbImgPath3:'',
		thumbImgPath4:'',
		imgPath1:'',
		imgPath2:'',
		imgPath3:'',
		imgPath4:'',
	}
	getPictureByActionId(){
		var obj={
			actionId:''
		}
		obj.actionId = this.id
		 this.customerManageService.getPictureByActionId(obj) 
	        .subscribe(
	            actionList => {
	            	
	                if(actionList.status==0){
	                    this.picList = actionList.data
	                    console.log( this.actionDetial )
	                }else{
	                	if(actionList.msg){
	                		 alert(actionList.msg);
	                	}
	                }
	            }, 
	            error => this.errorMessage = <any>error
	        ); 
	}
// 跳转
	toChange(){
	   this.router.navigate(['../../action-manage-list'],{relativeTo:this.activatedRoute}); 
	}
}
