import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';

import {CustomerManageService} from '../../../services/customer-manage.service';

@Component({
	selector: 'contact-manage-change.component',
	templateUrl: './contact-manage-change.component.html',
	styleUrls: ['./contact-manage-change.component.scss'],
	providers: [CustomerManageService]
})
export class ContactManageChangeComponent implements OnInit{
	constructor(private changeDetectorRef:ChangeDetectorRef,
		private customerManageService:CustomerManageService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.id=id
		})
		this.querySingleContact()
		this.OrganizationList()
	}
// 联系人列表
id:any
errorMessage:any
contactDetial:any={
	contactId:'',
	contactName:'',
	orgName:'',
	organizationId:'',
	departmentId:'',
	deptName:'',
	position:'',
	contactPhone:'',
	workPhone:'',
	workPhone2:'',
	companyMail:'',
	comment:''
}
//机构列表
	companylist:any
	partlist:any
	OrganizationList(){
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
	public typeaheadOnCompanys(e:any):void{
	   this.contactDetial.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}

	public typeaheadOnDepartments(e:any):void{
	   this.contactDetial.departmentId = e.item.departmentId;//id 赋值给隐藏的input。获取公司id 
	}
	querySingleContact(){
		var obj ={
			contactId:''
		}
		obj.contactId=this.id
		this.customerManageService.querySingleContact(obj) 
	        .subscribe(
	            contactList => {
	                if(contactList.status==0){
	                    this.contactDetial=contactList.data;
	                    console.log(contactList )
	                }else{
	                	if(contactList.msg){
	                		alert(this.contactDetial.msg);
	                	}
	                 
	                }
	               
	            },  
	            error => this.errorMessage = <any>error
			); 
	}	
// 失去焦点
	blurCompanyOrg(cm:any){
		cm.value =''
		this.contactDetial.organizationId=""
	}
	blurCompanyDpt(cm:any){
		cm.value =''
		this.contactDetial.departmentId=""
	}
	saveCon(save:any){
		if(this.contactDetial.contactName==''){
			alert("请填写姓名")
			return false
		}
		if(this.contactDetial.organizationId==''){
			alert("请填写机构")
			return false
		}
		if(this.contactDetial.departmentId==''){
			alert("请填写部门")
			return false
		}
		if(this.contactDetial.contactPhone==''){
			alert("请填写联系电话")
			return false
		}
		// if(this.contactDetial.workAddress==''){
		// 	alert("请填写工作地址")
		// 	return false
		// }
		save.show()
	}
	saveContant(save:any){
		// debugger
		this.contactDetial.contactId = this.id
		this.customerManageService.updateSingleContact(this.contactDetial) 
	        .subscribe(
	            contactList => {
	                if(contactList.status==0){
	                    alert('修改成功') 
	                    this.toChange()
	                    save.hide()
	                }else{
	                	if(contactList.msg){
	                		alert(this.contactDetial.msg);
	                	}
	                 
	                }
	               
	            },  
	            error => this.errorMessage = <any>error
			); 
	}
// 跳转
	toChange(){
	   this.router.navigate(['../../contact-manage-list'],{relativeTo:this.activatedRoute}); 
	}

}
