import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../common/net-services/net-crm.service'
import { INCONFIG } from '../../../../public/in.config';
import { TypeAhead } from '../../../common/class/typeahead.ts';

@Component({
	selector: 'crm-contactEdit',
	templateUrl: './crm-contactEdit.component.html',
	styleUrls: [
				'./crm-contactEdit.component.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/condition.scss',
				],
	// providers: [VideoManagementService]
})
export class ContactEditComponent implements OnInit{
private UserInfo:any;
	// 省
	provList:any=[{name:"北京",id:'0'},{name:"上海",id:'1'},{name:"天津",id:'2'},{name:"重庆",id:'3'},{name:"河北",id:'4'},{name:"山西",id:'5'},{name:"辽宁",id:'6'},{name:"吉林",id:'7'},{name:"黑龙江",id:'8'},{name:"江苏",id:'9'},{name:"浙江",id:'10'},{name:"安徽",id:'11'},{name:"福建",id:'12'},{name:"江西",id:'13'},{name:"山东",id:'14'},{name:"河南",id:'15'},{name:"湖北",id:'16'},{name:"湖南",id:'17'},{name:"广东",id:'18'},{name:"海南",id:'19'},{name:"四川",id:'20'},{name:"贵州",id:'21'},{name:"云南",id:'22'},{name:"陕西",id:'23'},{name:"甘肃",id:'24'},{name:"青海",id:'25'},{name:"内蒙古",id:'26'},{name:"广西",id:'27'},{name:"西藏",id:'28'},{name:"宁夏",id:'29'},{name:"新疆",id:'30'},{name:"香港",id:'31'},{name:"澳门",id:'32'},{name:"台湾",id:'33'},{name:"其它",id:'34'},{name:"其他地区",id:'35'},{name:"国外机构",id:'36'}]

	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {
				this.fullnameTypeAhead = new TypeAhead();
	}
	ngOnInit(){
			this.activatedRoute.params.forEach((params:Params)=>{
			let id = +params['id'];
			this.ID=id
		});
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
     	this.netCrmService
        .getOrgListByShortName({value:this.default.company})
        .then((res:any)=>{
			if(res.status==0){
				observer.next(res.data)
			}else{
				var arr=[]
				observer.next(arr)
			}
			
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
       if(this.ID){
       	this.querySingleContact()
       }
		this.getOrgCate1();
		this.getOrgInCate1();
		this.getOrgPosition();
		this.getDeps();
	}
	
	ID:any
	cn:any
	fullnameTypeAhead:any
	default:any={
		organizationShortName:''
	}
	获取详情
	detial:any={

	}
	querySingleContact(){
		this.netCrmService
			.querySingleContact(null)
			.then(
				(deps:any) => {
					// debugger;
					this.detial = deps.data;
				},
				error => this.errorMsg = <any>error
			);
	}

/*获取部门*/
deps:any=[]
	getDeps(){
		this.netCrmService
			.getDeps(null)
			.then(
				(deps:any) => {
					// debugger;
					this.deps = deps.data;
				},
				error => this.errorMsg = <any>error
			);
	}

/*公司失焦清空*/
	public blurCompany(el:any,e:any){
		if(!this.default.companyId){
			el.value = "";
			this.default.company = "";
			this.default.organizationFullName=''
			this.default.organizationShortName=''
		}
	}
	public changeCompany(el:any,e:any){
		this.default.companyId = "";
	}
	public orgsOnSelect(e:any):void {
		console.log('设置公司为:', e.value);
		this.default.companyId = e.item.organizationId;
		this.default.organizationFullName = e.item.organizationFullName
		this.default.organizationShortName = e.item.organizationShortName
	}
	public depsOnSelect(e:any):void {
		console.log('设置部门为:', e.value);
		//debugger;
		this.default.department = e.item.departmentName
		this.default.departmentId = e.item.departmentId;
	}	
// 添加机构
	organization:any={
			'organizationFullName':'',
			'organizationShortName':'',
			'organizationCategoryId1':'',
			'organizationCategoryId2':'',
			'province':'',
			'city':'',
			'detailedAddress':'',
			'ifFinancialInstitution':'1',
			'ifBondsInstitution':'2',
			// 'internationClassifyId1':'',
			// 'internationClassifyId2':'1',
			// 'enterpriseNature':'1',		
	}
// 获取机构所在地
	cities:any=[]
	getOrgPosition(){
		this.cities = this.netCrmService.getOrgPosition()			
	}
	public set_city(province:any){ 
		if(province.value==''){
			this.default.city='';
		}
		this.default.province=province.value;
		let pv='';
		let cv=''; 
		pv=province.value; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		city.length=1; 
		if(pv=='0') return; 
		if(typeof(this.cities[pv])=='undefined') return; 
		for(let i=0; i<this.cities[pv].length; i++) { 
			let ii = i+1; 
			city.options[ii] = new Option(); 
			city.options[ii].text = this.cities[pv][i]; 
			city.options[ii].value = this.cities[pv][i]; 
		}
	}
	con_city(){
		let cv=''; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		this.default.city =  cv
	}
orgCate1:any[];
errorMsg:any
	//机构分类
	orgCondition:any={
		c1:'',
		c2:''
	}
	errorMessage:any
	getOrgCate1(){
		this.netCrmService
			.getOrganizationCategoryList({'categoryParentId':'0'})
			.then(
				(cates:any) => {
					this.orgCate1 = cates.data;
					console.log(cates)
				},
				error => this.errorMessage = error
			);
	}
	orgCate2:any[];
	getOrgCate2(event:any){
		//debugger;
		this.orgCate2 = undefined;
		this.orgCondition.c2 = '';
		this.netCrmService
			.getOrganizationCategoryList({'categoryParentId':event.target.value})
			.then(
				(cates:any) => {
					if(cates.data.length>0)
						this.orgCate2 = cates.data;
				},
				error => this.errorMessage = error
			);
	}
	//机构国际分类
	orgInCate1:any[];
	getOrgInCate1(){
		this.netCrmService
			.getOrgInCate({'parentId':"0"})
			.then(
				(cates:any) => {
					// debugger;
					this.orgInCate1 = cates.data;
				},
				error => this.errorMsg = error
			);
	}
	orgInCate2:any[];
	getOrgInCate2(event:any){
		this.orgInCate2 = undefined;
		this.orgCondition.ic2 = '';
		this.netCrmService
			.getOrgInCate({'parentId':event.target.value})
			.then(
				(cates:any) => {
					this.orgInCate2 = cates.data.length>0?cates.data:undefined;
				},
				error => this.errorMsg = error
			);
	}

	orgInCate2EP:any[];
	getOrganizationCategoryList2EP(event?:any){
		let key:any;
		if(event){
			if(!event.target.value){
				this.orgInCate2EP = undefined;
				this.organization.internationClassifyId2 = "";
				return;
			}
			key = event.target.value;
			this.organization.internationClassifyId2 = "";
		}else{
			key = "1";
		}
		this.netCrmService
			.getOrgInCate({'parentId':key})
			.then(
				(cates:any) => {
					this.orgInCate2EP = cates.data.length>0?cates.data:undefined;
				},
				error => this.errorMsg = error
			);
	}
	getOrganizationCategoryList2EP_plus(key:string){
		this.netCrmService
			.getOrganizationCategoryList({'categoryParentId':key})
			.then(
				(cates:any) => {
					this.orgInCate2EP = cates.data.length>0?cates.data:undefined;
				},
				error => this.errorMsg = error
			);
	}
	addOrganization(addOrg:any){
		if(this.organization.organizationShortName==''){
			alert('请填写机构简称！')
			return false
		}
		if(this.organization.organizationFullName==''){
			alert('请填写机构全称！')
			return false
		}
		if( this.orgCondition.c1==''||(this.orgCate2&&this.orgCondition.c2=='')){
			alert('请选择完整的金融机构分类！')
			console.log(this.organization)
			return false
		}

	this.organization.organizationCategoryId1=this.orgCondition.c1
	this.organization.organizationCategoryId2=this.orgCondition.c2
	console.log(this.organization)
	this.netCrmService
	.addOrganization(this.organization)
			.then(
				(cates:any) => {
					if(cates.status==0){
						alert('添加成功！')
						// this.user.company=this.organization.organizationShortName 
						// this.user.organizationFullName=this.organization.organizationFullName 
						// this.user.company=this.organization.organizationShortName 
						// this.user.companyId=cates.data.organizationId 
						addOrg.hide()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	// this.organization.internationClassifyId1=this.orgCondition.c1
	// this.organization.internationClassifyId2=this.orgCondition.c2
	}

// 上传图片预览
user:any={
	info_card_url:'',
	info_card:''

}
formErrors:any = {
		'phone':'',
		'name':'',
		'company':'',
		'position':'',
		'contact':'',
		'work_contact':'',
		'mail':'',
		'work_address':'',
		'referrer_phonenum':'',
		'name_card_url':''
	}
	info_card_data = function(file_data:any){
		this.user.info_card = file_data;
		if(!this.ID){
			this.UploadBusinessCardAnalysis()
		}
	}
	info_card_url = function(file_url:any){
		this.user.info_card_url = file_url;
	}

// 解析名片
	managerCard:any={
		bTwoCardPicture:'',
		bCardUrl:''
	}
	isS:any=false
	UploadBusinessCardAnalysis(del:any){
				// debugger
		this.managerCard.bTwoCardPicture = this.user.info_card
		this.managerCard.bCardUrl = this.user.info_card_url
		this.isS=true
		
		this.netCrmService
			.UploadBusinessCardAnalysis(this.managerCard)
			.then(
				(result:any) => {
					if(result.status==="0"){
						// if(result.data.companyMail){
						// 	 this.user.mail = result.data.companyMail
						// }else{
						// 	this.user.mail=''
						// }
						// if(result.data.organizationFullName){
						// 	 this.user.organizationFullName = result.data.organizationFullName
						// }else{
						// 	this.user.organizationFullName=''
						// }
						// if(result.data.organizationId){
						// 	 this.user.companyId = result.data.organizationId
						// }else{
						// 	 this.user.companyId=''
						// }
					 //  	if(result.data.organizationShortName){
						// 	 this.user.company = result.data.organizationShortName
						// }else{
						// 	 this.user.company=''
						// }
						
					 //    if(result.data.department){
 					// 		this.user.department = result.data.department	
 					// 	}else{
						// 	this.user.department=''
						// }
						// if(result.data.position){
						// 	 this.user.position = result.data.position
						// }else{
						// 	this.user.position=''
						// }
						// if(result.data.contactPhone){
						// 	 this.user.contact = result.data.contactPhone
						// }else{
						// 	this.user.contact=''
						// }
						// if(result.data.position){
						// 	 this.user.position = result.data.position
						// }else{
						// 	this.user.position=''
						// }
						// if(result.data.userType){
						// 	 this.user.userType = result.data.userType
						// }else{
						// 	this.user.userType=''
						// }
						// if(result.data.workPhone){
						// 	 this.user.work_contact = result.data.workPhone
						// }else{
						// 	this.user.work_contact=''
						// }
					 //   	if(result.data.workAddress){
						// 	 this.user.work_address = result.data.workAddress
						// }else{
						// 	this.user.work_address=''
						// }
					       this.isS=false  // del.hide()
					}else{
						alert(result.msg);
						 this.isS=false 
						// del.hide()
					}
				},
				error => this.errorMsg = <any>error
			);
	}
// 跳转到列表
	turnToList(){
		if(this.ID){
			this.router.navigate(['../../contact-list'],{relativeTo:this.activatedRoute});
		}else{
			this.router.navigate(['../contact-list'],{relativeTo:this.activatedRoute});
		}
	}
}