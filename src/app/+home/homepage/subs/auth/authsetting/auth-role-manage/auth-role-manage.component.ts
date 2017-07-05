import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { AuthRoleManageService } from './services/auth-role-manage.service';
import { Role } from './classes/role';
import {TreeModule,TreeNode} from 'primeng/primeng';
@Component({
	selector: 'alphain-auth-role-manage',
	templateUrl: 'auth-role-manage.component.html',
	styleUrls: [
		'./auth-role-manage.component.scss',
		'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/search_condition.scss',
		'../../../../scss/pagination.scss'
	],
	providers:[AuthRoleManageService]
})
export class AuthRoleManageComponent implements OnInit {

	constructor(
		private authRoleManageService:AuthRoleManageService,
		private changeDetectorRef:ChangeDetectorRef,
		private router:Router,
		private activatedRoute:ActivatedRoute
	) {
		this.dataSource = Observable.create((observer:any) => {
			observer.next(this.roleName);
		}).mergeMap((token:string) => this.getStatesAsObservable(token));
	}
	ngOnInit(){
		this.getRoles();
	}

	roleName:string;
	errorMsg:string;
	rolesLength:number;
	roleId:number;
	
	roles:any;
	description:string;
	copyPermissionGroupIndex:boolean;
	copyUserIndex:boolean;

// nodeSelect(event:any) {
		// debugger;
       // alert("不能点击");
      
    // }
   
//获取列表查询
	search:any = {
		roleName: "",
		pageNum:"1",
		pageSize:"10"
	};

	getRoles() {
		this.authRoleManageService.getRoles(
			this.search
		).subscribe(
			result => {
				// console.log(result);
				this.roles = result.data.list;
				this.totalItems=result.data.page.totalResult;
			}
		);
	}

//添加或修改角色弹窗部分
	isAdd:boolean = true;
	add_role:any = {
		roleName: "",
		description: "",
		roleId: "",
	};
	editRolePop(dialog:any, add_role:any,id:any,name:any,description:any) {
		//debugger;
		if (!add_role) {//添加时
			this.isAdd = true;
		} else {
			this.isAdd = false;
			this.add_role.roleId=id;
			this.add_role.roleName=name;
			this.add_role.description=description;
		}
		dialog.show();
	}

//添加/修改角色保存
	editRole(dialog:any) {
		if (this.isAdd) {
			this.authRoleManageService
				.addRole(this.add_role)
				.subscribe(
					result => {
						if (result.status == "0") {//添加角色时后台会传回一个状态码，0表示成功，其他表示失败
								alert(result.msg);
								this.add_role.roleName="";
								this.add_role.description="";
								dialog.hide();
							}else{
									alert(result.msg);
								}
							this.getRoles();
						},
					error => this.errorMsg = <any>error
						);

		} else {

			this.authRoleManageService
				.editRole(this.add_role)
				.subscribe(
					result => {
						if (result.status == "0") {
							alert(result.msg);
							dialog.hide();
						}else{
						
							alert(result.msg);
						}
					this.getRoles();
					// this.add_role.roleName="";
					// this.add_role.description="";
					},
					error => this.errorMsg = <any>error
				);	
		}
	}

//删除
	droleId:any = {
		roleId: ''
	}
//删除弹窗
	deleteRolePop(dialog:any,key:any){
		this.droleId.roleId = key;
		dialog.show();
	}
	deletedRole(dialog:any) {
		// dialog.hide();
		// this.droleId.roleId = key;
		this.authRoleManageService
			.deleteRole(this.droleId)
			.subscribe(
				result => {
					if (result.status == '0') {
						alert(result.msg);
					}else{
						alert(result.msg);
					}
					this.getRoles();
					dialog.hide();
				},
				error => this.errorMsg = <any>error
			);

	}

	//复制角色
	copy:any = {
		beforeName: '',
		roleId: '',
		roleName: '',
		description: '',
		copyPermissionGroupIndex: false,
		copyUserIndex: false
	}
// 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	copyRoles(dialog:any) {
		 if(this.trim(this.copy.roleName).length<=0){
            alert("请输入新角色名称");
            return false;
        }
             if(this.trim(this.copy.description).length<=0){
                  alert("请输入新角色描述");
                   return false;
             }

		this.authRoleManageService
			.copyRole(this.copy)
			.subscribe(
				result => {
					// console.log(result);
					if (result.status == "0") {
						alert(result.msg);
					}else{
						alert(result.msg);
						
					}
					this.copy= {
						beforeName: '',
						roleId: '',
						roleName: '',
						description: '',
						copyPermissionGroupIndex: false,
						copyUserIndex: false
					}
					this.getRoles();
				},
				error => this.errorMsg = <any> error
			);
		dialog.hide();
	}

	//判断弹窗是否出现以及获取表格的roleId(动态的)
	copyRolePop(dialog:any, id:any, copyName:any) {
		dialog.show();
		this.copy.roleId = id;
		this.copy.beforeName = copyName;
	}

//**********************************

//判断是选择复制权限还是复制角色
	// clickCon() {
	// 	console.log('看见')
	// }

//查看角色授权(保留)
	items:any = {
		roleId: '',
		name:''
	};
	it:any;
	tip:any;
	approveRolePop(dialog:any, id:any, name:any) {
		this.items.roleId = id;
		this.items.name=name;
		console.log(this.items);

		this.authRoleManageService
			.lookRoleApprove(this.items)
			.subscribe(
				result=> {
					
					this.it=result.data;
					if(this.it.length<=0){
						this.tip="提示";
					}else{
						this.tip="不提示";
					}
					console.log(this.it);
					this.selections(this.it);
				}
			);
			dialog.show();
	}

//添加/修改管理弹窗关闭(填写参数)
    editRolePopClose(dialog:any){
        dialog.hide();
       this.authRoleManageService
			.lookRoleApprove(this.items)
			.subscribe(
				result=> {
					
					this.it=result.data;
					console.log(this.it);
					this.selections(this.it);
				}
			);
    }
// 获取点击事件
selectedFiles:any;
arrayss:any=[];
public selections(arr:any){
	for(let obj of arr){
		if(obj['isChecked']){
			this.arrayss.push(obj);
			this.aaaa(obj['children']);
		}
		else{
			this.aaaa(obj['children']);

		}
	}

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


// 成员维护
	data2:any = {
		roleId: '',
		roleName: ''
	}
	data3:any;
	data4:any;
	d3Length:any;
	d4Length:any;
	arr:any=[];
	getUsersForRoles(dialog:any, key:any, name:any) {
		this.data2.roleId = key;
		this.data2.roleName = name;
		// console.log(this.data2);
		this.authRoleManageService
			.getUsersForRole(this.data2)
			.subscribe(
				result=> {
					console.log(result);
					this.data3 = result.data.unslected;

					this.data4 = result.data.selected;
					this.concat(this.data4,this.data3);
					this.d3Length=this.allLength(this.data3);
					this.d4Length=this.allLength(this.data4);
				}
			);
			setTimeout(function(){
				dialog.show();
			},0)
	}
//定义函数将两个数值合并为一个数组
   public concat(da1:any,da2:any){
   			let arr1:any=[];
   			let obj ={
   				createTime:"",
				loginName:"",
				loginPassword:"",
				qualifiedName:"",
				updateTime:"",
				userId:'',
				userName:"",
				userState:'',
   			}
   			for (let i in da1){
   				for(let j in obj ){
   					obj[j] = da1[i][j];
   				}
   					arr1.push(obj)
   			}
   			for(let i in da2){
   				for(let j in obj){
   					obj[j] = da2[i][j];
   				}
   				arr1.push(obj)
   			}

   			 this.arr=arr1;
   			 // console.log(this.arr)
   			return this.arr;
   			// console.log(this.arr);

    }
    // 长度
    public allLength(arr:any){
    	return arr.length;
    }

	// onMove(){
	// 	let inputs= <HTMLInputElement[]><any>document.getElementsByName("input"); 
 //     debugger
 //        for(var i =0;i<inputs.length;i++){
 //        	// let temp:any;
 //            if(inputs[i].checked == true){
 //            	// temp=;
 //            	this.data4.push(this.data3[i]);
 //            	 console.log(this.data3.indexOf(this.data3[i]));
 //            	this.data3.slice(this.data3.indexOf(this.data3[i]));
            	
              	
 //            }
 //        }
	// }


 // 更新角色成员
	key:any={
		roleId:'',
		userIdList:[]
	};
//去重方法
	public selected(array:any){
	let arr2:any=[];
		if(array.length==0){
			// alert("请选择用户角色");
		}else{
			for(let i in array){
				if(arr2.indexOf(array[i])==-1){
					arr2.push(array[i].userId);
				}
			}

		}
		return arr2;
	}
updataRoles(dialog:any){
	    this.key.roleId=this.data2.roleId;
	    console.log(this.data4);
	    this.key.userIdList=this.selected(this.data4);
	    console.log(this.key);
		this.authRoleManageService
			.updataRoleList(this.key)
			.subscribe(
				result=>{
			if (result.status == "0") {
						alert(result.msg);
					}else{
						alert(result.msg);
					}
				},
				error => this.errorMsg = <any> error
			)
			
			dialog.hide();
}

// 获取权限分组列表
	obj5:any={
		roleId: '',
		roleName: ''
	};
	data5:any;
	data6:any;
	d5Length:any;
	d6Length:any;
	array:any=[

	];
	getPermissionGroup(dialog:any,key:any,name:any){
		this.obj5.roleId=key;
		// console.log(this.obj5);
		this.obj5.roleName=name;
		this.authRoleManageService
			.getPermissionGroups(this.obj5)
			.subscribe(
				result=>{
					this.data5= result.data.unslected;
					this.data6 = result.data.selected;
					this.concat1(this.data5,this.data6);
					this.d5Length=this.allLength(this.data5);
					this.d6Length=this.allLength(this.data6);
				}
			)
			dialog.show();
	}

   public concat1(da1:any,da2:any){
   			let arr1:any=[];
   			let obj ={
   				createTime:"",
				loginName:"",
				loginPassword:"",
				qualifiedName:"",
				updateTime:"",
				userId:'',
				userName:"",
				userState:'',
   			}
   			for (let i in da1){
   				for(let j in obj ){
   					obj[j] = da1[i][j];

   				}
   					arr1.push(obj)

   			}
   			for(let i in da2){
   				for(let j in obj){
   					obj[j] = da2[i][j];
   				}
   				arr1.push(obj)
   			}

   			 this.array=arr1;
   			return this.array;
	
    }
  public selected2(array:any){
	let arr2:any=[];
		if(array.length==0){
			// alert("请选择用户");
		}else{
			for(let i in array){
				if(arr2.indexOf(array[i])==-1){
					arr2.push(array[i].permissionGroupId);
				}
			}

		}
	return arr2;
	}
// 更新角色的权限分组
key2:any={
	roleId:'',
	permissionGroupIdList:[]	
};
updatePermssionGroup(dialog:any){
	    this.key2.roleId=this.obj5.roleId;
	    this.key2.permissionGroupIdList=this.selected2(this.data6);
	    console.log(this.key2);
		this.authRoleManageService
			.updatePermssionGroups(this.key2)
			.subscribe(
				result=>{
					// console.log(result);
			if (result.status == "0") {
						alert(result.msg);
					}
				},
				error => this.errorMsg = <any> error
			)
			dialog.hide();
}

	//checkbox
	public roleState:any = {all: true, normal: false, close: false};
	changeState(event:any){
		if(event.target.parentElement.firstElementChild === event.target){
			if(this.roleState.all === false){
				for(let i in this.roleState){
					(i!=="all") && (this.roleState[i] = false);
				}
			}
		}else{
			this.roleState.all = false;
		}
	}
	//typeahead
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public dataSource:Observable<any>;
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public getStatesAsObservable(token:string):Observable<any> {
		let query = new RegExp(token, 'ig');
 
		return Observable.of(
			this.roles.filter((state:any) => {
				return query.test(state.name);
			})
		);
	}
	public changeTypeaheadLoading(e:boolean):void {
		this.typeaheadLoading = e;
	}
	public changeTypeaheadNoResults(e:boolean):void {
		this.typeaheadNoResults = e;
	}
	public typeaheadOnSelect(e:any):void {
		//console.info('当前值:', e.value);
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
        this.getRoles();  
    }
    public sizeData(Number:any){
    	this.itemsPerPage = Number;
        this.height = this.itemsPerPage*38+38+'px';
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
       
        	
       
        
        this.turnFirst()
        this.height = this.itemsPerPage*38+120+'px';
        var listBody:any = document.getElementById("listBody");     
        var tr:any = document.createElement('tbody');
        var num:number = this.itemsPerPage*1;  
    };
    
    public pageNumChange(event:any,allcheck:any){
        // this.changeDetectorRef.detectChanges();
        
        this.search.pageSize = this.itemsPerPage+'';
        // this.getUserBackList();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.search.pageNum = event.page;
         this.getRoles();
        // this.onSearch();
    };



}