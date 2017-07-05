import { Component, ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {CustomerManageService} from '../services/customer-manage.service';

@Component({
	selector: 'crmGroup-manage.component',
	templateUrl: './crmGroup-manage.component.html',
	styleUrls: ['./crmGroup-manage.component.scss'],
	providers: [CustomerManageService]
})
export class CrmGroupComponent implements OnInit{
	ngOnInit(){
		this.getGroupList()
		this.getAvailableGroup()
		this.getAvailableUser()
	}
	constructor(
			private customerManageService:CustomerManageService,
		){}
	errorMessage:any
	actionList:any=[
		{
			username:'xxx',
			fathername:'xxx',
			crm:'xxx'
		}
	]
	default:any={}
	GroupList:any
	getGroupList(){
		// console.log(this.default)
		this.customerManageService
			.getGroupList(null)
			.subscribe(
				cates => {
					if(cates.status){
						this.GroupList=cates.data
						
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
					
				},
				error => this.errorMessage = error
			);
	}

	// 获取父级数据
	fatherData:any
	getAvailableGroup(){
		this.customerManageService
			.getAvailableGroup(null)
			.subscribe(
				cates => {	
					if(cates.status){
						this.fatherData = cates.data
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
	}
	// 获取管理员数据(新建)
	otherAvailableUser:any
	AvailableUser:any
	getAvailableUser(){
		var obj={
			groupId:''
		}
		this.customerManageService
			.getAvailableUser(obj)
			.subscribe(
				cates => {	
					if(cates.status){
						this.AvailableUser = cates.data
						// console.log(this.AvailableUser)
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
	}
	// 获取管理员数据(修改)
	getAvailableUserChange(infoId:any){
		var obj={
			groupId:infoId
		}
		this.customerManageService

			.getAvailableUser(obj)
			.subscribe(
				cates => {	
					if(cates.status==0){
						this.otherAvailableUser = cates.data
							// console.log(this.otherAvailableUser)
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
	}
	addGpshow(xx:any){
		this.NameSer=false
		xx.show()
	}
	// 添加用户组
	NameSer:any=false
	NameRep:any=false
	names:any={
		groupName:''
	}
		// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	changeName(){
		this.NameSer=false
	}
	duplicateName(){
		this.addGroup.groupName = this.trim(this.addGroup.groupName)
		if(this.addGroup.groupName==''){
			alert('组名不能为空')
			return false
		}
		this.names.groupName = this.addGroup.groupName
		this.customerManageService
			.duplicateName(this.names)
			.subscribe(
				cates => {	
					if(cates.status==0){
						if(cates.data.flag=='1') {
							this.NameRep =  true
						}else{
							this.NameRep =  false
						}
						this.NameSer = true
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
	}
	addGroup:any={
		groupName:'',
		parentId:'',
		parentLevel:'',
		parentIsLeaf:'',
		empId:''
	}
	fa:any
	getFa(){
		// debugger	
	}
	addCustomerGroup(addGp:any){
		for(var i=0;i<this.fatherData.length;i++){
			if(this.addGroup.parentId == this.fatherData[i].parentId){
				this.addGroup.parentLevel = this.fatherData[i].parentLevel
				this.addGroup.parentIsLeaf = this.fatherData[i].parentIsLeaf
			}
		}
		this.addGroup.groupName = this.trim(this.addGroup.groupName)
		if(this.addGroup.groupName==''){
			alert('组名不能为空')
			return false
		}
		if(this.addGroup.empId==''){
			alert('管理员不能为空')
			return false
		}
		if(this.addGroup.parentId==''){
			alert('父级用户组不能为空')
			return false
		}
		// debugger
		this.customerManageService
			.addCustomerGroup(this.addGroup)
			.subscribe(
				cates => {	
					if(cates.status==0){
						alert('保存成功！')
						this.getGroupList()
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
			this.addGroup={
				groupName:'',
				parentId:'',
				parentLevel:'',
				parentIsLeaf:'',
				empId:''
			}
			addGp.hide()
			this.getGroupList()
	}
 	nowGpInfo:any={
 		groupId:'',
		groupName:'',
		parentId:'',
		empId:'',
		parentName:''
 	}
	updateGroup(win:any,info:any){
		// debugger
		this.getAvailableUserChange(info.groupId)
		this.nowGpInfo.groupId=info.groupId;
		this.nowGpInfo.groupName=info.groupName;
		this.nowGpInfo.parentId=info.parentId;
		this.nowGpInfo.empId=info.empId;
		this.nowGpInfo.parentName=info.parentName;
		this.NameSer=false
		win.show()
		// this.nowGpInfo.empId=info.empId;
	} 
// 修改
	updateGp:any={
		groupId:'',
		groupName:'',
		parentId:'',
		empId:'',
	}
	nameSer:any={
		groupName:'',
		groupId:''
	}		
	duplicateNameSer(){

		this.nowGpInfo.groupName = this.trim(this.nowGpInfo.groupName)
		if(this.nowGpInfo.groupName==''){
			alert('组名不能为空')
			return false
		}
		this.nameSer.groupName = this.nowGpInfo.groupName
		this.nameSer.groupId = this.nowGpInfo.groupId
		this.customerManageService
			.duplicateName(this.nameSer)
			.subscribe(
				cates => {	
					if(cates.status==0){
						if(cates.data.flag=='1') {
							this.NameRep =  true
						}else{
							this.NameRep =  false
						}
						this.NameSer = true
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);

	}
	editGroup(updateGp:any){
		// debugger
		this.updateGp.groupId = this.nowGpInfo.groupId
		this.updateGp.groupName = this.nowGpInfo.groupName
		this.updateGp.parentId = this.nowGpInfo.parentId
		this.updateGp.empId = this.nowGpInfo.empId
		this.updateGp.groupName = this.trim(this.updateGp.groupName)
		if(this.updateGp.groupName==''){
			alert('组名不能为空')
			return false
		}
		if(this.updateGp.empId==''&&!this.updateGp.empId){
			alert('管理员不能为空')
			return false
		}
		if(this.updateGp.parentId==''){
			alert('父级用户组不能为空')
			return false
		}
		this.customerManageService
			.editGroup(this.updateGp)
			.subscribe(
				cates => {	
					if(cates.status==0){
						alert('修改成功！')
						this.getGroupList()
					}else{
						if(cates.msg){
							alert(cates.msg)
						}
					}
				},
				error => this.errorMessage = error
			);
			updateGp.hide()
			this.getGroupList()
	}

}
