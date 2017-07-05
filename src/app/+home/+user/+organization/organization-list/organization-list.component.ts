import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetUserService } from '../../../../common/net-services/net-user.service'
import {INCONFIG} from '../../../../public/in.config';
import { TypeAhead } from '../../../../common/class/typeahead.ts';

@Component({
	selector: 'organization-list',
	templateUrl: './organization-list.component.html',
	styleUrls: [
				'./organization-list.component.scss',
				'../../../../common/scss/typical-list/condition.scss',
				'../../../../common/scss/typical-list/header.scss',
				'../../../../common/scss/typical-list/order.scss',
				'../../../../common/scss/typical-list/table.scss',
				],
	// providers:[NetCrmService]
})
export class OrganizationListComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netUserService:NetUserService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {
		this.fullnameTypeAhead = new TypeAhead();
	}
	ngOnInit(){
			this.fullnameTypeAhead.source = Observable.create((observer:any) => {

	     	this.netUserService
		        .getOrganizationListByFullName({value:this.ObjUserOrgListCon.orgFullName})
		        .then((res:any)=>{
						observer.next(res.data);
				}).catch(function(err){
						var arr=[];
						observer.next(arr);
				})
		   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
			this.cn = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
			this.getOrgCategory1List()
			this.getOrgStateList()
			this.getProviceList()
			this.turnFirst()
	}
	cn:any
	fullnameTypeAhead:any
	errorMessage:any
	orgIdefty:any=[{name:'用户目标机构',id:'1'},{name:'发债机构',id:'2'},{name:'外汇交易中心成员',id:'3'},{name:'承分销资质',id:'4'},{name:'评级机构',id:'5'},{name:'其他机构',id:'6'}]
	positionList:any=[]
	pageParams:any={
			maxSize:5,
			totalItems:0,
			currentPage:1,
			itemsPerPage:30,
			totalPages:1,
		}
	ObjUserOrgListCon:any={
		orgFullName:'',
		orgState:'',
		orgArea:'',
		orgClass1:'',
		orgClass2:'',
		cur_page:'',
		show_count:'',
	}

	provice:any=''
	city:any=''
	getPro(event:any){
		console.log(event)
	}
// 查询机构分类1-2
	OrgCategory1List:any=[]
	OrgCategory2List:any=[]
	getOrgCategory1List(){
		this.netUserService.getOrgCategory1List(null)
		.then((res:any)=>{
			this.OrgCategory1List = res.data;
		},error => this.errorMessage = error)
	}
	getOrgCategory2List(){
		this.OrgCategory2List=[]
		this.netUserService.getOrgCategory2List({cid:this.ObjUserOrgListCon.orgClass1})
		.then((res:any)=>{
			if(res.data){
				this.OrgCategory2List = res.data;
			}else{
				this.OrgCategory2List=[]
			}
		},error => this.errorMessage = error)
	}
	changeOrgClass1(){
		this.ObjUserOrgListCon.orgClass2=''
		if(this.ObjUserOrgListCon.orgClass1){
			this.getOrgCategory2List()
		}else{
			this.OrgCategory2List=[]
		}	
	}
// 查询机构状态
	OrgStateList:any=[]
	
	getOrgStateList(){
		this.netUserService.getOrgStateList(null)
		.then((res:any)=>{
			this.OrgStateList = res.data;
		},error => this.errorMessage = error)
	}
	
//查询机构所在地
	proviceList:any=[]
	CityList:any=[]
	getProviceList(){
		this.netUserService.getProviceList(null)
		.then((res:any)=>{
			this.proviceList = res.data;
		},error => this.errorMessage = error)
	}
	getCityList(){
		this.CityList=[]
		this.netUserService.getCityList({pid: this.provice})
		.then((res:any)=>{
			this.CityList = res.data;
		},error => this.errorMessage = error)
	}
	proviceChange(){
		this.city=''
		if(this.provice){
			this.getCityList()
		}else{
			this.CityList=[]
		}
		
	}
// 查询机构列表
	orgType:any='1'
	changeCompany(){

	}
	orgsOnSelect(){

	}
	getOrgList(){
		if(this.provice==''){
			this.ObjUserOrgListCon.orgArea = this.city
		}else{
			this.ObjUserOrgListCon.orgArea = this.provice
		}
		this.ObjUserOrgListCon.cur_page = this.pageParams.currentPage
		this.ObjUserOrgListCon.show_count = this.pageParams.itemsPerPage
		switch (this.orgType) {
			case "1":
				this.getObjUserOrgList()
				break;
			case "2":
				this.getBondOrgList()
				break;
			case "3":
				this.getCfetsOrgList()
				break;
			case "4":
				this.getDistributorOrgList()
				break;
			case "5":
				this.getRatingOrgList()
				break;
			case "6":
				this.organizationList=[]
				break;
			default:
				// code...
				break;
		}
	}
	public turnFirst(){
		this.pageParams.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getOrgList();

	}
		// this.default.pageNumber = this.pageParams.currentPage
		// this.default.pageSize = this.pageParams.itemsPerPage
	//10获取目标用户机构列表
	getObjUserOrgList(){
		this.netUserService.getObjUserOrgList(this.ObjUserOrgListCon)
		.then((res:any)=>{
			this.organizationList = res.data.list
			this.pageParams.totalItems = res.data["total"];
		},error => this.errorMessage = error) 
	}
	//11获取发债机构列表
	getBondOrgList(){
		this.netUserService.getBondOrgList(this.ObjUserOrgListCon)
		.then((res:any)=>{
			this.organizationList = res.data.list
			this.pageParams.totalItems = res.data["total"];
		},error => this.errorMessage = error)
	}
	// 12获取外汇交易中心成员列表
	getCfetsOrgList(){
		this.netUserService.getCfetsOrgList(this.ObjUserOrgListCon)
		.then((res:any)=>{
			this.organizationList = res.data.list
			this.pageParams.totalItems = res.data["total"];
		},error => this.errorMessage = error)
	}
	// 13获取承分销资质列表
	getDistributorOrgList(){
		this.netUserService.getDistributorOrgList(this.ObjUserOrgListCon)
		.then((res:any)=>{
			this.organizationList = res.data.list
			this.pageParams.totalItems = res.data["total"];
		},error => this.errorMessage = error)
	}
	// 14获取评级机构列表
	getRatingOrgList(){
		this.netUserService.getRatingOrgList(this.ObjUserOrgListCon)
		.then((res:any)=>{
			this.organizationList = res.data.list
			this.pageParams.totalItems = res.data["totalResult"];
		},error => this.errorMessage = error)
	}
		// 排序
	Order(ord:any,type:any){
		// this.listCon.orderby = ord+' '+type
		// if(this.is_tip ==1){
		// 	this.turnFirst()
		// }else{
		// 	this.listVideo()
		// }
	}
	organizationList:any=[]
	// 修改状态
	onChange(event:any,position:any){
		// this.positionStatue.state = event.currentValue*1
		// this.positionStatue.positionId = position.positionId*1
		// this.updateState()
	}
	// 修改名称弹窗
	orgs:any=[]
	oldOrganizationFullName:any
	upDateOrtgNameCon:any={
		organizationId:'',
		organizationFullName:'',
	}
	nameReplay:any=false
	changeOrganizationFullName(){
		this.orgs=[]
		this.netUserService
		        .getOrganizationListByFullName({value:this.upDateOrtgNameCon.organizationFullName})
		        .then((res:any)=>{
		        	if(res.data){
		        		for(var i in res.data){
		        			if(this.upDateOrtgNameCon.organizationFullName==res.data[i].organizationFullName){
		        				this.nameReplay=true
		        			}else{
		        				this.nameReplay=false
		        			}
							this.orgs.push({label:res.data[i].organizationFullName,value:res.data[i].organizationFullName})
			        	}
		        	}else{
		        		this.nameReplay=false
		        	}
				}).catch(function(err){
						this.orgs=[];
						this.nameReplay=false
				})
	}
	upDateOrtgNameShow(win:any,organization:any){
		this.upDateOrtgNameCon.organizationId = organization.organizationId
		this.oldOrganizationFullName = organization.organizationFullName
		win.show()
	}
	// 跳转到详情
	turnToDetial(id:any){
		// if(id){
		// 	this.router.navigate(['../contact-edit',id],{relativeTo:this.activatedRoute});
		// }else{
			this.router.navigate(['../organization-detial',id],{relativeTo:this.activatedRoute});
		// }
	}
}
