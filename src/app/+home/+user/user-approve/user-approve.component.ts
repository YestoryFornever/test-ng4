import { Component, ViewChild,OnInit,ChangeDetectorRef,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserMsge }  from './classes/user-approve';
import { TypeAhead } from './classes/typeahead';
import { UserApproveService } from './services/user-approve.service'
@Component({
	selector: 'alphain-user-approve',
	templateUrl: './user-approve.component.html',
	styleUrls: ['./user-approve.component.scss'],
	providers: [UserApproveService]
})

export class UserApproveComponent implements OnInit{
	fullnameTypeAhead:TypeAhead
	fullnameTypeAhead1:TypeAhead
	fullnameTypeAhead2:TypeAhead
	phone:any='';
	color = '#fff';
	height = '440px';
	pub = {approve:'审核',state:'inactive'}
//初始化
	ngOnInit(){
		this.postListMsges();
		this.serch();
	this.fullnameTypeAhead.source = Observable.create((observer:any) => {
      this.userApproveService
        .getOrganizationListByShortName({value:this.default.organizationName})
        .subscribe(
          data => observer.next(data.data),
          error => this.errorMessage = error
        );
   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
	this.fullnameTypeAhead1.source = Observable.create((observer:any) => {
      this.userApproveService
        .getOrganizationListByShortName({value:this.msgWindow.organizationName})
        .subscribe(
          data => observer.next(data.data),
          error => this.errorMessage = error
        );
   		}).mergeMap((token:string) => this.fullnameTypeAhead1.getStates(token));
	this.fullnameTypeAhead2.source = Observable.create((observer:any) => {
      this.userApproveService
        .getOrganizationListByShortName({value:this.msgWindow.updateValue})
        .subscribe(
          data => {
          	if(data.data){
          			observer.next(data.data)
          		}else{
          			observer.next([])
          		}
          
          },
          error => this.errorMessage = error
        );
   		}).mergeMap((token:string) => this.fullnameTypeAhead2.getStates(token));
	}
//即时搜索
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false; 
	companylist:any=[{organizationShortName:"亚联",organizationId:1}];
	partlist:any=[];
// 筛选条件  
	public typeaheadOnCompanys(e:any):void{
	   // this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{   
	    // this.default.departmentId = e.item.departmentId;
	} 
//审核弹窗
	organizationIdVer1:any //弹窗公司id
	departmentIdVer1:any //部门id
	public typeaheadOnCompanysVer(e:any){
			this.organizationIdVer1 = e.item.organizationId;
	}
	noSection(company:any){
		this.msgWindow.updateValue = ''
		this.msgWindow.organizationId=''
		company.value = ''
	}

	public typeaheadOnDepartmentsVer(e:any){
		this.departmentIdVer1 = e.item.departmentId;
		console.log(this.default.organizationId)
	}
//信息变更弹窗
	organizationIdChange1:any //弹窗公司id
	public typeaheadOnCompanysChange(e:any){
			this.organizationIdChange1 = e.item.organizationId;
	}
// 失去焦点
	blurCompany(cm:any){
		// cm.value =''
		// this.default.organizationName=""
	}
//set用户审核列表
	userMsges:UserMsge[];
	UserMsge:UserMsge;
	errorMessage: string;
	msgNumber:any;
	constructor(private changeDetectorRef:ChangeDetectorRef,private userApproveService:UserApproveService){
		this.fullnameTypeAhead = new TypeAhead();
		this.fullnameTypeAhead1 = new TypeAhead();
		this.fullnameTypeAhead2 = new TypeAhead();
	}

//获取公司
orgNameChangeVer(){
	var obj={
			value:this.msgWindow.organizationName
		}
	  this.userApproveService.getOrganizationListByShortName(obj) 
        .subscribe(
            companylist => {
                this.companylist = companylist;//赋值给下拉列表
                if(this.companylist.status==0){
                    this.companylist=this.companylist.data;
                }
                else{
                	if(this.companylist.msg){
                		 // alert(this.companylist.msg);
                	}
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
}
orgNameChange(){
	var obj={
			value:this.default.organizationName
		}
	  this.userApproveService.getOrganizationListByShortName(obj) 
        .subscribe(
            companylist => {
                this.companylist = companylist;//赋值给下拉列表
                if(this.companylist.status==0){
                    this.companylist=this.companylist.data;
                }
                else{
                	// if(this.companylist.msg){
                	// 	 // alert(this.companylist.msg);
                	// }
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
}
public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
postListMsges(){

//部门列表  
    this.userApproveService.DepartmentList(null) 
        .subscribe(
            partlist => {
                this.partlist= partlist;
                if(this.partlist.status==0){
                    this.partlist=this.partlist.data;
                }else if(this.companylist.status==-5){
                	console.log('session已超时')
                }else{
                	if(this.partlist.msg){
                		alert(this.partlist.msg);
                	}
                 
                }
               
            },  
            error => this.errorMessage = <any>error
		); 
     
	}
// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
 // 用户审核列表
	phoneNum:any;
	username:any;
	companysSelected:any
	DepartmentSelected:any
	organizationName:any
	departmentName:any
	default:any={
				loginName:'',
				userName:'',	
				organizationName:'',
				departmentName:'',
				pageNum:1,
				pageSize:10,
				}

	serch(){
		this.hideList = true;
		this.hideLoad = false;
		this.loading=1
		// debugger
		// if(this.organizationName==""){
		// 	this.default.organizationName=""
		// }
		// if(this.departmentName==""){
		// 	this.default.departmentId=""
		// }
		// this.default.organizationName = this.organizationName
		// this.default.departmentName = this.departmentName
		this.default.loginName=this.trim(this.default.loginName)
		this.default.userName=this.trim(this.default.userName)
		// this.default.organizationName=this.trim(this.default.organizationName)
		// this.default.departmentName=this.trim(this.default.departmentName)
		console.log(this.default)
			this.userApproveService.serch(this.default)
							.subscribe(
								userMsges => {		console.log(userMsges)
													if(userMsges.status==0){
														this.userMsges = userMsges.data.list;
														this.totalItems = userMsges.data.page.totalResult;
														this.hideLoad = true;
		                    							this.hideList = false;
													}else if(this.companylist.status==-5){
									                	console.log('session已超时')
									                }else{
									                	if(userMsges.msg){
									                		alert(userMsges.msg);
									                	}
														this.hideLoad = true;
		                    							this.hideList = false;
													}			
								},
								error => {	this.errorMessage = error;
									alert("服务器连接失败！")
											this.hideLoad = true;
		                    				this.hideList = false;
										}		
							);						
	};
// redio按钮
	public radioModel:string = '1';
	public radioModelP:string = '1';
	public radioModelPi:string = '0'
// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
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
		this.serch()
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		// allcheck.checked = false;
		this.default.pageSize=this.itemsPerPage;
		this.color="#fff"
		// this.serch()
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.default.pageNum = event.page;	
		// allcheck.checked = false;
		this.color="#fff";
		this.serch()
	};


//list状态切换
	public changeState = function(listState:any,userList:any){
		if(listState.checked==true){
			userList.style.background = 'rgb(255, 255, 150)';
		}else{
			userList.style.background = 'rgb(255, 255, 255)';
		}
	
	}

//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
//多人审核
	checkUserPhone:any=[]
	checkUserId:any=[]
	public approve = function(userVe:any){
		this.checkUserPhone=[];
		this.checkUserId=[];
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.checkUserPhone.push(this.userMsges[i].registPhone);
		 			this.checkUserId.push(this.userMsges[i].auditId);
		 			listState[i].parentNode;
				}
			}
		userVe.show();	
	}
	// 批量审核
	remarks:any
	batchUpdateUserAudit(windows:any,x:any){
		if(this.remarks==undefined){
			this.remarks="";
		}
		var obj={
			auditIds:this.checkUserId,
			remark:this.remarks,
			visitState:this.radioModelPi,
			auditState:x
		}
		if(this.radioModelPi==undefined){
			alert("请选择回访状态!")
			return false;
		}
		if(this.checkUserId.length<=0){
			alert("请先选择需要审核的用户!")
			return false;
		}
		if(obj.auditState=='3'&&this.remarks==""){
			alert("请输入审核意见")
			return false;
		}
		this.userApproveService.batchUpdateUserAudit(obj)
							.subscribe(
								msgWindow => { 
												if(msgWindow.status==0){
													alert("批量审核用户成功")
													this.serch()
												}else{
													alert("批量审核用户失败，请联系管理员")
												}
								},
								error => this.errorMessage = <any>error
							);
							windows.hide()			
	}
// 单人审核弹窗
	singleUser:any={}
	nameRel:any;
	companyRel:any;
	departRel:any;
	postRel:any;
	conPhoneRel:any;
	workPhoneRel:any;
	emailRel:any;
	addressRel:any;
	msgWindow:any={	
		cardUrl:'',
		auditId:'',
		cardAlterId:'',
		userName:'',
		organizationId:'',
		organizationShortName: '',
		department:'',
		position:'',
		contactPhone:'',
		workPhone:'',
		companyMail:'',
		workAddress:'',
		visitState:'',
		updateField:'',
		updateValue:'',
	}
	auditId={auditId:''}
	public singleApprove(msgChangeVer:any,realNameVer:any,userMsg:any){
		this.auditId={auditId:userMsg.auditId+''}
		this.userApproveService.realNameVer(this.auditId)
								.subscribe(
									msgWindow => {
												console.log(msgWindow)
												this.msgWindow = msgWindow.data;											
									},
									error => this.errorMessage = <any>error
								);
	    if(userMsg.auditType == 1 ){
			realNameVer.show()
		}else if(userMsg.auditType == 2){
			msgChangeVer.show() 
		}	
	}
// 实名认证操作
	giveUp(x:number,window:any,companyVer:any){
		if(this.reMark==undefined){
			this.reMark=''
		}
	this.auditRealCertify(x,window,companyVer)
	this.serch()
	}
	reMark:any;
	auditRealCertify(x:number,windows:any,companyVer:any){
		// debugger
		var obj={
			auditId:this.msgWindow.auditId,	
			cardAlterId:this.msgWindow.cardAlterId,	
			userId:	this.msgWindow.userId,
			userName:	this.msgWindow.userName,
			organizationId:	this.organizationIdVer1,
			organizationName:this.msgWindow.organizationName,	
			departmentName:this.msgWindow.departmentName,		
			position:this.msgWindow.position,			
			contactPhone:this.msgWindow.contactPhone,	
			workPhone:this.msgWindow.workPhone,	
			companyMail:this.msgWindow.companyMail,			
			workAddress:this.msgWindow.workAddress,	
			remark:this.reMark,
			visitState:this.radioModelP,
			auditState:x,
		}
		
		if(	!this.organizationIdVer1){
			obj.organizationId=this.msgWindow.organizationId
		}
		if(companyVer.value==''&&obj.auditState==2){
			obj.organizationId=''
			alert('请填写机构简称')
			return false
		}
		// debugger
		if(this.reMark==undefined){
			this.reMark=''
		}
		if(obj.organizationId=='null'){
			obj.organizationId=''
		}
		if(obj.organizationName==null){
			obj.organizationName=''
		}
		if(obj.departmentName==null){
			obj.departmentName=''
		}
		
		console.log(obj)
		if(this.radioModelP==undefined){
			alert("请选择回访状态!")
			return false;
		}
		// debugger
		if(obj.auditState==3&&this.reMark==''){
			alert("请填写操作备注")
			return false;
		}
		obj.remark = this.reMark
		this.userApproveService.approveVer(obj)
							.subscribe(
								msgWindow => {	
												if(msgWindow.status==0){
													alert("审核成功")
													this.serch()
												}else{
													alert("审核失败，请联系管理员")
												}
								},
								error => this.errorMessage = <any>error
							);
							windows.hide();
							this.reMark='';
	}
//变更信息
objCon= {
		auditId:'',	
		cardAlterId:'',	
		userId:	'',
		organizationId:'',
		remark:'',
		visitState:'',
		updateField:'',
		updateValue:'',
		auditState:'2'
		}
	auditRealChange(x:number,windows:any){
		this.objCon.auditId = this.msgWindow.auditId
		this.objCon.cardAlterId = this.msgWindow.cardAlterId
		this.objCon.userId = this.msgWindow.userId
		this.objCon.organizationId = this.organizationIdChange1
		
		this.objCon.visitState = this.msgWindow.visitState
		this.objCon.updateField = this.msgWindow.updateField
		this.objCon.updateValue = this.msgWindow.updateValue
		if(this.reMark==undefined){
			this.reMark=''
		}
		if(	!this.organizationIdChange1){
			this.objCon.organizationId=this.msgWindow.organizationId
		}
		this.objCon.remark = this.reMark
		if(this.radioModel==undefined){
			alert("请选择回访状态!")
			return false;
		}
		if(this.objCon.auditState=='3'&&this.reMark==''){
			alert("请填写操作备注")
			return false;
		}
		if(this.objCon.auditState=='2'&&this.msgWindow.updateField=='机构简称'&& this.objCon.organizationId==''){
			alert("请填写机构简称")
			return false
		}
		this.userApproveService.approveVer(this.objCon)
							.subscribe(
								msgWindow => {	
												if(msgWindow.status==0){
													alert("审核成功")
													this.serch()
												}else{
													alert("审核失败，请联系管理员")
												}
								},
								error => this.errorMessage = <any>error
							);
							windows.hide()
							this.reMark=''
							
	}
// 冻结用户
	unFrozenUser(windows:any){
		if(this.reMark==undefined){
			// debugger
			this.reMark=''
		}
		var obj={
			userId:this.msgWindow.userId,
			frozenRemark:this.reMark,
		}
		this.userApproveService.unFrozenUser(obj)
							.subscribe(
								msgWindow => {
												if(msgWindow.status==0){
													alert("冻结用户成功")
													this.serch()
												}else{
													alert("冻结失败，请联系管理员")
												}
								},
								error => this.errorMessage = <any>error
							);
							windows.hide()
							this.reMark=''
							
	}
	loading:any =0;
// 类管理
// height:any = 352+"px"
	hideLoad:any = true
	hideList:any =  true
	show:any
	setLoadClasses() {
	  	let classes =  {
	    hide: this.hideLoad,      // true
	    // show: !this.show, // false
  		};
		return classes;
	}
	setListClasses() {
	  	let classes =  {
	    hide: this.hideList,      // true
	    // show: !this.show, // false
		};
		return classes;
	}


};








