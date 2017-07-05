import { Component,ViewChild,OnInit,ChangeDetectorRef,trigger,state,style,transition,animate,AfterViewChecked } from '@angular/core';
import { NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { CacheManagementService } from './services/cache-management.service';
import { CalendarModule,PickListModule} from 'primeng/primeng';
@Component({
	selector: 'cache-management',
	templateUrl: './cache-management.component.html',
	styleUrls: ['./cache-management.component.scss'],
    providers: [CacheManagementService]
})
export class CacheManagementComponent implements OnInit {
	constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private cacheManagementService:CacheManagementService,
        private calendarModule:CalendarModule,
        private router:Router,
        ){}
	ngOnInit() {};
    userMsges:any[];
    error:any;
    errorMessage: string;

//用户基本信息
    change1(){
        this.cacheManagementService.reLoadUserList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载用户列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//用户登录session
    change2(){
        this.cacheManagementService.Login(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载用户登录成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//用户隐私设置
    change3(){
        this.cacheManagementService.reloadUserSettingList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载用户设置信息列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//用户认证
    change4(){
        this.cacheManagementService.reloadUserAuthenticationList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载用户认证信息列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//机构基本信息
    change5(){
        this.cacheManagementService.reloadOrganizationList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载机构信息列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//机构分类
    change6(){
        this.cacheManagementService.reloadOrganizationCategoryList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载机构分类信息列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//好友关系
    change7(){
        this.cacheManagementService.reloadFriendRelationshipList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载好友列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//关注关系
    change8(){
        this.cacheManagementService.reloadConcernRelationshipList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载关注列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//黑名单关系
    change9(){
        this.cacheManagementService.reloadBlackRelationshipList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载黑名单列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//角色基本信息
    change10(){
        this.cacheManagementService.reLoadSecurityRoleList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载角色列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
//管理员用户与角色关系
    change11(){
        this.cacheManagementService.reLoadSecurityUserRoleList(null)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.hideLoad = true;
                            this.hideList = false;
                            alert("重载用户角色关系列表成功!");
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("后台接口异常！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
// 弹窗
    changeinfo1(showbox:any){
        showbox.show();
    }
    changeinfo2(showbox:any){
        showbox.show();
    }
    changeinfo3(showbox:any){
        showbox.show();
    }
    changeinfo4(showbox:any){
        showbox.show();
    }
    changeinfo5(showbox:any){
        showbox.show();
    }
    changeinfo6(showbox:any){
        showbox.show();
    }
    changeinfo7(showbox:any){
        showbox.show();
    }
    changeinfo8(showbox:any){
        showbox.show();
    }
    changeinfo9(showbox:any){
        showbox.show();
    }
    changeinfo10(showbox:any){
        showbox.show();
    }
    changeinfo11(showbox:any){
        showbox.show();
    }
    // 类管理
    hideLoad:any = true
    hideList:any = true
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
}