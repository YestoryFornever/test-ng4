import {INCONFIG} from '../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomepageService } from './services/homepage.service';

@Component({
	selector: 'alphain-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: [
		'./homepage.component.scss',
	],
	providers:[HomepageService]
})
export class HomepageComponent implements OnInit{
	constructor(private homepageService:HomepageService){}
	ngOnInit(){
		this.getUser();
	}
	showNavDynamic:boolean = true;
	currentDyNav:string;
	ifshowDyNav(bool:boolean){
		this.showNavDynamic = bool;
	}
	updataDyNav(event:any){
		this.currentDyNav = event;
	}
	errorMsg:string;
	account:string;
	oldPassword:string;
	newPassword:string;
	repeatPassword:string;
	getUser(){
		this.homepageService
			.getUser()
			.subscribe(
				data => {
					this.account = data["userName"];
					INCONFIG.setUserInfo(data);
				},
				error => this.errorMsg = <any>error
			);
	}
	updatePwd(){
		this.homepageService
			.updatePwd(this.oldPassword, this.newPassword)
			.subscribe(
				result => {
					if(result.status==="0"){
						alert("修改成功");
					}else{
						alert("修改失败\n"+result.msg);
					}
				},
				error => this.errorMsg = <any>error
			);
	}
	saveNewPwd(dialog:any){
		this.updatePwd();
		this.closeUpdatepwd(dialog);
	}
	closeUpdatepwd(dialog:any){
		dialog.hide();
		this.oldPassword="";
		this.newPassword="";
		this.repeatPassword="";
		setTimeout(()=>this.formErrors={
			'oldPassword':'',
			'newPassword':'',
			'repeatPassword':'',
		},0);
	}
	updatepwdform:NgForm;
	@ViewChild('updatepwdform') currentForm:NgForm;
	/*表单校验*/
	ngAfterViewChecked(){
		this.formChanged();
	}
	formChanged(){
		if(this.currentForm === this.updatepwdform){return;}
		this.updatepwdform = this.currentForm;
		if(this.updatepwdform){
			this.updatepwdform.valueChanges
				.subscribe(data=>this.onValueChanged(data));
		}
	}
	onValueChanged(data?:any){
		if(!this.updatepwdform){return;}
		const form = this.updatepwdform.form;
		for(const field in this.formErrors){
			this.formErrors[field]='';
			const control = form.get(field);
			if(control && control.dirty && !control.valid){
				const messages = this.validationMessages[field];
				for(const key in control.errors){
					this.formErrors[field]+=messages[key]+' ';
				}
			}
		}
	}
	formErrors = {
		'oldPassword':'',
		'newPassword':'',
		'repeatPassword':'',
	}
	validationMessages = {
		'oldPassword':{
			'required':'原密码不能为空'
		},
		'newPassword':{
			'required':'新密码不能为空'
		},
		'repeatPassword':{
			'required':'重复密码不能为空'
		}
	}
}