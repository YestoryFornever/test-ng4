import {INCONFIG} from '../../../../public/in.config';
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UserOperateService } from './services/user-operate.service'
@Component({
	selector: 'user-operate',
	templateUrl: 'user-operate.component.html',
	styleUrls: ['user-operate.component.scss'],
	providers: [UserOperateService]
})
export class UserOperateComponent implements OnInit{
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userOperateService:UserOperateService,
        		private router:Router) {}
	ngOnInit(){

		this.queryUserList();
		this.queryOperateAccountList();
	};
	pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:10,
		totalPages:0,
	}
	conditions:any={
		userName:'',
		userType:'',
		securityUserid:'',
		state:'',
		pageNum:1,
		pageSize:10,
		state_data:[
			{id:'',name:'全部'},
			{id:'1',name:'正常'},
			// {id:'2',name:'无效'},
			{id:'3',name:'冻结'},
		],
		userType_data:[
			{id:'',name:'全部'},
			{id:'2',name:'官方账号'},
			{id:'3',name:'运营账号'},
			{id:'4',name:'大V'},
		],
		manager_data:[]
	}
	table_list:any =[];
	errorMessage:any;
	/**
	 * 获取管理员下拉 数据
	 */
	queryUserList(){
		this.userOperateService.queryUserList(
			{
				loginName:'',
				userName:'',
				roleId:10,
				userState:1,
				pageNum:1,
				pageSize:200
			}
		)
        .subscribe(
        	res => {
        		if(res.data &&　res.status==0){
        			this.conditions.manager_data = res.data.list;
        		}
        		console.log(res,11111)
        	},
            error => this.errorMessage = error
	    );
	}
	/**
	 * 列表数据
	 */
	queryOperateAccountList(){
		let param = {
			userName:this.conditions.userName,
			userType:this.conditions.userType,
			securityUserid:this.conditions.securityUserid,
			state:this.conditions.state,
			pageNum:this.pageParams.currentPage,
			pageSize:this.pageParams.itemsPerPage,
		}
		this.userOperateService.queryOperateAccountList(param)
        .subscribe(
        	res => {
        		console.log(res)
        		if(res.data&&res.status=='0'){
        			for(let item of res.data.list){
        				item['checked'] = false;
        			}
        			console.log(res)
        			this.table_list = res.data.list;
	        		this.pageParams.totalItems = res.data.page["totalResult"];
					this.changeDetectorRef.detectChanges();
				}
        	},
            error =>  console.log(error)
	    );
	}
	/**
	 * 改变状态
	 */
	temp_item:any ={};
	change_modal_show(modal:any,item:any){
		this.temp_item =item;
		if(item.state == 2){
			alert('此用户为无效用户');
			return false;
		}
		modal.show();
	}
	handle_sure(modal:any){
		console.log(this.temp_item)
		if(this.temp_item.state == 1){
			this.frozenUser(this.temp_item ,modal);
		}
		if(this.temp_item.state == 3){
			this.unFrozenUser(this.temp_item ,modal);
		}
	}
	/*冻结*/
	frozenUser(item:any,modal:any){
		let param ={
			userId:item['userId'],
			frozenRemark:item['userType'],
		}
		this.userOperateService.frozenUser(param)
        .subscribe(
        	res =>{
	        		if(res.status ==0){
	        			this.queryOperateAccountList();
	        			alert(res.msg);
	        			modal.hide();
	        		}
	        	}
        	)
	}
	/*解冻*/
	unFrozenUser(item:any,modal:any){
		let param ={
			userId:item['userId'],
			frozenRemark:item['userType'],
		}
		this.userOperateService.unFrozenUser(param)
        .subscribe(
        		res => {
        			if(res.status ==0){
	        			this.queryOperateAccountList();
	        			alert(res.msg);
	        			modal.hide();
	        		}
	        	}

        	)
	}
	/*跳轉到用戶編輯頁面*/
	to_add(item?:any){

		item  && (this.router.navigate(['../user-edit',item['userId'],(item['userType'] || 2) ],{relativeTo:this.activatedRoute}));
		!item && (this.router.navigate(['../user-edit' ,'0', 2],{relativeTo:this.activatedRoute}))

	}
	/*全选*/
	all_check(all_checked:any){
		console.log(all_checked.checked)
		for(let item of this.table_list){
			if(item.userType && item.userType!=2){
				if(all_checked.checked ==true){
					item.checked = true;
				}
				if(all_checked.checked ==false){
					item.checked = false;
				}
			}
		}
	}
/***************弹窗 数据 */
	modal_left_list:any=[];
	nick_num:any = 0;
	userId_list:any = [];
	/*弹窗出现  获取 左侧列表数据*/
	get_modal_left(){
		this.modal_left_list = [];
		this.userId_list =[];
		for(let item of this.table_list){
			if(item['checked'] == true){
				this.userId_list.push(item['userId'])
				this.modal_left_list.push(item);
			}
		}
		this.nick_num = this.modal_left_list.length;
	}
	// 右侧选中状态 tr_checked == securityUserid
	tr_checked:any =0;
	/*分配账号弹窗*/
	modal_request(modal:any){
		this.distributionOperateUser(modal);
	}
	/*分配运营号请求*/
	distributionOperateUser(modal:any){
		let param ={
			securityUserid:this.tr_checked,
			userId:this.userId_list.join(','),
			managerFlag:0,
		}
		if(!param['userId']){
			alert('待分配运营号为空');
			return
		}
		if(!param['securityUserid']){
			alert('请选择运营人员');
			return
		}
		this.userOperateService.distributionOperateUser(param)
        .subscribe(
        		res => {
        			if(res.status ==0){
	        			this.queryOperateAccountList();
	        			alert(res.msg);
	        			modal.hide();
	        		}
	        	}

        	)
	}
file_ipt:any;
  fileChange(input:any,umbnail:any,e:any){
    // debugger
    this.file_ipt = input;
    if(this.file_ipt.files[0]){
        // this.img.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
    }
  }
  isUpLoading:any=false
 uploadExecl(excle:any,file_ipt:any){
     var  fd= new FormData();
    this.isUpLoading = true
    if(this.file_ipt&&this.file_ipt.files[0]){
      fd.append('userExecl',this.file_ipt.files[0]);
    }else{
      alert('请选择execl文件')
      return false
    }

     this.userOperateService.uploadExecl(fd)
      .subscribe(
      Article =>{
              if(Article.status==0){
                  alert("上传成功")
                   file_ipt.value=''
                   this.isUpLoading = false
                  // excle.hide()
              }else{
                if(Article.msg){
                    alert(Article.msg);
                    }
                  }    
                  this.isUpLoading = false       
              },
      error => this.errorMessage = error
        );        
 	}
}