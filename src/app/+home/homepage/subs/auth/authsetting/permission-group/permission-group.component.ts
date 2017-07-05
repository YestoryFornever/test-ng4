import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { PermissionService } from './services/permission-group.service';
import { PermissionGroups } from './classes/permission-groups';
import { TreeModule,TreeNode} from 'primeng/primeng';


@Component({
    selector: 'permission-group',
    templateUrl: 'permission-group.component.html',
    styleUrls: [
        './permission-group.component.scss',
        '../../../../scss/header.scss',
        '../../../../scss/table.scss',
        '../../../../scss/search_condition.scss',
        '../../../../scss/pagination.scss'
    ],
    providers:[PermissionService]
})
export class PermissionGroupComponent implements OnInit {
    constructor(
        private permissionService:PermissionService,
        private changeDetectorRef:ChangeDetectorRef,
        private router:Router,
        private activatedRoute:ActivatedRoute
    ) {}
    ngOnInit(){
   this.getPermiGroups();
      // this.getMenusPermissiongroup();
    }
// 查看权限分组
    obj1={
        permissionGroupName:'',
        pageNum:"1",
        pageSize:"10"
    }
    data:any;
    getPermiGroups(){
        // console.log(this.obj1);
        this.permissionService
            .getPermiGroup(this.obj1)
            .subscribe(
                result=>{
                    this.data=result.data.list;
                    this.totalItems=result.data.page.totalResult;
                    // console.log(this.data);
                }
            )
    }
// 添加或修改授权弹窗部分
    isAdd:boolean=true;
    obj2:any={
        permissionGroupName:"",
        description:"",
        permissionGroupId:"",
    }
    editPermissiongroupPop(dialog:any,obj2:any,id:any,name:any,description:any){
        //debugger;
        if(!obj2){//添加时
            this.isAdd = true;
        }else{
            this.isAdd = false;
            obj2.permissionGroupId=id;
             obj2.permissionGroupName=name;
              obj2.description=description;
        }
        dialog.show();
    }

//添加/修改授权保存
	editPermin(dialog:any){
		if(this.isAdd){//addRole是服务里面的方法
			this.permissionService
				.addPermiGroup(this.obj2)
				.subscribe(
					result => {
                        if(result.status==0){
                            alert(result.msg);
                             this.obj2.permissionGroupName="",
                              this.obj2.description=""
                            dialog.hide();
                        }else{
                          alert(result.msg);  
                        }
                         this.getPermiGroups();
                    this.obj2.permissionGroupName="",
                    this.obj2.description=""
                    
				}
        
			);
		}else{
		    // this.obj3.permissionGroupId=id;
			this.permissionService
				.editPermiGroup(this.obj2)
				.subscribe(
					result => {
					 if(result.status==0){
                            alert(result.msg);
                            dialog.hide();
                        }else{
                          alert(result.msg);  
                        }
                    this.obj2.permissionGroupName="",
                    this.obj2.description=""
                      this.getPermiGroups();
				}
           
			)
               
               dialog.hide();
		}
	}
	// 删除权限
    obj3:any={
        permissionGroupId:''
    }
    deletePermissionGroupPop(dialog:any,key:any){
        this.obj3.permissionGroupId = key;
        dialog.show();
    }
	deletPermissionGroup(dialog:any){
	    // this.obj3.permissionGroupId=key;
        this.permissionService
            .deletPermis(this.obj3)
            .subscribe(
                result => {
                    if(result.status=="0"){
                        alert(result.msg);
                    }
                         this.getPermiGroups();
                         dialog.hide();
                }

            )
    }


// 复制权限分组
    copy:any={
        beforeName:'',
        permissionGroupId:'',
        permissionGroupName:'',
        description:'',
        copyPermissionIndex:false,
        copyRoleIndex:false
    }
    // 去空格
    trim(str:any) { //删除左右两端的空格　　
        return str.replace(/(^\s*)|(\s*$)/g, "");　　
    }
    copyPermi(dialog:any){
        if(this.trim(this.copy.permissionGroupName).length<=0){
            alert("请输入新分组名称");
            return false;
        }
             if(this.trim(this.copy.description).length<=0){
                  alert("请输入新分组描述");
                   return false;
             }

        
         console.log(this.copy)
        this.permissionService
            .copyPermissiongroup(this.copy)
            .subscribe(
                result =>{

                    console.log(result);
                    if(result.status=="0"){
                        alert(result.msg);
                    }else{
                        alert(result.msg);
                    }
                    this.copy={
                        beforeName:'',
                        permissionGroupId:'',
                        permissionGroupName:'',
                        description:'',
                        copyPermissionIndex:false,
                        copyRoleIndex:false 
                    }
                     this.getPermiGroups();
                },
            )
          
        dialog.hide();
    }
    //判断弹窗是否出现以及获取表格的roleId(动态的)
    copyPermiPop(dialog:any ,id:any,copyName:any){
        dialog.show();
        this.copy.permissionGroupId = id;
        this.copy.beforeName=copyName;
    }
//**********************************

//判断是选择复制权限还是复制
    // clickCon(){
    //     console.log('看见')
    // }
    // 获取权限分组的菜单列表(个人)
    obj4:any={
        permissionGroupId:'',
        permissionGroupName:''
    }
    data1:any;
getMenusPermissiongroup(dialog:any, key:any,name:any){
        
       this.arrayss=[];
        this.obj4.permissionGroupId=key;
        this.obj4.permissionGroupName=name;
        this.permissionService
            .getMenus(this.obj4)
            .subscribe(
                result =>{
                    console.log(result);
                    this.data1=result.data;
                    this.changeDetectorRef.detectChanges();
                    this.selections(this.data1);

                }

            )
             dialog.show();
    }
// 判断是否点击
arrayss:any=[];
public selections(arr:any){//arr传this.data1/arr2传的是this.selectedFiles
    this.arrayss=[];
    for(let obj of arr){
        if(obj['isChecked']){
            this.arrayss.push(obj);
            this.aaaa(obj['children']);
        }
        else{
            this.aaaa(obj['children']);
        }
    }
    console.log( this.arrayss);

}
public aaaa(arr:any){
    for(let obj2 of arr){
        if(obj2['isChecked']){
            this.arrayss.push(obj2);
            this.aaaa(obj2['children']);
        }else{
            this.aaaa(obj2['children']);
        }
    }
}
    
selectedFiles:any=[];
     nodeSelect(event:any) {
         // console.log(this.selectedFiles);
    }
    onNodeUnselect(event:any){
        // alert('无权限');
         // console.log(event.node);
    }

    //全选HTMLImageElement
    // checkbox:any = document.getElementsByName('user');
    // checkAll = function(allcheck:any){
    //     for(var i=0;i<this.checkbox.length;i++){
    //         this.checkbox[i].checked = allcheck.checked
    //     }
    // };

// 更新权限分组的菜单(授权)
    obj5:any={
        permissionGroupId:'',
         menuIdList:[]
    }

public tijiao(){
    let array:any =[];
    let listState2=  <HTMLInputElement[]><any>document.getElementsByName("sp");
        for(let i in listState2){
            if(listState2[i].innerHTML){
                array.push(listState2[i].innerHTML);
                 listState2[i].innerHTML="";
            }
            
        }
        return array;
}

    updateMenus(dialog:any){
       this.obj5.menuIdList=this.tijiao();
        this.obj5.permissionGroupId=this.obj4.permissionGroupId;
         console.log(this.obj5);
        this.permissionService
            .updateMenus(this.obj5)
            .subscribe(
                result => {
                    console.log(result)
                    if(result.status=="0"){
                        alert(result.msg);
                    }else{
                        alert(result.msg);
                    }
                    this.getPermiGroups();
                }
            ) 
            
        dialog.hide();
    }

    // 分页
    height :any;
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
        this.getPermiGroups();
        
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
        var num:number = this.itemsPerPage*1;     
    };
    
    public pageNumChange(event:any,allcheck:any){
        
        this.obj1.pageSize = this.itemsPerPage+'';
        // this.getUserBackList();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.obj1.pageNum = event.page;
        this.getPermiGroups();
        
        // this.onSearch();
    }; 
}
