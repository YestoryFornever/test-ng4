import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../common/net-services/net-crm.service'
import { NetUserService } from '../../../common/net-services/net-user.service'
import {INCONFIG} from '../../../../public/in.config';
import { TypeAhead } from '../../../common/class/typeahead.ts';
@Component({
	selector: 'crm-allocationOrg',
	templateUrl: './crm-allocationOrg.component.html',
	styleUrls: [
				'./crm-allocationOrg.component.scss',
				'../../../common/scss/typical-list/table.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/order.scss',
				],
	// providers: [VideoManagementService]
})
export class CrmAllocationOrgComponent implements OnInit{
	private UserInfo:any;
	constructor(
				private netCrmService:NetCrmService,
				private netUserService:NetUserService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private router:Router) {
		this.fullnameTypeAhead = new TypeAhead();
	}
	ngOnInit(){

		this.activatedRoute.params.forEach((params:Params)=>{
			let id = +params['id'];
			let name = params['name'];
			let userType = params['userType'];
			this.userName = name
			this.default.userId=id
			
		});
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
     	this.netCrmService
        .getOrgListByShortName({value:this.default.company})
        .then((res:any)=>{
			if(res.data){
				observer.next(res.data)
			}else{
				var arr=[]
				observer.next(arr)
			}
			
		})
   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));

		
   		this.initAllotOrgPage()
   		this.getOrgCate1()
   		this.getOrgPosition()
	}
	userName:any
	pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:30,
		totalPages:1,
	}
	default:any={
		organizationCategoryId1:'',
		organizationCategoryId2:'',
		province:'',
		city:'',
		allotState:'2',
		userId:'',
		pageNumber:'1',
		pageSize:'30',
		conType:'4',
		organizationId:''
	}
// 获取分配机构列表
	orgList:any=[]
	checkAlled:any=false
	dataList:any=[]
	initAllotOrgPage(){
		this.default.pageNumber = this.pageParams.currentPage
		this.default.pageSize = this.pageParams.itemsPerPage
		this.default.organizationCategoryId1=this.orgCondition.c1
		this.default.organizationCategoryId2=this.orgCondition.c2
		this.netCrmService
			.initAllotOrgPage(this.default)
			.then(
				(cates:any) => {
					if(cates.data.pageList){
						this.orgList = cates.data.pageList	
						this.dataList = cates.data.dataList
						this.pageParams.totalItems = cates.data["total"];	
						this.checkAlled=false
					}else{
						this.orgList =[]
						this.pageParams.totalItems = 0
					}

				},
				error => this.errorMessage = error
			);
	}
	public turnFirst(){
		this.pageParams.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.initAllotOrgPage();

	}
// 省
	provList:any=[{name:"北京",id:'0'},{name:"上海",id:'1'},{name:"天津",id:'2'},{name:"重庆",id:'3'},{name:"河北",id:'4'},{name:"山西",id:'5'},{name:"辽宁",id:'6'},{name:"吉林",id:'7'},{name:"黑龙江",id:'8'},{name:"江苏",id:'9'},{name:"浙江",id:'10'},{name:"安徽",id:'11'},{name:"福建",id:'12'},{name:"江西",id:'13'},{name:"山东",id:'14'},{name:"河南",id:'15'},{name:"湖北",id:'16'},{name:"湖南",id:'17'},{name:"广东",id:'18'},{name:"海南",id:'19'},{name:"四川",id:'20'},{name:"贵州",id:'21'},{name:"云南",id:'22'},{name:"陕西",id:'23'},{name:"甘肃",id:'24'},{name:"青海",id:'25'},{name:"内蒙古",id:'26'},{name:"广西",id:'27'},{name:"西藏",id:'28'},{name:"宁夏",id:'29'},{name:"新疆",id:'30'},{name:"香港",id:'31'},{name:"澳门",id:'32'},{name:"台湾",id:'33'},{name:"其它",id:'34'},{name:"其他地区",id:'35'},{name:"国外机构",id:'36'}]

	errorMessage:any
	fullnameTypeAhead:any
	
/*公司失焦清空*/
	public blurCompany(el:any,e:any){
		if(!this.default.companyId){
			el.value = "";
			this.default.organizationId = "";
			this.default.organizationFullName=''
		}
	}
	public changeCompany(el:any,e:any){
		this.default.companyId = "";
	}
	public orgsOnSelect(e:any):void {
		console.log('设置公司为:', e.value);
		this.default.organizationId = e.item.organizationId;
		this.default.organizationFullName = e.item.organizationFullName
	}
// 跳转到列表
	turnToList(){
		this.router.navigate(['../../../client-list'],{relativeTo:this.activatedRoute});
	}
// 机构分类
orgCate1:any[];
	//机构分类
	orgCondition:any={
		c1:'',
		c2:''
	}
	getOrgCate1(){
		this.netCrmService
			.getOrganizationCategoryList({categoryParentId:'0'})
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
			.getOrganizationCategoryList({categoryParentId:event.target.value})
			.then(
				(cates:any) => {
					if(cates.data.length>0){
						this.orgCate2 = cates.data;
					}
				},
				error => this.errorMessage = error
			);
	}
// 获取机构所在地
cities:any=[]
getOrgPosition(){
	this.cities = this.netCrmService.getOrgPosition()			
}
public set_city(province:any){ 
		if(province.value==''){
			this.default.city=''
		}
		 this.default.province=province.value
		 let pv='';
		let cv=''; 
		pv=province.value; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		city.length=1; 
		if(pv=='0') return; 
		if(typeof(this.cities[pv])=='undefined') return; 
		for(let i=0; i<this.cities[pv].length; i++) 
			{ 
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

//全选HTMLImageElement
	checkboxs:any = document.getElementsByName('user');
		 checkAll = function(allcheck:any){
		 	// this.color = allcheck.checked?"#ffa":"#fff";
				for(var i=0;i<this.checkboxs.length;i++){
					this.checkboxs[i].checked = allcheck.checked
				}
			};
	approveNot:any=[]
	approveY:any=[]
	infoToCon:any={
		ids:"",
		data_type:"",
		types:"",
	}
	typingInfo(){	
		this.approveNot=[]
		this.approveY=[]
			let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
				for(var i =0;i<listState.length;i++){
			 		if(listState[i].checked == true){
			 			this.approveY.push(this.orgList[i].organizationId)
			 			
					}
				}
			this.infoToCon.ids = this.approveY.join(',')
			console.log(this.approveY)
			
	}
	// 调整机构
	Info:any={
		orgName:'',
	}
	orgEdit:any={
		orgIdList:[],
		userId:'',
	}
	// 移除单个机构 this.dataList 
	delShow(del:any,item:any){
		this.orgEdit.userId = this.default.userId
		this.orgEdit.orgIdList.push(item.organizationId)
		this.Info.orgName=item.organizationShortName
		del.show()
	}
	// 添加单个机构
	addShow(add:any,item:any){
		this.orgEdit.userId = this.default.userId
		this.orgEdit.orgIdList.push(item.organizationId)
		this.Info.orgName=item.organizationShortName
		add.show()
	}
	// 移除多个机构
	delMores(del:any){
		this.approveY=[]
		this.orgEdit.userId = this.default.userId
		// debugger
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			if(this.orgList[i].allotState==1){
		 				this.approveY.push(this.orgList[i].organizationId)
		 			}
				}
			}
			
			if(this.approveY.length>0){
				this.orgEdit.orgIdList = this.approveY
				del.show()
			}else{
				alert('请选择至少一个已分配机构进行移除')
				return false
			}
		
		
	}
	// 添加所有机构
	addAlls(add:any){
		this.orgEdit.orgIdList=undefined
		// this.orgEdit.userId=undefined
		this.orgEdit.userId = this.default.userId
		this.orgEdit.dataList = this.dataList 
		add.show()
	}
	// 移除所有机构
	deleteAlls(del:any){
		this.orgEdit.orgIdList=undefined
		// this.orgEdit.userId=undefined
		this.orgEdit.userId = this.default.userId
		this.orgEdit.dataList = this.dataList 
		del.show()
	}
	// 添加多个机构
	addMores(add:any){
		this.approveY=[]
		this.orgEdit.userId = this.default.userId
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			if(this.orgList[i].allotState==0){
		 				this.approveY.push(this.orgList[i].organizationId)
		 			}
				}
			}
			if(this.approveY.length>0){
				this.orgEdit.orgIdList = this.approveY
				add.show()
			}else{
				alert('请选择至少一个未分配机构进行分配')
				return false
			}
	}
	addAllot(win:any){
		this.netCrmService
			.addAllot(this.orgEdit)
			.then(
				(cates:any) => {
					if(cates.status==0){
						alert('添加成功')
						win.hide()
						this.initAllotOrgPage()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	}
	removeOrgList(win:any){
		this.netCrmService
			.removeOrgList(this.orgEdit)
			.then(
				(cates:any) => {
					if(cates.status==0){
						alert('移除成功')
						win.hide()
						this.initAllotOrgPage()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	}
// 获取转移机构对象
	moveCon:any={
		recieveId:'',
		orgIdList:''
	}
	receiverList:any=[]
	getReceiver(){
		this.netCrmService
			.getReceiver(null)
			.then(
				(cates:any) => {
					this.receiverList = cates.data
				},
				error => this.errorMessage = error
			);
	}
	moveShow(move:any){
		this.getReceiver()
		this.approveY=[]
		this.orgEdit.userId = this.default.userId
		// debugger
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			if(this.orgList[i].allotState==1){
		 				this.approveY.push(this.orgList[i].organizationId)
		 			}
				}
			}
			
			if(this.approveY.length>0){
				this.moveCon.orgIdList = this.approveY
				move.show()
			}else{
				alert('请选择至少一个已分配机构进行转移')
				return false
			}
	}
	moveAlls(move:any){
		this.getReceiver()
		this.orgEdit.orgIdList=undefined
		// this.orgEdit.userId=undefined
		this.orgEdit.userId = this.default.userId
		this.orgEdit.dataList = this.dataList 
		// debugger
		move.show()
	}
	transferOrg(win:any){
		this.netCrmService
			.transferOrg(this.moveCon)
			.then(
				(cates:any) => {
					if(cates.status==0){
						alert('转移成功')
						win.hide()
						this.initAllotOrgPage()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	}
	orgLvList:any=[]
	orgLvCon:any={
		conType:'',
		orgIdList:[]
	}
	orgLvShow(orgLv:any){
		this.orgLvList=[]
		this.approveY=[]
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.orgLvList.push(this.orgList[i])
		 			this.approveY.push(this.orgList[i].organizationId)	
				}
			}
			// this.orgLvList=[{organizationShortName:'1'},{organizationShortName:'1'},{organizationShortName:'2'},{organizationShortName:'3'},{organizationShortName:'4'},{organizationShortName:'5'},{organizationShortName:'6'}]
			// orgLv.show()
			if(this.approveY.length>0){
				this.orgLvCon.orgIdList = this.approveY
				orgLv.show()
			}else{
				alert('请选择至少一个机构进行关注度设置')
				return false
			}

	}
	delOrg(i:any){
		if(this.orgLvList.length==1){
			alert('设置关注度至少需要一条机构！')
			return false
		}
		this.orgLvList.splice(i,1)
		this.orgLvCon.orgIdList.splice(i,1)
	}
	orgConcern(win:any){
		if(this.orgLvCon.conType==''){
			alert('请选择关注度')
			return false
		}
		console.log('orgLvCon')
		this.netCrmService
			.orgConcern(this.orgLvCon)
			.then(
				(cates:any) => {
					if(cates.status==0){
						alert('设置成功')
						win.hide()
						this.initAllotOrgPage()
					}else{
						alert(cates.msg)
					}
					
				},
				error => this.errorMessage = error
			);
	}
}