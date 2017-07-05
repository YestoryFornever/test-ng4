import {INCONFIG} from '../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { 
  Router, 
  RouteConfigLoadStart,
  RouteConfigLoadEnd 
} from '@angular/router';
import $ from '$';

import { MenuService,UserAuthService } from '../common';
import { ChatWindowService } from '../common/components/customer-chat/chat-window/chat-window.service';
import { HomepageService } from './homepage/services/homepage.service';
@Component({
  selector: 'home',
  templateUrl:'./home.html',
  styleUrls:[
    './loading.scss',
    './home.scss',
  ],
  providers: [
    MenuService,
    HomepageService
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('compoentContainerBox', {read:ViewContainerRef})
  public compoentContainer:ViewContainerRef;

  public isLoadChildren:boolean = false;
  constructor(
    public menu:MenuService,
    private homepageService:HomepageService,
    private UserAuthService:UserAuthService,
    private Router: Router,
    private ChatWindowService: ChatWindowService
  ) {}
  public ngOnInit() {
    console.log('hello `Home` component');
    $(window).resize();

    this.ChatWindowService.setContainer(this.compoentContainer);
    // console.log(this.Router.events);
    this.Router.events
    // .filter(event => event instanceof RouteConfigLoadStart)
    .subscribe(event=>{
      if (event instanceof RouteConfigLoadStart) {
        this.isLoadChildren = true;
      }else if(event instanceof RouteConfigLoadEnd) {
        this.isLoadChildren = false;
      }
    });

    this.getUser();
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
  /**
   * 退出登录
   */
  public logout(){
    this.UserAuthService.logout();
    this.Router.navigate(['/login']);
  }
}
