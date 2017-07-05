import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import {CustomerManageService} from '../../../services/customer-manage.service';

@Component({
	selector: 'contact-manage-list.component',
	templateUrl: './contact-manage-list.component.html',
	styleUrls: ['./contact-manage-list.component.scss'],
	providers: [CustomerManageService]
})
export class ContactManageListComponent implements OnInit{
//初始化
	ngOnInit(){
		this.postListMsges()
		this.queryAllStaff()
		this.turnFirst();
	}
	errorMessage: string;
	msgNumber:any;
	constructor(private changeDetectorRef:ChangeDetectorRef,
		private customerManageService:CustomerManageService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}


	postListMsges(){
//获取公司
    this.customerManageService.OrganizationList(null) 
        .subscribe(
            companylist => {
                this.companylist = companylist;//赋值给下拉列表
                if(this.companylist.status==0){
                    this.companylist=this.companylist.data;
                }else if(this.companylist.status==-5){
                	console.log('session已超时')
                }
                else{
                	if(this.companylist.msg){
                		 alert(this.companylist.msg);
                	}
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
//部门列表  
    this.customerManageService.DepartmentList(null) 
        .subscribe(
            partlist => {
            
                if(partlist.status==0){
                    this.partlist=partlist.data;
                }else{
                	if(partlist.msg){
                		alert(this.partlist.msg);
                	}
                 
                }
               
            },  
            error => this.errorMessage = <any>error
		); 
     
	}
//客户经理列表
employList:any
queryAllStaff(){
	this.customerManageService.queryAllStaff(null) 
        .subscribe(
            partlist => {
                if(partlist.status==0){
                    this.employList=partlist.data;
                    
                }else{
                	if(partlist.msg){
                		alert(this.partlist.msg);
                	}
                 
                }
               
            },  
            error => this.errorMessage = <any>error
		); 
}
// 联系人列表
contactList:any
queryContactList(){
	// this.default
	this.customerManageService.queryContactList(this.default) 
        .subscribe(
            contactList => {
                if(contactList.status==0){
                    this.contactList=contactList.data.voList;
                    console.log(contactList )
                    
                    if(!contactList.data.total){
                    	this.totalItems=0;
                    }else{
                    	this.totalItems = contactList.data.total 
                    }
                }else{
                	if(contactList.msg){
                		alert(this.contactList.msg);
                	}
                 
                }
               
            },  
            error => this.errorMessage = <any>error
		); 
}	
//即时搜索
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = true;
	public typeaheadNoResults:boolean = true; 
	companylist:any=[{organizationShortName:"亚联",organizationId:1}];
	partlist:any=[];
// 筛选条件  
	public typeaheadOnCompanys(e:any):void{
	   this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{   
	    this.default.departmentId = e.item.departmentId;
	} 
	public typeaheadOnCustomer(e:any):void{   
	    this.default.empId = e.item.employmentId;
	} 
// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
default:any={
				contactName:'',	
				organizationId:'',
				departmentId:'',
				empId:'',
				pageNumber:1,
				pageSize:50,
				}
// 分页
	height = '440px';
	msgNumbers = [{Number:'50'},{Number:'10'},{Number:'20'},{Number:'30'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 50;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryContactList()
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 
		
	};
	blurCompanyOrg(cm:any){
		cm.value='';
		this.default.organizationId=''
	}
	blurCompanyDpt(cm:any){
		cm.value='';
		this.default.departmentId=''
	}
	blurCompanyCt(cm:any){
		cm.value='';
		this.default.empId=''
	}
	public pageNumChange(event:any){
		this.default.pageSize=this.itemsPerPage;
		
		console.log(event);
		this.totalPages = event;
	}

// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.currentPage =  event.page;
		this.default.pageNumber = event.page;
		this.queryContactList()

	};
// 跳转
	toChange(newsId:any){
		// alert(newsId)
	   this.router.navigate(['../contact-manage-change',newsId],{relativeTo:this.activatedRoute}); 
	}
// 删除操作
	conId:any
	deleted(win:any,conId:any){
		win.show()
		this.conId = conId
	}
	delCont(win:any){
		var obj={
			contactId:''
		}
		obj.contactId =this.conId
		this.customerManageService.deleteContact(obj) 
        .subscribe(
            contactList => {
                if(contactList.status==0){
                   alert('删除成功')
                   win.hide()
                   this.turnFirst();
                }else{
                	if(contactList.msg){
                		alert(this.contactList.msg);
                	}  
                }  

   	},
	error => this.errorMessage = <any>error
		); 
    }
}
