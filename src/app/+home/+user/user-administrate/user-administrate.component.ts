import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { NgStyle } from '@angular/common';

import { AdministrateRole } from './classes/user-administrate';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import {  UserAdministrateService } from './services/user-administrate.service';
import { PickListModule } from 'primeng/primeng';

@Component({
    selector: 'user-administrate',
    templateUrl: './user-administrate.component.html',
    styleUrls: ['./user-administrate.component.scss',
        './scss/header.scss',
        './scss/table.scss',
        './scss/search_condition.scss',
        './scss/pagination.scss'
    ],
    providers:[UserAdministrateService]
})
export class UserAdministrateComponent{
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private userAdministrateService:UserAdministrateService

    ){}
    errorMsg:string;
   
    //初始化
    ngOnInit(){
        this.getAdminLists();
        this.getRoles();
        // this.isCheck(this.data);

    }
//获取(查询)管理员
    ad:any={
        loginName:"",
        userName:'',
        // roles:'',
        roleId:'',
        userState:'',
        pageNum:"1",
        pageSize:"10"
    }
    data:any;
    getAdminLists(){
        // console.log(this.ad);
        this.userAdministrateService
            .getAdminList(this.ad)
            .subscribe(
                result=>{
                    // console.log(result);
                    if(result.status==0){
                     this.data=result.data.list;
                     this.totalItems=result.data.page.totalResult;
                     for(let i in this.data ){
                            if( this.data[i].userState==1){
                                 this.data[i].userState="正常";
                        }else if(this.data[i].userState==3){
                                 this.data[i].userState="冻结";
                        }else if(this.data[i].userState==2){
                            this.data[i].userState="解冻";
                        }
                        this.data[i].isOp=false
                          if(this.data[i].roles){
                             for(var k=0;k<this.data[i].roles.length;k++){
                                 if(this.data[i].roles[k].roleId==10){
                                      this.data[i].isOp=true
                                 }
                             }
                          }
                       }
                       // console.log(this.data);

                    }
                   
                }
            )
    }

    //获取角色列表
    data1:any;
    gr:any={

    }
    getRoles(){
        this.userAdministrateService
            .getRolecate(this.gr)
            .subscribe(
            result =>{
                // if(result.status=="0"){
                // console.log(result);
                this.data1=result.data;
                console.log(this.data1);
                // }
            }

        )
    };
//多选(传给后台的id列表)
    checkRoleId:any=[];
    public checks = function(data1:any){
        this.checkRoleId=[];
        let listState= <HTMLInputElement[]><any>document.getElementsByName("user");
        // console.log(listState);

        for(var i =0;i<listState.length;i++){
            if(listState[i].checked == true){
                this.checkRoleId.push(this.data1[i].roleId);
            }
        }
        // console.log(this.checkRoleId)
        return this.checkRoleId;
    }




    //添加管理员
    data2:any;
    obj1:any={
        loginName:"",
        userName:'',
        contactPhone:'',
        roles:[]
    }
     // 去空格
    trim(str:any) { //删除左右两端的空格　　
        return str.replace(/(^\s*)|(\s*$)/g, "");　　
    }
    addAdministrate(dialog:any){
        this.obj1.roles = this.checkRoleId;
        if(this.trim(this.obj1.loginName).length<=0){
            alert("请输入管理人员账号");
            return false;
        }
             if(this.trim(this.obj1.userName).length<=0){
                  alert("请输入管理人员姓名");
                   return false;
             }
             if(this.trim(this.obj1.contactPhone).length<=0){
                  alert("请输入手机号");
                   return false;
             }
        // console.log(this.obj1);
        this.userAdministrateService
            .addAdminstrate(this.obj1)
            .subscribe(
                result=>{
                    if(result.status==0){
                        alert(result.msg);
                         this.getRoles();
                             this.obj1={
                            loginName:"",
                            userName:'',
                             contactPhone:'',
                            roles:[]
                            }
                        dialog.hide();
                    }else{
                        alert(result.msg);

                    }
                    this.data2=result;
                     this.getAdminLists();
                    // console.log(this.data2);
                   
               },
                error => this.errorMsg = <any>error
            ); 
            
    }
     editAddPopClose(dialog:any){
        dialog.hide();
        this.getRoles();
          this.obj1={
                            loginName:"",
                            userName:'',
                             contactPhone:'',
                            roles:[]
                            }
    }
    //编辑管理员
   
    editAdminPop(dialog:any ,id:any,loginName:any,userName:any,arr:any,array2:any,phone:any){
        // console.log(arr);
        // console.log(this.isCheck(arr));
        this.checkBox(array2,this.isCheck(arr));//默认选中项
        // this.checks1(null);
        this.obj2.userId = id;
        this.obj2.loginName=loginName;
        this.obj2.userName=userName;
        this.obj2.contactPhone=phone;
         dialog.show();

    }
    // 判断已有角色
public isCheck(arr:any){
    let array:any=[];
    for(let i in arr.roles){
            for(let j in arr.roles){
                if(array.indexOf(arr.roles[j].roleName)==-1){
                 array.push(arr.roles[j].roleName);
                }
            }
    }
    // console.log(array)
    return array;
}
// 默认选择项
cb:any=[];
public checkBox(data1:any,array:any){
    // debugger;

     let listData= <HTMLInputElement[]><any>document.getElementsByName("userRole");
     for(var  i=0; i<listData.length;i++){
         listData[i].checked=false;
     }
     // console.log(listData);
     for(let i in data1){
         for(let j in array){
             if(data1[i].roleName==array[j]){
                 listData[i].checked=true;
                 // this.cb.push( listData[i]);
             }
         }
     }
     // return this.cb;
}
//获取所有选择角色的id
 checkId:any=[];
    public checks1 = function(){
        this.checkId=[];
        let listData= <HTMLInputElement[]><any>document.getElementsByName("userRole");
        console.log(listData);
        for(var i =0;i<listData.length;i++){
            if(listData[i].checked == true){
                if(this.checkId.indexOf(this.data1[i].roleId)==-1){
                    this.checkId.push(this.data1[i].roleId);
                }
            }
        }
        // console.log(this.checkId)
        return this.checkId;
    }


    obj2:any={
        userId:'',
        userName:'',
        loginName:'',
        contactPhone:'',
        roles:[]
    }
    data3:any;
    editAdministrate(dialog:any){
        this.checks1();
        this.obj2.roles=this.checkId;
        // console.log(this.obj2);
        this.userAdministrateService
            .editAdmin(this.obj2)
            .subscribe(
                result =>{
                    if(result.status=="0"){
                        alert(result.msg);
                        this.getAdminLists();
                        //  this.getRoles();
                         dialog.hide();
                         this.checkBox(null,null);
                          this.obj2={
                        userId:'',
                        userName:'',
                        loginName:'',
                         contactPhone:'',
                        roles:[]
                    };
                    }else{
                         alert(result.msg);
                    }
                    this.data3=result;
                    // this.getAdminLists();
                    //  this.getRoles();
                    this.checkId=[];
                },
                error => this.errorMsg = <any>error
            );
           
       
    }
  //添加/修改管理弹窗关闭(填写参数)
    editAdmPopClose(dialog:any){
        dialog.hide();
        this.checkBox(null,null);
    }

//重置密码
    res:any={
        userId:''
    }
    resetPassword(id:any){
        this.res.userId=id;
        // console.log(this.res);
        this.userAdministrateService
        .resetPassword(this.res)
            .subscribe(
            result=>{
                if(result.status=='0'){
                    alert(result.msg);
                }
            },
                error => this.errorMsg = <any>error
        );
    }
//冻结管理员
    obj3:any={
        userId:'',
        userState:" "
    }
    updateStatus(id:any,state:any){
        this.obj3.userId=id;
        if(state=="正常"){
            state=3;
        }else if(state=="冻结"){
            state=1;
        }
        this.obj3.userState=state;
        // console.log(this.obj3);
        this.userAdministrateService
            .updateStatus(this.obj3)
            .subscribe(
                result=>{
                    // console.log(result);
                    if(result.status=="0"){
                        alert(result.msg);
                        this.getAdminLists();
                    }
        },
                error => this.errorMsg = <any>error
            );
             this.getAdminLists();
    }



// 分页
    height:any;
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
        this.getAdminLists();
        
    }
    public sizeData(Number:any){
         this.itemsPerPage = Number;
        this.height = this.itemsPerPage*38+38+'px';
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
      
        this.turnFirst()
        this.height = this.itemsPerPage*38+120+'px';
        var listBody:any = document.getElementById("listBody");        
        var tr:any = document.createElement('tbody')
        var num:number =  this.itemsPerPage*1;     
    };
    
    public pageNumChange(event:any,allcheck:any){
        
        this.ad.pageSize = this.itemsPerPage+'';
        // this.getUserBackList();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.ad.pageNum = event.page;
        this.getAdminLists();
        // this.onSearch();
    }; 
    userName:any
    userID:any
    setOperation(user:any,win:any){
        this.userName = user.userName +' - '+user.loginName 
        this.userID = user.userId
        this.queryOperateUserList(user.userId)
        this.queryUserOperateUserList(user.userId)
            win.show()
    }
 list1: any=[];
    
 list2: any=[];
 showList(win:any){
     var obj:any={
        securityUserid:'',
        userId:'',
        managerFlag :'1',
     }
   
     var ids:any=[]
     for(var i=0;i<this.list2.length;i++){
         ids.push(this.list2[i].userId)
     }
     obj.userId = ids.join(',')
     obj.securityUserid = this.userID
     this.userAdministrateService
            .distributionOperateUser(obj)
            .subscribe(
                result=>{
                if(result.status=="0"){
                  alert('分配成功')
                  win.hide()
                }
        },
        error => this.errorMsg = <any>error
        );
 }
 // 查询未分配列表
 queryOperateUserList(id:any){
     var obj:any={
         flag:0,
         securityUserid:id
     }
      this.userAdministrateService
            .queryOperateUserList(obj)
            .subscribe(
                result=>{
                if(result.status=="0"){
                  this.list1 =result.data
                }
        },
        error => this.errorMsg = <any>error
        );
 }
 // 查询用户分配列表
 queryUserOperateUserList(id:any){
     var obj:any={
         securityUserid:id
     }
      this.userAdministrateService
            .queryOperateUserList(obj)
            .subscribe(
                result=>{
                if(result.status=="0"){
                    this.list2 =result.data
                }
        },
        error => this.errorMsg = <any>error
        );
 }
}